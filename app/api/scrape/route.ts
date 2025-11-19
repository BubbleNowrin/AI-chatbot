import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { WebsiteContent } from '@/lib/models/WebsiteContent';
import { scrapeWebsiteContent } from '@/lib/scraper';

export async function POST(request: NextRequest) {
  try {
    const { websiteUrl } = await request.json();

    if (!websiteUrl) {
      return NextResponse.json(
        { error: 'Website URL is required' },
        { status: 400 }
      );
    }

    // Validate URL
    try {
      new URL(websiteUrl);
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if website content already exists
    let websiteContent = await WebsiteContent.findOne({ websiteUrl });

    // If exists and scraped within last 24 hours, return cached
    if (websiteContent) {
      const hoursSinceLastScrape = 
        (Date.now() - websiteContent.lastScraped.getTime()) / (1000 * 60 * 60);
      
      if (hoursSinceLastScrape < 24) {
        return NextResponse.json({
          message: 'Using cached content',
          cached: true,
        });
      }
    }

    // Scrape website
    const scrapedData = await scrapeWebsiteContent(websiteUrl);

    if (websiteContent) {
      // Update existing
      websiteContent.content = scrapedData.content;
      websiteContent.title = scrapedData.title;
      websiteContent.description = scrapedData.description;
      websiteContent.lastScraped = new Date();
      await websiteContent.save();
    } else {
      // Create new
      websiteContent = new WebsiteContent({
        websiteUrl,
        content: scrapedData.content,
        title: scrapedData.title,
        description: scrapedData.description,
        pages: [
          {
            url: websiteUrl,
            content: scrapedData.content,
            title: scrapedData.title,
          },
        ],
        lastScraped: new Date(),
      });
      await websiteContent.save();
    }

    return NextResponse.json({
      message: 'Website content scraped successfully',
      cached: false,
    });
  } catch (error: any) {
    console.error('Scrape API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to scrape website' },
      { status: 500 }
    );
  }
}

import axios from 'axios';
import * as cheerio from 'cheerio';

export async function scrapeWebsiteContent(url: string): Promise<{
  content: string;
  title: string;
  description: string;
}> {
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      timeout: 10000,
    });

    const $ = cheerio.load(response.data);

    // Remove script and style elements
    $('script, style, nav, footer, header').remove();

    // Extract title
    const title = $('title').text() || $('h1').first().text() || '';

    // Extract description
    const description = $('meta[name="description"]').attr('content') || '';

    // Extract main content
    const mainContent = $('main').text() || $('article').text() || $('body').text();

    // Clean and format content
    const content = mainContent
      .replace(/\s+/g, ' ')
      .replace(/\n+/g, '\n')
      .trim()
      .substring(0, 5000); // Limit to 5000 characters

    return {
      content,
      title: title.trim(),
      description: description.trim(),
    };
  } catch (error) {
    console.error('Error scraping website:', error);
    throw new Error('Failed to scrape website content');
  }
}

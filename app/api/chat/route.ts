import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Conversation } from '@/lib/models/Conversation';
import { WebsiteContent } from '@/lib/models/WebsiteContent';
import { generateChatResponse } from '@/lib/openai';

export async function POST(request: NextRequest) {
  try {
    const { message, sessionId, name, email, websiteUrl } = await request.json();

    if (!message || !sessionId) {
      return NextResponse.json(
        { error: 'Message and sessionId are required' },
        { status: 400 }
      );
    }

    await connectDB();

    // Find or create conversation
    let conversation = await Conversation.findOne({ sessionId });

    if (!conversation && name && email) {
      // Create new conversation
      conversation = new Conversation({
        sessionId,
        name,
        email,
        websiteUrl,
        messages: [],
        status: 'active',
      });
    }

    if (!conversation) {
      return NextResponse.json(
        { error: 'Conversation not found. Please provide name and email.' },
        { status: 404 }
      );
    }

    // Get website content for context
    let websiteContext = '';
    if (websiteUrl) {
      const websiteData = await WebsiteContent.findOne({ websiteUrl });
      if (websiteData) {
        websiteContext = `Website: ${websiteData.title}\n${websiteData.description}\n\n${websiteData.content}`;
      }
    }

    // Generate AI response
    const aiResponse = await generateChatResponse(
      message,
      conversation.messages,
      websiteContext
    );

    // Add messages to conversation
    conversation.messages.push({
      role: 'user',
      content: message,
      timestamp: new Date(),
    });

    conversation.messages.push({
      role: 'assistant',
      content: aiResponse,
      timestamp: new Date(),
    });

    await conversation.save();

    return NextResponse.json({
      response: aiResponse,
      sessionId: conversation.sessionId,
    });
  } catch (error: any) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

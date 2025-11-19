import { NextRequest, NextResponse } from 'next/server';
import { generateChatResponse } from '@/lib/openai';

interface Message {
  role: string;
  content: string;
}

export async function POST(req: NextRequest) {
  try {
    const { message, mode, history } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Build context based on mode
    let systemPrompt = '';
    
    switch (mode) {
      case 'basic':
        systemPrompt = `You are a helpful AI assistant for AI Chatbot Widget service.

COMPANY INFO:
- Company: AI Chatbot Widget (Finland-based)
- Website: info@aichat.fi
- Service: Embeddable AI chatbots for websites

SERVICES:
1. Basic Chatbot - Simple Q&A ($99/month)
2. Memory-Based Chatbot - Remembers conversations ($199/month)
3. Knowledge Base Chatbot - Custom training ($299/month)
4. Agent Mode Chatbot - Department routing ($499/month)

Keep responses concise and helpful. Focus on answering the user's question directly.`;
        break;

      case 'memory':
        systemPrompt = `You are a memory-based AI assistant that remembers past conversations.

IMPORTANT: Reference previous messages when relevant. Use context from conversation history.

COMPANY INFO:
- Service: Memory-Based Chatbot ($199/month)
- Features: Conversation tracking, personalized responses, context awareness
- Best for: E-commerce, SaaS, returning customers

Always acknowledge what you remember from previous messages. Build on past context.`;
        break;

      case 'knowledge':
        systemPrompt = `You are a Knowledge Base AI trained on custom documentation and data.

COMPANY INFO:
- Service: Knowledge Base Chatbot ($299/month)
- Features: Custom training, file uploads (PDF/CSV/TXT), website scraping
- Best for: Technical support, product catalogs, documentation

TRAINING DATA EXAMPLES:
- Product specifications and features
- Technical documentation and guides
- Company policies and procedures
- FAQ databases

Provide detailed, accurate answers based on "trained knowledge". Mention that you can be trained on any custom data.`;
        break;

      case 'agent':
        systemPrompt = `You are an intelligent Agent Mode chatbot with department routing capabilities.

ROUTING LOGIC:
- Sales inquiries → Route to sales team
- Technical support → Route to support department
- General questions → Route to customer service
- Contact requests → Route to contact form

COMPANY INFO:
- Service: Agent Mode Chatbot ($499/month)
- Features: Intent detection, smart routing, live agent handoff
- Best for: Enterprise, multiple departments

IMPORTANT: When detecting specific intents, suggest routing:
- "I'll connect you with our [department] team"
- "Let me transfer you to [specialist]"
- "This requires [department] attention"

Also answer general questions but always offer to route for complex matters.`;
        break;

      default:
        systemPrompt = 'You are a helpful AI assistant.';
    }

    // Prepare conversation history in correct format
    const formattedHistory: Array<{ role: 'user' | 'assistant'; content: string }> = 
      history?.slice(-5).map((msg: Message) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content
      })) || [];

    // Generate response with proper parameters
    const aiResponse = await generateChatResponse(message, formattedHistory, systemPrompt);

    return NextResponse.json({
      response: aiResponse,
      mode: mode,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Playground API Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
}

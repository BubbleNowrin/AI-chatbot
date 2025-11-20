import { NextRequest, NextResponse } from 'next/server';
import { generateChatResponse } from '@/lib/openai';

interface Message {
  role: string;
  content: string;
}

export async function POST(req: NextRequest) {
  try {
    const { message, mode, history, knowledgeBase } = await req.json();

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
        let knowledgeContent = '';
        if (knowledgeBase && Object.keys(knowledgeBase).length > 0) {
          knowledgeContent = Object.values(knowledgeBase).map((kb: any) => 
            `--- Document: ${kb.fileName} ---\n${kb.content}\n\n`
          ).join('');
        }
        
        systemPrompt = `You are a Knowledge Base AI trained on custom documentation and data.

${knowledgeContent ? `UPLOADED KNOWLEDGE BASE CONTENT:
${knowledgeContent}

INSTRUCTIONS:
- Answer questions based on the uploaded documents above
- If the question is about content in the documents, provide detailed, accurate answers
- Quote relevant sections when helpful
- If information isn't in the documents, clearly state that
` : `NO KNOWLEDGE BASE CONTENT UPLOADED YET.

COMPANY INFO:
- Service: Knowledge Base Chatbot ($299/month)
- Features: Custom training, file uploads (PDF/CSV/TXT), website scraping
- Best for: Technical support, product catalogs, documentation

Please upload documents to see the knowledge base in action. You can ask questions about uploaded content.`}

Always be specific about which document you're referencing when answering.`;
        break;

      case 'agent':
        systemPrompt = `You are an intelligent Agent Mode chatbot with department routing capabilities.

ROUTING LOGIC:
- Sales inquiries → Route to sales team
- Technical support → Route to support department
- General questions → Route to customer service
- Contact requests → Route to contact form
- Billing → Route to billing department

COMPANY INFO:
- Service: Agent Mode Chatbot ($499/month)
- Features: Intent detection, smart routing, live agent handoff
- Best for: Enterprise, multiple departments

IMPORTANT: When detecting routing intents, provide clickable routing options in this exact format:
🏷️ **ROUTING OPTIONS:**
• [Sales Team] - For product inquiries and pricing
• [Technical Support] - For technical issues and setup
• [Customer Service] - For general questions
• [Contact Form] - For direct contact requests
• [Billing Department] - For billing and payment issues

Use this format whenever someone mentions: buy, purchase, sales, support, help, technical, contact, billing, payment, or asks to be transferred.`;
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

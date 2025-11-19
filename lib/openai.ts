import Groq from 'groq-sdk';

// Initialize Groq (FREE - Get API key at: https://console.groq.com)
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || 'dummy-key',
});

// Demo mode fallback responses
function generateDemoResponse(userMessage: string, websiteContext?: string): string {
  const message = userMessage.toLowerCase();
  
  // Common questions
  if (message.includes('price') || message.includes('cost') || message.includes('pricing')) {
    return "We offer three pricing tiers: **Basic** at $99/month (100 conversations, 1 chatbot), **Pro** at $299/month (500 conversations, 3 chatbots), and **Enterprise** with custom pricing for unlimited conversations. Which plan interests you?";
  }
  
  if (message.includes('service') || message.includes('what do you do') || message.includes('feature')) {
    return "We provide AI Chatbot Widgets that embed on your website to capture leads, provide 24/7 support, and engage visitors automatically. Our chatbots include lead capture forms, conversation analytics, and can be trained on your website content. What would you like to know more about?";
  }
  
  if (message.includes('contact') || message.includes('email') || message.includes('phone')) {
    return "You can reach us at info@aichat.fi. We're based in Finland and happy to discuss your chatbot needs. Would you like to schedule a demo?";
  }
  
  if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
    return "Hello! Thanks for your interest in our AI Chatbot Widget. We help businesses capture leads and provide 24/7 support with intelligent chatbots. What would you like to know?";
  }
  
  if (message.includes('help') || message.includes('support')) {
    return "I'm here to help! You can ask me about our chatbot features, pricing plans, integration process, or schedule a demo. What interests you most?";
  }
  
  if (message.includes('how') && message.includes('work')) {
    return "Our chatbot is easy to set up: 1) Choose your plan, 2) Customize the widget design, 3) Add one line of code to your website. The chatbot starts capturing leads immediately! Want to see a live demo?";
  }
  
  if (message.includes('integration') || message.includes('install') || message.includes('setup')) {
    return "Integration is super simple - just copy-paste one line of code into your website. The chatbot works on any platform (WordPress, Shopify, custom sites). Takes less than 5 minutes! Need help with setup?";
  }
  
  // Default response with context
  if (websiteContext) {
    return "Thanks for your question! Based on our website information, I can help you with details about our services, pricing, and contact information. Could you please be more specific about what you'd like to know?";
  }
  
  return "Thank you for your message! I'm here to help answer your questions. You can ask me about our services, pricing, or how to get in touch. What would you like to know?";
}

export async function generateChatResponse(
  userMessage: string,
  conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }>,
  websiteContext?: string
): Promise<string> {
  // Check if Groq API key is configured
  const hasValidApiKey = process.env.GROQ_API_KEY && 
                         process.env.GROQ_API_KEY !== 'dummy-key' && 
                         process.env.GROQ_API_KEY !== 'your-groq-api-key-here';

  if (!hasValidApiKey) {
    console.log('Using demo mode - no valid Groq API key configured');
    return generateDemoResponse(userMessage, websiteContext);
  }

  try {
    // Build conversation messages with specific business context
    const systemPrompt = websiteContext
      ? `You are a customer support AI assistant for this specific business website. Use ONLY the following website information to answer questions:

${websiteContext}

IMPORTANT RULES:
- Answer questions based ONLY on the website information provided above
- Be specific about THIS business's services, pricing, and contact details
- If asked about services, describe the services from the website content
- Keep responses concise (2-3 sentences max)
- If the question is not about this business, politely redirect to the website content
- Never provide generic AI assistant information about yourself`
      : `You are a customer support AI for an AI Chatbot Widget service for websites. 

OUR BUSINESS - AI CHATBOT WIDGET FOR WEBSITES:

SERVICES:
- Smart AI chatbots that can be embedded on any website
- Lead capture with email collection before chat starts
- 24/7 automated customer support
- Website content scraping to train chatbots on your business
- Real-time conversation dashboard
- Easy integration (just copy-paste a code snippet)

PRICING TIERS:
- Basic: $99/month (ideal for small businesses) - includes 100 conversations/month, 1 chatbot, basic analytics
- Pro: $299/month (ideal for growing businesses) - includes 500 conversations/month, 3 chatbots, advanced analytics
- Enterprise: Custom pricing (ideal for large enterprises) - unlimited conversations, multiple chatbots, custom features

KEY FEATURES:
- Fully customizable chat widget (colors, position, branding)
- Lead generation with automatic email capture
- Conversation history and analytics dashboard
- AI-powered responses using advanced language models
- Fast, professional, and easy to set up

CONTACT:
- Email: info@aichat.fi
- Location: Based in Finland
- Website: aichat.fi

IMPORTANT: Keep responses short (2-3 sentences max) and focused on OUR chatbot service. Never give generic AI information about yourself.`;

    const messages: Array<{ role: 'system' | 'user' | 'assistant', content: string }> = [
      { role: 'system', content: systemPrompt }
    ];
    
    conversationHistory.slice(-10).forEach((msg) => {
      messages.push({
        role: msg.role,
        content: msg.content
      });
    });
    
    messages.push({ role: 'user', content: userMessage });

    // Use Groq with Llama 3.1 (FREE, ultra-fast, high quality)
    const completion = await groq.chat.completions.create({
      messages: messages,
      model: 'llama-3.1-8b-instant',
      temperature: 0.5,
      max_tokens: 150,
    });

    const text = completion.choices[0]?.message?.content?.trim() || '';
    
    return text || generateDemoResponse(userMessage, websiteContext);
  } catch (error: any) {
    console.error('Groq API Error:', error?.message || error);
    console.log('Using demo mode fallback');
    return generateDemoResponse(userMessage, websiteContext);
  }
}

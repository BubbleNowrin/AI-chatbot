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
    return "Our pricing starts at $99/month for small businesses. We offer flexible plans based on your needs. Would you like me to connect you with our sales team for a custom quote?";
  }
  
  if (message.includes('service') || message.includes('what do you do')) {
    return "We offer Web Development, Mobile Apps, Cloud Solutions, and AI Integration services. Our team specializes in creating custom solutions tailored to your business needs. Which service are you most interested in?";
  }
  
  if (message.includes('contact') || message.includes('email') || message.includes('phone')) {
    return "You can reach us at info@techcorp.com or call (555) 123-4567. Our office is located at 123 Tech Street, San Francisco, CA 94105. We're available Monday-Friday, 9am-6pm PST.";
  }
  
  if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
    return "Hello! Thanks for reaching out. I'm here to help answer any questions about our services. What would you like to know?";
  }
  
  if (message.includes('help') || message.includes('support')) {
    return "I'm here to help! You can ask me about our services, pricing, contact information, or any other questions you have. What would you like to know more about?";
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

OUR BUSINESS:
- We provide AI Chatbot Widgets that businesses can embed on their websites
- Our chatbots help capture leads, answer customer questions, and provide 24/7 support
- Pricing starts at $99/month for small businesses
- We offer website scraping to train chatbots on your content
- Contact: info@aichat.fi

Keep responses short (2-3 sentences) and focused on OUR chatbot service. Never give generic AI information.`;

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

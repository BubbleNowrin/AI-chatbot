import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy-key',
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
  // Check if OpenAI API key is configured
  const hasValidApiKey = process.env.OPENAI_API_KEY && 
                         process.env.OPENAI_API_KEY !== 'dummy-key' && 
                         process.env.OPENAI_API_KEY !== 'your-openai-api-key-here';

  if (!hasValidApiKey) {
    console.log('Using demo mode - no valid OpenAI API key configured');
    return generateDemoResponse(userMessage, websiteContext);
  }

  try {
    const systemPrompt = websiteContext
      ? `You are a helpful AI assistant for a website. Use the following website information to answer questions accurately:

${websiteContext}

If the question is not related to the website content, politely let the user know and offer general assistance.`
      : 'You are a helpful AI assistant. Answer questions in a friendly and professional manner.';

    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory.slice(-10).map((msg) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      })),
      { role: 'user', content: userMessage },
    ];

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
      temperature: 0.7,
      max_tokens: 500,
    });

    return response.choices[0]?.message?.content || 'I apologize, but I could not generate a response.';
  } catch (error: any) {
    console.error('OpenAI API Error:', error);
    
    // Check if it's a quota/rate limit error
    if (error?.status === 429 || error?.code === 'insufficient_quota') {
      console.log('OpenAI quota exceeded - falling back to demo mode');
      return generateDemoResponse(userMessage, websiteContext);
    }
    
    // For other errors, still use fallback
    console.log('OpenAI error - using demo mode fallback');
    return generateDemoResponse(userMessage, websiteContext);
  }
}

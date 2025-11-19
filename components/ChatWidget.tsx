'use client';

import { useState, useRef, useEffect } from 'react';
import Swal from 'sweetalert2';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatWidgetProps {
  websiteUrl?: string;
  primaryColor?: string;
  position?: 'bottom-right' | 'bottom-left';
}

export default function ChatWidget({ 
  websiteUrl = '', 
  primaryColor = '#3b82f6',
  position = 'bottom-right' 
}: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => {
    // Try to get existing session ID from localStorage
    if (typeof window !== 'undefined') {
      const existingSessionId = localStorage.getItem('chatbot_session_id');
      if (existingSessionId) {
        return existingSessionId;
      }
    }
    const newSessionId = `session_${Date.now()}_${Math.random()}`;
    if (typeof window !== 'undefined') {
      localStorage.setItem('chatbot_session_id', newSessionId);
    }
    return newSessionId;
  });
  const [showLeadForm, setShowLeadForm] = useState(true);
  const [leadData, setLeadData] = useState({ name: '', email: '' });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load saved user data and messages on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedUserData = localStorage.getItem('chatbot_user_data');
      const savedMessages = localStorage.getItem(`chatbot_messages_${sessionId}`);
      
      if (savedUserData) {
        const userData = JSON.parse(savedUserData);
        setLeadData(userData);
        setShowLeadForm(false);
        
        if (savedMessages) {
          const parsedMessages = JSON.parse(savedMessages);
          // Convert timestamp strings back to Date objects
          const messagesWithDates = parsedMessages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }));
          setMessages(messagesWithDates);
        } else {
          // Show welcome message for returning users
          setMessages([
            {
              role: 'assistant',
              content: `Welcome back, ${userData.name}! How can I help you today?`,
              timestamp: new Date(),
            },
          ]);
        }
      }
    }
  }, [sessionId]);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined' && messages.length > 0 && !showLeadForm) {
      localStorage.setItem(`chatbot_messages_${sessionId}`, JSON.stringify(messages));
    }
  }, [messages, sessionId, showLeadForm]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (leadData.name && leadData.email) {
      // Save user data to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('chatbot_user_data', JSON.stringify(leadData));
      }
      
      setShowLeadForm(false);
      setMessages([
        {
          role: 'assistant',
          content: `Hi ${leadData.name}! How can I help you today?`,
          timestamp: new Date(),
        },
      ]);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: inputMessage,
          sessionId,
          name: leadData.name,
          email: leadData.email,
          websiteUrl,
        }),
      });

      const data = await response.json();

      if (data.response) {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: data.response,
            timestamp: new Date(),
          },
        ]);
      } else if (data.error) {
        // Handle error response
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: 'I apologize for the inconvenience. Please try asking your question again, or contact our support team directly.',
            timestamp: new Date(),
          },
        ]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, there was a connection error. Please try again in a moment.',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const positionClasses = position === 'bottom-right' 
    ? 'bottom-4 right-4' 
    : 'bottom-4 left-4';

  return (
    <div className={`fixed ${positionClasses} z-50`}>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-white hover:scale-110 transition-transform"
          style={{ backgroundColor: primaryColor }}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-96 h-[600px] bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div 
            className="p-4 text-white flex justify-between items-center"
            style={{ backgroundColor: primaryColor }}
          >
            <div>
              <h3 className="font-bold text-lg">Chat Support</h3>
              <p className="text-sm opacity-90">We're here to help!</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 rounded p-1 transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

            {/* Lead Form */}
          {showLeadForm && (
            <div className="flex-1 p-6 flex items-center justify-center">
              <form onSubmit={handleLeadSubmit} className="w-full space-y-4">
                <h4 className="text-xl font-bold text-gray-800 mb-4">Let's get started!</h4>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={leadData.name}
                    onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={leadData.email}
                    onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 text-white rounded-lg font-semibold hover:opacity-90 transition"
                  style={{ backgroundColor: primaryColor }}
                >
                  Start Chat
                </button>
              </form>
            </div>
          )}

          {/* Messages */}
          {!showLeadForm && (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-4 chat-scrollbar">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        msg.role === 'user'
                          ? 'text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                      style={msg.role === 'user' ? { backgroundColor: primaryColor } : {}}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg px-4 py-2">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <form onSubmit={handleSendMessage} className="p-4 border-t">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !inputMessage.trim()}
                    className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition disabled:opacity-50"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
                {/* Clear conversation button */}
                <button
                  type="button"
                  onClick={async () => {
                    const result = await Swal.fire({
                      title: 'Clear Conversation?',
                      text: 'This will delete all your chat history.',
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonColor: '#ef4444',
                      cancelButtonColor: '#6b7280',
                      confirmButtonText: 'Yes, clear it!',
                      cancelButtonText: 'Cancel'
                    });
                    
                    if (result.isConfirmed) {
                      setMessages([
                        {
                          role: 'assistant',
                          content: `Hi ${leadData.name}! How can I help you today?`,
                          timestamp: new Date(),
                        },
                      ]);
                      if (typeof window !== 'undefined') {
                        localStorage.removeItem(`chatbot_messages_${sessionId}`);
                      }
                      Swal.fire({
                        title: 'Cleared!',
                        text: 'Your conversation history has been cleared.',
                        icon: 'success',
                        timer: 2000,
                        showConfirmButton: false
                      });
                    }
                  }}
                  className="mt-2 text-xs text-gray-500 hover:text-red-600 transition"
                >
                  Clear conversation history
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
}

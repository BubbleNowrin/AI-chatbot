'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Swal from 'sweetalert2';
import {
  Send,
  Trash2,
  Download,
  Settings,
  Sparkles,
  Bot,
  User,
  Menu,
  X,
  Copy,
  Check,
  RotateCcw,
  Upload,
  FileText,
  CheckCircle
} from 'lucide-react';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

type ChatMode = 'basic' | 'memory' | 'knowledge' | 'agent';

const chatModes = [
  {
    id: 'basic' as ChatMode,
    name: 'Basic Chat',
    description: 'Simple Q&A without memory',
    color: 'from-[#32021F] to-[#4B2E39]'
  },
  {
    id: 'memory' as ChatMode,
    name: 'Memory Mode',
    description: 'Remembers conversation history',
    color: 'from-[#4B2E39] to-[#6C596E]'
  },
  {
    id: 'knowledge' as ChatMode,
    name: 'Knowledge Base',
    description: 'Trained on custom data',
    color: 'from-[#4B2E39] to-[#77A0A9]'
  },
  {
    id: 'agent' as ChatMode,
    name: 'Agent Mode',
    description: 'Routes to departments',
    color: 'from-[#32021F] to-[#6C596E]'
  }
];

export default function PlaygroundPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatMode, setChatMode] = useState<ChatMode>('basic');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Load saved conversations from localStorage
    const saved = localStorage.getItem(`playground_${chatMode}`);
    if (saved) {
      const parsed = JSON.parse(saved);
      setMessages(parsed.map((m: any) => ({
        ...m,
        timestamp: new Date(m.timestamp)
      })));
    } else {
      setMessages([]);
    }
  }, [chatMode]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/playground', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage.content,
          mode: chatMode,
          history: messages.map(m => ({ role: m.role, content: m.content }))
        })
      });

      const data = await response.json();

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response || 'Sorry, I could not process your request.',
        timestamp: new Date()
      };

      const finalMessages = [...updatedMessages, assistantMessage];
      setMessages(finalMessages);

      // Save to localStorage
      localStorage.setItem(`playground_${chatMode}`, JSON.stringify(finalMessages));
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to send message. Please try again.',
      });
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleClearChat = () => {
    Swal.fire({
      title: 'Clear conversation?',
      text: "This will delete all messages in this mode.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3b82f6',
      cancelButtonColor: '#ef4444',
      confirmButtonText: 'Yes, clear it!'
    }).then((result) => {
      if (result.isConfirmed) {
        setMessages([]);
        localStorage.removeItem(`playground_${chatMode}`);
        Swal.fire('Cleared!', 'Your conversation has been cleared.', 'success');
      }
    });
  };

  const handleExportChat = () => {
    const exportData = {
      mode: chatMode,
      exportDate: new Date().toISOString(),
      messages: messages.map(m => ({
        role: m.role,
        content: m.content,
        timestamp: m.timestamp.toISOString()
      }))
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-export-${chatMode}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    Swal.fire({
      icon: 'success',
      title: 'Exported!',
      text: 'Your conversation has been downloaded.',
      timer: 2000,
      showConfirmButton: false
    });
  };

  const handleCopyMessage = (content: string, index: number) => {
    navigator.clipboard.writeText(content);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('mode', chatMode);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setUploadedFiles(prev => [...prev, data.fileName]);
        
        // Store file content in localStorage for knowledge base
        if (data.content && typeof window !== 'undefined') {
          const knowledgeBase = JSON.parse(localStorage.getItem('knowledge_base') || '{}');
          knowledgeBase[data.fileName] = {
            content: data.content,
            fileName: data.fileName,
            fileSize: data.fileSize,
            uploadedAt: new Date().toISOString()
          };
          localStorage.setItem('knowledge_base', JSON.stringify(knowledgeBase));
        }
        
        Swal.fire({
          icon: 'success',
          title: 'File Uploaded!',
          html: `
            <div class="text-left">
              <p><strong>File:</strong> ${data.fileName}</p>
              <p><strong>Size:</strong> ${(data.fileSize / 1024).toFixed(2)} KB</p>
              <p class="mt-2 text-sm text-gray-500">The chatbot now has access to this document!</p>
            </div>
          `,
          confirmButtonColor: '#C6B677'
        });

        // Add system message about upload
        const systemMessage: Message = {
          role: 'system',
          content: `📄 Document uploaded: ${data.fileName}. The chatbot can now answer questions based on this content.`,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, systemMessage]);
      } else {
        throw new Error(data.error);
      }
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Upload Failed',
        text: error.message || 'Failed to upload file. Please try again.',
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const selectedMode = chatModes.find(m => m.id === chatMode);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Top Navigation */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-beige-light border-b border-gray-200 px-4 py-3 flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition lg:hidden"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <Link href="/" className="text-xl font-bold bg-gradient-to-r from-[#6C596E] to-[#77A0A9] bg-clip-text text-transparent">
            AI Playground
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <div className={`px-4 py-2 bg-gradient-to-r ${selectedMode?.color} text-white rounded-lg font-semibold text-sm`}>
            {selectedMode?.name}
          </div>
          <Link
            href="/portfolio"
            className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg font-semibold text-sm hover:bg-gray-200 transition"
          >
            Portfolio
          </Link>
        </div>
      </motion.header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              className="w-80 bg-beige-light border-r border-gray-200 p-6 overflow-y-auto"
            >
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-[#6C596E]" />
                  Chat Mode
                </h3>
                <div className="space-y-3">
                  {chatModes.map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => setChatMode(mode.id)}
                      className={`w-full p-4 rounded-xl text-left transition ${
                        chatMode === mode.id
                          ? `bg-gradient-to-r ${mode.color} text-white shadow-lg`
                          : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <div className="font-semibold mb-1">{mode.name}</div>
                      <div className={`text-sm ${chatMode === mode.id ? 'text-white/80' : 'text-gray-500'}`}>
                        {mode.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-bold mb-4">Actions</h3>
                <div className="space-y-2">
                  {/* File Upload for Knowledge Mode */}
                  {chatMode === 'knowledge' && (
                    <div className="mb-4">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".txt,.pdf,.csv,.md,.json"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                        className="w-full px-4 py-3 bg-gradient-to-r from-[#4B2E39] to-[#77A0A9] text-white rounded-lg font-semibold hover:shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        <Upload className="w-4 h-4" />
                        {isUploading ? 'Uploading...' : 'Upload Document'}
                      </button>
                      {uploadedFiles.length > 0 && (
                        <div className="mt-3 space-y-1">
                          <p className="text-xs font-semibold text-gray-600">Uploaded Files:</p>
                          {uploadedFiles.map((file, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs text-gray-500 bg-green-50 p-2 rounded">
                              <CheckCircle className="w-3 h-3 text-[#4B2E39]" />
                              <span className="truncate">{file}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      <p className="text-xs text-gray-500 mt-2">
                        Supports: TXT, PDF, CSV, MD, JSON (max 5MB)
                      </p>
                    </div>
                  )}

                  {/* Demo Instructions for Agent Mode */}
                  {chatMode === 'agent' && (
                    <div className="mb-4 p-3 bg-orange-50 rounded-lg border border-orange-200">
                      <h4 className="text-sm font-bold text-orange-900 mb-2 flex items-center gap-2">
                        <Bot className="w-4 h-4" />
                        Agent Mode Tips
                      </h4>
                      <ul className="text-xs text-orange-800 space-y-1">
                        <li>• Say "I want to buy" for Sales routing</li>
                        <li>• Say "I need help" for Support</li>
                        <li>• Say "contact" to reach Contact form</li>
                      </ul>
                    </div>
                  )}

                  <button
                    onClick={handleClearChat}
                    disabled={messages.length === 0}
                    className="w-full px-4 py-3 bg-red-50 text-red-600 rounded-lg font-semibold hover:bg-red-100 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear Chat
                  </button>
                  <button
                    onClick={handleExportChat}
                    disabled={messages.length === 0}
                    className="w-full px-4 py-3 bg-[#6F7D8C]/30 text-[#6C596E] rounded-lg font-semibold hover:bg-[#6F7D8C]/50 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Download className="w-4 h-4" />
                    Export Chat
                  </button>
                  <button
                    onClick={() => {
                      setMessages([]);
                      setInput('');
                    }}
                    className="w-full px-4 py-3 bg-gray-100 text-gray-600 rounded-lg font-semibold hover:bg-gray-200 transition flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    New Chat
                  </button>
                </div>
              </div>

              <div className="border-t pt-6 mt-6">
                <div className={`bg-gradient-to-br ${selectedMode?.color}/10 p-4 rounded-xl border-2 ${
                  chatMode === 'basic' ? 'border-[#32021F]' :
                  chatMode === 'memory' ? 'border-[#4B2E39]/30' :
                  chatMode === 'knowledge' ? 'border-[#6F7D8C]' :
                  'border-orange-200'
                }`}>
                  <Sparkles className={`w-8 h-8 mb-2 ${
                    chatMode === 'basic' ? 'text-[#6C596E]' :
                    chatMode === 'memory' ? 'text-[#4B2E39]' :
                    chatMode === 'knowledge' ? 'text-[#4B2E39]' :
                    'text-orange-600'
                  }`} />
                  <h4 className="font-bold text-gray-800 mb-2">{selectedMode?.name} Demo</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    {chatMode === 'basic' && 'Simple Q&A with instant responses. Great for FAQs and general inquiries.'}
                    {chatMode === 'memory' && 'Try mentioning your name or preferences - I\'ll remember them throughout the conversation!'}
                    {chatMode === 'knowledge' && 'Upload documents to train the AI. Ask questions about uploaded content for accurate answers.'}
                    {chatMode === 'agent' && 'Smart routing simulation: mention "sales", "support", or "contact" to see department routing in action.'}
                  </p>
                  {chatMode === 'knowledge' && uploadedFiles.length === 0 && (
                    <div className="mt-2 p-2 bg-yellow-50 rounded border border-yellow-200">
                      <p className="text-xs text-yellow-800 font-medium">
                        💡 Upload a document to see real knowledge base features!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Chat Area */}
        <main className="flex-1 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="h-full flex items-center justify-center"
              >
                <div className="text-center max-w-2xl">
                  <div className={`w-20 h-20 bg-gradient-to-r ${selectedMode?.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4 text-gray-800">
                    {selectedMode?.name} Playground
                  </h2>
                  <p className="text-gray-500 text-lg mb-8">
                    {selectedMode?.description}. Start a conversation to see it in action!
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                    {chatMode === 'basic' && [
                      'What services do you provide?',
                      'Tell me about pricing',
                      'How does the chatbot work?',
                      'Can you help with integration?'
                    ].map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => setInput(suggestion)}
                        className="p-4 bg-beige-light rounded-xl border-2 border-gray-200 hover:border-[#32021F] transition text-gray-600 hover:text-[#6C596E] font-medium"
                      >
                        {suggestion}
                      </button>
                    ))}
                    {chatMode === 'memory' && [
                      'Hi, my name is John',
                      'What did I tell you my name was?',
                      'I like blue color',
                      'Do you remember my favorite color?'
                    ].map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => setInput(suggestion)}
                        className="p-4 bg-beige-light rounded-xl border-2 border-[#4B2E39]/30 hover:border-[#4B2E39] transition text-gray-600 hover:text-[#4B2E39] font-medium"
                      >
                        {suggestion}
                      </button>
                    ))}
                    {chatMode === 'knowledge' && [
                      'Upload a document first →',
                      'What information do you have?',
                      'Summarize the uploaded document',
                      'Answer questions from the file'
                    ].map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          if (idx === 0 && fileInputRef.current) {
                            fileInputRef.current.click();
                          } else {
                            setInput(suggestion);
                          }
                        }}
                        className="p-4 bg-beige-light rounded-xl border-2 border-[#6F7D8C] hover:border-[#6C596E] transition text-gray-600 hover:text-[#4B2E39] font-medium"
                      >
                        {suggestion}
                      </button>
                    ))}
                    {chatMode === 'agent' && [
                      'I want to buy your service',
                      'I need technical support',
                      'How can I contact you?',
                      'Route me to sales team'
                    ].map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => setInput(suggestion)}
                        className="p-4 bg-beige-light rounded-xl border-2 border-orange-200 hover:border-orange-500 transition text-gray-600 hover:text-orange-600 font-medium"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <>
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.role === 'assistant' && (
                      <div className={`w-10 h-10 bg-gradient-to-r ${selectedMode?.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                        <Bot className="w-6 h-6 text-white" />
                      </div>
                    )}
                    
                    <div className={`max-w-3xl ${message.role === 'user' ? 'order-1' : ''}`}>
                      <div className={`p-4 rounded-2xl ${
                        message.role === 'user'
                          ? 'bg-[#6C596E] text-white'
                          : 'bg-beige-light text-gray-800 shadow-md'
                      }`}>
                        <p className="whitespace-pre-wrap">{message.content}</p>
                      </div>
                      <div className="flex items-center gap-2 mt-2 px-2">
                        <span className="text-xs text-gray-500">
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                        <button
                          onClick={() => handleCopyMessage(message.content, index)}
                          className="text-gray-500 hover:text-gray-500 transition"
                        >
                          {copiedIndex === index ? (
                            <Check className="w-4 h-4 text-[#6C596E]" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {message.role === 'user' && (
                      <div className="w-10 h-10 bg-gradient-to-r from-gray-700 to-gray-900 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-6 h-6 text-white" />
                      </div>
                    )}
                  </motion.div>
                ))}

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-4"
                  >
                    <div className={`w-10 h-10 bg-gradient-to-r ${selectedMode?.color} rounded-full flex items-center justify-center`}>
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div className="bg-beige-light p-4 rounded-2xl shadow-md">
                      <div className="flex gap-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t bg-beige-light p-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex gap-3 items-end">
                <div className="flex-1 relative">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={`Message ${selectedMode?.name}...`}
                    rows={1}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#6C596E] resize-none"
                    style={{ minHeight: '52px', maxHeight: '150px' }}
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!input.trim() || isLoading}
                  className={`px-6 py-3 bg-gradient-to-r ${selectedMode?.color} text-white rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2`}
                >
                  <Send className="w-5 h-5" />
                  Send
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Press Enter to send • Shift+Enter for new line
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface Message {
  role: string;
  content: string;
  timestamp: string;
}

interface Conversation {
  sessionId: string;
  mode: 'basic' | 'memory' | 'knowledge' | 'agent' | 'widget';
  name?: string;
  email?: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
  status: string;
  messageCount: number;
}

const chatModeColors = {
  basic: 'from-[#C6B677] to-[#DBB957]',
  memory: 'from-[#BABF95] to-[#C4AD83]',
  knowledge: 'from-[#C4AD83] to-[#DBB957]',
  agent: 'from-[#BABF95] to-[#C6B677]',
  widget: 'from-gray-500 to-gray-700'
};

const chatModeLabels = {
  basic: 'Basic Chat',
  memory: 'Memory Mode',
  knowledge: 'Knowledge Base',
  agent: 'Agent Mode',
  widget: 'Widget Chat'
};

export default function DashboardPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [filterMode, setFilterMode] = useState<string>('all');
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    const auth = sessionStorage.getItem('dashboard_auth');
    if (auth !== 'true') {
      router.push('/dashboard/login');
      return;
    }
    setIsAuthenticated(true);
    loadAllConversations();
  }, [router]);

  const loadAllConversations = () => {
    setIsLoading(true);
    try {
      if (typeof window !== 'undefined') {
        const allConversations: Conversation[] = [];

        // Load from Playground modes (basic, memory, knowledge, agent)
        const playgroundModes: Array<'basic' | 'memory' | 'knowledge' | 'agent'> = ['basic', 'memory', 'knowledge', 'agent'];
        
        playgroundModes.forEach(mode => {
          const key = `playground_${mode}`;
          const saved = localStorage.getItem(key);
          
          if (saved) {
            try {
              const messages = JSON.parse(saved);
              if (messages && messages.length > 0) {
                const conversation: Conversation = {
                  sessionId: `${mode}-${Date.now()}`,
                  mode: mode,
                  messages: messages.map((m: any) => ({
                    role: m.role,
                    content: m.content,
                    timestamp: m.timestamp
                  })),
                  createdAt: messages[0]?.timestamp || new Date().toISOString(),
                  updatedAt: messages[messages.length - 1]?.timestamp || new Date().toISOString(),
                  status: 'active',
                  messageCount: messages.length
                };
                allConversations.push(conversation);
              }
            } catch (e) {
              console.error(`Error parsing ${mode} conversation:`, e);
            }
          }
        });

        // Load from Widget (old chatbot widget)
        const userData = localStorage.getItem('chatbot_user_data');
        const sessionId = localStorage.getItem('chatbot_session_id');
        
        if (userData && sessionId) {
          const user = JSON.parse(userData);
          const messagesKey = `chatbot_messages_${sessionId}`;
          const savedMessages = localStorage.getItem(messagesKey);
          
          if (savedMessages) {
            const messages = JSON.parse(savedMessages);
            const conversation: Conversation = {
              sessionId: sessionId,
              mode: 'widget',
              name: user.name,
              email: user.email,
              messages: messages,
              createdAt: messages[0]?.timestamp || new Date().toISOString(),
              updatedAt: messages[messages.length - 1]?.timestamp || new Date().toISOString(),
              status: 'active',
              messageCount: messages.length
            };
            allConversations.push(conversation);
          }
        }

        // Sort by most recent
        allConversations.sort((a, b) => 
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );

        setConversations(allConversations);
      }
    } catch (error) {
      console.error('Error loading conversations:', error);
      setConversations([]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearConversation = async () => {
    const result = await Swal.fire({
      title: 'Clear All History?',
      text: 'This will permanently delete your conversation history. This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      reverseButtons: true
    });
    
    if (result.isConfirmed) {
      if (typeof window !== 'undefined') {
        const sessionId = localStorage.getItem('chatbot_session_id');
        if (sessionId) {
          localStorage.removeItem(`chatbot_messages_${sessionId}`);
        }
      }
      setConversations([]);
      setSelectedConversation(null);
      
      await Swal.fire({
        title: 'Deleted!',
        text: 'Your conversation history has been cleared.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('dashboard_auth');
    router.push('/dashboard/login');
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Generate chart data
  const generateChartData = () => {
    if (conversations.length === 0) return [];
    
    const messagesByHour: { [key: string]: number } = {};
    
    conversations.forEach(conv => {
      conv.messages.forEach(msg => {
        const hour = new Date(msg.timestamp).getHours();
        const key = `${hour}:00`;
        messagesByHour[key] = (messagesByHour[key] || 0) + 1;
      });
    });

    return Object.entries(messagesByHour)
      .map(([time, count]) => ({ time, messages: count }))
      .sort((a, b) => parseInt(a.time) - parseInt(b.time));
  };

  const chartData = generateChartData();
  
  // Filter conversations by mode
  const filteredConversations = filterMode === 'all' 
    ? conversations 
    : conversations.filter(c => c.mode === filterMode);
  
  // Statistics based on filtered data
  const statsData = [
    { name: 'User Messages', value: filteredConversations.reduce((acc, conv) => acc + conv.messages.filter(m => m.role === 'user').length, 0) },
    { name: 'AI Responses', value: filteredConversations.reduce((acc, conv) => acc + conv.messages.filter(m => m.role === 'assistant').length, 0) },
  ];

  // Mode distribution
  const modeDistribution = [
    { name: 'Basic', value: conversations.filter(c => c.mode === 'basic').length, color: '#BABF95' },
    { name: 'Memory', value: conversations.filter(c => c.mode === 'memory').length, color: '#C4AD83' },
    { name: 'Knowledge', value: conversations.filter(c => c.mode === 'knowledge').length, color: '#C6B677' },
    { name: 'Agent', value: conversations.filter(c => c.mode === 'agent').length, color: '#DBB957' },
    { name: 'Widget', value: conversations.filter(c => c.mode === 'widget').length, color: '#D6E681' },
  ].filter(item => item.value > 0);

  const COLORS = ['#C6B677', '#DBB957'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D6E681]/10 via-[#BABF95]/10 to-[#C4AD83]/10">
      {/* Header */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg"
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#C6B677] to-[#DBB957] bg-clip-text text-transparent">
                Analytics Dashboard
              </h1>
              <p className="text-gray-600 mt-1">Track your conversations and engagement</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-[#C4AD83]/20 text-[#C6B677] rounded-lg hover:bg-[#C4AD83]/30 transition-colors font-medium"
              >
                🔓 Logout
              </button>
              <Link 
                href="/"
                className="px-6 py-3 bg-gradient-to-r from-[#C6B677] to-[#DBB957] text-white rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-8">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Top Section - Conversations */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar - Conversations List */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Conversations</h2>
                <button
                  onClick={loadAllConversations}
                  className="p-2 text-[#C6B677] hover:bg-[#D6E681]/20 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>

              {/* Info Banner */}
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-4 p-4 bg-gradient-to-r from-[#D6E681]/30 to-[#BABF95]/30 border border-[#BABF95] rounded-lg"
              >
                <p className="text-sm text-[#C6B677] flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Your conversation data is private
                </p>
              </motion.div>

              {/* Mode Filter Buttons */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Filter by Type:</h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setFilterMode('all')}
                    className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
                      filterMode === 'all'
                        ? 'bg-gradient-to-r from-[#C6B677] to-[#DBB957] text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    All ({conversations.length})
                  </button>
                  {conversations.filter(c => c.mode === 'basic').length > 0 && (
                    <button
                      onClick={() => setFilterMode('basic')}
                      className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
                        filterMode === 'basic'
                          ? 'bg-gradient-to-r from-[#BABF95] to-[#C4AD83] text-white shadow-md'
                          : 'bg-[#BABF95]/20 text-[#C4AD83] hover:bg-[#BABF95]/30'
                      }`}
                    >
                      Basic ({conversations.filter(c => c.mode === 'basic').length})
                    </button>
                  )}
                  {conversations.filter(c => c.mode === 'memory').length > 0 && (
                    <button
                      onClick={() => setFilterMode('memory')}
                      className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
                        filterMode === 'memory'
                          ? 'bg-gradient-to-r from-[#C4AD83] to-[#C6B677] text-white shadow-md'
                          : 'bg-[#C4AD83]/20 text-[#C6B677] hover:bg-[#C4AD83]/30'
                      }`}
                    >
                      Memory ({conversations.filter(c => c.mode === 'memory').length})
                    </button>
                  )}
                  {conversations.filter(c => c.mode === 'knowledge').length > 0 && (
                    <button
                      onClick={() => setFilterMode('knowledge')}
                      className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
                        filterMode === 'knowledge'
                          ? 'bg-gradient-to-r from-[#C4AD83] to-[#DBB957] text-white shadow-md'
                          : 'bg-[#D6E681]/30 text-[#C4AD83] hover:bg-[#D6E681]/50'
                      }`}
                    >
                      Knowledge ({conversations.filter(c => c.mode === 'knowledge').length})
                    </button>
                  )}
                  {conversations.filter(c => c.mode === 'agent').length > 0 && (
                    <button
                      onClick={() => setFilterMode('agent')}
                      className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
                        filterMode === 'agent'
                          ? 'bg-gradient-to-r from-[#BABF95] to-[#C6B677] text-white shadow-md'
                          : 'bg-[#BABF95]/30 text-[#C4AD83] hover:bg-[#BABF95]/50'
                      }`}
                    >
                      Agent ({conversations.filter(c => c.mode === 'agent').length})
                    </button>
                  )}
                  {conversations.filter(c => c.mode === 'widget').length > 0 && (
                    <button
                      onClick={() => setFilterMode('widget')}
                      className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
                        filterMode === 'widget'
                          ? 'bg-gradient-to-r from-[#D6E681] to-[#BABF95] text-white shadow-md'
                          : 'bg-[#D6E681]/20 text-[#BABF95] hover:bg-[#D6E681]/30'
                      }`}
                    >
                      Widget ({conversations.filter(c => c.mode === 'widget').length})
                    </button>
                  )}
                </div>
              </div>

              {/* Conversations List */}
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {isLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="text-gray-500 mt-4">Loading conversations...</p>
                  </div>
                ) : filteredConversations.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-8"
                  >
                    <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                      <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <p className="text-gray-700 font-semibold mb-2">
                      {filterMode === 'all' ? 'No conversations yet' : `No ${chatModeLabels[filterMode as keyof typeof chatModeLabels]} conversations`}
                    </p>
                    <p className="text-sm text-gray-500">
                      {filterMode === 'all' ? 'Start chatting in the Playground!' : 'Try a different filter or start a new conversation'}
                    </p>
                  </motion.div>
                ) : (
                  filteredConversations.map((conv, index) => (
                    <motion.button
                      key={conv.sessionId}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedConversation(conv)}
                      className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                        selectedConversation?.sessionId === conv.sessionId
                          ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-500 shadow-md'
                          : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="font-semibold text-gray-900">
                            {conv.name || `${chatModeLabels[conv.mode]} Session`}
                          </div>
                          <span className={`inline-block mt-1 px-2 py-1 text-xs rounded-full font-medium bg-gradient-to-r ${chatModeColors[conv.mode]} text-white`}>
                            {chatModeLabels[conv.mode]}
                          </span>
                        </div>
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-[#C4AD83] font-medium">
                          Active
                        </span>
                      </div>
                      {conv.email && (
                        <div className="text-sm text-gray-600 mb-2">{conv.email}</div>
                      )}
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                          </svg>
                          {conv.messages.length} messages
                        </span>
                        <span>{formatDate(conv.updatedAt)}</span>
                      </div>
                    </motion.button>
                  ))
                )}
              </div>

              {/* Clear Data Button */}
              {conversations.length > 0 && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={clearConversation}
                  className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-red-50 to-red-100 text-red-600 rounded-xl hover:from-red-100 hover:to-red-200 transition-all duration-300 font-semibold shadow-sm hover:shadow-md"
                >
                  🗑️ Clear History
                </motion.button>
              )}
            </div>
          </motion.div>

          {/* Main Content - Conversation Detail */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            {/* Conversation Detail */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 h-[700px] flex flex-col overflow-hidden">
              {selectedConversation ? (
                <>
                  {/* Conversation Header */}
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border-b p-6 bg-gradient-to-r from-[#D6E681]/20 to-[#BABF95]/20"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C6B677] to-[#DBB957] flex items-center justify-center text-white font-bold text-lg mr-4">
                          {selectedConversation.name ? selectedConversation.name.charAt(0).toUpperCase() : selectedConversation.mode.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-gray-900">
                            {selectedConversation.name || `${chatModeLabels[selectedConversation.mode]} Session`}
                          </h2>
                          {selectedConversation.email && (
                            <p className="text-gray-600 text-sm">{selectedConversation.email}</p>
                          )}
                          <span className={`inline-block mt-1 px-2 py-1 text-xs rounded-full font-medium bg-gradient-to-r ${chatModeColors[selectedConversation.mode]} text-white`}>
                            {chatModeLabels[selectedConversation.mode]}
                          </span>
                          <div className="mt-1 flex items-center text-xs text-gray-500">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Started: {formatDate(selectedConversation.createdAt)}
                          </div>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-[#C4AD83] rounded-full text-sm font-medium">
                        Active
                      </span>
                    </div>
                  </motion.div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
                    {selectedConversation.messages.map((msg, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className={`flex ${
                          msg.role === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`max-w-[70%] rounded-2xl p-4 shadow-sm ${
                            msg.role === 'user'
                              ? 'bg-gradient-to-br from-[#C6B677] to-[#DBB957] text-white'
                              : 'bg-white text-gray-900 border border-gray-200'
                          }`}
                        >
                          <div className="font-semibold mb-1 text-sm opacity-90">
                            {msg.role === 'user' ? (selectedConversation.name || 'User') : '🤖 AI Assistant'}
                          </div>
                          <div className="leading-relaxed">{msg.content}</div>
                          <div
                            className={`text-xs mt-2 ${
                              msg.role === 'user' ? 'text-white/80' : 'text-gray-500'
                            }`}
                          >
                            {formatDate(msg.timestamp)}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-[#D6E681]/10">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                  >
                    <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[#BABF95]/30 to-[#C4AD83]/30 rounded-full flex items-center justify-center">
                      <svg
                        className="w-12 h-12 text-[#C6B677]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                    </div>
                    <p className="text-xl font-semibold text-gray-700 mb-2">Select a Conversation</p>
                    <p className="text-gray-500">Choose a conversation from the list to view details</p>
                  </motion.div>
                </div>
              )}
            </div>
          </motion.div>
          </div>

          {/* Bottom Section - Statistics & Charts */}
          {conversations.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Stats Card */}
              <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h3 className="font-bold text-lg mb-4 text-gray-900">Quick Statistics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-[#D6E681]/30 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-[#BABF95] rounded-lg flex items-center justify-center mr-3">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                        </svg>
                      </div>
                      <span className="text-gray-700 font-medium text-sm">Conversations</span>
                    </div>
                    <span className="text-2xl font-bold text-[#BABF95]">{conversations.length}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-[#C4AD83]/30 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-[#C6B677] rounded-lg flex items-center justify-center mr-3">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                      </div>
                      <span className="text-gray-700 font-medium text-sm">Total Messages</span>
                    </div>
                    <span className="text-2xl font-bold text-[#C6B677]">
                      {conversations.reduce((acc, conv) => acc + conv.messages.length, 0)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-[#D6E681]/30 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-[#DBB957] rounded-lg flex items-center justify-center mr-3">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="text-gray-700 font-medium text-sm">Avg. Messages</span>
                    </div>
                    <span className="text-2xl font-bold text-[#DBB957]">
                      {conversations.length > 0 ? Math.round(conversations.reduce((acc, conv) => acc + conv.messages.length, 0) / conversations.length) : 0}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Message Activity Chart */}
              <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Message Activity</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="time" stroke="#6b7280" fontSize={12} />
                    <YAxis stroke="#6b7280" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#fff', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Bar dataKey="messages" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#C6B677" />
                        <stop offset="100%" stopColor="#DBB957" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>

              {/* Chatbot Type Distribution */}
              <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Chatbot Types</h3>
                {modeDistribution.length > 0 ? (
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={modeDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${percent ? (percent * 100).toFixed(0) : 0}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {modeDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-[250px] flex items-center justify-center text-gray-500">
                    No data available
                  </div>
                )}
              </motion.div>

              {/* Message Distribution (User vs AI) */}
              <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">User vs AI Messages</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={statsData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${percent ? (percent * 100).toFixed(0) : 0}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {statsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

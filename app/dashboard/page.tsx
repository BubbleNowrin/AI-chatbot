'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Message {
  role: string;
  content: string;
  timestamp: string;
}

interface Conversation {
  _id: string;
  sessionId: string;
  name: string;
  email: string;
  websiteUrl?: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
  status: string;
}

export default function DashboardPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'active' | 'closed'>('all');

  useEffect(() => {
    fetchConversations();
  }, [filter]);

  const fetchConversations = async () => {
    setIsLoading(true);
    try {
      const params = filter !== 'all' ? `?status=${filter}` : '';
      const response = await fetch(`/api/conversations${params}`);
      const data = await response.json();
      setConversations(data.conversations || []);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Manage conversations and leads</p>
            </div>
            <Link 
              href="/"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar - Conversations List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Conversations</h2>
                <button
                  onClick={fetchConversations}
                  className="text-blue-600 hover:text-blue-700"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>

              {/* Filter Tabs */}
              <div className="flex space-x-2 mb-4">
                <button
                  onClick={() => setFilter('all')}
                  className={`flex-1 px-3 py-1 rounded ${
                    filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter('active')}
                  className={`flex-1 px-3 py-1 rounded ${
                    filter === 'active' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  Active
                </button>
                <button
                  onClick={() => setFilter('closed')}
                  className={`flex-1 px-3 py-1 rounded ${
                    filter === 'closed' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  Closed
                </button>
              </div>

              {/* Conversations List */}
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {isLoading ? (
                  <div className="text-center py-8 text-gray-500">Loading...</div>
                ) : conversations.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No conversations yet
                  </div>
                ) : (
                  conversations.map((conv) => (
                    <button
                      key={conv._id}
                      onClick={() => setSelectedConversation(conv)}
                      className={`w-full text-left p-3 rounded-lg transition ${
                        selectedConversation?._id === conv._id
                          ? 'bg-blue-50 border-2 border-blue-600'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div className="font-semibold text-gray-900">{conv.name}</div>
                      <div className="text-sm text-gray-600">{conv.email}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {conv.messages.length} messages • {formatDate(conv.updatedAt)}
                      </div>
                      <span
                        className={`inline-block mt-1 px-2 py-0.5 text-xs rounded ${
                          conv.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {conv.status}
                      </span>
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-lg shadow p-4 mt-6">
              <h3 className="font-bold mb-3">Statistics</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Leads:</span>
                  <span className="font-bold">{conversations.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Chats:</span>
                  <span className="font-bold">
                    {conversations.filter((c) => c.status === 'active').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Messages:</span>
                  <span className="font-bold">
                    {conversations.reduce((acc, conv) => acc + conv.messages.length, 0)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Conversation Detail */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow h-[800px] flex flex-col">
              {selectedConversation ? (
                <>
                  {/* Conversation Header */}
                  <div className="border-b p-6">
                    <h2 className="text-xl font-bold text-gray-900">
                      {selectedConversation.name}
                    </h2>
                    <p className="text-gray-600">{selectedConversation.email}</p>
                    {selectedConversation.websiteUrl && (
                      <p className="text-sm text-gray-500 mt-1">
                        Website: {selectedConversation.websiteUrl}
                      </p>
                    )}
                    <div className="mt-2">
                      <span className="text-sm text-gray-500">
                        Started: {formatDate(selectedConversation.createdAt)}
                      </span>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {selectedConversation.messages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex ${
                          msg.role === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg p-4 ${
                            msg.role === 'user'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <div className="font-semibold mb-1 text-sm">
                            {msg.role === 'user' ? selectedConversation.name : 'AI Assistant'}
                          </div>
                          <div>{msg.content}</div>
                          <div
                            className={`text-xs mt-2 ${
                              msg.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                            }`}
                          >
                            {formatDate(msg.timestamp)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <svg
                      className="w-16 h-16 mx-auto mb-4 text-gray-400"
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
                    <p className="text-lg">Select a conversation to view details</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

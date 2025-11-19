'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { 
  MessageSquare, 
  Brain, 
  BookOpen, 
  Users, 
  ArrowRight,
  Sparkles,
  Database,
  Network,
  Zap
} from 'lucide-react';

const chatbotTypes = [
  {
    id: 'widget',
    title: 'Widget Chatbot',
    icon: MessageSquare,
    color: 'from-brand-purple to-brand-teal',
    description: 'Floating chat widget for your website - easy to embed',
    features: [
      'One-line embed code',
      'Customizable appearance',
      'Lead capture form',
      'Dashboard analytics',
      'Works on any website'
    ],
    pricing: '$49/month',
    bestFor: 'Any website, blogs, portfolios, small business sites',
    demoType: 'widget'
  },
  {
    id: 'basic',
    title: 'Basic Chatbot',
    icon: MessageSquare,
    color: 'from-[#32021F] to-[#4B2E39]',
    description: 'Simple Q&A chatbot for straightforward customer interactions',
    features: [
      'Instant responses to common questions',
      'Pre-defined conversation flows',
      'Basic lead capture',
      'Quick setup (24 hours)',
      'Perfect for FAQs'
    ],
    pricing: '$99/month',
    bestFor: 'Small businesses, landing pages, simple websites',
    demoType: 'basic'
  },
  {
    id: 'memory',
    title: 'Memory-Based Chatbot',
    icon: Brain,
    color: 'from-[#4B2E39] to-[#6C596E]',
    description: 'Remembers past conversations for personalized experiences',
    features: [
      'Conversation history tracking',
      'Personalized responses based on past chats',
      'User preference learning',
      'Context-aware discussions',
      'Follow-up question handling'
    ],
    pricing: '$199/month',
    bestFor: 'E-commerce, SaaS platforms, returning customers',
    demoType: 'memory'
  },
  {
    id: 'knowledge',
    title: 'Knowledge Base Chatbot',
    icon: BookOpen,
    color: 'from-[#4B2E39] to-[#77A0A9]',
    description: 'AI trained on your documentation, products, and content',
    features: [
      'Custom training on your data',
      'PDF, CSV, TXT file uploads',
      'Website content scraping',
      'Accurate product recommendations',
      'Technical support automation'
    ],
    pricing: '$299/month',
    bestFor: 'SaaS products, e-learning, technical support',
    demoType: 'knowledge'
  },
  {
    id: 'agent',
    title: 'Agent Mode Chatbot',
    icon: Network,
    color: 'from-[#32021F] to-[#6C596E]',
    description: 'Intelligent routing to different departments and live agents',
    features: [
      'Smart intent detection',
      'Route to Sales, Support, or Contact',
      'Live agent handoff',
      'Department-specific responses',
      'Escalation workflows'
    ],
    pricing: '$499/month',
    bestFor: 'Enterprise, multiple departments, complex workflows',
    demoType: 'agent'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

export default function PortfolioPage() {
  const [selectedDemo, setSelectedDemo] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-beige to-[#6F7D8C]/20">
      {/* Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-beige-light shadow-sm sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-[#6C596E] to-[#77A0A9] bg-clip-text text-transparent">
              AI Chatbot Widget
            </Link>
            <nav className="flex gap-6">
              <Link href="/" className="text-gray-500 hover:text-[#6C596E] transition">Home</Link>
              <Link href="/portfolio" className="text-[#6C596E] font-semibold">Portfolio</Link>
              <Link href="/playground" className="text-gray-500 hover:text-[#6C596E] transition">Playground</Link>
              <Link href="/dashboard/login" className="text-gray-500 hover:text-[#6C596E] transition">Dashboard</Link>
            </nav>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="inline-block mb-4"
          >
            <Sparkles className="w-16 h-16 text-yellow-500" />
          </motion.div>
          
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Our <span className="bg-gradient-to-r from-[#6C596E] to-[#77A0A9] bg-clip-text text-transparent">Chatbot Portfolio</span>
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-500 max-w-3xl mx-auto mb-8"
          >
            Choose from 5 different chatbot types for your business. From website widgets to advanced AI agents with intelligent routing.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <Link 
              href="/playground"
              className="px-8 py-3 bg-gradient-to-r from-[#6C596E] to-[#77A0A9] text-white rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition flex items-center gap-2"
            >
              <Zap className="w-5 h-5" />
              Try Playground
            </Link>
            <Link 
              href="/dashboard/login"
              className="px-8 py-3 bg-beige-light text-gray-700 rounded-lg font-semibold border-2 border-gray-200 hover:border-[#6C596E] hover:shadow-lg transform hover:-translate-y-1 transition"
            >
              View Analytics
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Chatbot Types Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {chatbotTypes.map((bot) => {
              const Icon = bot.icon;
              return (
                <motion.div
                  key={bot.id}
                  variants={cardVariants}
                  whileHover={{ scale: 1.02 }}
                  className="bg-beige-light rounded-2xl shadow-xl overflow-hidden"
                >
                  {/* Card Header */}
                  <div className={`bg-gradient-to-r ${bot.color} p-6 text-white`}>
                    <Icon className="w-12 h-12 mb-4" />
                    <h3 className="text-2xl font-bold mb-2">{bot.title}</h3>
                    <p className="text-white/90">{bot.description}</p>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <Database className="w-5 h-5 text-[#6C596E]" />
                        Key Features
                      </h4>
                      <ul className="space-y-2">
                        {bot.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-500">
                            <span className="text-[#6C596E] mt-1">✓</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="border-t pt-4 mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-500">Starting at</span>
                        <span className="text-3xl font-bold text-gray-800">{bot.pricing}</span>
                      </div>
                      <p className="text-sm text-gray-500">
                        <strong>Best for:</strong> {bot.bestFor}
                      </p>
                    </div>

                    <button
                      onClick={() => setSelectedDemo(bot.id)}
                      className={`w-full py-3 bg-gradient-to-r ${bot.color} text-white rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition flex items-center justify-center gap-2`}
                    >
                      Try Live Demo
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-16 px-4 bg-beige-light">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Choose Your Perfect Match</h2>
            <p className="text-xl text-gray-500">Compare features and find what fits your needs</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="overflow-x-auto"
          >
            <table className="w-full border-collapse bg-beige-light rounded-xl shadow-lg overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-[#6C596E] to-[#77A0A9] text-white">
                  <th className="p-4 text-left">Feature</th>
                  <th className="p-4 text-center">Widget</th>
                  <th className="p-4 text-center">Basic</th>
                  <th className="p-4 text-center">Memory</th>
                  <th className="p-4 text-center">Knowledge</th>
                  <th className="p-4 text-center">Agent</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Response Time', widget: '<1s', basic: '<1s', memory: '<2s', knowledge: '<3s', agent: '<2s' },
                  { feature: 'Website Widget', widget: '✅', basic: '✅', memory: '✅', knowledge: '✅', agent: '✅' },
                  { feature: 'Conversation Memory', widget: '❌', basic: '❌', memory: '✅', knowledge: '✅', agent: '✅' },
                  { feature: 'Custom Training', widget: '❌', basic: '❌', memory: '❌', knowledge: '✅', agent: '✅' },
                  { feature: 'Department Routing', widget: '❌', basic: '❌', memory: '❌', knowledge: '❌', agent: '✅' },
                  { feature: 'Lead Capture', widget: '✅', basic: '✅', memory: '✅', knowledge: '✅', agent: '✅' },
                  { feature: 'Analytics', widget: 'Basic', basic: 'Basic', memory: 'Advanced', knowledge: 'Advanced', agent: 'Enterprise' },
                  { feature: 'Setup Time', widget: '1hr', basic: '24hrs', memory: '48hrs', knowledge: '1 week', agent: '2 weeks' },
                ].map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-beige-light'}>
                    <td className="p-4 font-semibold text-gray-800">{row.feature}</td>
                    <td className="p-4 text-center text-gray-500">{row.widget}</td>
                    <td className="p-4 text-center text-gray-500">{row.basic}</td>
                    <td className="p-4 text-center text-gray-500">{row.memory}</td>
                    <td className="p-4 text-center text-gray-500">{row.knowledge}</td>
                    <td className="p-4 text-center text-gray-500">{row.agent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-[#6C596E] to-[#77A0A9] rounded-2xl p-12 text-center text-white shadow-2xl"
          >
            <Users className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8 text-white/90">
              Not sure which chatbot is right for you? Try our Playground or schedule a free consultation!
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="/playground"
                className="px-8 py-4 bg-beige-light text-[#6C596E] rounded-lg font-semibold hover:shadow-xl transform hover:-translate-y-1 transition"
              >
                Explore Playground
              </Link>
              <a
                href="mailto:info@aichat.fi"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-beige-light hover:text-[#6C596E] transform hover:-translate-y-1 transition"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Demo Modal (placeholder for future implementation) */}
      {selectedDemo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedDemo(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-beige-light rounded-2xl p-8 max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold mb-4">
              {chatbotTypes.find(b => b.id === selectedDemo)?.title} Demo
            </h3>
            <p className="text-gray-500 mb-6">
              This demo will be integrated with specialized features for {selectedDemo} mode.
              For now, visit the <Link href="/playground" className="text-[#6C596E] underline">Playground</Link> to test all features!
            </p>
            <div className="flex gap-4">
              <Link
                href="/playground"
                className="flex-1 py-3 bg-gradient-to-r from-[#6C596E] to-[#77A0A9] text-white rounded-lg font-semibold text-center hover:shadow-lg transition"
              >
                Go to Playground
              </Link>
              <button
                onClick={() => setSelectedDemo(null)}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

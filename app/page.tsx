import Link from 'next/link';
import ChatWidget from '@/components/ChatWidget';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-beige-light to-beige">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-beige-light/90 backdrop-blur-md z-50 border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-purple to-brand-teal rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-brand-purple to-brand-teal text-transparent bg-clip-text">
              AiChat.fi
            </span>
          </div>
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/portfolio" className="text-gray-700 hover:text-brand-teal transition font-medium">Portfolio</Link>
            <Link href="/playground" className="text-gray-700 hover:text-brand-teal transition font-medium">Playground</Link>
            <a href="#pricing" className="text-gray-700 hover:text-brand-teal transition">Pricing</a>
            <Link 
              href="/dashboard/login" 
              className="px-6 py-2 bg-gradient-to-r from-brand-purple to-brand-teal text-white rounded-lg hover:shadow-lg transition"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-brand-purple/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-brand-teal/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-brand-gray/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="inline-block mb-4 px-4 py-2 bg-brand-teal/20 rounded-full border border-brand-purple animate-bounce-slow">
                <span className="text-sm font-semibold text-brand-teal">
                  🇫🇮 Made in Finland
                </span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-800">
                Transform Your Website with
                <span className="block bg-gradient-to-r from-brand-purple via-brand-teal to-brand-gray text-transparent bg-clip-text">
                  AI Chatbot Solutions
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Choose from <strong>5 intelligent chatbot types</strong>: Website Widget, Basic Q&A, Memory-Based, Knowledge Base, or Agent Mode with smart routing. 
                Built in Helsinki, converting visitors into customers 24/7 across Finland and beyond.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/portfolio"
                  className="group px-8 py-4 bg-gradient-to-r from-brand-purple to-brand-teal text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all text-center transform hover:-translate-y-1 duration-300"
                >
                  <span className="flex items-center justify-center gap-2">
                    View Portfolio
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
                <Link 
                  href="/playground"
                  className="group px-8 py-4 border-2 border-[#6C596E] text-[#4B2E39] rounded-xl font-semibold hover:bg-[#6F7D8C]/20 transition text-center hover:shadow-lg transform hover:-translate-y-1 duration-300"
                >
                  Try Playground
                </Link>
              </div>
              <div className="mt-12 flex items-center gap-8 text-sm text-gray-600">
                <div className="flex items-center gap-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <svg className="w-5 h-5 text-[#6C596E]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>5-minute setup</span>
                </div>
                <div className="flex items-center gap-2 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                  <svg className="w-5 h-5 text-[#6C596E]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>No coding needed</span>
                </div>
                <div className="flex items-center gap-2 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                  <svg className="w-5 h-5 text-[#6C596E]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>24/7 support</span>
                </div>
              </div>
            </div>
            <div className="relative animate-fade-in-right">
              <div className="relative z-10 bg-gradient-to-br from-[#6F7D8C]/20 to-[#32021F]/20 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-shadow duration-500">
                <div className="bg-beige-light rounded-2xl shadow-xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
                  <div className="bg-gradient-to-r from-[#6C596E] to-[#77A0A9] p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex gap-3 animate-slide-in-left">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#6C596E] to-[#77A0A9] rounded-full flex-shrink-0"></div>
                      <div className="flex-1 bg-gray-100 rounded-2xl rounded-tl-none p-4">
                        <p className="text-sm text-gray-700">Hi! How can I help you today? 👋</p>
                      </div>
                    </div>
                    <div className="flex gap-3 justify-end animate-slide-in-right" style={{ animationDelay: '0.3s' }}>
                      <div className="flex-1 bg-gradient-to-r from-[#6C596E] to-[#77A0A9] rounded-2xl rounded-tr-none p-4 max-w-[80%]">
                        <p className="text-sm text-white">What are your business hours?</p>
                      </div>
                    </div>
                    {/* Typing indicator */}
                    <div className="flex gap-3 animate-slide-in-left" style={{ animationDelay: '0.5s' }}>
                      <div className="w-10 h-10 bg-gradient-to-br from-[#6C596E] to-[#77A0A9] rounded-full flex-shrink-0 animate-pulse"></div>
                      <div className="flex items-center bg-gray-100 rounded-2xl rounded-tl-none px-5 py-3">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3 animate-slide-in-left" style={{ animationDelay: '0.9s' }}>
                      <div className="w-10 h-10 bg-gradient-to-br from-[#6C596E] to-[#77A0A9] rounded-full flex-shrink-0"></div>
                      <div className="flex-1 bg-gray-100 rounded-2xl rounded-tl-none p-4">
                        <p className="text-sm text-gray-700">We're available 24/7 through our AI assistant! For human support, reach us Mon-Fri, 9am-6pm EET. 🕒</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 w-72 h-72 bg-[#32021F] rounded-full opacity-20 blur-3xl animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-72 h-72 bg-[#77A0A9] rounded-full opacity-20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Demo Section */}
      <section id="demo" className="py-20 px-6 bg-gradient-to-b from-beige-light via-[#6F7D8C]/10 to-beige relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-10 right-10 w-96 h-96 bg-[#32021F]/30 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#4B2E39]/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="inline-block mb-4 px-6 py-2 bg-gradient-to-r from-[#6F7D8C]/30 to-[#77A0A9]/30 rounded-full border-2 border-[#6C596E] animate-pulse-slow">
              <span className="text-sm font-bold bg-gradient-to-r from-[#4B2E39] to-[#77A0A9] text-transparent bg-clip-text">
                🎯 LIVE DEMO - Click the chat icon below →
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-800">
              Try It Right Now
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience our AI chatbot in action! Click the floating chat button in the bottom-right corner 
              to start a conversation. See how it captures leads and answers questions instantly.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-beige-light rounded-2xl p-8 shadow-xl border-2 border-[#32021F] hover:border-[#6C596E] transition-all duration-300 animate-scale-in">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#6C596E] to-[#77A0A9] rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Interactive Chat</h3>
                  <p className="text-sm text-gray-500">Real AI responses</p>
                </div>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#6C596E] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Test real conversations with AI</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#6C596E] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>See how lead capture works</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#6C596E] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Experience the user interface</span>
                </li>
              </ul>
            </div>

            <div className="bg-beige-light rounded-2xl p-8 shadow-xl border-2 border-[#32021F] hover:border-[#4B2E39] transition-all duration-300 animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#32021F] to-[#4B2E39] rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Try These Questions</h3>
                  <p className="text-sm text-gray-500">Get instant answers</p>
                </div>
              </div>
              <ul className="space-y-3">
                <li className="bg-gradient-to-r from-[#6F7D8C]/20 to-[#32021F]/20 rounded-lg p-3 border border-[#6C596E] hover:border-[#77A0A9] transition cursor-pointer">
                  <span className="text-gray-700 font-medium">"What are your services?"</span>
                </li>
                <li className="bg-gradient-to-r from-[#6F7D8C]/20 to-[#32021F]/20 rounded-lg p-3 border border-[#6C596E] hover:border-[#77A0A9] transition cursor-pointer">
                  <span className="text-gray-700 font-medium">"How much does it cost?"</span>
                </li>
                <li className="bg-gradient-to-r from-[#6F7D8C]/20 to-[#32021F]/20 rounded-lg p-3 border border-[#6C596E] hover:border-[#77A0A9] transition cursor-pointer">
                  <span className="text-gray-700 font-medium">"How can I contact you?"</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#6F7D8C]/40 to-[#77A0A9]/40 border-2 border-[#6C596E] rounded-2xl shadow-lg animate-bounce-slow">
              <svg className="w-8 h-8 text-[#6C596E] animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z" />
              </svg>
              <span className="text-lg font-bold text-gray-700">
                Look for the chat icon in the bottom-right corner! 
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-to-b from-beige to-beige-dark px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Why Choose Our AI Solution?</h2>
            <p className="text-xl text-gray-600">Finnish quality meets artificial intelligence</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-beige-light rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-2 animate-fade-in-up">
              <div className="w-14 h-14 bg-gradient-to-br from-[#6C596E] to-[#77A0A9] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Instant Responses</h3>
              <p className="text-gray-600 leading-relaxed">
                Your customers get immediate answers, day or night. No more waiting for email replies or business hours.
              </p>
            </div>
            
            <div className="group bg-beige-light rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-2 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-14 h-14 bg-gradient-to-br from-[#32021F] to-[#4B2E39] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Lead Generation</h3>
              <p className="text-gray-600 leading-relaxed">
                Automatically capture visitor information and qualify leads while they engage with your content.
              </p>
            </div>
            
            <div className="group bg-beige-light rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-2 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="w-14 h-14 bg-gradient-to-br from-[#4B2E39] to-[#77A0A9] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Smart Analytics</h3>
              <p className="text-gray-600 leading-relaxed">
                Track conversations, understand customer needs, and optimize your business strategy with real data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-beige-light via-[#6F7D8C]/10 to-beige -z-10"></div>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">How It Works</h2>
            <p className="text-xl text-gray-600">Get started in three simple steps</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative animate-scale-in">
              <div className="bg-gradient-to-br from-[#6F7D8C]/30 to-[#32021F]/30 rounded-2xl p-8 h-full border-2 border-[#32021F] hover:border-[#6C596E] transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2">
                <div className="w-12 h-12 bg-gradient-to-br from-[#6C596E] to-[#77A0A9] rounded-full flex items-center justify-center mb-6 text-white font-bold text-xl shadow-lg animate-bounce-slow">
                  1
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-800">Tell Us About Your Business</h3>
                <p className="text-gray-600 leading-relaxed">
                  Share your website, services, and what makes your business unique. Our AI learns your brand voice.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                <svg className="w-8 h-8 text-[#6C596E] animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
            
            <div className="relative animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="bg-gradient-to-br from-[#32021F]/30 to-[#4B2E39]/30 rounded-2xl p-8 h-full border-2 border-[#4B2E39] hover:border-[#6C596E] transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2">
                <div className="w-12 h-12 bg-gradient-to-br from-[#4B2E39] to-[#6C596E] rounded-full flex items-center justify-center mb-6 text-white font-bold text-xl shadow-lg animate-bounce-slow" style={{ animationDelay: '0.2s' }}>
                  2
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-800">We Build Your AI Assistant</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our team configures and trains your chatbot to perfectly represent your brand and answer customer questions.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                <svg className="w-8 h-8 text-[#4B2E39] animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-[#4B2E39]/30 to-[#77A0A9]/30 rounded-2xl p-8 h-full border-2 border-[#77A0A9] hover:border-[#6C596E] transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 animate-scale-in" style={{ animationDelay: '0.4s' }}>
              <div className="w-12 h-12 bg-gradient-to-br from-[#6C596E] to-[#77A0A9] rounded-full flex items-center justify-center mb-6 text-white font-bold text-xl shadow-lg animate-bounce-slow" style={{ animationDelay: '0.4s' }}>
                3
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Go Live & Grow</h3>
              <p className="text-gray-600 leading-relaxed">
                Add one line of code to your site and watch as your AI assistant starts converting visitors into customers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gradient-to-b from-beige to-beige-dark px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Choose Your Chatbot Type</h2>
            <p className="text-xl text-gray-600">5 different solutions for different needs - all transparently priced</p>
          </div>
          
          {/* First Row: Widget + Basic + Memory */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-8">
            {/* Widget Chatbot */}
            <div className="bg-beige-light rounded-2xl p-8 shadow-lg border-2 border-gray-300 hover:border-[#32021F] transition-all hover:-translate-y-2">
              <div className="w-12 h-12 bg-gradient-to-r from-brand-purple to-brand-teal rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2">Widget Chat</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">$49</span>
                <span className="text-gray-500">/month</span>
              </div>
              <p className="text-sm text-gray-500 mb-6">Floating chat widget for websites</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#6C596E] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">500 messages/month</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#6C596E] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Easy embed code</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#6C596E] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Lead capture</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#6C596E] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Dashboard access</span>
                </li>
              </ul>
              <a href="#demo" className="block w-full py-3 text-center border-2 border-[#6C596E] text-[#4B2E39] rounded-xl font-semibold hover:bg-[#6F7D8C]/20 transition">
                Try Now
              </a>
            </div>

            {/* Basic Chatbot */}
            <div className="bg-beige-light rounded-2xl p-8 shadow-lg border-2 border-[#32021F] hover:border-[#6C596E] transition-all hover:-translate-y-2">
              <div className="w-12 h-12 bg-gradient-to-r from-[#6C596E] to-[#77A0A9] rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2">Basic Chatbot</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">$99</span>
                <span className="text-gray-500">/month</span>
              </div>
              <p className="text-sm text-gray-500 mb-6">Simple Q&A for straightforward needs</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#6C596E] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">1,000 messages/month</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#6C596E] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Lead capture form</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#6C596E] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Basic analytics</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#6C596E] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Email support</span>
                </li>
              </ul>
              <a href="/portfolio" className="block w-full py-3 text-center bg-gradient-to-r from-brand-purple to-brand-teal text-white rounded-xl font-semibold hover:shadow-xl transition">
                Learn More
              </a>
            </div>

            {/* Memory-Based Chatbot */}
            <div className="bg-beige-light rounded-2xl p-8 shadow-lg border-2 border-[#4B2E39] hover:border-[#77A0A9] transition-all hover:-translate-y-2">
              <div className="w-12 h-12 bg-gradient-to-r from-[#32021F] to-[#4B2E39] rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2">Memory Mode</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">$199</span>
                <span className="text-gray-500">/month</span>
              </div>
              <p className="text-sm text-gray-500 mb-6">Remembers conversations & learns</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#6C596E] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">5,000 messages/month</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#6C596E] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Conversation memory</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#6C596E] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Personalized responses</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#6C596E] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Advanced analytics</span>
                </li>
              </ul>
              <a href="/portfolio" className="block w-full py-3 text-center border-2 border-[#32021F] text-[#4B2E39] rounded-xl font-semibold hover:bg-[#6F7D8C]/20 transition">
                Learn More
              </a>
            </div>
          </div>

          {/* Second Row: Knowledge Base + Agent (centered) */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Knowledge Base */}
            <div className="bg-gradient-to-br from-[#6C596E] to-[#77A0A9] rounded-2xl p-8 shadow-2xl relative border-2 border-[#77A0A9] hover:-translate-y-2 transition-all">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#6F7D8C] to-[#32021F] text-white px-4 py-1 rounded-full text-sm font-bold">
                RECOMMENDED
              </div>
              <div className="w-12 h-12 bg-beige-light/20 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white">Knowledge Base</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">$299</span>
                <span className="text-white/80">/month</span>
              </div>
              <p className="text-sm text-white/90 mb-6">Trained on your custom data & docs</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white">10,000 messages/month</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white">Custom data training</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white">File uploads (PDF/CSV)</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white">Priority support</span>
                </li>
              </ul>
              <a href="/portfolio" className="block w-full py-3 text-center bg-gradient-to-r from-brand-teal to-brand-purple text-white rounded-xl font-semibold hover:shadow-xl transition">
                Learn More
              </a>
            </div>

            {/* Agent Mode */}
            <div className="bg-beige-light rounded-2xl p-8 shadow-lg border-2 border-[#32021F] hover:border-[#4B2E39] transition-all hover:-translate-y-2">
              <div className="w-12 h-12 bg-gradient-to-r from-[#32021F] to-[#6C596E] rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2">Agent Mode</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">$499</span>
                <span className="text-gray-500">/month</span>
              </div>
              <p className="text-sm text-gray-500 mb-6">Smart routing to departments & agents</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#6C596E] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">25,000 messages/month</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#6C596E] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Department routing</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#6C596E] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Live agent handoff</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#6C596E] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Dedicated support</span>
                </li>
              </ul>
              <a href="/portfolio" className="block w-full py-3 text-center border-2 border-[#32021F] text-[#4B2E39] rounded-xl font-semibold hover:bg-[#6F7D8C]/20 transition">
                Learn More
              </a>
            </div>
          </div>

          {/* Enterprise Option */}
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-[#4B2E39] to-[#6C596E] rounded-2xl p-8 shadow-2xl text-center text-white">
              <h3 className="text-3xl font-bold mb-4">Enterprise Solutions</h3>
              <p className="text-xl text-white/90 mb-6">
                Need unlimited messages, custom integrations, or white-label solutions? Let's talk.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <a href="mailto:info@aichat.fi" className="px-8 py-3 bg-gradient-to-r from-brand-teal to-brand-purple text-white rounded-xl font-semibold hover:shadow-xl transition">
                  Contact Sales
                </a>
                <a href="/playground" className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-xl font-semibold hover:bg-beige-light hover:text-[#4B2E39] transition">
                  Try Playground
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

     

      {/* Footer */}
      <footer className="bg-gradient-to-b from-[#4B2E39] to-[#6C596E] text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-[#77A0A9] to-beige rounded-lg"></div>
                <span className="text-xl font-bold">AiChat.fi</span>
              </div>
              <p className="text-white/80 text-sm">
                Professional AI chatbot solutions for Finnish businesses.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-white/80 text-sm">
                <li><a href="#services" className="hover:text-[#77A0A9] transition">Features</a></li>
                <li><a href="#pricing" className="hover:text-[#77A0A9] transition">Pricing</a></li>
                <li><a href="#demo" className="hover:text-[#77A0A9] transition">Live Demo</a></li>
                <li><Link href="/dashboard/login" className="hover:text-[#77A0A9] transition">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-white/80 text-sm">
                <li><a href="#" className="hover:text-[#77A0A9] transition">About Us</a></li>
                <li><a href="#" className="hover:text-[#77A0A9] transition">Contact</a></li>
                <li><a href="#" className="hover:text-[#77A0A9] transition">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-white/80 text-sm">
                <li>📍 Helsinki, Finland</li>
                <li>📧 hello@aichat.fi</li>
                <li>☎️ +358 XX XXX XXXX</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center text-white/80 text-sm">
            <p>© 2025 AiChat.fi. Made with ❤️ in Finland. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Live Chat Widget */}
      <ChatWidget 
        websiteUrl="https://aichat.fi"
        primaryColor="#6C596E"
        position="bottom-right"
      />
    </div>
  );
}

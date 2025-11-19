import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
          AI Chatbot Widget
        </h1>
        <p className="text-xl text-gray-600 text-center mb-8">
          Embeddable AI chat for your website
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">For Clients</h2>
            <p className="mb-4">Add AI chat to your website in minutes</p>
            <Link 
              href="/demo" 
              className="inline-block bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              View Demo
            </Link>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">Dashboard</h2>
            <p className="mb-4">Manage conversations and leads</p>
            <Link 
              href="/dashboard" 
              className="inline-block bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-purple-50 transition"
            >
              Open Dashboard
            </Link>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-4">Quick Start</h3>
          <div className="space-y-3 text-sm text-gray-700">
            <div>
              <span className="font-semibold">1. Install dependencies:</span>
              <code className="block bg-gray-800 text-white p-2 rounded mt-1">npm install</code>
            </div>
            <div>
              <span className="font-semibold">2. Configure environment:</span>
              <code className="block bg-gray-800 text-white p-2 rounded mt-1">cp .env.example .env</code>
            </div>
            <div>
              <span className="font-semibold">3. Add your OpenAI API key and MongoDB URI to .env</span>
            </div>
            <div>
              <span className="font-semibold">4. Run development server:</span>
              <code className="block bg-gray-800 text-white p-2 rounded mt-1">npm run dev</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

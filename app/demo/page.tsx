import ChatWidget from '@/components/ChatWidget';

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-beige to-blue-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-4">
            AI Chatbot Demo
          </h1>
          <p className="text-xl text-gray-500 text-center mb-12">
            Try out the chat widget in action!
          </p>

          <div className="bg-beige-light rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">Sample Website Content</h2>
            <div className="prose max-w-none">
              <h3>Welcome to TechCorp</h3>
              <p>
                We are a leading technology company specializing in innovative software solutions. 
                Our mission is to empower businesses with cutting-edge technology.
              </p>
              
              <h3>Our Services</h3>
              <ul>
                <li><strong>Web Development:</strong> Custom websites and web applications</li>
                <li><strong>Mobile Apps:</strong> iOS and Android app development</li>
                <li><strong>Cloud Solutions:</strong> Scalable cloud infrastructure</li>
                <li><strong>AI Integration:</strong> Machine learning and AI solutions</li>
              </ul>

              <h3>Pricing</h3>
              <p>
                We offer flexible pricing plans starting at $99/month for small businesses. 
                Enterprise solutions are available with custom pricing based on your needs.
              </p>

              <h3>Contact Us</h3>
              <p>
                Email: info@techcorp.com<br />
                Phone: (555) 123-4567<br />
                Address: 123 Tech Street, San Francisco, CA 94105
              </p>
            </div>
          </div>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
            <h3 className="text-lg font-bold text-blue-900 mb-2">
              💡 Try the Chat Widget
            </h3>
            <p className="text-blue-800">
              Click the blue chat button in the bottom right corner to start a conversation. 
              The AI will answer questions based on the content above!
            </p>
          </div>
        </div>
      </div>

      {/* Chat Widget */}
      <ChatWidget 
        websiteUrl="https://demo.techcorp.com"
        primaryColor="#3b82f6"
        position="bottom-right"
      />
    </div>
  );
}

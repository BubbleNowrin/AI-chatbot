# 🤖 AI Chatbot Widget for Websites

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Groq](https://img.shields.io/badge/Groq-AI-orange)](https://groq.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A production-ready, embeddable AI chatbot widget that businesses can install on their websites. Features intelligent lead capture, real-time analytics, browser-based conversation persistence, and blazing-fast AI responses powered by Groq.

**Perfect for:** SaaS products, e-commerce stores, business websites, landing pages, and client projects.

---

## ✨ Key Features

### 🎯 **Lead Generation**
- **Smart Lead Capture** - Collects visitor name and email before conversation starts
- **Persistent Sessions** - User data saved in browser, no re-entry needed
- **Privacy-First** - All conversations stored locally in browser localStorage

### 🤖 **AI-Powered Conversations**
- **Groq Integration** - Ultra-fast AI responses (10x faster than OpenAI)
- **Context-Aware** - Understands your business from homepage content
- **Intelligent Fallback** - Demo mode with smart responses if no API key

### 📊 **Analytics Dashboard**
- **Beautiful UI** - Animated charts with Recharts and Framer Motion
- **Real-Time Stats** - Message counts, activity charts, distribution graphs
- **Conversation History** - View all messages with timestamps
- **Protected Access** - Simple login system (demo: admin/demo123)

### 🎨 **Fully Customizable**
- **Widget Design** - Custom colors, positioning, branding
- **Responsive** - Works perfectly on mobile and desktop
- **Animations** - Smooth transitions and loading states
- **Professional UI** - Modern gradients and micro-interactions

### 🔧 **Developer-Friendly**
- **TypeScript** - Full type safety throughout
- **Next.js 14** - Modern React with App Router
- **Easy Deploy** - Ready for Vercel, Netlify, or any hosting
- **Clean Code** - Well-structured, commented, maintainable

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- MongoDB database (local or Atlas)
- Groq API key (free at [console.groq.com](https://console.groq.com))

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/ai-chatbot.git
cd ai-chatbot
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file:
```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-chatbot

# Groq API Key (FREE - Get at: https://console.groq.com)
GROQ_API_KEY=gsk_your-api-key-here

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. **Run development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 📖 Setup Guides

### Get Free Groq API Key (2 minutes)

1. Visit: **https://console.groq.com**
2. Sign up (free, no credit card required)
3. Create API Key
4. Copy to `.env` as `GROQ_API_KEY`

**Why Groq?**
- ✅ 100% FREE with generous limits (30 requests/min, 14,400/day)
- ✅ Blazing fast (10x faster than OpenAI)
- ✅ High quality (uses Meta's Llama 3.1)
- ✅ Reliable and production-ready

### MongoDB Setup

**Option A: MongoDB Atlas (Recommended - Free)**
1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster (M0)
3. Create database user
4. Whitelist IP (0.0.0.0/0 for development)
5. Get connection string → Add to `.env`

**Option B: Local MongoDB**
```bash
# Install MongoDB Community Edition
brew install mongodb-community  # macOS
# or download from mongodb.com

# Start MongoDB
brew services start mongodb-community
```

---

## 🎯 How to Use

### Test the Demo

1. **Homepage** - See the live widget in action (bottom-right corner)
2. **Dashboard** - Visit `/dashboard/login` (credentials: `admin` / `demo123`)
3. **Features** - Check pricing, services, and how-it-works sections

### Test Conversations

Try asking the chatbot:
- "What services do you provide?"
- "What's the pricing?"
- "How does it work?"
- "How do I contact you?"

The AI knows all about the business from the system prompt!

---

## 🏗️ Project Structure

```
ai-chatbot/
├── app/
│   ├── api/
│   │   ├── chat/route.ts              # AI chat endpoint (Groq)
│   │   ├── conversations/route.ts     # Get conversations
│   │   └── scrape/route.ts            # Website content scraper
│   ├── dashboard/
│   │   ├── login/page.tsx             # Dashboard login page
│   │   └── page.tsx                   # Analytics dashboard
│   ├── page.tsx                       # Homepage with live widget
│   ├── layout.tsx                     # Root layout
│   └── globals.css                    # Global styles + animations
├── components/
│   └── ChatWidget.tsx                 # Main chat widget component
├── lib/
│   ├── models/
│   │   ├── Conversation.ts            # MongoDB conversation schema
│   │   └── WebsiteContent.ts          # MongoDB website content schema
│   ├── mongodb.ts                     # Database connection
│   ├── openai.ts                      # AI logic (Groq integration)
│   └── scraper.ts                     # Website content scraper
├── public/
│   └── widget.js                      # Embeddable widget script
├── .env                               # Environment variables
├── .env.example                       # Environment template
├── GROQ_SETUP.md                      # Groq API setup guide
└── README.md                          # This file
```

---

## 🎨 Tech Stack

| Technology | Purpose | Why? |
|------------|---------|------|
| **Next.js 14** | React Framework | App Router, SSR, API routes |
| **TypeScript** | Language | Type safety, better DX |
| **Tailwind CSS** | Styling | Rapid UI development |
| **Groq SDK** | AI API | Ultra-fast, free, reliable |
| **MongoDB** | Database | Flexible document storage |
| **Framer Motion** | Animations | Smooth transitions |
| **Recharts** | Charts | Beautiful data visualization |
| **SweetAlert2** | Alerts | Professional modals |
| **Cheerio** | Web Scraping | Extract website content |

---

## 🔌 API Endpoints

### `POST /api/chat`
Send message and get AI response

**Request:**
```json
{
  "message": "What are your services?",
  "sessionId": "session_abc123",
  "name": "John Doe",
  "email": "john@example.com",
  "websiteUrl": "https://example.com"
}
```

**Response:**
```json
{
  "response": "We provide AI Chatbot Widgets...",
  "sessionId": "session_abc123"
}
```

### `GET /api/conversations`
Get all conversations (optional status filter)

```
GET /api/conversations?status=active
```

### `POST /api/scrape`
Scrape website content for AI context

**Request:**
```json
{
  "websiteUrl": "https://example.com"
}
```

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import repository
4. Add environment variables:
   - `MONGODB_URI`
   - `GROQ_API_KEY`
   - `NEXT_PUBLIC_APP_URL`
5. Deploy! 🎉

### Other Platforms

Works on any platform supporting Node.js:
- Netlify
- Railway
- Render
- DigitalOcean App Platform
- AWS Amplify

---

## 🎨 Customization

### Change Widget Appearance

Edit `components/ChatWidget.tsx`:
```typescript
// Change colors
primaryColor="#3b82f6"  // Blue
position="bottom-right"  // Position

// Modify styles in JSX
className="bg-gradient-to-r from-blue-600 to-purple-600"
```

### Update Business Info

Edit `lib/openai.ts` system prompt:
```typescript
const systemPrompt = `You are a customer support AI for...
SERVICES:
- Your service 1
- Your service 2

PRICING:
- Basic: $99/month
- Pro: $299/month
...`
```

### Customize Homepage

Edit `app/page.tsx` to match your brand:
- Update services, pricing, features
- Change colors, fonts, images
- Modify copy and CTAs

---

## 💼 Business Use Cases

### 1. **Sell as SaaS**
Price it at $99-$499/month per website. Target:
- Local businesses (restaurants, salons, gyms)
- E-commerce stores (Shopify, WooCommerce)
- Service providers (lawyers, consultants)

### 2. **White-Label Solution**
License to agencies and resellers for $1,000-$5,000

### 3. **Client Projects**
Add to client websites as premium feature (+$500-$2,000)

### 4. **Lead Generation Tool**
Sell to marketing agencies for landing pages

---

## 🔐 Security Notes

### Current Setup (Demo)
- Dashboard login: `admin` / `demo123`
- Session-based auth (browser sessionStorage)
- Conversations stored in browser localStorage

### Production Recommendations
1. **Add Real Authentication**
   - NextAuth.js with GitHub/Google
   - Clerk (easiest)
   - Custom JWT with backend
   
2. **Move to Server Storage**
   - Store conversations in MongoDB
   - User-specific access control
   - Admin panel for all conversations

3. **Rate Limiting**
   - Add API rate limits
   - Prevent abuse
   - Monitor Groq usage

---

## 📊 Features Roadmap

- [ ] Multi-language support (i18n)
- [ ] Voice messages
- [ ] File upload support
- [ ] Sentiment analysis
- [ ] Email notifications
- [ ] Zapier integration
- [ ] WordPress plugin
- [ ] Shopify app
- [ ] Mobile SDK (React Native)
- [ ] A/B testing

---

## 🐛 Troubleshooting

### Widget not responding?
- Check Groq API key in `.env`
- Verify MongoDB connection
- Check browser console for errors

### MongoDB connection failed?
- Verify `MONGODB_URI` format
- Check IP whitelist in Atlas
- Ensure database user has permissions

### Groq API errors?
- Free tier: 30 requests/min limit
- Check API key is valid
- Visit [console.groq.com](https://console.groq.com) for status

---

## 📄 License

MIT License - Free for personal and commercial use!

---

## 🙏 Credits

Built with modern web technologies:
- [Next.js](https://nextjs.org/) - React framework
- [Groq](https://groq.com/) - Lightning-fast AI inference
- [MongoDB](https://www.mongodb.com/) - Database
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations

---

## 🚀 Ready to Launch?

1. ✅ Clone and install
2. ✅ Set up Groq API key (free)
3. ✅ Configure MongoDB
4. ✅ Customize for your brand
5. ✅ Deploy to Vercel
6. ✅ Start selling! 💰

**Questions?** Check the code comments or open an issue!

**Love this project?** Star it on GitHub! ⭐

---

**Made with ❤️ for developers and entrepreneurs looking to build their own AI chatbot business.**

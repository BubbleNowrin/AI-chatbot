# AI Chatbot Widget for Websites

A complete embeddable AI chatbot solution for websites with lead capture, conversation management, and an admin dashboard.

## Features

✨ **Embeddable Chat Widget** - Easy-to-install JavaScript widget  
🤖 **AI-Powered Responses** - Uses OpenAI GPT-3.5 for intelligent conversations  
📊 **Lead Capture** - Collects visitor name and email before chatting  
📱 **Responsive Design** - Works beautifully on desktop and mobile  
💼 **Admin Dashboard** - View all conversations and leads in one place  
🎨 **Customizable** - Configure colors and position  
🌐 **Website Context** - AI answers based on your website content  

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **MongoDB** - Database for conversations and leads
- **OpenAI API** - AI chat completions
- **Cheerio** - Website content scraping

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Create a `.env` file in the root directory:

```env
# MongoDB Connection (Local or Atlas)
MONGODB_URI=mongodb://localhost:27017/ai-chatbot

# OpenAI API Key
OPENAI_API_KEY=sk-your-openai-api-key-here

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Admin Password (optional)
ADMIN_PASSWORD=your-secure-password
```

### 3. Set Up MongoDB

**Option A: Local MongoDB**
```bash
# Install MongoDB Community Edition
# Start MongoDB service
mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Create free account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string and add to `.env`

### 4. Get OpenAI API Key

1. Go to [platform.openai.com](https://platform.openai.com/)
2. Create an account or sign in
3. Navigate to API Keys section
4. Create a new API key
5. Add to `.env` file

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### For Development/Testing

1. **View Demo**: Go to `/demo` to see the widget in action
2. **Dashboard**: Go to `/dashboard` to view conversations
3. **Home Page**: Root `/` has setup instructions

### For Production

#### Install Widget on Your Website

Add this code to your website's HTML (before closing `</body>` tag):

```html
<script>
  window.AI_CHATBOT_CONFIG = {
    apiUrl: 'https://your-chatbot-domain.com',
    websiteUrl: 'https://your-website.com',
    primaryColor: '#3b82f6',
    position: 'bottom-right'
  };
</script>
<script src="https://your-chatbot-domain.com/widget.js" async></script>
```

#### Configuration Options

- `apiUrl`: Your deployed chatbot server URL
- `websiteUrl`: Your website URL (for context)
- `primaryColor`: Hex color code for widget theme
- `position`: `'bottom-right'` or `'bottom-left'`

## Project Structure

```
ai-chatbot-widget/
├── app/
│   ├── api/
│   │   ├── chat/route.ts          # Chat API endpoint
│   │   ├── conversations/route.ts  # Conversations API
│   │   └── scrape/route.ts        # Website scraping API
│   ├── dashboard/page.tsx         # Admin dashboard
│   ├── demo/page.tsx              # Demo page
│   ├── widget-embed/page.tsx      # Widget embed page
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Home page
│   └── globals.css                # Global styles
├── components/
│   └── ChatWidget.tsx             # Main chat widget component
├── lib/
│   ├── models/
│   │   ├── Conversation.ts        # Conversation schema
│   │   └── WebsiteContent.ts      # Website content schema
│   ├── mongodb.ts                 # MongoDB connection
│   ├── openai.ts                  # OpenAI integration
│   └── scraper.ts                 # Website scraper
├── public/
│   └── widget.js                  # Embeddable widget script
├── .env.example                   # Environment template
└── package.json
```

## API Endpoints

### POST `/api/chat`
Send a message and get AI response

```json
{
  "message": "What are your services?",
  "sessionId": "session_123",
  "name": "John Doe",
  "email": "john@example.com",
  "websiteUrl": "https://example.com"
}
```

### GET `/api/conversations`
Get all conversations (with optional status filter)

```
/api/conversations?status=active
```

### POST `/api/scrape`
Scrape website content for AI context

```json
{
  "websiteUrl": "https://example.com"
}
```

## Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

### Deploy to Other Platforms

Compatible with:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify
- Any Node.js hosting

## Customization

### Change Widget Appearance

Edit `components/ChatWidget.tsx`:
- Modify colors, fonts, sizing
- Add custom branding
- Change animations

### Modify AI Behavior

Edit `lib/openai.ts`:
- Adjust system prompts
- Change model (gpt-4, etc.)
- Modify temperature/max_tokens

### Add Authentication

The dashboard currently has no auth. Add authentication:
- NextAuth.js
- Clerk
- Auth0
- Custom JWT implementation

## Business Model

### Pricing Ideas

- **Starter**: $29/month - 1,000 messages
- **Professional**: $99/month - 10,000 messages
- **Enterprise**: Custom pricing - Unlimited

### Sell It To

1. **Local Businesses** - Restaurants, shops, services
2. **E-commerce Sites** - Product recommendations
3. **SaaS Companies** - Customer support automation
4. **Agencies** - White-label solution
5. **Consultants** - Lead generation tool

## Advanced Features (TODO)

- [ ] Multi-language support
- [ ] Voice messages
- [ ] File upload support
- [ ] Sentiment analysis
- [ ] Auto-responses/canned replies
- [ ] Integration with CRM systems
- [ ] Analytics and reporting
- [ ] A/B testing for responses
- [ ] Mobile apps (React Native)
- [ ] WordPress plugin

## Troubleshooting

### MongoDB Connection Issues
- Check MongoDB is running: `mongod --version`
- Verify connection string in `.env`
- Check firewall/network settings

### OpenAI API Errors
- Verify API key is correct
- Check account has credits
- Monitor rate limits

### Widget Not Loading
- Check CORS settings in `next.config.js`
- Verify `widget.js` is accessible
- Check browser console for errors

## Support

For issues or questions:
- Check the code comments
- Review error logs in terminal
- Test API endpoints with Postman
- Check MongoDB data with MongoDB Compass

## License

MIT License - Feel free to use for commercial projects!

## Credits

Built with ❤️ using:
- Next.js
- OpenAI
- MongoDB
- Tailwind CSS

---

**Ready to launch your AI chatbot business? Start selling this to clients today! 🚀**

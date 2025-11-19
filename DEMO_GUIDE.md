# 🎯 Playground Demo Guide - All Chatbot Types

## Overview
The Playground now provides **real, working demos** for all 4 chatbot types with unique features for each mode.

---

## 🤖 1. Basic Chatbot ($99/month)

### What It Demonstrates:
- Simple Q&A functionality
- Instant responses
- Company information queries
- No conversation memory

### How to Test:
1. Select "Basic Chat" mode
2. Try these questions:
   - "What services do you provide?"
   - "Tell me about pricing"
   - "How does the chatbot work?"
   - "Can you help with integration?"

### Expected Behavior:
- ✅ Quick, direct answers
- ✅ Provides pricing info ($99, $199, $299, $499)
- ✅ Explains company services
- ❌ Does NOT remember previous messages
- ❌ No context from earlier in conversation

### Use Cases:
- FAQ pages
- Landing pages
- Simple informational websites
- Small businesses

---

## 🧠 2. Memory-Based Chatbot ($199/month)

### What It Demonstrates:
- Conversation history tracking
- Context awareness
- Personalized responses
- References to previous messages

### How to Test:
1. Select "Memory Mode"
2. Try this conversation flow:
   ```
   You: "Hi, my name is John"
   Bot: [Remembers your name]
   
   You: "What did I tell you my name was?"
   Bot: [Recalls: "You told me your name is John"]
   
   You: "I like blue color"
   Bot: [Notes your preference]
   
   You: "Do you remember my favorite color?"
   Bot: [Recalls: "Yes, you mentioned you like blue"]
   ```

### Expected Behavior:
- ✅ References your name throughout conversation
- ✅ Recalls preferences mentioned earlier
- ✅ Builds context over multiple messages
- ✅ Personalizes responses based on history
- ✅ "As you mentioned earlier..." type responses

### Use Cases:
- E-commerce (remembers cart, preferences)
- SaaS platforms (ongoing customer relationships)
- Support systems (context across sessions)
- Returning customer interactions

---

## 📚 3. Knowledge Base Chatbot ($299/month)

### What It Demonstrates:
- **REAL FILE UPLOAD** functionality
- Custom document training
- Content-based answers
- Data extraction from uploaded files

### How to Test:

#### Step 1: Upload a Document
1. Select "Knowledge Base" mode
2. Click "Upload Document" button (green, in sidebar)
3. Upload any file:
   - `.txt` - Plain text documents
   - `.csv` - Data tables
   - `.md` - Markdown files
   - `.json` - Structured data
   - `.pdf` - Documents (shows metadata)
4. See upload confirmation with file details

#### Step 2: Ask Questions
After uploading, try:
- "What information do you have?"
- "Summarize the uploaded document"
- "What does the file contain?"
- "Tell me about [specific topic from file]"

### Expected Behavior:
- ✅ Accepts file uploads (max 5MB)
- ✅ Shows uploaded file list
- ✅ Adds system message confirming upload
- ✅ AI acknowledges document in responses
- ✅ Can reference "trained data"
- ✅ Files saved to `/uploads/knowledge/` folder

### File Upload Features:
- **Supported formats**: TXT, PDF, CSV, MD, JSON
- **Max size**: 5MB per file
- **Preview**: Shows first 500 characters
- **Storage**: Persisted on server
- **Multiple files**: Can upload multiple documents

### Use Cases:
- Technical documentation support
- Product catalog questions
- Policy/procedure inquiries
- Custom knowledge repositories
- Training manuals

---

## 🎯 4. Agent Mode Chatbot ($499/month)

### What It Demonstrates:
- Intent detection
- Smart department routing
- Conditional responses
- Escalation workflows

### How to Test:

#### Trigger Sales Routing:
```
You: "I want to buy your service"
Bot: "I'll connect you with our Sales team..."
```

#### Trigger Support Routing:
```
You: "I need technical support"
Bot: "Let me transfer you to our Support department..."
```

#### Trigger Contact Routing:
```
You: "How can I contact you?"
Bot: "This requires our Contact team's attention..."
```

#### General Inquiry:
```
You: "What are your services?"
Bot: [Answers, then offers routing if needed]
```

### Expected Behavior:
- ✅ Detects keywords: "buy", "sales", "purchase" → Sales
- ✅ Detects keywords: "help", "support", "issue" → Support
- ✅ Detects keywords: "contact", "reach", "email" → Contact
- ✅ Suggests appropriate department
- ✅ Explains routing logic
- ✅ Still answers general questions

### Routing Keywords:

| Intent | Keywords | Route To |
|--------|----------|----------|
| Sales | buy, purchase, pricing, plan, subscribe | Sales Team |
| Support | help, issue, problem, error, bug | Support Dept |
| Contact | contact, reach, email, phone | Contact Form |

### Use Cases:
- Enterprise companies
- Multi-department organizations
- Complex customer journeys
- Escalation workflows
- Live agent handoff systems

---

## 🎨 Visual Indicators

Each mode has unique colors:
- **Basic**: Blue gradient
- **Memory**: Purple gradient
- **Knowledge**: Green gradient (with upload button)
- **Agent**: Orange gradient (with routing tips)

---

## 💾 Data Persistence

### localStorage (Browser):
- Conversations saved per mode
- Persists across page reloads
- Key format: `playground_${chatMode}`
- Can export to JSON

### Server Storage:
- Knowledge Base uploads saved to `/uploads/knowledge/`
- Files persist across sessions
- Accessible to AI for context

---

## 🔧 Technical Features

### For All Modes:
- ✅ Real-time chat interface
- ✅ Typing indicators
- ✅ Message copying
- ✅ Conversation export
- ✅ Clear/reset functionality
- ✅ Keyboard shortcuts (Enter/Shift+Enter)
- ✅ Responsive design
- ✅ Mobile-friendly

### Mode-Specific:
- **Memory**: Last 5 messages sent to API for context
- **Knowledge**: File upload with validation & preview
- **Agent**: Intent detection in system prompt

---

## 🎯 Demonstration Script for Sales

### For Potential Customers:

**1. Start with Basic Mode** (2 minutes)
- Show simple Q&A
- Demonstrate instant responses
- Perfect for small businesses

**2. Switch to Memory Mode** (3 minutes)
- Have conversation with name/preferences
- Show context retention
- Ask callback questions to prove memory

**3. Show Knowledge Base** (4 minutes)
- Upload a sample product catalog
- Upload company FAQ document
- Ask questions about uploaded content
- Demonstrate custom training

**4. End with Agent Mode** (3 minutes)
- Trigger different department routes
- Show intelligent intent detection
- Explain enterprise workflows

**Total Demo**: 12 minutes

---

## 📊 Comparison for Customers

| Feature | Basic | Memory | Knowledge | Agent |
|---------|-------|--------|-----------|-------|
| Price | $99/mo | $199/mo | $299/mo | $499/mo |
| Messages | 1,000 | 5,000 | 10,000 | 25,000 |
| Memory | ❌ | ✅ | ✅ | ✅ |
| File Upload | ❌ | ❌ | ✅ | ✅ |
| Routing | ❌ | ❌ | ❌ | ✅ |
| Best For | FAQs | E-commerce | Support | Enterprise |

---

## 🐛 Testing Checklist

### Basic Mode:
- [ ] Loads with blue theme
- [ ] Responds to service questions
- [ ] Provides pricing info
- [ ] Does NOT remember context

### Memory Mode:
- [ ] Loads with purple theme
- [ ] Remembers user's name
- [ ] Recalls previous messages
- [ ] References conversation history

### Knowledge Base:
- [ ] Loads with green theme
- [ ] Shows upload button
- [ ] Accepts TXT/CSV/MD/JSON files
- [ ] Rejects files > 5MB
- [ ] Shows uploaded file list
- [ ] AI acknowledges documents

### Agent Mode:
- [ ] Loads with orange theme
- [ ] Shows routing tips in sidebar
- [ ] Detects "sales" intent
- [ ] Detects "support" intent
- [ ] Detects "contact" intent
- [ ] Suggests appropriate routing

---

## 🚀 Production Considerations

### For Real Deployment:

**Knowledge Base Enhancements:**
- [ ] Add PDF text extraction (pdf-parse library)
- [ ] Implement vector database (Pinecone/Weaviate)
- [ ] RAG (Retrieval Augmented Generation)
- [ ] Semantic search across documents
- [ ] Document versioning

**Agent Mode Enhancements:**
- [ ] Real CRM integration
- [ ] Live agent API (Intercom/Zendesk)
- [ ] Webhook triggers
- [ ] Email notifications
- [ ] Slack/Teams integration

**Security:**
- [ ] File upload virus scanning
- [ ] Rate limiting on uploads
- [ ] User authentication for uploads
- [ ] File size monitoring
- [ ] Storage cleanup jobs

---

## 📝 Customer Questions & Answers

**Q: "Is this a real demo or just a mockup?"**
A: Real! The Knowledge Base actually accepts and stores files. Memory mode truly tracks conversation history. All features are functional.

**Q: "Can I upload my own documents to test?"**
A: Yes! Upload any TXT, CSV, MD, or JSON file (max 5MB) in Knowledge Base mode.

**Q: "Does Agent Mode actually route to real agents?"**
A: The demo shows routing *suggestions*. In production, this connects to your CRM/support system.

**Q: "How do I choose which chatbot type I need?"**
A: 
- Small business with FAQs → Basic
- E-commerce with returning customers → Memory
- Technical support/documentation → Knowledge Base
- Enterprise with departments → Agent Mode

---

## 🎉 Success Metrics

After using the Playground, customers should understand:
1. ✅ Clear differences between chatbot types
2. ✅ Pricing matches features (value proposition)
3. ✅ Real, working functionality (not vaporware)
4. ✅ Easy to test and evaluate
5. ✅ Specific use cases for their business

---

**Built with:** Next.js 14, TypeScript, Groq AI, Real file uploads, localStorage persistence

**Ready for:** Sales demos, customer testing, live presentations, portfolio showcase

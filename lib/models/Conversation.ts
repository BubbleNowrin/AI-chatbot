import mongoose, { Schema, models } from 'mongoose';

export interface IConversation {
  _id?: string;
  sessionId: string;
  name: string;
  email: string;
  websiteUrl?: string;
  messages: Array<{
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
  status: 'active' | 'closed';
}

const ConversationSchema = new Schema<IConversation>(
  {
    sessionId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    websiteUrl: { type: String },
    messages: [
      {
        role: { type: String, enum: ['user', 'assistant'], required: true },
        content: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
      },
    ],
    status: { type: String, enum: ['active', 'closed'], default: 'active' },
  },
  {
    timestamps: true,
  }
);

export const Conversation = models.Conversation || mongoose.model<IConversation>('Conversation', ConversationSchema);

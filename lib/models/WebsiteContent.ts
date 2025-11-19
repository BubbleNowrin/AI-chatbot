import mongoose, { Schema, models } from 'mongoose';

export interface IWebsiteContent {
  _id?: string;
  websiteUrl: string;
  content: string;
  title?: string;
  description?: string;
  pages: Array<{
    url: string;
    content: string;
    title?: string;
  }>;
  lastScraped: Date;
  createdAt: Date;
  updatedAt: Date;
}

const WebsiteContentSchema = new Schema<IWebsiteContent>(
  {
    websiteUrl: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    title: { type: String },
    description: { type: String },
    pages: [
      {
        url: { type: String, required: true },
        content: { type: String, required: true },
        title: { type: String },
      },
    ],
    lastScraped: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

export const WebsiteContent = models.WebsiteContent || mongoose.model<IWebsiteContent>('WebsiteContent', WebsiteContentSchema);

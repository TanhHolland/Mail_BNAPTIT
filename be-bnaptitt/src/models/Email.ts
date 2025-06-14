import mongoose, { Schema } from 'mongoose';
export interface IEmail {
  name: string;
  email: string;
  title: string;
  content: string;
  receivers: Record<string, any>;
}

const emailSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    receivers: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

const Email = mongoose.model<IEmail>('Email', emailSchema);

export default Email;

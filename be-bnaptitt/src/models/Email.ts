import mongoose, { Schema } from 'mongoose';
export interface IFile {
  filename: string;
  path: string;
  contentType: string;
}
export interface IEmail {
  name: string;
  email: string;
  toEmail: string;
  title: string;
  content: string;
  receivers: Record<string, any>;
  attachments: mongoose.Types.ObjectId[];
}

const emailSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    toEmail: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    receiver: { type: Schema.Types.Mixed, required: true },
    attachments: [{ type: Schema.Types.ObjectId, ref: 'File' }],
  },
  { timestamps: true }
);

const Email = mongoose.model<IEmail>('Email', emailSchema);

export default Email;

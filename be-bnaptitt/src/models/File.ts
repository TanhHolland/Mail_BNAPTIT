import mongoose from 'mongoose';
export interface IFile {
  fileName: string;
  path: string;
  contentType: string;
}

const fileSchema = new mongoose.Schema(
  {
    fileName: { type: String, required: true },
    path: { type: String, required: true },
    contentType: { type: String, required: true },
  },
  { timestamps: true }
);

const File = mongoose.model<IFile>('File', fileSchema);

export default File;

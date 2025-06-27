import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import multer from 'multer';
import { connectDB } from './repository/db';
import emailRoutes from './routes/emailRoutes';

dotenv.config();
const app = express();
const port = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello from TypeScript backend!');
});

// Email routes
app.use('/api/v1/', emailRoutes);

// Error middleware
app.use((err: any, req: any, res: any, next: any) => {
  console.log(err);
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'Kích cỡ file hơi lớn, mỗi file chỉ dưới 25MB, tham vừa thôi má -.-',
      });
    }
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({
        success: false,
        message: 'File này không hỗ trợ, xin thông cảm vì xài hàng free =(((',
      });
    }
  }
  return res.status(500).json({
    success: false,
    message: err.message,
  });
});

// Connect to MongoDB
connectDB();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

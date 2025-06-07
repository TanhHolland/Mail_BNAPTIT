import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import { connectDB } from './repository/db';

dotenv.config();
const app = express();
const port = process.env.PORT;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'] 
}));
app.use(express.json());

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello from TypeScript backend!');
});

// Connect to MongoDB
connectDB();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
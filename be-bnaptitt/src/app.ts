import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
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

// Connect to MongoDB
connectDB();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';

import authRoutes from './routes/auth.routes';
import bookRoutes from './routes/book.routes';
import reviewRoutes from './routes/review.routes';
dotenv.config();
const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://book-review-aamp.onrender.com',
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.use(morgan('dev'));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/books',bookRoutes);
app.use('/api/review',reviewRoutes);

export default app;

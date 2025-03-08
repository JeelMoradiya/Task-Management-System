import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { initializeDatabase } from './config/db';
import authRoutes from './routes/authRoutes';
import taskRoutes from './routes/taskRoutes';

// Load environment variables
dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || '5001', 10);

console.log(`Attempting to start server on port: ${PORT}`);

// Middleware
app.use(express.json());
// Enable CORS for the frontend app
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Handle preflight requests for all routes
app.options('*', cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

import { ErrorRequestHandler } from 'express';

// Error handling middleware
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Check for Zod validation errors
  if (err instanceof Error && err.name === 'ValidationError') {
    res.status(400).json({ error: 'Validation Error', message: err.message });
    return;
  }

  // Check for JWT authentication errors (example, you might need to adjust based on your auth library)
  if (err instanceof Error && err.name === 'UnauthorizedError') {
    res.status(401).json({ error: 'Unauthorized', message: 'Invalid or expired token' });
    return;
  }

  // Default server error for all other unhandled errors
  res.status(500).json({ error: 'Server Error', message: 'Something went wrong!' });
};
app.use(errorHandler);

// Start server
const startServer = async () => {
  await initializeDatabase();

  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  server.on('error', (err: NodeJS.ErrnoException) => {
    if (err.code === 'EADDRINUSE') {
      // Handle port already in use error
      console.error(`Port ${PORT} is already in use. Try a different port or free it up.`);
      process.exit(1);
    } else {
      // Handle other server errors
      console.error('Server error:', err);
    }
  });
};

startServer();

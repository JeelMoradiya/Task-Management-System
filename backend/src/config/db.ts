import { DataSource } from 'typeorm';
import { User } from '../models/User';
import { Task } from '../models/Task';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Array of required environment variables for database connection
const requiredEnvVars = ['DB_HOST', 'DB_PORT', 'DB_USER', 'DB_PASSWORD', 'DB_NAME', 'JWT_SECRET'];
// Check if all required environment variables are set
requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    throw new Error(`Environment variable ${varName} is missing`);
  }
});

// Initialize TypeORM DataSource for database connection
export const AppDataSource = new DataSource({
  type: 'postgres', // Database type
  host: process.env.DB_HOST, // Database host
  port: parseInt(process.env.DB_PORT || '5432', 10), // Database port, default to 5432 if not set
  username: process.env.DB_USER, // Database username
  password: process.env.DB_PASSWORD, // Database password
  database: process.env.DB_NAME, // Database name
  synchronize: process.env.NODE_ENV !== 'production', // Automatically synchronize database schema in non-production environments
  logging: process.env.NODE_ENV === 'development', // Enable logging in development environment
  entities: [User, Task], // Entities to be loaded by TypeORM
  migrations: ['src/migrations/*.ts'], // Path to migration files
});

// Function to initialize the database connection
export const initializeDatabase = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};

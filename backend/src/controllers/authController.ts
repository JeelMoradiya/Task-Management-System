import { Request, Response } from 'express';
import { AppDataSource } from '../config/db';
import { User } from '../models/User';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { validate, registerSchema, loginSchema } from '../utils/validate';

// Get User repository from AppDataSource
const userRepository = AppDataSource.getRepository(User);

interface ErrorResponse {
  error: string;
  message: string;
}

export interface AuthRequest extends Request {
  user?: { id: number };
}

export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;
    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json({ username: user.username });
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to fetch user info', error: error.message });
  }
};


export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validate request body against registration schema
    const data = validate(registerSchema, req.body);
    const { username, password } = data;

    // Check if user with given username already exists
    const existingUser = await userRepository.findOneBy({ username });
    if (existingUser) {
      res.status(400).json({ error: 'User exists', message: 'Username already taken' });
      return;
    }

    // Hash the password before saving to database
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create new user instance
    const user = userRepository.create({ username, password: hashedPassword });
    // Save user to database
    await userRepository.save(user);

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    // Respond with token and user information
    res.status(201).json({ token, user: { id: user.id, username: user.username } });
  } catch (error: any) {
    // Handle validation errors
    res.status(400).json({ error: 'Validation failed', message: error.message });
  }
};

/**
 * User login controller.
 * Validates login data, finds user by username,
 * compares password, and generates JWT token.
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validate request body against login schema
    const data = validate(loginSchema, req.body);
    const { username, password } = data;

    // Find user by username
    const user = await userRepository.findOneBy({ username });
    // Check if user exists and password is correct
    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ error: 'Invalid credentials', message: 'Username or password incorrect' });
      return;
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    // Respond with token and user information
    res.json({ token, user: { id: user.id, username: user.username } });
  } catch (error: any) {
    // Handle validation errors
    res.status(400).json({ error: 'Validation failed', message: error.message });
  }
};

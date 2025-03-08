import { z } from 'zod';

// Schema for user registration
export const registerSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters').max(50),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

// Schema for user login
export const loginSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters').max(50),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

// Schema for creating a task
export const taskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  description: z.string().max(500).optional(),
  status: z.enum(['To Do', 'In Progress', 'Completed']).default('To Do'),
});

// Schema for updating a task (all fields are optional)
export const updateTaskSchema = taskSchema.partial();

// Generic validation function using Zod schema
export const validate = <T>(schema: z.ZodSchema<T>, data: unknown): T => {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new Error(result.error.errors.map((e) => e.message).join(', '));
  }
  return result.data;
};

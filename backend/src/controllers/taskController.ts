import { Response } from 'express';
import { AppDataSource } from '../config/db';
import { Task } from '../models/Task';
import { validate, taskSchema, updateTaskSchema } from '../utils/validate'; // Import both schemas
import { AuthRequest } from '../middlewares/authMiddleware';

// Get Task repository from AppDataSource
const taskRepository = AppDataSource.getRepository(Task);

interface ErrorResponse {
  error: string;
  message: string;
}

/**
 * Get all tasks for authenticated user.
 * Requires authentication.
 * Returns list of tasks or error message.
 */
export const getTasks = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // Extract user ID from request object (added by authMiddleware)
    const userId = req.user?.id;
    // Check if user ID exists (i.e., user is authenticated)
    if (!userId) throw new Error('User not authenticated');

    // Fetch tasks from database for the authenticated user
    const tasks = await taskRepository.find({ where: { user: { id: userId } } });
    // Respond with the list of tasks
    res.json(tasks);
  } catch (error: any) {
    // Handle server errors
    res.status(500).json({ error: 'Server error', message: 'Failed to fetch tasks' });
  }
};

/**
 * Create a new task for authenticated user.
 * Requires authentication and task data validation.
 * Returns the newly created task or error message.
 */
export const createTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // Validate request body against task schema
    const data = validate(taskSchema, req.body);
    // Extract user ID from request object
    const userId = req.user?.id;
    // Check if user ID exists
    if (!userId) throw new Error('User not authenticated');

    // Create a new task instance with validated data and user ID
    const task = taskRepository.create({ ...data, user: { id: userId } });
    // Save the new task to the database
    const savedTask = await taskRepository.save(task);
    // Respond with the saved task and 201 Created status
    res.status(201).json(savedTask);
  } catch (error: any) {
    // Handle validation errors
    res.status(400).json({ error: 'Validation failed', message: error.message });
  }
};


/**
 * Update an existing task for authenticated user.
 * Requires authentication, task ID, and task data validation.
 * Returns the updated task or error message.
 */
export const updateTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // Validate request body against update task schema
    const data = validate(updateTaskSchema, req.body);
    // Extract task ID from request parameters
    const taskId = parseInt(req.params.id, 10);
    // Extract user ID from request object
    const userId = req.user?.id;
    // Check if user is authenticated
    if (!userId) throw new Error('User not authenticated');
    // Check if task ID is valid number
    if (isNaN(taskId)) throw new Error('Invalid task ID');

    // Find the task by ID and user ID
    const task = await taskRepository.findOneBy({ id: taskId, user: { id: userId } });
    // If task not found, return 404 Not Found error
    if (!task) {
      res.status(404).json({ error: 'Not found', message: 'Task not found' });
      return;
    }

    // Merge existing task with updated data from request body
    taskRepository.merge(task, data);
    // Save the updated task to the database
    const updatedTask = await taskRepository.save(task);
    // Respond with the updated task
    res.json(updatedTask);
  } catch (error: any) {
    // Handle validation errors
    res.status(400).json({ error: 'Validation failed', message: error.message });
  }
};

/**
 * Delete a task for authenticated user.
 * Requires authentication and task ID.
 * Returns 204 No Content status on successful deletion or error message.
 */
export const deleteTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // Extract task ID from request parameters
    const taskId = parseInt(req.params.id, 10);
    // Extract user ID from request object
    const userId = req.user?.id;
    // Check if user is authenticated
    if (!userId) throw new Error('User not authenticated');
    // Check if task ID is valid number
    if (isNaN(taskId)) throw new Error('Invalid task ID');

    // Find the task by ID and user ID
    const task = await taskRepository.findOneBy({ id: taskId, user: { id: userId } });
    // If task not found, return 404 Not Found error
    if (!task) {
      res.status(404).json({ error: 'Not found', message: 'Task not found' });
      return;
    }

    // Remove the task from the database
    await taskRepository.remove(task);
    // Respond with 204 No Content status
    res.status(204).send();
  } catch (error: any) {
    // Handle server errors
    res.status(500).json({ error: 'Server error', message: 'Failed to delete task' });
  }
};

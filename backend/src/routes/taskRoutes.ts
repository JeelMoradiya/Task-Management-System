import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/taskController';

// Create a new router instance for task routes
const router = Router();

// Apply authMiddleware to all task routes to ensure authentication
router.use(authMiddleware); // Protects all task routes with authentication

// Route to get all tasks for a user
router.get('/', getTasks);          // GET /api/tasks - Get all tasks for authenticated user
// Route to create a new task
router.post('/', createTask);         // POST /api/tasks - Create a new task
// Route to update an existing task
router.put('/:id', updateTask);    // PUT /api/tasks/:id - Update a task by ID
// Route to delete a task
router.delete('/:id', deleteTask); // DELETE /api/tasks/:id - Delete a task by ID

// Export the router
export default router;

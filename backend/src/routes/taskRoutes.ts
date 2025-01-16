import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import Task from '../schemas/Tasks';

const router = express.Router();

// Fetch all tasks
router.get('/:userId', async (req: Request<{ userId: string }>, res: Response): Promise<any> => {
  try {
    const { userId } = req.params;

    const userObjectId = new mongoose.Types.ObjectId(userId);

    const tasks = await Task.find({ createdBy: userObjectId });

    if (tasks.length === 0) {
      return res.status(404).json({ message: 'No tasks found for this user' });
    }

    res.json(tasks);
  } catch (err) {
    res.status(500).json({
      message: 'Error fetching tasks for the user',
      error: (err as Error).message,
    });
  }
});

// Fetch a specific task
router.get('/:id', async (req: Request<{ id: string }>, res: Response): Promise<any> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid task ID format' });
    }

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (err) {
    res.status(500).json({
      message: 'Error fetching task',
      error: (err as Error).message,
    });
  }
});

// Create new task
router.post('/', async (req: Request, res: Response): Promise<any> => {
  const newTask = new Task(req.body);

  try {
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(400).json({
      message: 'Error creating task',
      error: (err as Error).message,
    });
  }
});

// Update task
router.put('/:id', async (req: Request<{ id: string }>, res: Response): Promise<any> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid task ID format' });
    }

    const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({
      message: 'Error updating task',
      error: (err as Error).message,
    });
  }
});

// Delete task
router.delete('/:id', async (req: Request<{ id: string }>, res: Response): Promise<any> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid task ID format' });
    }

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully', deletedTask });
  } catch (err) {
    res.status(500).json({
      message: 'Error deleting task',
      error: (err as Error).message,
    });
  }
});

export default router;

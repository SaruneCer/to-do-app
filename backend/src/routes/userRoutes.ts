import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../schemas/Users';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({
      message: 'Error fetching users',
      error: (err as Error).message,
    });
  }
});

router.get('/:id', async (req: Request<{ id: string }>, res: Response): Promise<any> => {
  try {
    const { id } = req.params;

    const idObjectId = new mongoose.Types.ObjectId(id);

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({
      message: 'Error fetching user',
      error: (err as Error).message,
    });
  }
});

// Update user info
router.put('/:id', async (req: Request<{ id: string }>, res: Response): Promise<any> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({
      message: 'Error updating user',
      error: (err as Error).message,
    });
  }
});

// Delete user
router.delete('/:id', async (req: Request<{ id: string }>, res: Response): Promise<any> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully', deletedUser });
  } catch (err) {
    res.status(500).json({
      message: 'Error deleting user',
      error: (err as Error).message,
    });
  }
});

export default router;

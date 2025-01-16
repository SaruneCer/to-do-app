import express, { Request, Response } from 'express';
import User from '../schemas/Users';
import { generateToken } from '../utils/password';

const router = express.Router();

// Register a new user
router.post('/register', async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password, name } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({ email, password, name });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({
      message: 'Error registering user',
      error: (error as Error).message,
    });
  }
});

// Login a user
router.post('/login', async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.isCorrectPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken({ id: user._id });

    res.status(200).json({ message: 'Logged in', token, user });
  } catch (error) {
    res.status(500).json({
      message: 'Error logging in user',
      error: (error as Error).message,
    });
  }
});

export default router;

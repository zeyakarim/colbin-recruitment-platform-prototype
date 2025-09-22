import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET!;

export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ success: false, message: 'Email already exists' });
        }

        const newUser = await User.create({ email, password });
        res.status(201).json({ success: true, message: 'User created successfully' });
    } catch (error) {
        const errorMessage = error instanceof Error ? error?.message : 'Error in registering user';
        res.status(500).json({ success: false, message: errorMessage });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({  success: true, message: 'Logged in successfully', token });
    } catch (error) {
        const errorMessage = error instanceof Error ? error?.message : 'Error in Login';
        res.status(500).json({ success: false, message: errorMessage });
    }
};
import { Router, Request, Response } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { User } from '../models/User';

const router = Router();

router.get('/profile', authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const user = await User.findByPk(
            req?.user!.id, 
            { 
                attributes: { exclude: ['password'] },
                raw: true
            },
        );
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        const errorMessage = error instanceof Error ? error?.message : 'Error in findin user';
        res.status(500).json({ message: errorMessage });
    }
});

export { router as UserRouter };
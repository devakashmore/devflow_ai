import {Router} from 'express';
import { getCurrentUser } from './user.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';

const router = Router();

router.get('/me', authenticate, getCurrentUser);

export default router;  
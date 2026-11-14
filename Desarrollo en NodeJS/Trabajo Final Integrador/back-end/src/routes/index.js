import { Router } from 'express';
import authRoutes from './auth.routes.js';
import usersRoutes from './users.routes.js';
import chatsRoutes from './chats.routes.js';
import messagesRoutes from './messages.routes.js';
import { sendSuccess } from '../utils/response.js';

const router = Router();

router.get('/', (req, res) => sendSuccess(res, { status: 'ok' }, 'API de chat funcionando'));
router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/chats', chatsRoutes);
router.use('/messages', messagesRoutes);

export default router;

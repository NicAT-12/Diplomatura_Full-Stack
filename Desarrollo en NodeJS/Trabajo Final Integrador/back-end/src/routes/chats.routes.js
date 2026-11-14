import { Router } from 'express';
import { createChat, deleteChat, getChat, listChats } from '../controllers/chats.controller.js';
import { requireAuth } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { createChatSchema, idParamSchema, listChatsQuerySchema } from '../validators/schemas.js';

const router = Router();

router.use(requireAuth);

router.post('/', validate(createChatSchema), createChat);
router.get('/', validate(listChatsQuerySchema, 'query'), listChats);
router.get('/:id', validate(idParamSchema, 'params'), getChat);
router.delete('/:id', validate(idParamSchema, 'params'), deleteChat);

export default router;

import { Router } from 'express';
import { createMessage, deleteMessage, listMessages } from '../controllers/messages.controller.js';
import { requireAuth } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { createMessageSchema, idParamSchema, listMessagesQuerySchema } from '../validators/schemas.js';

const router = Router();

router.use(requireAuth);

router.post('/', validate(createMessageSchema), createMessage);
router.get('/', validate(listMessagesQuerySchema, 'query'), listMessages);
router.delete('/:id', validate(idParamSchema, 'params'), deleteMessage);

export default router;

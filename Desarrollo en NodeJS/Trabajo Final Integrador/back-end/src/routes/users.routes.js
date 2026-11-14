import { Router } from 'express';
import { createUser, deleteUser, listUsers } from '../controllers/users.controller.js';
import { requireAuth } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { idParamSchema, listUsersQuerySchema, registerSchema } from '../validators/schemas.js';

const router = Router();

router.post('/', validate(registerSchema), createUser);
router.get('/', requireAuth, validate(listUsersQuerySchema, 'query'), listUsers);
router.delete('/:id', requireAuth, validate(idParamSchema, 'params'), deleteUser);

export default router;

import { Router } from 'express';
import { login, me } from '../controllers/auth.controller.js';
import { createUser } from '../controllers/users.controller.js';
import { requireAuth } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { loginSchema, registerSchema } from '../validators/schemas.js';

const router = Router();

router.post('/register', validate(registerSchema), createUser);
router.post('/login', validate(loginSchema), login);
router.get('/me', requireAuth, me);

export default router;

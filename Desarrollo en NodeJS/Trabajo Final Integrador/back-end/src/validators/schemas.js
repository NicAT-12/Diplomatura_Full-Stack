import { z } from 'zod';

const objectId = z.string().regex(/^[a-fA-F0-9]{24}$/, { error: 'ID inválido' });

const email = z
  .string({ error: 'El email es obligatorio' })
  .trim()
  .toLowerCase()
  .pipe(z.email({ error: 'El email no es válido' }));

const password = z
  .string({ error: 'La contraseña es obligatoria' })
  .min(6, { error: 'La contraseña debe tener al menos 6 caracteres' })
  .max(100, { error: 'La contraseña no puede superar los 100 caracteres' });

export const registerSchema = z.object({
  name: z
    .string({ error: 'El nombre es obligatorio' })
    .trim()
    .min(2, { error: 'El nombre debe tener al menos 2 caracteres' })
    .max(50, { error: 'El nombre no puede superar los 50 caracteres' }),
  email,
  password
});

export const loginSchema = z.object({
  email,
  password: z.string({ error: 'La contraseña es obligatoria' }).min(1, { error: 'La contraseña es obligatoria' })
});

export const idParamSchema = z.object({ id: objectId });

const page = z.coerce.number().int().min(1).default(1);
const limit = z.coerce.number().int().min(1).max(100).default(20);
const search = z.string().trim().max(100).optional();

export const listUsersQuerySchema = z.object({ page, limit, search });

export const listChatsQuerySchema = z.object({ page, limit });

export const createChatSchema = z.object({
  participantId: objectId,
  name: z.string().trim().max(80, { error: 'El nombre no puede superar los 80 caracteres' }).optional()
});

export const createMessageSchema = z.object({
  chatId: objectId,
  content: z
    .string({ error: 'El mensaje es obligatorio' })
    .trim()
    .min(1, { error: 'El mensaje no puede estar vacío' })
    .max(2000, { error: 'El mensaje no puede superar los 2000 caracteres' })
});

export const listMessagesQuerySchema = z.object({
  chatId: objectId,
  page,
  limit: z.coerce.number().int().min(1).max(100).default(50),
  search
});

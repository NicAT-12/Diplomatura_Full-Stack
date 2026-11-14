import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Chat from '../models/Chat.js';
import Message from '../models/Message.js';
import AppError from '../utils/AppError.js';
import { sendSuccess } from '../utils/response.js';
import { signToken } from '../utils/token.js';
import { buildPagination, escapeRegex, getPagination } from '../utils/pagination.js';

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const exists = await User.exists({ email });
  if (exists) {
    throw new AppError('El email ya está registrado', 409);
  }
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });
  const token = signToken(user.id);
  return sendSuccess(res, { user, token }, 'Usuario creado correctamente', 201);
};

export const listUsers = async (req, res) => {
  const { page, limit, search } = req.valid.query;
  const { skip } = getPagination({ page, limit });
  const filter = { _id: { $ne: req.user._id } };
  if (search) {
    const regex = new RegExp(escapeRegex(search), 'i');
    filter.$or = [{ name: regex }, { email: regex }];
  }
  const [items, total] = await Promise.all([
    User.find(filter).sort({ name: 1 }).skip(skip).limit(limit),
    User.countDocuments(filter)
  ]);
  return sendSuccess(
    res,
    { items, pagination: buildPagination(page, limit, total) },
    'Usuarios obtenidos correctamente'
  );
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (id !== req.user.id) {
    throw new AppError('Solo podés eliminar tu propia cuenta', 403);
  }
  const { deletedCount } = await Message.deleteMany({ userId: req.user._id });
  await Chat.updateMany({ 'lastMessage.userId': req.user._id }, { $set: { lastMessage: null } });
  await req.user.deleteOne();
  return sendSuccess(
    res,
    { id, deletedMessages: deletedCount },
    'Usuario y mensajes eliminados correctamente'
  );
};

import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import AppError from '../utils/AppError.js';
import { sendSuccess } from '../utils/response.js';
import { signToken } from '../utils/token.js';

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new AppError('Email o contraseña incorrectos', 401);
  }
  const token = signToken(user.id);
  return sendSuccess(res, { user, token }, 'Inicio de sesión exitoso');
};

export const me = async (req, res) => sendSuccess(res, { user: req.user }, 'Usuario autenticado');

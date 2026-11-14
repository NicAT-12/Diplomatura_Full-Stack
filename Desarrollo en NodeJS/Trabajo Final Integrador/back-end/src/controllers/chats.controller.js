import Chat from '../models/Chat.js';
import User from '../models/User.js';
import Message from '../models/Message.js';
import AppError from '../utils/AppError.js';
import { sendSuccess } from '../utils/response.js';
import { buildPagination, getPagination } from '../utils/pagination.js';

const populateChat = (query) => query.populate('participants', 'name email');

export const createChat = async (req, res) => {
  const { participantId, name } = req.body;
  if (participantId === req.user.id) {
    throw new AppError('No podés crear un chat con vos mismo', 400);
  }
  const other = await User.exists({ _id: participantId });
  if (!other) {
    throw new AppError('El usuario indicado no existe', 404);
  }
  const participantsKey = [req.user.id, participantId].sort().join('_');
  const existing = await populateChat(Chat.findOne({ participantsKey }));
  if (existing) {
    return sendSuccess(res, existing, 'El chat ya existía');
  }
  const created = await Chat.create({
    name,
    participants: [req.user._id, participantId],
    participantsKey
  });
  const chat = await populateChat(Chat.findById(created._id));
  return sendSuccess(res, chat, 'Chat creado correctamente', 201);
};

export const listChats = async (req, res) => {
  const { page, limit } = req.valid.query;
  const { skip } = getPagination({ page, limit });
  const filter = { participants: req.user._id };
  const [items, total] = await Promise.all([
    populateChat(Chat.find(filter).sort({ updatedAt: -1 }).skip(skip).limit(limit)),
    Chat.countDocuments(filter)
  ]);
  return sendSuccess(
    res,
    { items, pagination: buildPagination(page, limit, total) },
    'Chats obtenidos correctamente'
  );
};

export const getChat = async (req, res) => {
  const chat = await populateChat(Chat.findOne({ _id: req.params.id, participants: req.user._id }));
  if (!chat) {
    throw new AppError('Chat no encontrado', 404);
  }
  return sendSuccess(res, chat, 'Chat obtenido correctamente');
};

export const deleteChat = async (req, res) => {
  const chat = await Chat.findOne({ _id: req.params.id, participants: req.user._id });
  if (!chat) {
    throw new AppError('Chat no encontrado', 404);
  }
  const { deletedCount } = await Message.deleteMany({ chatId: chat._id });
  await chat.deleteOne();
  return sendSuccess(
    res,
    { id: req.params.id, deletedMessages: deletedCount },
    'Chat y mensajes eliminados correctamente'
  );
};

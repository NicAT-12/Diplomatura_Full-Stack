import Chat from '../models/Chat.js';
import Message from '../models/Message.js';
import AppError from '../utils/AppError.js';
import { sendSuccess } from '../utils/response.js';
import { buildPagination, escapeRegex, getPagination } from '../utils/pagination.js';

const findUserChat = async (chatId, userId) => {
  const chat = await Chat.findOne({ _id: chatId, participants: userId });
  if (!chat) {
    throw new AppError('Chat no encontrado', 404);
  }
  return chat;
};

export const createMessage = async (req, res) => {
  const { chatId, content } = req.body;
  const chat = await findUserChat(chatId, req.user._id);
  const message = await Message.create({ chatId: chat._id, userId: req.user._id, content });
  chat.lastMessage = { content: message.content, userId: req.user._id, createdAt: message.createdAt };
  await chat.save();
  await message.populate('userId', 'name');
  return sendSuccess(res, message, 'Mensaje enviado correctamente', 201);
};

export const listMessages = async (req, res) => {
  const { chatId, page, limit, search } = req.valid.query;
  await findUserChat(chatId, req.user._id);
  const { skip } = getPagination({ page, limit });
  const filter = { chatId };
  if (search) {
    filter.content = new RegExp(escapeRegex(search), 'i');
  }
  const [found, total] = await Promise.all([
    Message.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).populate('userId', 'name'),
    Message.countDocuments(filter)
  ]);
  return sendSuccess(
    res,
    { items: found.reverse(), pagination: buildPagination(page, limit, total) },
    'Historial obtenido correctamente'
  );
};

export const deleteMessage = async (req, res) => {
  const message = await Message.findOne({ _id: req.params.id, userId: req.user._id });
  if (!message) {
    throw new AppError('Mensaje no encontrado', 404);
  }
  await message.deleteOne();
  const last = await Message.findOne({ chatId: message.chatId }).sort({ createdAt: -1 });
  await Chat.updateOne(
    { _id: message.chatId },
    {
      $set: {
        lastMessage: last ? { content: last.content, userId: last.userId, createdAt: last.createdAt } : null
      }
    }
  );
  return sendSuccess(res, { id: req.params.id }, 'Mensaje eliminado correctamente');
};

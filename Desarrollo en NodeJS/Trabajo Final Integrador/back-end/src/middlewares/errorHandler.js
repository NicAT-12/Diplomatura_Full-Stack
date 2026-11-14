import { sendError } from '../utils/response.js';

export const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err.name === 'ValidationError' && err.errors) {
    const details = Object.values(err.errors).map((e) => ({ field: e.path, message: e.message }));
    return sendError(res, details[0]?.message || 'Datos inválidos', 400, details);
  }

  if (err.name === 'CastError') {
    return sendError(res, `Valor inválido para ${err.path}`, 400);
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern || {})[0] || 'campo';
    return sendError(res, `Ya existe un registro con ese valor de ${field}`, 409);
  }

  if (err.name === 'TokenExpiredError') {
    return sendError(res, 'La sesión expiró, iniciá sesión nuevamente', 401);
  }

  if (err.name === 'JsonWebTokenError' || err.name === 'NotBeforeError') {
    return sendError(res, 'Token inválido', 401);
  }

  if (err.type === 'entity.parse.failed') {
    return sendError(res, 'El cuerpo de la petición no es un JSON válido', 400);
  }

  if (err.status && err.status < 500) {
    return sendError(res, err.message, err.status, err.data ?? null);
  }

  console.error(err);
  return sendError(res, 'Error interno del servidor', 500);
};

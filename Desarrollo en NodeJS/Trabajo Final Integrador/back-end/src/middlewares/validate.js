import AppError from '../utils/AppError.js';

export const validate = (schema, source = 'body') => (req, res, next) => {
  const result = schema.safeParse(req[source]);
  if (!result.success) {
    const details = result.error.issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message
    }));
    throw new AppError(details[0]?.message || 'Datos inválidos', 400, details);
  }
  if (source === 'body') {
    req.body = result.data;
  } else {
    req.valid = { ...req.valid, [source]: result.data };
  }
  next();
};

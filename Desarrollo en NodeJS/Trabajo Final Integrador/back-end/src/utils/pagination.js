export const getPagination = ({ page, limit }) => ({
  page,
  limit,
  skip: (page - 1) * limit
});

export const buildPagination = (page, limit, total) => ({
  page,
  limit,
  total,
  totalPages: Math.max(Math.ceil(total / limit), 1)
});

export const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

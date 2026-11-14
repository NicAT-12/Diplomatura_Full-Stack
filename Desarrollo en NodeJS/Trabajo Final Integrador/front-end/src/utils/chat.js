export const getOtherParticipant = (chat, userId) =>
  chat.participants.find((participant) => participant.id !== userId) || null;

export const getChatTitle = (chat, userId) => {
  const other = getOtherParticipant(chat, userId);
  return other ? other.name : 'Usuario eliminado';
};

export const formatTime = (value) => {
  if (!value) {
    return '';
  }
  const date = new Date(value);
  const now = new Date();
  const sameDay = date.toDateString() === now.toDateString();
  return sameDay
    ? date.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })
    : date.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit' });
};

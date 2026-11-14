import { useEffect, useRef, useState } from 'react';
import { api } from '../services/api.js';
import { formatTime, getChatTitle } from '../utils/chat.js';

export default function ChatWindow({ chat, user, onBack, onChatDeleted, onActivity }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');
  const [sending, setSending] = useState(false);
  const endRef = useRef(null);

  const title = getChatTitle(chat, user.id);
  const hasOther = title !== 'Usuario eliminado';

  useEffect(() => {
    setMessages([]);
    setLoading(true);
    setError('');
    setText('');
    setSearch('');
  }, [chat.id]);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const query = new URLSearchParams({ chatId: chat.id, limit: '100' });
        if (search.trim()) {
          query.set('search', search.trim());
        }
        const data = await api.get(`/messages?${query}`);
        if (!cancelled) {
          setMessages(data.items);
          setError('');
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    const timer = setTimeout(load, search ? 300 : 0);
    const interval = setInterval(load, 3000);
    return () => {
      cancelled = true;
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [chat.id, search]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' });
  }, [messages.length, chat.id]);

  const handleSend = async (event) => {
    event.preventDefault();
    const content = text.trim();
    if (!content || sending) {
      return;
    }
    setSending(true);
    try {
      const message = await api.post('/messages', { chatId: chat.id, content });
      setText('');
      setError('');
      if (!search.trim()) {
        setMessages((current) =>
          current.some((item) => item.id === message.id) ? current : [...current, message]
        );
      }
      onActivity();
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  };

  const handleDeleteMessage = async (id) => {
    try {
      await api.delete(`/messages/${id}`);
      setMessages((current) => current.filter((item) => item.id !== id));
      onActivity();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteChat = async () => {
    if (!window.confirm('Se eliminará el chat con todos sus mensajes. ¿Querés continuar?')) {
      return;
    }
    try {
      await api.delete(`/chats/${chat.id}`);
      onChatDeleted(chat.id);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="flex h-full min-w-0 flex-1 flex-col bg-fog">
      <header className="flex items-center gap-3 border-b border-line bg-white px-4 py-3">
        <button
          type="button"
          onClick={onBack}
          className="rounded-md px-2 py-1 text-sm font-medium text-brand hover:bg-fog md:hidden"
        >
          Volver
        </button>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-soft font-semibold text-brand">
          {title.charAt(0).toUpperCase()}
        </span>
        <h2 className="min-w-0 flex-1 truncate font-semibold">{title}</h2>
        <label htmlFor="message-search" className="sr-only">
          Buscar en la conversación
        </label>
        <input
          id="message-search"
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Buscar mensajes"
          className="hidden w-44 rounded-lg border border-line px-3 py-1.5 text-sm placeholder:text-muted/70 sm:block"
        />
        <button type="button" onClick={handleDeleteChat} className="text-sm text-danger hover:underline">
          Eliminar chat
        </button>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-4" aria-live="polite">
        {loading && <p className="text-center text-sm text-muted">Cargando mensajes…</p>}
        {!loading && messages.length === 0 && (
          <p className="mt-8 text-center text-sm text-muted">
            {search.trim()
              ? 'Ningún mensaje coincide con tu búsqueda.'
              : hasOther
                ? `Todavía no hay mensajes. Escribile a ${title} para empezar.`
                : 'Todavía no hay mensajes.'}
          </p>
        )}
        <ul className="mx-auto flex max-w-2xl flex-col gap-2">
          {messages.map((message) => {
            const own = message.userId?.id === user.id;
            return (
              <li key={message.id} className={`group flex ${own ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2 ${
                    own ? 'rounded-br-md bg-brand text-white' : 'rounded-bl-md bg-white text-ink'
                  }`}
                >
                  <p className="whitespace-pre-wrap break-words">{message.content}</p>
                  <p className={`mt-1 flex items-center justify-end gap-2 text-xs ${own ? 'text-white/75' : 'text-muted'}`}>
                    {own && (
                      <button
                        type="button"
                        onClick={() => handleDeleteMessage(message.id)}
                        className="underline opacity-0 focus-visible:opacity-100 group-hover:opacity-100"
                      >
                        Eliminar
                      </button>
                    )}
                    <span>{formatTime(message.createdAt)}</span>
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
        <div ref={endRef} />
      </div>

      {error && (
        <p role="alert" className="mx-4 mb-2 rounded-lg bg-danger-soft px-3 py-2 text-sm text-danger">
          {error}
        </p>
      )}

      <form onSubmit={handleSend} className="flex gap-2 border-t border-line bg-white p-3">
        <label htmlFor="message-input" className="sr-only">
          Escribí un mensaje
        </label>
        <input
          id="message-input"
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Escribí un mensaje"
          maxLength={2000}
          autoComplete="off"
          className="min-w-0 flex-1 rounded-lg border border-line px-3 py-2.5 placeholder:text-muted/70"
        />
        <button
          type="submit"
          disabled={sending || !text.trim()}
          className="rounded-lg bg-brand px-5 py-2.5 font-semibold text-white hover:bg-brand-dark disabled:opacity-50"
        >
          Enviar
        </button>
      </form>
    </section>
  );
}

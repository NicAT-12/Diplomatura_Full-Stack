import { useEffect, useState } from 'react';
import { api } from '../services/api.js';

export default function NewChatModal({ onClose, onCreated }) {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [creatingId, setCreatingId] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams({ limit: '30' });
        if (search.trim()) {
          query.set('search', search.trim());
        }
        const data = await api.get(`/users?${query}`);
        if (!cancelled) {
          setUsers(data.items);
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
    }, 300);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [search]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  const startChat = async (participantId) => {
    setCreatingId(participantId);
    setError('');
    try {
      const chat = await api.post('/chats', { participantId });
      onCreated(chat);
    } catch (err) {
      setError(err.message);
      setCreatingId(null);
    }
  };

  return (
    <div
      className="fixed inset-0 z-10 flex items-end justify-center bg-ink/40 p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="new-chat-title"
    >
      <div className="flex max-h-[85vh] w-full max-w-md flex-col rounded-t-2xl bg-white shadow-lg sm:rounded-2xl">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 id="new-chat-title" className="text-lg font-semibold">
            Nuevo chat
          </h2>
          <button type="button" onClick={onClose} className="rounded-md px-2 py-1 text-sm text-muted hover:bg-fog">
            Cerrar
          </button>
        </div>

        <div className="px-5 pt-4">
          <label htmlFor="user-search" className="mb-1 block text-sm font-medium">
            Buscar persona
          </label>
          <input
            id="user-search"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Nombre o email"
            className="w-full rounded-lg border border-line px-3 py-2.5 placeholder:text-muted/70"
            autoFocus
          />
        </div>

        {error && (
          <p role="alert" className="mx-5 mt-3 rounded-lg bg-danger-soft px-3 py-2 text-sm text-danger">
            {error}
          </p>
        )}

        <ul className="mt-3 min-h-24 flex-1 overflow-y-auto px-2 pb-4">
          {loading && <li className="px-3 py-4 text-sm text-muted">Buscando…</li>}
          {!loading && users.length === 0 && (
            <li className="px-3 py-4 text-sm text-muted">No encontramos personas con ese criterio.</li>
          )}
          {!loading &&
            users.map((person) => (
              <li key={person.id}>
                <button
                  type="button"
                  onClick={() => startChat(person.id)}
                  disabled={creatingId !== null}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left hover:bg-fog disabled:opacity-60"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-soft font-semibold text-brand">
                    {person.name.charAt(0).toUpperCase()}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-medium">{person.name}</span>
                    <span className="block truncate text-sm text-muted">{person.email}</span>
                  </span>
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

import { formatTime, getChatTitle } from '../utils/chat.js';

export default function Sidebar({ user, chats, activeId, loading, error, onSelect, onNew, onLogout, onDeleteAccount }) {
  return (
    <aside className="flex h-full w-full flex-col bg-white md:w-80 md:shrink-0 md:border-r md:border-line">
      <div className="flex items-center justify-between gap-2 border-b border-line px-4 py-3">
        <div className="min-w-0">
          <p className="truncate font-semibold">{user.name}</p>
          <p className="truncate text-xs text-muted">{user.email}</p>
        </div>
        <button
          type="button"
          onClick={onNew}
          className="shrink-0 rounded-lg bg-brand px-3 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
        >
          Nuevo chat
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto" aria-label="Conversaciones">
        {error && (
          <p role="alert" className="m-3 rounded-lg bg-danger-soft px-3 py-2 text-sm text-danger">
            {error}
          </p>
        )}
        {loading && <p className="px-4 py-4 text-sm text-muted">Cargando chats…</p>}
        {!loading && !error && chats.length === 0 && (
          <p className="px-4 py-6 text-sm text-muted">
            Todavía no tenés conversaciones. Tocá “Nuevo chat” para escribirle a alguien.
          </p>
        )}
        <ul>
          {chats.map((chat) => {
            const title = getChatTitle(chat, user.id);
            const active = chat.id === activeId;
            return (
              <li key={chat.id}>
                <button
                  type="button"
                  onClick={() => onSelect(chat.id)}
                  aria-current={active ? 'true' : undefined}
                  className={`flex w-full items-center gap-3 border-l-4 px-4 py-3 text-left ${
                    active ? 'border-brand bg-brand-soft/60' : 'border-transparent hover:bg-fog'
                  }`}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-soft font-semibold text-brand">
                    {title.charAt(0).toUpperCase()}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline justify-between gap-2">
                      <span className="truncate font-medium">{title}</span>
                      <span className="shrink-0 text-xs text-muted">{formatTime(chat.lastMessage?.createdAt)}</span>
                    </span>
                    <span className="block truncate text-sm text-muted">
                      {chat.lastMessage ? chat.lastMessage.content : 'Sin mensajes todavía'}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="flex items-center justify-between gap-2 border-t border-line px-4 py-3 text-sm">
        <button type="button" onClick={onLogout} className="font-medium text-brand hover:underline">
          Cerrar sesión
        </button>
        <button type="button" onClick={onDeleteAccount} className="text-danger hover:underline">
          Eliminar mi cuenta
        </button>
      </div>
    </aside>
  );
}

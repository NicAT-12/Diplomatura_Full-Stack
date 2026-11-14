import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { api } from '../services/api.js';
import Sidebar from './Sidebar.jsx';
import ChatWindow from './ChatWindow.jsx';
import NewChatModal from './NewChatModal.jsx';

export default function ChatPage() {
  const { user, logout, deleteAccount } = useAuth();
  const [chats, setChats] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showNewChat, setShowNewChat] = useState(false);

  const loadChats = useCallback(async () => {
    try {
      const data = await api.get('/chats?limit=100');
      setChats(data.items);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadChats();
    const interval = setInterval(loadChats, 5000);
    return () => clearInterval(interval);
  }, [loadChats]);

  const activeChat = chats.find((chat) => chat.id === activeId) || null;

  const handleCreated = async (chat) => {
    setShowNewChat(false);
    await loadChats();
    setActiveId(chat.id);
  };

  const handleChatDeleted = async () => {
    setActiveId(null);
    await loadChats();
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Se eliminará tu cuenta y todos tus mensajes. Esta acción no se puede deshacer. ¿Querés continuar?')) {
      return;
    }
    try {
      await deleteAccount();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex h-full">
      <div className={`${activeChat ? 'hidden' : 'flex'} h-full w-full md:flex md:w-auto`}>
        <Sidebar
          user={user}
          chats={chats}
          activeId={activeId}
          loading={loading}
          error={error}
          onSelect={setActiveId}
          onNew={() => setShowNewChat(true)}
          onLogout={logout}
          onDeleteAccount={handleDeleteAccount}
        />
      </div>

      <div className={`${activeChat ? 'flex' : 'hidden'} h-full min-w-0 flex-1 md:flex`}>
        {activeChat ? (
          <ChatWindow
            chat={activeChat}
            user={user}
            onBack={() => setActiveId(null)}
            onChatDeleted={handleChatDeleted}
            onActivity={loadChats}
          />
        ) : (
          <div className="hidden flex-1 items-center justify-center text-muted md:flex">
            Elegí una conversación o creá un chat nuevo.
          </div>
        )}
      </div>

      {showNewChat && <NewChatModal onClose={() => setShowNewChat(false)} onCreated={handleCreated} />}
    </div>
  );
}

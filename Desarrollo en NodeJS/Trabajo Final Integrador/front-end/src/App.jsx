import { useAuth } from './context/AuthContext.jsx';
import AuthForm from './components/AuthForm.jsx';
import ChatPage from './components/ChatPage.jsx';

export default function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center text-muted" role="status">
        Cargando tu sesión…
      </div>
    );
  }

  return user ? <ChatPage /> : <AuthForm />;
}

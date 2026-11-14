import { createContext, useContext, useEffect, useState } from 'react';
import { api, tokenStorage } from '../services/api.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tokenStorage.get()) {
      setLoading(false);
      return;
    }
    api
      .get('/auth/me')
      .then((data) => setUser(data.user))
      .catch((error) => {
        if (error.status === 401) {
          tokenStorage.clear();
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const startSession = (data) => {
    tokenStorage.set(data.token);
    setUser(data.user);
  };

  const login = async (email, password) => {
    startSession(await api.post('/auth/login', { email, password }));
  };

  const register = async (name, email, password) => {
    startSession(await api.post('/auth/register', { name, email, password }));
  };

  const logout = () => {
    tokenStorage.clear();
    setUser(null);
  };

  const deleteAccount = async () => {
    await api.delete(`/users/${user.id}`);
    logout();
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

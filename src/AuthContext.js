import React, { createContext, useState, useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);

  const handleLogin = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
    navigate('/');
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
    // navigate('/');
  }

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

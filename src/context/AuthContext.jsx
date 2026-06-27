// src/context/AuthContext.jsx
import { createContext, useState } from 'react';
import api from '../services/Api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Inicializamos el estado leyendo DIRECTAMENTE del localStorage.
  // Esto evita pantallas en blanco y soluciona el crash de 'undefined' al recargar.
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    return token ? { token } : null;
  });

  // Función de Login que usás en la pantalla de inicio de sesión
  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token } = response.data; // Tu backend retorna el token acá
      
      // Guardamos en el almacenamiento local para persistencia
      localStorage.setItem('token', token);
      setUser({ token });
      
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
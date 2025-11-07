import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verificar autenticación con el servidor al iniciar
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        // Llamar al endpoint /auth/verify que lee la cookie httpOnly
        const response = await authService.verifyAuth();
        
        if (response.success && response.user) {
          setUser({
            id: response.user.id,
            username: response.user.username,
            email: response.user.email,
            role: response.user.role,
          });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error al verificar autenticación:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      
      if (response.success) {
        const userData = {
          id: response.user.id,
          username: response.user.username,
          email: response.user.email,
          role: response.user.role,
        };
        
        setUser(userData);
        // NO guardamos en localStorage, solo en memoria
        return { success: true, user: userData };
      }
      
      return { success: false, message: response.message };
    } catch (error) {
      console.error('Error en login:', error);
      return { 
        success: false, 
        message: error.message || 'Error al iniciar sesión' 
      };
    }
  };

  const logout = async () => {
    try {
      // Llamar al backend para cerrar sesión (limpiar cookie httpOnly)
      await authService.logout();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    } finally {
      // Limpiar estado en memoria
      setUser(null);
      
      // Limpiar otros datos no sensibles del localStorage
      localStorage.removeItem('cart');
      localStorage.removeItem('dragonball_discount');
      localStorage.removeItem('applied_discount');
    }
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      
      if (response.success) {
        // Después del registro, el usuario ya está autenticado (tiene cookie)
        const user = {
          id: response.user.id,
          username: response.user.username,
          email: response.user.email,
          role: response.user.role,
        };
        setUser(user);
        return { success: true, message: 'Usuario registrado exitosamente', user };
      }
      
      return { success: false, message: response.message };
    } catch (error) {
      console.error('Error en registro:', error);
      return { 
        success: false, 
        message: error.message || 'Error al registrar usuario' 
      };
    }
  };

  const isAuthenticated = () => {
    return user !== null;
  };

  const value = {
    user,
    loading,
    login,
    logout,
    register,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

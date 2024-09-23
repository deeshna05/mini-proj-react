import { createServerContext } from 'react';
import { createContext, useState, useContext, useEffect } from 'react';
import UserContext from './UserContext';

export const {Authentication}=useContext(UserContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);  // Set as authenticated if user exists
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true); // Set authenticated state on login
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false); // Clear authenticated state on logout
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


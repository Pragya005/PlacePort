import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const token = localStorage.getItem("token");
  const savedRole = localStorage.getItem("role");
  const savedUser = localStorage.getItem("user");

  if (token && savedUser && savedUser !== "undefined") {
    try {
      setUser(JSON.parse(savedUser));
      setRole(savedRole);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } catch (err) {
      console.error("Invalid user data in localStorage", err);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    }
  }

  setLoading(false);
}, []);

  const login = (token, role, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('user', JSON.stringify(user));
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(user);
    setRole(role);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
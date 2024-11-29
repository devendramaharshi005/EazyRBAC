/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { apiUrl } from "../../config";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem("authUserObj");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(() => {
    return sessionStorage.getItem("authToken") || null;
  });

  const login = async (username, password) => {
    try {
      const res = await axios.post(`${apiUrl}/login`, {
        username,
        password,
      });

      const { user: userData, token: authToken } = res.data;

      setUser(userData);
      setToken(authToken);

      sessionStorage.setItem("authToken", authToken);
      sessionStorage.setItem("authUserObj", JSON.stringify(userData));
      toast.success("Login successful!");
    } catch (err) {
      console.error(err.response?.data?.message || "Login failed");
      throw new Error(err.response?.data?.message || "Login failed");
    }
  };

  const register = async (username, password, role) => {
    try {
      await axios.post(`${apiUrl}/register`, {
        username,
        password,
        role,
      });
      toast.success("Registration successful! Please login.");
    } catch (err) {
      console.error(err.response?.data?.message || "Registration failed");
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("authUserObj");
    toast.success("You have been logged out.");
    window.location.pathname = "/";
  };

  useEffect(() => {
    const fetchUserFromToken = async () => {
      if (token) {
        try {
          await axios.get(`${apiUrl}/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } catch (err) {
          console.error("Failed to fetch user profile:", err);
          logout();
        }
      }
    };

    fetchUserFromToken();
  }, [token]);

  const hasRole = (role) => user?.role === role;

  return (
    <AuthContext.Provider
      value={{ user, token, login, register, logout, hasRole }}
    >
      {children}
    </AuthContext.Provider>
  );
};

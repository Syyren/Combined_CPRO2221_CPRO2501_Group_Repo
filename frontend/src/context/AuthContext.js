import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

// Create authentication context
const AuthContext = createContext();

// Custom hook to use authentication context
export const useAuth = () => useContext(AuthContext);

// Authentication provider component
export const AuthProvider = ({ children }) => {
  // State for current user
  const [currentUser, setCurrentUser] = useState(null);
  // State for loading status
  const [loading, setLoading] = useState(true);

  // Axios interceptor to attach the token to requests
  useEffect(() => {
    const axiosInterceptor = axios.interceptors.request.use(
      (config) => {
        if (
          !config.url.endsWith("/login") &&
          !config.url.endsWith("/register")
        ) {
          const token = localStorage.getItem("jwt");
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(axiosInterceptor);
    };
  }, []);

  // Load user data from local storage on component mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setCurrentUser(user);
    }
    setLoading(false);
  }, []);

  // Function to handle user login
  const login = async ({ username, password }) => {
    console.log("Sending login request with:", username, password);
    try {
      // Temporarily bypass the interceptor by using an instance of axios
      const axiosInstance = axios.create();
      const { data } = await axiosInstance.post(
        "http://localhost:8090/api/players/login",
        { username, password }
      );
      const user = {
        userId: data.userId,
        username: data.username,
        achievements: data.achievements,
        ...data,
      };
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("jwt", data.jwt);
      setCurrentUser(user);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  // Function to handle user logout
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("jwt");
    setCurrentUser(null);
  };

  // Authentication context value
  const value = {
    currentUser,
    login,
    logout,
  };

  // Render authentication provider with children when not loading
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

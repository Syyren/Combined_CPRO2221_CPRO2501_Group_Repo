import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
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

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setCurrentUser(user);
    }
    setLoading(false);
  }, []);

  const login = async ({ username, password }) => {
    console.log("Sending login request with:", username, password);
    try {
      // Temporarily bypass the interceptor by using an instance of axios
      const axiosInstance = axios.create();
      const { data } = await axiosInstance.post(
        "http://localhost:8090/api/players/login",
        { username, password }
      );
      const user = { username: data.username, ...data };
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("jwt", data.jwt);
      setCurrentUser(user);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("jwt");
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

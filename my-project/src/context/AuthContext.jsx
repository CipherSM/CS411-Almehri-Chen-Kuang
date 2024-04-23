// src/context/AuthContext.jsx

import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const verifyUser = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5178/api/auth/verify", // Need to use the one with the exact port
        {
          withCredentials: true,
        },
      );
      console.log("Verification data:", data); // Logging verification data for debugging
      if (data.isAuthenticated) {
        setIsAuthenticated(true);
        setUser(data.user);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
      console.error("Authentication verification failed:", error);
    }
  };

  const logout = async () => {
    // this function will be used to log out the user
    try {
      const response = await axios.get("/api/auth/logout", {
        // this one must use the same exact route as the one in auth.js
        withCredentials: true,
      });
      console.log("Logout response:", response.data);
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error.response || error.message);
    }
  };

  // Automatically check user authentication on context provider mount
  useEffect(() => {
    verifyUser();
  }, []); // Ensure this runs only once on mount, this used to run like a billion times when app runs

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, verifyUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

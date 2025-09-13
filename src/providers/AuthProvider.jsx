import { useEffect, useState, useCallback } from "react";
import { AuthContext } from "../context/AuthContext";

const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join("")
    );

    const { exp } = JSON.parse(jsonPayload);
    if (!exp) return true;

    const currentTime = Math.floor(Date.now() / 1000);
    return exp < currentTime;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return true; // treat as expired if anything fails
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  const logout = useCallback(() => {
    // Remove all auth-related items from localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("user_id");
    localStorage.removeItem("access_token"); // Add this line!
    setUser(null);
  }, []);

  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("access_token");

        if (!token || isTokenExpired(token)) {
          logout();
        } else if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        logout();
      } finally {
        setAuthChecked(true);
      }
    };

    initializeAuth();
  }, [logout]); // Add logout to dependencies

  const login = useCallback((userData, token = null) => {
    localStorage.setItem("user", JSON.stringify(userData));

    // If token is provided, store it
    if (token) {
      localStorage.setItem("access_token", token);
    }

    // If userData contains user_id, store it separately if needed
    if (userData.user_id || userData.id) {
      localStorage.setItem("user_id", userData.user_id || userData.id);
    }

    setUser(userData);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        authChecked,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

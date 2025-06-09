import React, { createContext, useContext, useState, useEffect } from "react";
import { getProfile } from "../api/user";

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ name: "", email: "", image: null });
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const response = await getProfile();
      const userData = response?.data;
      if (userData?.name && userData?.email) {
        setUser({
          name: userData.name,
          email: userData.email,
          image: userData.profile_picture || null,
        });
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        setUser({ name: "", email: "", image: null });
      }
    } finally {
      setIsLoading(false);
      setIsInitialized(true);
    }
  };

  const updateUser = (newUserData) => {
    setUser((prevUser) => ({ ...prevUser, ...newUserData }));
  };

  const clearUser = () => {
    setUser({ name: "", email: "", image: null });
    setIsLoading(false);
    setIsInitialized(true);
  };
  useEffect(() => {
    const checkToken = () => {
      let token = localStorage.getItem("token");
      if (!token) {
        token = sessionStorage.getItem("token");
      }
      if (token) {
        if (!isInitialized) {
          fetchUser();
        }
      } else {
        setIsInitialized(true);
        setUser({ name: "", email: "", image: null });
      }
    };
    checkToken();
    const handleStorageChange = (e) => {
      if (e.key === "token") {
        const localToken = localStorage.getItem("token");
        const sessionToken = sessionStorage.getItem("token");
        if (e.newValue || localToken || sessionToken) {
          fetchUser();
        } else {
          clearUser();
        }
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [isInitialized]);
  const value = {
    user,
    isLoading,
    isInitialized,
    fetchUser,
    updateUser,
    clearUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

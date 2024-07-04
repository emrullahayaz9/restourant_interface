import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [restaurantUuid, setRestaurantUuid] = useState(
    localStorage.getItem("restaurantUuid") || ""
  );
  const navigate = useNavigate();

  const login = (token, uuid) => {
    setToken(token);
    setRestaurantUuid(uuid);
    localStorage.setItem("restaurantUuid", uuid);
    localStorage.setItem("token", token);
    navigate("/restaurant");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("restaurantUuid");
    setToken("");
    setRestaurantUuid("");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ restaurantUuid, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

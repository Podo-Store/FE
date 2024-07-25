import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { SERVER_URL } from "../Components/constants/ServerURL";
import {
  ACCESS_TOKEN_EXP_TIME,
  REFRESH_TOKEN_EXP_TIME,
} from "../Components/constants/TokenExpireTime";
import { setupAxiosInterceptors } from "../utils/AxiosInterceptors";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken");
    if (accessToken && refreshToken) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (accessToken, refreshToken) => {
    Cookies.set("accessToken", accessToken, { expires: ACCESS_TOKEN_EXP_TIME });
    Cookies.set("refreshToken", refreshToken, { expires: REFRESH_TOKEN_EXP_TIME });
    setIsAuthenticated(true);
  };

  const logout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    setIsAuthenticated(false);
  };

  const refreshAccessToken = async () => {
    const refreshToken = Cookies.get("refreshToken");
    if (!refreshToken) {
      logout();

      return null;
    }

    try {
      const response = await axios.post(
        `${SERVER_URL}/auth/newToken`,
        {},
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );
      const { accessToken } = response.data;
      Cookies.set("accessToken", accessToken, { expires: ACCESS_TOKEN_EXP_TIME });
      return accessToken;
    } catch (error) {
      logout();

      return null;
    }
  };

  // Axios 인터셉터 설정
  setupAxiosInterceptors(refreshAccessToken);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, refreshAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

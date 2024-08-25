import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { SERVER_URL } from "../constants/ServerURL";
import { setupAxiosInterceptors } from "../utils/AxiosInterceptors";
import { ACCESS_TOKEN_EXP_TIME, REFRESH_TOKEN_EXP_TIME } from "../constants/TokenExpireTime";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userNickname, setUserNickname] = useState(() => {
    // 페이지 로드 시 로컬 스토리지에서 유저 닉네임을 불러옴
    return localStorage.getItem("userNickname") || "username";
  });

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken");
    if (accessToken && refreshToken) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (accessToken, refreshToken, userNickname) => {
    Cookies.set("accessToken", accessToken, { expires: ACCESS_TOKEN_EXP_TIME });
    Cookies.set("refreshToken", refreshToken, { expires: REFRESH_TOKEN_EXP_TIME });

    setUserNickname(userNickname);
    localStorage.setItem("userNickname", userNickname);

    setIsAuthenticated(true);
  };

  const logout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");

    setUserNickname("username");
    localStorage.removeItem("userNickname");

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
        `${SERVER_URL}auth/newToken`,
        {},
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );
      const { accessToken } = response.data;
      console.log("New accessToken received:", accessToken); // 로그 추가
      Cookies.set("accessToken", accessToken, { expires: ACCESS_TOKEN_EXP_TIME });
      return accessToken;
    } catch (error) {
      console.error("Failed to refresh access token:", error); // 로그 추가
      logout();

      return null;
    }
  };

  // Axios 인터셉터 설정
  setupAxiosInterceptors(refreshAccessToken);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userNickname, login, logout, refreshAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

import axios from "axios";
import { SERVER_URL } from "../constants/ServerURL.js";

/**
 * Axios 응답 인터셉터를 생성하는 함수
 * @param {axios.AxiosInstance} instance - Axios 인스턴스
 * @param {function} refreshAccessToken - 엑세스 토큰을 갱신하는 함수
 * @returns {number} - 인터셉터 ID
 */

const createAxiosResponseInterceptor = (instance, refreshAccessToken) => {
  const interceptor = instance.interceptors.response.use(
    // 응답 성공 시 return
    (response) => response,
    // 에러 시
    async (error) => {
      // HTTP request에서 오류 발생 시 재요청을 위한 변수
      const originalRequest = error.config;

      // 엑세스 토큰 만료로 401 (Unauthorized) 에러가 발생 시
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true; // 무한 루프 방지 Flag

        // 엑세스 토큰 갱신 함수
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          // 새로운 엑세스 토큰을 헤더에 설정
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${newAccessToken}`;
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

          // 기존 요청을 새로운 토큰으로 재시도
          return axios(originalRequest);
        }
      }

      return Promise.reject(error);
    }
  );

  return interceptor;
};

/**
 * Axios 인스턴스와 인터셉터를 설정하는 함수
 * @param {function} refreshAccessToken - 엑세스 토큰을 갱신하는 함수
 * @returns {axios.AxiosInstance} - 설정된 Axios 인스턴스
 */
export const setupAxiosInterceptors = (refreshAccessToken) => {
  // Axios 인스턴스 생성
  const instance = axios.create({
    baseURL: SERVER_URL,
  });

  // responseInterceptor 생성
  createAxiosResponseInterceptor(instance, refreshAccessToken);

  return instance;
};

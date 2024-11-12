import axios from "axios";
import Cookies from "js-cookie";

/** Axios 인터셉터가 이미 설정되었는지를 추적 */
let isInterceptorSetup = false;
/** 현재 token refreshing 작업이 진행 중인지 추적 */
let isRefreshing = false;
/** token refreshing이 완료될 때까지 대기 중인 실패한 요청들을 저장 */
let failedQueue = [];

/**
 * queue에 있는 요청들을 처리하는 함수
 * @param {Error|null} error - 발생한 에러
 * @param {string|null} token - 새로운 accessToken
 */
const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

/**
 * Axios 응답 인터셉터를 생성하는 함수
 * @param {object} authActions - 인증 관련 함수들
 * @param {function} authActions.refreshAccessToken - 엑세스 토큰을 갱신하는 함수
 * @param {function} authActions.logout - 로그아웃 함수
 */
const createAxiosResponseInterceptor = (authActions) => {
  axios.interceptors.response.use(
    // 응답 성공 시 그대로 반환
    (response) => response,
    // 에러 시
    async (error) => {
      const originalRequest = error.config;

      // 응답이 없거나 상태 코드가 401이 아니면 에러를 그대로 반환
      if (!error.response || error.response.status !== 401) {
        return Promise.reject(error);
      }

      // 이미 retry 중인 요청이면 queue에 추가
      if (originalRequest._retry) {
        return Promise.reject(error);
      }

      // retry flag 설정
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return axios(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      isRefreshing = true;

      return new Promise(async (resolve, reject) => {
        try {
          const newAccessToken = await authActions.refreshAccessToken();
          if (newAccessToken) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
            originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
            processQueue(null, newAccessToken);
            resolve(axios(originalRequest));
          } else {
            processQueue(new Error("Failed to refresh token"), null);
            authActions.logout();
            window.location.href = "/signin";
            reject(error);
          }
        } catch (err) {
          processQueue(err, null);
          authActions.logout();
          window.location.href = "/signin";
          reject(err);
        } finally {
          isRefreshing = false;
        }
      });
    }
  );
};

/**
 * Axios 인터셉터를 설정하는 함수
 * @param {object} authActions - 인증 관련 함수들
 * @param {function} authActions.refreshAccessToken - 엑세스 토큰을 갱신하는 함수
 * @param {function} authActions.logout - 로그아웃 함수
 */
export const setupAxiosInterceptors = (authActions) => {
  if (isInterceptorSetup) {
    return;
  }

  // 요청 인터셉터 설정 (accessToken 자동 첨부)
  axios.interceptors.request.use(
    (config) => {
      const token = Cookies.get("accessToken");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // 응답 인터셉터 설정
  createAxiosResponseInterceptor(authActions);

  isInterceptorSetup = true;
};

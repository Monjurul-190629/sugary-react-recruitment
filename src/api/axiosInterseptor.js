import Api from './axios';
import { refreshToken } from '../features/auth/authApi';

export const setupInterceptors = () => {
  Api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  Api.interceptors.response.use(
    response => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const accessToken = localStorage.getItem("accessToken");
          const refreshTok = localStorage.getItem("refreshToken");

          const data = await refreshToken(accessToken, refreshTok);

          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);

          originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;
          return Api(originalRequest);
        } catch (err) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/login";
          return Promise.reject(err);
        }
      }

      return Promise.reject(error);
    }
  );
};

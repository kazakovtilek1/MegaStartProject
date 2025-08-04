import axios from "axios";
import Cookies from "js-cookie";

type FailedRequest = {
  resolve: (token: string) => void;
  reject: (error: Error) => void;
};

const api = axios.create({
  baseURL: "http://34.18.76.114/v1/api",
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

function processQueue(error: Error | null, token: string | null = null) {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token as string);
    }
  });
  failedQueue = [];
}

async function refreshAccessToken() {
  const refreshToken = Cookies.get("refreshToken");

  if (!refreshToken) throw new Error("No refresh token");

  const response = await axios.post(
    "http://34.18.76.114/v1/api/refresh",
    {},
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
      withCredentials: true,
    },
  );

  const { accessToken, refreshToken: newRefresh } = response.data;
  Cookies.set("accessToken", accessToken);
  Cookies.set("refreshToken", newRefresh);
  return accessToken;
}

// Interceptors
api.interceptors.request.use((config) => {
  const accessToken = Cookies.get("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      Cookies.get("refreshToken")
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newToken = await refreshAccessToken();
        processQueue(null, newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (err) {
        processQueue(err as Error, null);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default api;

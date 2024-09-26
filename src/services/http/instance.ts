import axios from "axios";
import qs from "qs";
import AppConfig from "@/configs/app";

const httpServiceDefault = axios.create({
  baseURL: AppConfig.baseURL,
});

export { httpServiceDefault };

type CbType = (token: string) => void;

function subscribeTokenRefresh(cb: CbType) {
  refreshSubscribers.push(cb);
}

let isRefreshing = false;
const refreshSubscribers: CbType[] = [];

const axiosInstance = axios.create({
  headers: { "Content-Type": "application/json" },
  paramsSerializer: {
    serialize: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
  },
  baseURL: AppConfig.baseURL,
});

axiosInstance.interceptors.request.use(
  function (config) {
    const accessToken = window.localStorage.getItem(AppConfig.storageTokenKey);
    if (accessToken) {
      config.headers.Authorization = "Bearer " + accessToken;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  async function (error) {
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.detail === "Token has expired"
    ) {
      const { config } = error;
      const originalRequest = config;

      if (!isRefreshing) {
        isRefreshing = true;
      }

      const retryOrigReq = new Promise((resolve) => {
        subscribeTokenRefresh((token: string) => {
          // // replace the expired token and retry
          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: "Bearer " + token,
          };
          const refreshAxios = axios.create();

          // Add a response interceptor
          refreshAxios.interceptors.response.use(
            function (response) {
              return response.data;
            },
            function (error) {
              return Promise.reject(error);
            }
          );

          resolve(refreshAxios(originalRequest));
        });
      });

      return retryOrigReq;
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

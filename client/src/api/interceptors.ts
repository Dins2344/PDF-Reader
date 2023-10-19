import axios, { AxiosInstance } from "axios";
import configKey from "../envConfig";
const api: AxiosInstance = axios.create({
  baseURL: configKey.baseURL,
});

api.interceptors.request.use(
  (config) => {
    const tokenString = localStorage.getItem("token");
    if (tokenString) {
      // const token = JSON.parse(tokenString);
      config.headers.Authorization = `Bearer ${tokenString}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

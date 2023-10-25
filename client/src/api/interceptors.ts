// import the axios and its  features
import axios, { AxiosInstance } from "axios";

// import the configKey for accessing the env
import configKey from "../envConfig";

const api: AxiosInstance = axios.create({
  baseURL: configKey.baseURL,
});// creating the api

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

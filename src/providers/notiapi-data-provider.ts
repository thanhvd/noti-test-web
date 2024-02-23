import axios, { AxiosInstance } from 'axios'
import simpleRest from "@refinedev/simple-rest";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

export const restDataProvider = (apiUrl: string, httpClient: AxiosInstance = axiosInstance,) => simpleRest(apiUrl, httpClient)
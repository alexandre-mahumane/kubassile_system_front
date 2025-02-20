import axios from "axios";

const getToken = () => localStorage.getItem("accessToken");

export const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

api.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

api.interceptors.request.use((config) => {
  const newConfig = config;
  const token = localStorage.getItem("token");

  if (token) {
    newConfig.headers = {
      ...newConfig.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  return newConfig;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.setItem("user", "");
      localStorage.setItem("token", "");
    }
    return Promise.reject(error);
  }
);

export default api;

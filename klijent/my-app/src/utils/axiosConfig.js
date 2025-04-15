import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
});

// Automatski dodaj token iz localStorage za svaki zahtev
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;

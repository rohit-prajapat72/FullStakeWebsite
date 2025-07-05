import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const refresh = localStorage.getItem("refresh");
        const res = await axios.post("http://localhost:8000/api/token/refresh/", {
          refresh: refresh,
        });
        localStorage.setItem("access", res.data.access);

        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${res.data.access}`;
        originalRequest.headers["Authorization"] = `Bearer ${res.data.access}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        // Refresh token bhi expire ho gaya? Logout user
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

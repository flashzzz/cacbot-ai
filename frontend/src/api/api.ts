import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_APP_BACKEND_SERVER,
});

export const logOut = () => {
  localStorage.removeItem("token");
  window.location.reload();
  window.location.href = "/";
};

api.interceptors.request.use((config) => {
  const access_token = localStorage.getItem("token");

  if (access_token && config.headers) {
    config.headers["Auth-Token"] = `${access_token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // if (error.response.status === 401) {
    //   logOut();
    // }
    return Promise.reject(error);
  }
);

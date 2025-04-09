import axios from "./axiosInstance";

export const register = (data) => axios.post("/auth/register", data);
export const login = (data) => axios.post("/auth/login", data);
export const logout = () => {
  localStorage.removeItem("token");
  return Promise.resolve();
};

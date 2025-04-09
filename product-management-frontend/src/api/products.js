import axios from "./axiosInstance";

export const createProduct = (data) => axios.post("/products", data);
export const getProducts = () => axios.get("/products");
export const getProductById = (id) => axios.get(`/products/${id}`);
export const updateProduct = (id, data) => axios.put(`/products/${id}`, data);
export const deleteProduct = (id) => axios.delete(`/products/${id}`);
export const searchProducts = (query) => axios.get(`/products/search?q=${query}`);
export const filterProducts = (filters) => axios.get(`/products?${new URLSearchParams(filters).toString()}`);

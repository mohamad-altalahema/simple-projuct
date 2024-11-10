import axios from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com",
});

export const fetchProducts = async (query= "") => {
  const response = await api.get(`/products/search?q=${query}`);
  return response.data.products;
};

export const fetchProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};
export default api;

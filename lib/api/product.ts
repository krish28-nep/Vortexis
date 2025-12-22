import { ProductCreateInput, productUpdateInput } from "@/schema/product.schema";
import { axiosInstance } from "../axiosinstance";
import { ProductFilters } from "@/types/filter";

export const fetchProducts = async (filters?: ProductFilters) => {
  const params: Record<string, any> = {};

  if (filters?.categoryIds?.length) {
    params.categoryIds = filters.categoryIds.join(",");
  }
  if (filters?.minPrice !== undefined) params.minPrice = filters.minPrice;
  if (filters?.maxPrice !== undefined) params.maxPrice = filters.maxPrice;
  if (filters?.rating) params.rating = filters.rating;

  const { data } = await axiosInstance.get("/products", { params });
  return data.products;
};

export const addProduct = async (dataToSend: ProductCreateInput) => {
  const { data } = await axiosInstance.post('/products', dataToSend);
  return data.product;
};

export const updateProduct = async ({
  id,
  dataToSend,
}: {
  id: number;
  dataToSend: productUpdateInput;
}) => {
  const { data } = await axiosInstance.patch(`/products/${id}`, dataToSend);
  return data.product;
};

export const deleteProduct = async (id: number) => {
  const { data } = await axiosInstance.delete(`/products/${id}`);
  return data.product;
};

export const fetchProduct = async (id: number) => {
  const { data } = await axiosInstance.get(`/products/${id}`);
  return data.product;
};
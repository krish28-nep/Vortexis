import {
  ProductCreateInput,
  productUpdateInput,
} from "@/schema/product.schema";
import { axiosInstance } from "../axiosinstance";
import { ProductFilters } from "@/types/filter";

export type ProductSuggestion = {
  id: number;
  name: string;
  imageUrl?: string;
};

export const fetchProducts = async (filters?: ProductFilters) => {
  const params: Record<string, any> = {};

  if (filters?.search) params.search = filters.search;

  if (filters?.categoryIds?.length) {
    params.categoryIds = filters.categoryIds.join(",");
  }
  if (filters?.minPrice !== undefined) params.minPrice = filters.minPrice;
  if (filters?.maxPrice !== undefined) params.maxPrice = filters.maxPrice;
  if (filters?.rating) params.rating = filters.rating;
  if (filters?.isFlashSale !== undefined)
    params.isFlashSale = filters.isFlashSale;

  const { data } = await axiosInstance.get("/products", { params });
  return data.products;
};

export const fetchProductSuggestions = async (
  search: string,
  limit = 6,
): Promise<ProductSuggestion[]> => {
  const trimmed = search.trim();
  if (!trimmed) return [];

  const products = await fetchProducts({ search: trimmed });
  return (products ?? []).slice(0, limit).map((p: any) => ({
    id: p.id,
    name: p.name,
    imageUrl: p.imageUrls?.[0],
  }));
};

export const addProduct = async (dataToSend: ProductCreateInput) => {
  const { data } = await axiosInstance.post("/products", dataToSend);
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

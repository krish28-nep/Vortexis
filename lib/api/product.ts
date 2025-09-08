import { ProductCreateInput, productUpdateInput } from "@/schema/product.schema";
import { axiosintance } from "../axiosinstance";

export const fetchProducts = async () => {
  const { data } = await axiosintance.get('/products');
  return data.products;
};

export const addProduct = async (dataToSend: ProductCreateInput) => {
  const { data } = await axiosintance.post('/products', dataToSend);
  return data.product;
};

export const updateProduct = async ({
  id,
  dataToSend,
}: {
  id: number;
  dataToSend: productUpdateInput;
}) => {
  const { data } = await axiosintance.patch(`/products/${id}`, dataToSend);
  return data.product;
};

export const deleteProduct = async (id: number) => {
  const { data } = await axiosintance.delete(`/products/${id}`);
  return data.product;
};

export const fetchProduct = async (id: number) => {
  const { data } = await axiosintance.get(`/products/${id}`);
  return data.product;
};
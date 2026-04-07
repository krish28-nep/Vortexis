import { CategoryInput, UpdateCategoryInput } from "@/schema/category.schema";
import { axiosInstance } from "../axiosinstance";

export const fetchCategories = async () => {
    const { data } = await axiosInstance.get('/categories');
    return data.categories;
};

export const addCategory = async (dataToSend: CategoryInput) => {
    const { data } = await axiosInstance.post('/categories', dataToSend);
    return data.category;
};

export const updateCategory = async ({
    id,
    dataToSend,
}: {
    id: number;
    dataToSend: UpdateCategoryInput;
}) => {
    const { data } = await axiosInstance.patch(`/categories/${id}`, dataToSend);
    return data.category;
};

export const deleteCategory = async (id: number) => {
    const { data } = await axiosInstance.delete(`/categories/${id}`);
    return data.category;
};

export const fetchCategory = async (
    id: number
) => {
    const { data } = await axiosInstance.get(`/categories/${id}`);
    return data.category;
};

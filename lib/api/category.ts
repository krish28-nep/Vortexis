import { CategoryInput, UpdateCategoryInput } from "@/schema/category.schema";
import { axiosintance } from "../axiosinstance";

export const fetchCategories = async () => {
    const { data } = await axiosintance.get('/categories');
    return data.categories;
};

export const addCategory = async (dataToSend: CategoryInput) => {
    const { data } = await axiosintance.post('/categories', dataToSend);
    return data.category;
};

export const updateCategory = async ({
    id,
    dataToSend,
}: {
    id: number;
    dataToSend: UpdateCategoryInput;
}) => {
    const { data } = await axiosintance.patch(`/categories/${id}`, dataToSend);
    return data.category;
};

export const deleteCategory = async (id: number) => {
    const { data } = await axiosintance.delete(`/categories/${id}`);
    return data.category;
};

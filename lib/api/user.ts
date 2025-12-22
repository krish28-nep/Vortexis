import { UserCreateInput, userUpdateInput } from "@/schema/user.schema"
import { axiosInstance } from "../axiosinstance"


export const fetchUsers = async () => {
    const { data } = await axiosInstance.get('/users')
    return data.users
}

export const addUser = async (dataToSend: UserCreateInput) => {
    const { data } = await axiosInstance.post('/users', dataToSend)
    return data.user
}

export const updateUser = async ({ id, dataToSend }: { id: number, dataToSend: userUpdateInput }) => {
    const { data } = await axiosInstance.patch(`/users/${id}`, dataToSend)
    return data.user
}

export const deleteUser = async (id: number) => {
    const { data } = await axiosInstance.delete(`/users/${id}`)
    return data.user
}

export const fetchUser = async (id: number) => {
    const { data } = await axiosInstance.get(`/users/${id}`)
    return data.user
}

export const fetchMe = async ()=>{
    const {data}= await axiosInstance.get('/users/me')
    return data.user
}
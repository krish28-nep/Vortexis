import { UserCreateInput, userUpdateInput } from "@/schema/user.schema"
import { axiosintance } from "../axiosinstance"


export const fetchUsers = async () => {
    const { data } = await axiosintance.get('/users')
    return data.users
}

export const addUser = async (dataToSend: UserCreateInput) => {
    const { data } = await axiosintance.post('/users', dataToSend)
    return data.user
}

export const updateUser = async ({ id, dataToSend }: { id: number, dataToSend: userUpdateInput }) => {
    const { data } = await axiosintance.patch(`/users/${id}`, dataToSend)
    return data.user
}

export const deleteUser = async (id: number) => {
    const { data } = await axiosintance.delete(`/users/${id}`)
    return data.user
}

export const fetchUser = async (id: number) => {
    const { data } = await axiosintance.get(`/users/${id}`)
    return data.user
}
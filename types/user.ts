export type User = {
    id: number;
    name: string;
    email: string;
    avatarUrl: string
    role: string;
};

export enum RoleEnum {
    Admin = "Admin",
    Customer = "Customer"
}
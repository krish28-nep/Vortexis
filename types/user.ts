export type User = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    isVerified: boolean;
    role: string;
};

export enum RoleEnum {
    Admin = "Admin",
    Customer = "Customer"
}
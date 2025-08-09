import { z } from 'zod';

export enum RoleEnum {
  admin = 'admin',
  customer = 'customer',
}

export const userCreateSchema = z
  .object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.string().email({ message: 'Invalid email format' }),
    avatarUrl: z.string().url({ message: 'Invalid avatar URL' }).optional().or(z.literal('')),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
    confirmPassword: z.string().min(6, { message: 'Confirm password is required' }),
    phoneNumber: z.string().optional().or(z.literal('')),
    role: z.nativeEnum(RoleEnum),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

export const userUpdateSchema = userCreateSchema.partial()
export type userUpdateInput = z.infer<typeof userUpdateSchema>

export type UserCreateInput = z.infer<typeof userCreateSchema>;

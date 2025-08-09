import { z } from 'zod';

export const productCreateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().nullable(),
  price: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid price format (max 2 decimal places)"),
  discountPercent: z.number().min(0).max(100),
  stock: z.number().int().min(0),
  imageUrls: z.array(z.string()).min(1, "At least one image is required"),
  rating: z.number(),
  isFlashSale: z.boolean(),
});

// Optional: Schema for product updates
export const productUpdateSchema = productCreateSchema.partial();

export type ProductCreateInput = z.infer<typeof productCreateSchema>;
export type productUpdateInput = z.infer<typeof productUpdateSchema>;

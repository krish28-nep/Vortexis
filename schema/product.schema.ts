import { z } from 'zod';

export const productCreateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().nullable(),
  categoryId: z.number(),
  price: z.number(),
  discountPercent: z.number().min(0).max(100),
  stock: z.number().int().min(0),
  imageUrls: z.array(z.string()).min(1, "At least one image is required").optional(),
  isFlashSale: z.boolean(),
});

export const productUpdateSchema = productCreateSchema.partial();

export type ProductCreateInput = z.infer<typeof productCreateSchema>;
export type productUpdateInput = z.infer<typeof productUpdateSchema>;

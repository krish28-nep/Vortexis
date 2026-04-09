import { z } from "zod";

const numberFromString = (schema: z.ZodNumber) =>
  z.preprocess((value) => {
    if (value === "" || value === null || value === undefined) return undefined;
    if (typeof value === "string") {
      const trimmed = value.trim();
      if (trimmed === "") return undefined;

      const num = Number(trimmed);
      return Number.isNaN(num) ? value : num;
    }
    return value;
  }, schema);

const booleanFromString = (schema: z.ZodBoolean) =>
  z.preprocess((value) => {
    if (value === "true") return true;
    if (value === "false") return false;
    return value;
  }, schema);

export const productCreateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().nullable(),
  categoryId: numberFromString(z.number()),
  price: numberFromString(z.number()),
  discountPercent: numberFromString(z.number().min(0).max(100)),
  stock: numberFromString(z.number().int().min(0)),
  imageUrls: z
    .array(z.string())
    .min(1, "At least one image is required")
    .optional(),
  isFlashSale: booleanFromString(z.boolean()),
});

export const productUpdateSchema = productCreateSchema.partial();

export type ProductCreateInput = z.infer<typeof productCreateSchema>;
export type productUpdateInput = z.infer<typeof productUpdateSchema>;

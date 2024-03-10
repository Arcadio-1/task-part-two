import z from "zod";
import { lowLevelRegex } from "./types";

export const ColorSchema = z
  .string()
  .regex(/^rgba\(\s*(?:\d{1,3}\s*,\s*){3}(?:[0-9.]+)\s*\)$/, {
    message: "Wrong color format",
  });

export const CategorySchema = z.object({
  id: z.string(),
  title: z
    .string()
    .trim()
    .min(1, { message: "please Enter Category Title" })
    .regex(lowLevelRegex, {
      message: "please Enter Valid Category Title",
    }),
  description: z
    .string()
    .trim()
    .min(1, { message: "please Enter description Title" })
    .regex(lowLevelRegex, {
      message: "please Enter Valid description",
    }),
  keywords: z.array(
    z
      .string()
      .trim()
      .min(1, { message: "please Enter Valid Category keywords" })
      .regex(lowLevelRegex, {
        message: "please Enter Valid keywords",
      })
  ),
  color: ColorSchema,
});
export const CategoryFormFieldsValueSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .min(1, { message: "please Enter Category Title" })
    .regex(lowLevelRegex, {
      message: "please Enter Valid Category Title",
    }),
  description: z
    .string()
    .trim()
    .min(1, { message: "please Enter Category description" })
    .regex(lowLevelRegex, {
      message: "please Enter Valid description",
    }),
  keywords: z
    .string()
    .trim()
    .min(1, { message: "please Enter Valid Category keywords" })
    .regex(lowLevelRegex, {
      message: "please Enter Valid keywords",
    }),
  color: ColorSchema,
});

export const CategoryListSchema = z.array(CategorySchema);

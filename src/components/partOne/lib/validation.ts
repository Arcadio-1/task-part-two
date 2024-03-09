import z from "zod";
import { lowLevelRegex } from "./types";

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
  color: z.string().regex(/^rgba\(\s*(?:\d{1,3}\s*,\s*){3}(?:[0-9.]+)\s*\)$/, {
    message: "Wrong color format",
  }),
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
  color: z.object({
    r: z.number().min(0).max(255),
    g: z.number().min(0).max(255),
    b: z.number().min(0).max(255),
    a: z.number().min(0).max(1),
    metaColor: z.object({
      r: z.number().min(0).max(255),
      g: z.number().min(0).max(255),
      b: z.number().min(0).max(255),
      a: z.number().min(0).max(1),
    }),
  }),
});

export const CategoryListSchema = z.array(CategorySchema);

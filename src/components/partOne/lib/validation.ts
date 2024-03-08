import z from "zod";
import { lowLevelRegex } from "./types";

export const CategorySchema = z.object({
  id: z.string(),
  title: z
    .string()
    .min(1, { message: "please Enter Category Title" })
    .regex(lowLevelRegex, {
      message: "please Enter valid Category Title",
    }),
  description: z
    .string()
    .min(1, { message: "please Enter Category Title" })
    .regex(lowLevelRegex, {
      message: "please Enter valid description",
    }),
  keywords: z.array(
    z
      .string()
      .min(1, { message: "please Enter Category Title" })
      .regex(lowLevelRegex, {
        message: "please Enter valid keywords",
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
      message: "please Enter valid Category Title",
    }),
  description: z
    .string()
    .min(1, { message: "please Enter Category Title" })
    .regex(lowLevelRegex, {
      message: "please Enter valid description",
    }),
  keywords: z
    .string()
    .min(1, { message: "please Enter Category Title" })
    .regex(lowLevelRegex, {
      message: "please Enter valid keywords",
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

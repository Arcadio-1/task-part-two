import { z } from "zod";
import { ColorOptions } from "../lib/types";
import { ColorSchema } from "../lib/validation";

export const presetColors: {
  red: z.infer<typeof ColorSchema>;
  yellow: z.infer<typeof ColorSchema>;
  green: z.infer<typeof ColorSchema>;
  blue: z.infer<typeof ColorSchema>;
  pink: z.infer<typeof ColorSchema>;
} = {
  red: "rgba(167, 4, 4, 1)",
  yellow: "rgba(170, 175, 4, 1)",
  green: "rgba(20, 200, 14, 1)",
  blue: "rgba(31, 179, 158, 1)",
  pink: "rgba(174, 31, 158, 1)",
};

export const presetColorOptions: ColorOptions[] = [
  {
    label: "red",
    value: presetColors.red,
  },
  {
    label: "yellow",
    value: presetColors.yellow,
  },
  {
    label: "green",
    value: presetColors.green,
  },
  {
    label: "blue",
    value: presetColors.blue,
  },
  {
    label: "pink",
    value: presetColors.pink,
  },
];

export const colorPickerDefaultColor: z.infer<typeof ColorSchema> =
  "rgba(124, 9, 188, 1)";

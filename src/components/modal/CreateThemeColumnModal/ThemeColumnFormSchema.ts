import { z } from "zod";
import { typeOptions } from "./CreateThemeColumnModal";

export const ThemeColumnFormSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  type: z
    .string()
    .min(1)
    .refine((value) => typeOptions.includes(value), {
      message: "Invalid type",
    }),
});

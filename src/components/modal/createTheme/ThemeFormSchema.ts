import { z } from "zod";

export const ThemeFormSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  type: z.string().min(1),
});

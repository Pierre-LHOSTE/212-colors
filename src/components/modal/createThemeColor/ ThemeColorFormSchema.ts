import { z } from "zod";

export const ColorFormSchema = z.object({
  color: z.string().min(4).max(9).regex(/^#/),
  name: z.string().min(1),
  description: z.string().optional(),
});

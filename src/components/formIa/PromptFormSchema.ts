import { z } from "zod";

export const PromptFormSchema = z.object({
  general: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  color: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
});

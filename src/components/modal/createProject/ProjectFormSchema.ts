import { z } from "zod";

export const ProjectFormSchema = z.object({
  name: z.string().min(1),
});

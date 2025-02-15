import { z } from "zod";

export const schema = z.object({
  email: z.string(),
  password: z.string().min(6),
});

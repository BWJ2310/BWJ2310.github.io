import { z } from "zod"

export const projectSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  status: z.string().min(1),
  year: z.string().min(1),
  role: z.string().min(1),
  team: z.string().min(1),
  tools: z.array(z.string()).default([]),
  cover: z.string().min(1),
  featured: z.boolean().default(false),
  headerVariant: z.string().optional(),
  bodyWidth: z.string().optional(),
  fontMode: z.string().optional(),
})

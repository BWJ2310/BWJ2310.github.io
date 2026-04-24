import { z } from "zod"

export const blogSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.string().min(1),
  tags: z.array(z.string()).default([]),
  image: z.string().min(1),
})

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

export const projectChildSchema = z.object({
  title: z.string().min(1),
  order: z.number().int().positive(),
  navTitle: z.string().optional(),
  description: z.string().optional(),
  template: z.string().optional(),
  headerVariant: z.string().optional(),
  bodyWidth: z.string().optional(),
  fontMode: z.string().optional(),
})

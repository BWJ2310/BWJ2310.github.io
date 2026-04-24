import { z } from "zod"

import type { ContentConfig } from "./types"

const envSchema = z.object({
  CONTENT_REPO_OWNER: z.string().min(1),
  CONTENT_REPO_NAME: z.string().min(1),
  CONTENT_REPO_REF: z.string().min(1).default("main"),
})

export function getContentConfig(
  input: Partial<Record<string, string | undefined>> = process.env,
): ContentConfig {
  const parsed = envSchema.safeParse({
    CONTENT_REPO_OWNER: input.CONTENT_REPO_OWNER,
    CONTENT_REPO_NAME: input.CONTENT_REPO_NAME,
    CONTENT_REPO_REF: input.CONTENT_REPO_REF ?? "main",
  })

  if (!parsed.success) {
    throw new Error("Missing content repository config. Set CONTENT_REPO_OWNER and CONTENT_REPO_NAME.")
  }

  return {
    owner: parsed.data.CONTENT_REPO_OWNER,
    repo: parsed.data.CONTENT_REPO_NAME,
    ref: parsed.data.CONTENT_REPO_REF,
  }
}

import { compileMDX } from "next-mdx-remote/rsc"

import { createMdxComponents } from "@/components/mdx"
import type { ImageMetadata } from "@/lib/content/image-metadata"

const DISALLOWED_MDX_PATTERNS = [/^\s*import\s/m, /^\s*export\s/m]

export function assertAllowedMdx(source: string) {
  for (const pattern of DISALLOWED_MDX_PATTERNS) {
    if (pattern.test(source)) {
      throw new Error("MDX contains disallowed module syntax")
    }
  }
}

type RenderMdxOptions = {
  resolveAsset?: (src: string) => string
  resolveImageMetadata?: (src: string) => ImageMetadata | undefined
}

export async function renderMdx<TFrontmatter extends Record<string, unknown>>(
  source: string,
  options: RenderMdxOptions = {},
) {
  assertAllowedMdx(source)

  return compileMDX<TFrontmatter>({
    source,
    components: createMdxComponents(options.resolveAsset, options.resolveImageMetadata),
    options: {
      parseFrontmatter: true,
    },
  })
}

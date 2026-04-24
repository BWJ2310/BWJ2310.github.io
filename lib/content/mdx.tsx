import { compileMDX } from "next-mdx-remote/rsc"

import { createMdxComponents } from "@/components/mdx"

const DISALLOWED_REMOTE_PATTERNS = [/^\s*import\s/m, /^\s*export\s/m]

export function assertAllowedRemoteMdx(source: string) {
  for (const pattern of DISALLOWED_REMOTE_PATTERNS) {
    if (pattern.test(source)) {
      throw new Error("Remote MDX contains disallowed module syntax")
    }
  }
}

type RenderRemoteMdxOptions = {
  resolveAsset?: (src: string) => string
}

export async function renderRemoteMdx<TFrontmatter extends Record<string, unknown>>(
  source: string,
  options: RenderRemoteMdxOptions = {},
) {
  assertAllowedRemoteMdx(source)

  return compileMDX<TFrontmatter>({
    source,
    components: createMdxComponents(options.resolveAsset),
    options: {
      parseFrontmatter: true,
    },
  })
}

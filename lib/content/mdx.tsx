import { compileMDX } from "next-mdx-remote/rsc"

import { mdxComponents } from "@/components/mdx"

const DISALLOWED_REMOTE_PATTERNS = [/^\s*import\s/m, /^\s*export\s/m]

export function assertAllowedRemoteMdx(source: string) {
  for (const pattern of DISALLOWED_REMOTE_PATTERNS) {
    if (pattern.test(source)) {
      throw new Error("Remote MDX contains disallowed module syntax")
    }
  }
}

export async function renderRemoteMdx<TFrontmatter extends Record<string, unknown>>(source: string) {
  assertAllowedRemoteMdx(source)

  return compileMDX<TFrontmatter>({
    source,
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
    },
  })
}

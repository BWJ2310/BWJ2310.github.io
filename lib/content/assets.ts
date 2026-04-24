type ResolveContentAssetArgs = {
  owner: string
  repo: string
  ref: string
  contentDir: string
  assetPath: string
}

export function resolveContentAsset({
  owner,
  repo,
  ref,
  contentDir,
  assetPath,
}: ResolveContentAssetArgs) {
  if (/^https?:\/\//i.test(assetPath) || assetPath.startsWith("/")) {
    return assetPath
  }

  const normalizedPath = assetPath.replace(/^\.\//, "")
  return `https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${contentDir}/${normalizedPath}`
}

export function createContentAssetResolver(args: Omit<ResolveContentAssetArgs, "assetPath">) {
  return (assetPath: string) =>
    resolveContentAsset({
      ...args,
      assetPath,
    })
}

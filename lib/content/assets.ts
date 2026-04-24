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
  const normalizedPath = assetPath.replace(/^.\//, "")
  return `https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${contentDir}/${normalizedPath}`
}

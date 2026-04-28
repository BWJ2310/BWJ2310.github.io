import path from "node:path"

type ResolveContentAssetArgs = {
  contentDir: string
  assetPath: string
}

export function resolveRelativeContentPath(contentDir: string, assetPath: string) {
  const normalizedAssetPath = assetPath.replace(/\\/g, "/")
  const assetPathParts = normalizedAssetPath.split("/").filter(Boolean)
  const contentDirParts = contentDir.replace(/\\/g, "/").split("/").filter(Boolean)

  if (
    path.posix.isAbsolute(normalizedAssetPath) ||
    assetPathParts.includes("..") ||
    path.posix.isAbsolute(contentDir) ||
    contentDirParts.includes("..")
  ) {
    throw new Error(`Unsafe content asset path: ${assetPath}`)
  }

  const resolvedPath = path.posix.normalize(path.posix.join(contentDir, normalizedAssetPath))

  if (resolvedPath.startsWith("../") || resolvedPath === ".." || resolvedPath.startsWith("/")) {
    throw new Error(`Unsafe content asset path: ${assetPath}`)
  }

  return resolvedPath
}

export function createLocalContentAssetUrl(contentPath: string) {
  const segments = contentPath
    .replace(/\\/g, "/")
    .split("/")
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))

  return `/api/content-assets/${segments.join("/")}`
}

export function resolveContentAsset({
  contentDir,
  assetPath,
}: ResolveContentAssetArgs) {
  if (/^https?:\/\//i.test(assetPath) || assetPath.startsWith("/")) {
    return assetPath
  }

  const contentPath = resolveRelativeContentPath(contentDir, assetPath)

  return createLocalContentAssetUrl(contentPath)
}

export function createContentAssetResolver(args: { contentDir: string }) {
  return (assetPath: string) =>
    resolveContentAsset({
      ...args,
      assetPath,
    })
}

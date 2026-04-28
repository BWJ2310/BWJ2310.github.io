import path from "node:path"

export function resolveSiteAsset(contentDir: string, assetPath: string) {
  const normalizedPath = path.posix.normalize(path.posix.join(contentDir, assetPath.replace(/\\/g, "/")))

  if (normalizedPath.startsWith("../") || normalizedPath === "..") {
    throw new Error(`Unsafe site asset path: ${assetPath}`)
  }

  const segments = normalizedPath
    .split("/")
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))

  return `/site-assets/${segments.join("/")}`
}

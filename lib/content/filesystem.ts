import { readdir, readFile } from "node:fs/promises"
import path from "node:path"

export function normalizeContentPath(contentPath: string) {
  const normalized = contentPath.replace(/\\/g, "/").replace(/^\/+/, "")
  const parts = normalized.split("/").filter(Boolean)

  if (path.isAbsolute(contentPath) || parts.includes("..")) {
    throw new Error(`Unsafe content path: ${contentPath}`)
  }

  return parts.join("/")
}

export function resolveContentPath(root: string, contentPath: string) {
  const rootPath = path.resolve(root)
  const safePath = normalizeContentPath(contentPath)
  const resolvedPath = path.resolve(rootPath, ...safePath.split("/"))
  const relativePath = path.relative(rootPath, resolvedPath)

  if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
    throw new Error(`Unsafe content path: ${contentPath}`)
  }

  return resolvedPath
}

async function readContentTreeEntries(root: string, directory = ""): Promise<Array<{ path?: string }>> {
  const currentPath = directory ? resolveContentPath(root, directory) : path.resolve(root)
  const entries = await readdir(currentPath, { withFileTypes: true })
  const tree: Array<{ path?: string }> = []

  for (const entry of entries) {
    if (entry.name === ".git") {
      continue
    }

    const entryPath = directory ? `${directory}/${entry.name}` : entry.name

    if (entry.isDirectory()) {
      tree.push(...(await readContentTreeEntries(root, entryPath)))
      continue
    }

    if (entry.isFile()) {
      tree.push({ path: entryPath.replace(/\\/g, "/") })
    }
  }

  return tree
}

export function readContentText(root: string, contentPath: string) {
  return readFile(resolveContentPath(root, contentPath), "utf8")
}

export function readContentTree(root: string) {
  return readContentTreeEntries(root)
}

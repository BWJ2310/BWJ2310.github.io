import { cpSync, existsSync, rmSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const exportDir = path.join(root, "out")
const pagesDir = path.join(root, "docs")

if (!existsSync(path.join(exportDir, "index.html"))) {
  throw new Error("Next static export not found. Run `next build` before syncing Pages output.")
}

rmSync(pagesDir, { force: true, recursive: true })
cpSync(exportDir, pagesDir, { recursive: true })

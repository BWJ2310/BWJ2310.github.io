import path from "node:path"

import type { ContentConfig } from "./types"

export const CONTENT_PROJECTS_DIRECTORY = path.join("content", "projects")

export function getContentConfig(): ContentConfig {
  return {
    source: "filesystem",
    root: path.resolve(/* turbopackIgnore: true */ process.cwd(), CONTENT_PROJECTS_DIRECTORY),
  }
}

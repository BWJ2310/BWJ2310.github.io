import { readFile } from "node:fs/promises"
import path from "node:path"
import { NextResponse } from "next/server"

import { getContentConfig } from "@/lib/content/config"
import { readContentTree, resolveContentPath } from "@/lib/content/filesystem"

type ContentAssetRouteProps = {
  params: Promise<{ path: string[] }>
}

const contentTypes: Record<string, string> = {
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
}

export const dynamic = "force-static"

function isSupportedContentAsset(contentPath: string) {
  return Boolean(contentTypes[path.extname(contentPath).toLowerCase()])
}

export async function generateStaticParams() {
  const config = getContentConfig()
  const tree = await readContentTree(config.root)

  return tree
    .filter((entry): entry is { path: string } => Boolean(entry.path))
    .filter((entry) => isSupportedContentAsset(entry.path))
    .map((entry) => ({
      path: entry.path.split("/").filter(Boolean),
    }))
}

export async function GET(_request: Request, { params }: ContentAssetRouteProps) {
  const config = getContentConfig()

  const { path: contentPathParts } = await params
  const contentPath = contentPathParts.join("/")

  try {
    const filePath = resolveContentPath(config.root, contentPath)
    const file = await readFile(filePath)
    const contentType = contentTypes[path.extname(filePath).toLowerCase()] ?? "application/octet-stream"

    return new NextResponse(file, {
      headers: {
        "Cache-Control": "public, max-age=3600",
        "Content-Type": contentType,
      },
    })
  } catch {
    return new NextResponse("Content asset not found.", { status: 404 })
  }
}

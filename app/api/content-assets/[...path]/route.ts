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
  ".m4v": "video/mp4",
  ".mov": "video/quicktime",
  ".mp4": "video/mp4",
  ".ogv": "video/ogg",
  ".webm": "video/webm",
}

export const dynamic = "force-static"

function isSupportedContentAsset(contentPath: string) {
  return Boolean(contentTypes[path.extname(contentPath).toLowerCase()])
}

function getContentType(filePath: string) {
  return (
    contentTypes[path.extname(filePath).toLowerCase()] ??
    "application/octet-stream"
  )
}

function parseRangeHeader(rangeHeader: string, fileSize: number) {
  const match = rangeHeader.match(/^bytes=(\d*)-(\d*)$/)

  if (!match) {
    return undefined
  }

  const [, startValue, endValue] = match
  let start = startValue ? Number(startValue) : 0
  let end = endValue ? Number(endValue) : fileSize - 1

  if (!startValue && endValue) {
    const suffixLength = Number(endValue)
    start = Math.max(fileSize - suffixLength, 0)
    end = fileSize - 1
  }

  if (
    !Number.isInteger(start) ||
    !Number.isInteger(end) ||
    start < 0 ||
    end < start ||
    start >= fileSize
  ) {
    return undefined
  }

  return {
    end: Math.min(end, fileSize - 1),
    start,
  }
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

export async function GET(
  request: Request,
  { params }: ContentAssetRouteProps
) {
  const config = getContentConfig()

  const { path: contentPathParts } = await params
  const contentPath = contentPathParts.join("/")

  try {
    const filePath = resolveContentPath(config.root, contentPath)
    const file = await readFile(filePath)
    const contentType = getContentType(filePath)
    const baseHeaders = {
      "Accept-Ranges": "bytes",
      "Cache-Control": "public, max-age=3600",
      "Content-Type": contentType,
    }
    const rangeHeader = request.headers.get("range")

    if (rangeHeader) {
      const range = parseRangeHeader(rangeHeader, file.length)

      if (!range) {
        return new NextResponse(null, {
          headers: {
            ...baseHeaders,
            "Content-Range": `bytes */${file.length}`,
          },
          status: 416,
        })
      }

      const chunk = file.subarray(range.start, range.end + 1)

      return new NextResponse(chunk, {
        headers: {
          ...baseHeaders,
          "Content-Length": String(chunk.length),
          "Content-Range": `bytes ${range.start}-${range.end}/${file.length}`,
        },
        status: 206,
      })
    }

    return new NextResponse(file, {
      headers: {
        ...baseHeaders,
        "Content-Length": String(file.length),
      },
    })
  } catch {
    return new NextResponse("Content asset not found.", { status: 404 })
  }
}

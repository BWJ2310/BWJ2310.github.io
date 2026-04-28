import { readFile } from "node:fs/promises"

import { resolveRelativeContentPath } from "./assets"
import { getContentConfig } from "./config"
import { resolveContentPath } from "./filesystem"

export type ImageMetadata = {
  width: number
  height: number
}

type ImageMetadataArgs = {
  contentDir: string
}

const srcAttributePattern = /\bsrc="([^"]+)"/g
const markdownImagePattern = /!\[[^\]]*]\(([^)\s]+)(?:\s+["'][^"']*["'])?\)/g

function uniqueImageSources(source: string) {
  const sources = new Set<string>()

  for (const match of source.matchAll(srcAttributePattern)) {
    sources.add(match[1])
  }

  for (const match of source.matchAll(markdownImagePattern)) {
    sources.add(match[1])
  }

  return [...sources]
}

function readUInt24LE(buffer: Buffer, offset: number) {
  return buffer[offset] + (buffer[offset + 1] << 8) + (buffer[offset + 2] << 16)
}

function parsePngDimensions(buffer: Buffer): ImageMetadata | undefined {
  if (buffer.length < 24 || buffer.toString("ascii", 1, 4) !== "PNG") {
    return undefined
  }

  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  }
}

function parseGifDimensions(buffer: Buffer): ImageMetadata | undefined {
  if (buffer.length < 10 || buffer.toString("ascii", 0, 3) !== "GIF") {
    return undefined
  }

  return {
    width: buffer.readUInt16LE(6),
    height: buffer.readUInt16LE(8),
  }
}

function parseJpegDimensions(buffer: Buffer): ImageMetadata | undefined {
  if (buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8) {
    return undefined
  }

  let offset = 2
  const sofMarkers = new Set([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf])

  while (offset + 9 < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1
      continue
    }

    const marker = buffer[offset + 1]
    offset += 2

    if (marker === 0xd9 || marker === 0xda) {
      break
    }

    if (offset + 2 > buffer.length) {
      break
    }

    const segmentLength = buffer.readUInt16BE(offset)

    if (segmentLength < 2 || offset + segmentLength > buffer.length) {
      break
    }

    if (sofMarkers.has(marker)) {
      return {
        height: buffer.readUInt16BE(offset + 3),
        width: buffer.readUInt16BE(offset + 5),
      }
    }

    offset += segmentLength
  }

  return undefined
}

function parseWebpDimensions(buffer: Buffer): ImageMetadata | undefined {
  if (
    buffer.length < 30 ||
    buffer.toString("ascii", 0, 4) !== "RIFF" ||
    buffer.toString("ascii", 8, 12) !== "WEBP"
  ) {
    return undefined
  }

  const chunkType = buffer.toString("ascii", 12, 16)

  if (chunkType === "VP8X") {
    return {
      width: readUInt24LE(buffer, 24) + 1,
      height: readUInt24LE(buffer, 27) + 1,
    }
  }

  if (chunkType === "VP8 " && buffer.length >= 30) {
    return {
      width: buffer.readUInt16LE(26) & 0x3fff,
      height: buffer.readUInt16LE(28) & 0x3fff,
    }
  }

  if (chunkType === "VP8L" && buffer.length >= 25 && buffer[20] === 0x2f) {
    const bits = buffer.readUInt32LE(21)

    return {
      width: (bits & 0x3fff) + 1,
      height: ((bits >> 14) & 0x3fff) + 1,
    }
  }

  return undefined
}

export function parseImageMetadata(buffer: Buffer): ImageMetadata | undefined {
  return (
    parsePngDimensions(buffer) ??
    parseJpegDimensions(buffer) ??
    parseGifDimensions(buffer) ??
    parseWebpDimensions(buffer)
  )
}

async function readImageBuffer(assetPath: string, args: ImageMetadataArgs) {
  if (/^https?:\/\//i.test(assetPath)) {
    const response = await fetch(assetPath)

    if (!response.ok) {
      return undefined
    }

    return Buffer.from(await response.arrayBuffer())
  }

  if (assetPath.startsWith("/")) {
    return undefined
  }

  const contentPath = resolveRelativeContentPath(args.contentDir, assetPath)
  const config = getContentConfig()

  return readFile(resolveContentPath(config.root, contentPath))
}

export async function getMdxImageMetadata(source: string, args: ImageMetadataArgs) {
  const metadata = new Map<string, ImageMetadata>()

  await Promise.all(
    uniqueImageSources(source).map(async (assetPath) => {
      try {
        const buffer = await readImageBuffer(assetPath, args)
        const parsed = buffer ? parseImageMetadata(buffer) : undefined

        if (parsed) {
          metadata.set(assetPath, parsed)
        }
      } catch {
        // Image dimensions are progressive enhancement. Rendering falls back safely.
      }
    }),
  )

  return metadata
}

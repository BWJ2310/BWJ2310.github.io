import { getContentConfig } from "./config"

export async function fetchGitHubText(path: string) {
  const config = getContentConfig()
  const url = `https://raw.githubusercontent.com/${config.owner}/${config.repo}/${config.ref}/${path}`
  const response = await fetch(url, { next: { revalidate: 600 } })

  if (!response.ok) {
    throw new Error(`Failed to fetch remote content: ${path}`)
  }

  return response.text()
}

export async function fetchGitHubTree() {
  const config = getContentConfig()
  const url = `https://api.github.com/repos/${config.owner}/${config.repo}/git/trees/${config.ref}?recursive=1`
  const response = await fetch(url, { next: { revalidate: 600 } })

  if (!response.ok) {
    throw new Error("Failed to fetch remote tree")
  }

  const data = (await response.json()) as { tree?: Array<{ path?: string }> }
  return Array.isArray(data.tree) ? data.tree : []
}

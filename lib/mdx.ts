import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const postsDirectory = path.join(process.cwd(), 'content/blog')

export interface BlogPost {
  slug: string
  title: string
  date: string
  updated?: string
  author: string
  excerpt: string
  tags: string[]
  content: string
  readingTime: string
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      return getPostBySlug(slug)
    })
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => ((a.updated || a.date) < (b.updated || b.date) ? 1 : -1))

  return allPostsData
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, ''))
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    
    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    const readingTimeResult = readingTime(content)

    return {
      slug,
      title: data.title || '',
      date: data.date || '',
      updated: data.updated || undefined,
      author: data.author || 'Just Summit',
      excerpt: data.excerpt || '',
      tags: data.tags || [],
      content,
      readingTime: readingTimeResult.text,
    }
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}

export function stripLeadingTitle(content: string, title: string): string {
  const lines = content.replace(/\r\n/g, '\n').split('\n')
  const firstContentLine = lines.findIndex((line) => line.trim().length > 0)

  if (firstContentLine >= 0 && lines[firstContentLine].trim() === `# ${title}`) {
    lines.splice(firstContentLine, 1)
  }

  return lines.join('\n').trim()
}


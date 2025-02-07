const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

export async function getArticles(): Promise<Article[]> {
  try {
    const res = await fetch(`${API_URL}/api/articles`, { cache: "no-store" })
    if (!res.ok) {
      throw new Error(`Failed to fetch articles: ${res.status}`)
    }
    return res.json()
  } catch (error) {
    console.error("Error fetching articles:", error)
    return []
  }
}

export async function getArticle(id: string): Promise<ArticleResponse | null> {
  try {
    const res = await fetch(`${API_URL}/api/articles/${id}`, { cache: "no-store" })
    if (!res.ok) {
      throw new Error(`Failed to fetch article: ${res.status}`)
    }
    return res.json()
  } catch (error) {
    console.error(`Error fetching article ${id}:`, error)
    return null
  }
}

export interface Article {
  id: string
  title: string
  content: string
}

export interface ArticleResponse {
  article: Article
  prevArticle: Article | null
  nextArticle: Article | null
}


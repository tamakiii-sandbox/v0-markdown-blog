import Link from "next/link"
import ReactMarkdown from "react-markdown"
import { getArticle } from "../../lib/api"

export default async function ArticlePage({ params }: { params: { id: string } }) {
  const articleResponse = await getArticle(params.id)

  if (!articleResponse) {
    return <div>Article not found</div>
  }

  const { article, prevArticle, nextArticle } = articleResponse

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-8">{article.title}</h1>
      <div className="prose">
        <ReactMarkdown>{article.content}</ReactMarkdown>
      </div>
      <div className="mt-8 flex justify-between">
        {prevArticle && (
          <Link href={`/article/${prevArticle.id}`} className="text-blue-500 hover:underline">
            ← Previous: {prevArticle.title}
          </Link>
        )}
        {nextArticle && (
          <Link href={`/article/${nextArticle.id}`} className="text-blue-500 hover:underline">
            Next: {nextArticle.title} →
          </Link>
        )}
      </div>
      <Link href="/" className="text-blue-500 hover:underline mt-4 inline-block">
        Back to Home
      </Link>
    </div>
  )
}


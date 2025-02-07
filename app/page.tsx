import Link from "next/link"
import ReactMarkdown from "react-markdown"
import { getArticles } from "../lib/api"

export default async function Home() {
  const articles = await getArticles()
  const emphasizedArticle = articles[0]

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-8">Markdown Blog</h1>

      {emphasizedArticle && (
        <div className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">{emphasizedArticle.title}</h2>
          <div className="prose">
            <ReactMarkdown>{emphasizedArticle.content}</ReactMarkdown>
          </div>
          <Link href={`/article/${emphasizedArticle.id}`} className="text-blue-500 hover:underline mt-4 inline-block">
            Read more
          </Link>
        </div>
      )}

      <h3 className="text-2xl font-semibold mb-4">Other Articles</h3>
      <ul>
        {articles.slice(1).map((article) => (
          <li key={article.id} className="mb-2">
            <Link href={`/article/${article.id}`} className="text-blue-500 hover:underline">
              {article.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}


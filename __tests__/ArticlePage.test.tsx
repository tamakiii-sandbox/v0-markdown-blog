import { render, screen } from "@testing-library/react"
import ArticlePage from "../app/article/[id]/page"
import * as api from "../lib/api"

jest.mock("../lib/api")

describe("ArticlePage", () => {
  it("renders article content", async () => {
    const mockArticle = {
      article: { id: "1", title: "Test Article", content: "Test content" },
      prevArticle: null,
      nextArticle: null,
    }

    jest.spyOn(api, "getArticle").mockResolvedValue(mockArticle)

    render(await ArticlePage({ params: { id: "1" } }))

    const heading = screen.getByRole("heading", { name: /Test Article/i })
    expect(heading).toBeInTheDocument()

    const content = screen.getByText("Test content")
    expect(content).toBeInTheDocument()
  })

  it("renders navigation links when available", async () => {
    const mockArticle = {
      article: { id: "2", title: "Test Article 2", content: "Test content 2" },
      prevArticle: { id: "1", title: "Previous Article", content: "Previous content" },
      nextArticle: { id: "3", title: "Next Article", content: "Next content" },
    }

    jest.spyOn(api, "getArticle").mockResolvedValue(mockArticle)

    render(await ArticlePage({ params: { id: "2" } }))

    const prevLink = screen.getByText(/Previous: Previous Article/i)
    expect(prevLink).toBeInTheDocument()

    const nextLink = screen.getByText(/Next: Next Article/i)
    expect(nextLink).toBeInTheDocument()
  })

  it('renders "Article not found" when article is null', async () => {
    jest.spyOn(api, "getArticle").mockResolvedValue(null)

    render(await ArticlePage({ params: { id: "non-existent" } }))

    const notFoundMessage = screen.getByText("Article not found")
    expect(notFoundMessage).toBeInTheDocument()
  })
})


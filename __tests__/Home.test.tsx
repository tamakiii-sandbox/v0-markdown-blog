import { render, screen } from "@testing-library/react"
import Home from "../app/page"
import * as api from "../lib/api"

jest.mock("../lib/api")

describe("Home", () => {
  it("renders a heading", async () => {
    const mockArticles = [
      { id: "1", title: "Test Article 1", content: "Test content 1" },
      { id: "2", title: "Test Article 2", content: "Test content 2" },
    ]

    jest.spyOn(api, "getArticles").mockResolvedValue(mockArticles)

    render(await Home())

    const heading = screen.getByRole("heading", { name: /Markdown Blog/i })
    expect(heading).toBeInTheDocument()
  })

  it("renders emphasized article", async () => {
    const mockArticles = [
      { id: "1", title: "Emphasized Article", content: "Emphasized content" },
      { id: "2", title: "Test Article 2", content: "Test content 2" },
    ]

    jest.spyOn(api, "getArticles").mockResolvedValue(mockArticles)

    render(await Home())

    const emphasizedTitle = screen.getByRole("heading", { name: /Emphasized Article/i })
    expect(emphasizedTitle).toBeInTheDocument()
  })

  it("renders list of other articles", async () => {
    const mockArticles = [
      { id: "1", title: "Emphasized Article", content: "Emphasized content" },
      { id: "2", title: "Test Article 2", content: "Test content 2" },
      { id: "3", title: "Test Article 3", content: "Test content 3" },
    ]

    jest.spyOn(api, "getArticles").mockResolvedValue(mockArticles)

    render(await Home())

    const articleLinks = screen.getAllByRole("link")
    expect(articleLinks).toHaveLength(3) // 2 article links + 1 "Read more" link
  })
})


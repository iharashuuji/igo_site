import { Article } from "@/types";

// Mock Data
const MOCK_ARTICLES: Article[] = [
    {
        id: "1",
        createdAt: "2024-04-10T10:00:00Z",
        updatedAt: "2024-04-10T10:00:00Z",
        publishedAt: "2024-04-10T10:00:00Z",
        revisedAt: "2024-04-10T10:00:00Z",
        title: "春の新歓活動が始まりました！",
        content: "<h2>新入生の皆さん、ようこそ！</h2><p>今年も新歓の季節がやってきました。囲碁部では...</p>",
        category: { id: "news", name: "お知らせ" },
    },
    {
        id: "2",
        createdAt: "2024-04-15T10:00:00Z",
        updatedAt: "2024-04-15T10:00:00Z",
        publishedAt: "2024-04-15T10:00:00Z",
        revisedAt: "2024-04-15T10:00:00Z",
        title: "春季合宿の様子をお届けします",
        content: "<p>3泊4日で春季合宿に行ってきました。朝から晩まで囲碁漬けの...</p>",
        category: { id: "blog", name: "ブログ" },
    },
    {
        id: "3",
        createdAt: "2024-04-20T10:00:00Z",
        updatedAt: "2024-04-20T10:00:00Z",
        publishedAt: "2024-04-20T10:00:00Z",
        revisedAt: "2024-04-20T10:00:00Z",
        title: "初心者向け囲碁講座 第1回",
        content: "<p>今回は「アタリ」について解説します。アタリとは...</p>",
        category: { id: "lecture", name: "講座" },
    },
];

export async function getArticles(): Promise<Article[]> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return MOCK_ARTICLES;
}

export async function getArticle(id: string): Promise<Article | null> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return MOCK_ARTICLES.find((article) => article.id === id) || null;
}

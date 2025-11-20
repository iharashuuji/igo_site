import { Metadata } from "next";
import Link from "next/link";
import { getArticles } from "@/lib/microcms";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"; // Will need to create this or use standard div
import { Calendar } from "lucide-react";

export const metadata: Metadata = {
    title: "活動ブログ | 大学囲碁部",
    description: "大学囲碁部の活動記録、大会結果、日常の様子などを発信しています。",
};

export default async function BlogPage() {
    const articles = await getArticles();

    return (
        <div className="container py-12 md:py-24">
            <div className="max-w-5xl mx-auto space-y-12">
                <div className="text-center space-y-4">
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-primary">活動ブログ</h1>
                    <p className="text-muted-foreground text-lg">
                        日々の活動や大会の結果、お知らせなどを更新しています。
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.map((article) => (
                        <Link href={`/blog/${article.id}`} key={article.id} className="group">
                            <Card className="h-full transition-colors hover:border-primary/50">
                                <div className="aspect-video bg-muted w-full object-cover rounded-t-xl flex items-center justify-center text-muted-foreground">
                                    {article.eyecatch ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img src={article.eyecatch.url} alt={article.title} className="w-full h-full object-cover rounded-t-xl" />
                                    ) : (
                                        "No Image"
                                    )}
                                </div>
                                <CardHeader>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-medium px-2 py-1 bg-secondary/20 text-secondary-foreground rounded-full">
                                            {article.category.name}
                                        </span>
                                        <div className="flex items-center text-xs text-muted-foreground">
                                            <Calendar className="h-3 w-3 mr-1" />
                                            {new Date(article.publishedAt).toLocaleDateString("ja-JP")}
                                        </div>
                                    </div>
                                    <CardTitle className="group-hover:text-primary transition-colors line-clamp-2">
                                        {article.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground line-clamp-3">
                                        {article.content.replace(/<[^>]+>/g, "")}
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

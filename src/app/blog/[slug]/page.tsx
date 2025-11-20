import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticle, getArticles } from "@/lib/microcms";
import { Calendar, Tag } from "lucide-react";

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const article = await getArticle(slug);

    if (!article) {
        return {
            title: "記事が見つかりません",
        };
    }

    return {
        title: `${article.title} | 大学囲碁部`,
        description: article.content.substring(0, 100).replace(/<[^>]+>/g, ""),
    };
}

export async function generateStaticParams() {
    const articles = await getArticles();
    return articles.map((article) => ({
        slug: article.id,
    }));
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const article = await getArticle(slug);

    if (!article) {
        notFound();
    }

    return (
        <div className="container py-12 md:py-24">
            <article className="max-w-3xl mx-auto space-y-8">
                <div className="space-y-4 text-center">
                    <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(article.publishedAt).toLocaleDateString("ja-JP")}
                        </span>
                        <span className="flex items-center px-2 py-1 bg-secondary/20 text-secondary-foreground rounded-full text-xs font-medium">
                            <Tag className="h-3 w-3 mr-1" />
                            {article.category.name}
                        </span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-primary">
                        {article.title}
                    </h1>
                </div>

                {article.eyecatch && (
                    <div className="aspect-video w-full relative rounded-xl overflow-hidden bg-muted">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={article.eyecatch.url}
                            alt={article.title}
                            className="object-cover w-full h-full"
                        />
                    </div>
                )}

                <div
                    className="prose prose-slate dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                />
            </article>
        </div>
    );
}

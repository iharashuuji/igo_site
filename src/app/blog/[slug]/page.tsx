import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { getBlog } from "@/lib/microcms";
import { Metadata } from "next";
import Image from "next/image";

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = await getBlog(slug);

    if (!post) {
        return {
            title: "記事が見つかりません",
        };
    }

    return {
        title: `${post.title} | 囲碁部`,
        description: post.content?.replace(/<[^>]*>/g, '').substring(0, 100),
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = await getBlog(slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="container py-12 max-w-3xl mx-auto space-y-8">
            <div className="space-y-4 text-center">
                <div className="flex items-center justify-center gap-4">
                    {post.category && <Badge>{post.category.name}</Badge>}
                    <time className="text-sm text-muted-foreground">
                        {new Date(post.publishedAt).toLocaleDateString()}
                    </time>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                    {post.title}
                </h1>
            </div>

            {post.eyecatch?.url && (
                <div className="aspect-video relative rounded-lg overflow-hidden bg-slate-100">
                    <Image
                        src={post.eyecatch.url}
                        alt={post.title}
                        fill
                        className="object-cover"
                    />
                </div>
            )}

            <div className="prose prose-slate max-w-none">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
        </article>
    );
}

import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { getPostBySlug } from "@/lib/supabase/queries";
import { Metadata } from "next";

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        return {
            title: "記事が見つかりません",
        };
    }

    return {
        title: `${post.title} | 囲碁部`,
        description: post.content?.substring(0, 100),
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="container py-12 max-w-3xl mx-auto space-y-8">
            <div className="space-y-4 text-center">
                <div className="flex items-center justify-center gap-4">
                    <Badge>{post.category}</Badge>
                    <time className="text-sm text-muted-foreground">
                        {new Date(post.published_at).toLocaleDateString()}
                    </time>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                    {post.title}
                </h1>
            </div>

            {post.thumbnail_url && (
                <div className="aspect-video relative rounded-lg overflow-hidden bg-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={post.thumbnail_url}
                        alt={post.title}
                        className="object-cover w-full h-full"
                    />
                </div>
            )}

            <div className="prose prose-slate max-w-none">
                {/* 
          Rendering content as-is. 
          If content is Markdown, we'd need a parser (e.g. react-markdown).
          If HTML, dangerouslySetInnerHTML.
          For now, assuming plain text or simple HTML for simplicity, 
          or just dumping it. Ideally, use a library.
          Let's assume it's just text for now to be safe, or simple HTML.
        */}
                <div className="whitespace-pre-wrap">{post.content}</div>
            </div>
        </article>
    );
}

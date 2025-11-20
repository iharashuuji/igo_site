import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { getPublicPosts } from "@/lib/supabase/queries";

export const metadata = {
    title: "ブログ・お知らせ | 囲碁部",
    description: "囲碁部の活動記録や大会結果、お知らせなどを発信しています。",
};

export default async function BlogPage() {
    const posts = await getPublicPosts();

    return (
        <div className="container py-12 space-y-12">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">ブログ・お知らせ</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    日々の活動や大会の結果などをお届けします。
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                        <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="aspect-video bg-slate-100 relative">
                                {post.thumbnail_url ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={post.thumbnail_url}
                                        alt={post.title}
                                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-300 bg-slate-50">
                                        No Image
                                    </div>
                                )}
                            </div>
                            <CardHeader>
                                <div className="flex items-center justify-between mb-2">
                                    <Badge variant="outline">{post.category}</Badge>
                                    <span className="text-xs text-muted-foreground">
                                        {new Date(post.published_at).toLocaleDateString()}
                                    </span>
                                </div>
                                <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                                    {post.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground line-clamp-3">
                                    {/* Simple strip tags or just show content if plain text. 
                      For now, just showing content directly assuming it's not too raw HTML heavy or just excerpt.
                      Real implementation might need a proper excerpt generator.
                  */}
                                    {post.content?.substring(0, 100)}...
                                </p>
                            </CardContent>
                            <CardFooter>
                                <span className="text-sm font-medium text-primary group-hover:underline">
                                    続きを読む →
                                </span>
                            </CardFooter>
                        </Card>
                    </Link>
                ))}

                {posts.length === 0 && (
                    <div className="col-span-full text-center py-12 text-muted-foreground">
                        記事がありません。
                    </div>
                )}
            </div>
        </div>
    );
}

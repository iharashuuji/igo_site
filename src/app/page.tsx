import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, Calendar, Users, BookOpen } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-b from-primary/10 to-background overflow-hidden">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center text-center space-y-4">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-primary">
              大阪公立大学囲碁部へようこそ！
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-[700px]">
              大阪公立大学囲碁部は、初心者から有段者まで、<br className="md:hidden" />
              囲碁を通じて交流を深めるサークルです。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link href="/contact">
                <Button size="lg" className="w-full sm:w-auto">
                  入部・見学に申し込む
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  活動内容を見る
                </Button>
              </Link>
            </div>
          </div>
        </div>
        {/* Decorative background elements could go here */}
      </section>

      {/* Features / Quick Links */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-background/60 backdrop-blur">
              <CardHeader>
                <Users className="h-10 w-10 text-primary mb-2" />
                <CardTitle>初心者歓迎</CardTitle>
                <CardDescription>
                  ルールを知らなくても大丈夫。<br />先輩が優しく教えます。
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-background/60 backdrop-blur">
              <CardHeader>
                <Calendar className="h-10 w-10 text-primary mb-2" />
                <CardTitle>自由な活動スタイル</CardTitle>
                <CardDescription>
                  週2回の活動日。<br />自分のペースで参加できます。
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-background/60 backdrop-blur">
              <CardHeader>
                <BookOpen className="h-10 w-10 text-primary mb-2" />
                <CardTitle>知的な交流</CardTitle>
                <CardDescription>
                  他大学との交流戦や<br />合宿も定期的に開催。
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Latest News (Mock) */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight">最新の活動ログ</h2>
            <Link href="/blog" className="text-primary hover:underline flex items-center text-sm font-medium">
              記事一覧へ <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Mock Data */}
            {[1, 2, 3].map((i) => (
              <Card key={i} className="hover:shadow-lg transition-shadow cursor-pointer">
                <div className="aspect-video bg-muted w-full object-cover rounded-t-xl flex items-center justify-center text-muted-foreground">
                  Image Placeholder
                </div>
                <CardContent className="p-4">
                  <p className="text-xs text-muted-foreground mb-2">2024.04.{10 + i}</p>
                  <h3 className="font-bold text-lg mb-2 line-clamp-2">
                    {i === 1 ? "春の新歓活動が始まりました！" : i === 2 ? "春季合宿の様子をお届けします" : "初心者向け囲碁講座 第1回"}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    今年の春は多くの新入生が見学に来てくれました。活動の様子を写真付きで紹介します...
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
    title: "リンク集 | 囲碁部",
    description: "お世話になっている団体や関係サイトのリンク集です。",
};

interface LinkItem {
    title: string;
    url: string;
    description: string;
}

const linkCategories = [
    {
        category: "囲碁団体・連盟",
        links: [
            {
                title: "日本棋院",
                url: "https://www.nihonkiin.or.jp/",
                description: "日本の囲碁界を統括する公益財団法人です。"
            },
            {
                title: "関西棋院",
                url: "https://kansaikiin.jp/",
                description: "関西を拠点とするプロ棋士の団体です。"
            },
            {
                title: "関西学生囲碁連盟",
                url: "http://kansaigakuseiigoren.web.fc2.com/links.html", // Dummy or actual if known, keeping generic/dummy as requested
                description: "大学囲碁界の大会情報などが掲載されています。"
            }
        ]
    },
    {
        category: "大学囲碁部 (交流校)",
        links: [
            {
                title: "大阪大学 囲碁部",
                url: "#",
                description: "定期的に交流戦を行っています。"
            },
            {
                title: "京都大学 囲碁部",
                url: "#",
                description: "関西学生リーグでのライバル校です。"
            },
            {
                title: "神戸大学 囲碁部",
                url: "#",
                description: "合宿などで交流があります。"
            }
        ]
    },
    {
        category: "その他",
        links: [
            {
                title: "囲碁クエスト",
                url: "https://wars.fm/go9",
                description: "オンラインで気軽に囲碁が打てるサイト・アプリです。"
            },
            {
                title: "野狐囲碁",
                url: "https://www.foxwq.com/",
                description: "世界中のプレイヤーと対局できるオンライン対局場です。"
            }
        ]
    }
];

export default function LinksPage() {
    return (
        <div className="container py-12 md:py-24">
            <div className="max-w-4xl mx-auto space-y-12">

                {/* Header */}
                <div className="text-center space-y-4">
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-primary">リンク集</h1>
                    <p className="text-muted-foreground text-lg">
                        日頃よりお世話になっている団体や、囲碁に関する役立つサイトをご紹介します。
                    </p>
                </div>

                {/* Links Grid */}
                <div className="space-y-10">
                    {linkCategories.map((category, index) => (
                        <section key={index} className="space-y-6">
                            <h2 className="text-2xl font-bold border-b pb-2 flex items-center gap-2">
                                {category.category}
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {category.links.map((link, linkIndex) => (
                                    <Card key={linkIndex} className="hover:bg-accent/50 transition-colors">
                                        <Link href={link.url} target="_blank" rel="noopener noreferrer">
                                            <CardHeader>
                                                <CardTitle className="text-lg flex items-center gap-2">
                                                    {link.title}
                                                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-sm text-muted-foreground">
                                                    {link.description}
                                                </p>
                                            </CardContent>
                                        </Link>
                                    </Card>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>

            </div>
        </div>
    );
}

import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Clock, Target } from "lucide-react";

export const metadata: Metadata = {
    title: "囲碁部について | 大学囲碁部",
    description: "大学囲碁部の活動理念、歴史、活動場所、活動頻度について紹介します。",
};

export default function AboutPage() {
    return (
        <div className="container py-12 md:py-24">
            <div className="max-w-4xl mx-auto space-y-16">

                {/* Header */}
                <div className="text-center space-y-4">
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-primary">囲碁部について</h1>
                    <p className="text-muted-foreground text-lg">
                        伝統と革新、そして交流。<br />
                        私たちが大切にしている価値観と活動内容をご紹介します。
                    </p>
                </div>

                {/* Philosophy */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-bold border-b pb-2">活動理念</h2>
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-primary">「思考を楽しむ、仲間と楽しむ」</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                囲碁は単なるボードゲームではありません。対局を通じて相手との対話を行い、<br /><br />
                                当部では、勝敗だけにこだわるのではなく、
                                対局後の検討（感想戦）を通じてお互いを高め合うことを大切にしています。
                                初心者から有段者まで、全ての部員が「囲碁って楽しい」と思える場所を目指しています。
                            </p>
                        </div>
                        <div className="aspect-video bg-muted rounded-xl flex items-center justify-center text-muted-foreground">
                            Activity Image Placeholder
                        </div>
                    </div>
                </section>

                {/* Activity Info (SEO/LLM Critical) */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-bold border-b pb-2">活動概要</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <Card>
                            <CardHeader>
                                <Target className="h-8 w-8 text-primary mb-2" />
                                <CardTitle className="text-lg">活動内容</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                                    <li>部員同士の対局</li>
                                    <li>プロ棋士・OBによる指導碁</li>
                                    <li>他大学との交流戦</li>
                                    <li>合宿（年2回）</li>
                                </ul>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <Clock className="h-8 w-8 text-primary mb-2" />
                                <CardTitle className="text-lg">活動頻度・時間</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground mb-2">
                                    <strong>毎週 木曜日</strong><br />
                                    16:30 〜 20:00
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    ※授業期間中。長期休暇中は別途設定。<br />
                                    ※途中参加・途中退出自由。
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <MapPin className="h-8 w-8 text-primary mb-2" />
                                <CardTitle className="text-lg">活動場所</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    <strong>中百舌鳥 : <br />杉本 : </strong>
                                </p>
                                <p className="text-xs text-muted-foreground mt-2">
                                    キャンパスマップのリンクはこちら<br />
                                    （Google Mapsへのリンク等を想定）
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* History */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-bold border-b pb-2">沿革</h2>
                    <div className="space-y-4 border-l-2 border-muted pl-4 ml-2">
                        <div className="relative">
                            <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-primary" />
                            <p className="text-sm text-muted-foreground">1970年</p>
                            <p className="font-medium">大学囲碁部として発足</p>
                        </div>
                        <div className="relative">
                            <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-muted" />
                            <p className="text-sm text-muted-foreground">現在</p>
                            <p className="font-medium">部員数10名を超え、活発に活動中。</p>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}

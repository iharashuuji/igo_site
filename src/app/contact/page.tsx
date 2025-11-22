import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
    title: "お問い合わせ | 大学囲碁部",
    description: "大学囲碁部への入部申請、見学希望、その他お問い合わせはこちらから。",
};

export default function ContactPage() {
    return (
        <div className="container py-12 md:py-24">
            <div className="max-w-3xl mx-auto space-y-12">
                <div className="text-center space-y-4">
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-primary">お問い合わせ</h1>
                    <p className="text-muted-foreground text-lg">
                        見学・入部のご連絡は、以下のフォームまたはSNSからお気軽にどうぞ。
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="text-center">
                        <CardHeader className="flex flex-col items-center">
                            <Mail className="h-10 w-10 text-primary mb-2" />
                            <CardTitle>お問い合わせフォーム</CardTitle>
                            <CardDescription>
                                Googleフォームへ移動します。<br />
                                メールで返信いたします。
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button className="w-full" asChild>
                                <a href="https://docs.google.com/forms/d/e/1FAIpQLSd8HGh8yseMHf1L-yhEK2VIUi7RSHnHpem7BnBh_jHn-sKmKQ/viewform?usp=publish-editor" target="_blank" rel="noopener noreferrer">
                                    フォームを開く
                                </a>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="text-center">
                        <CardHeader className="flex flex-col items-center">
                            <MessageCircle className="h-10 w-10 text-primary mb-2" />
                            <CardTitle>公式X (Twitter)</CardTitle>
                            <CardDescription>
                                DMでのご連絡も受け付けています。<br />
                                レスポンスが早いです。
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button variant="outline" className="w-full" asChild>
                                <a href="https://x.com/OMUigo_twi" target="_blank" rel="noopener noreferrer">
                                    @ハム大囲碁部
                                </a>
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                <div className="bg-muted/50 p-6 rounded-xl text-center">
                    <h3 className="font-semibold mb-2">活動場所へのアクセス</h3>
                    <p className="text-muted-foreground text-sm">
                        〒000-0000<br />
                        〇〇県〇〇市〇〇区 1-1-1<br />
                        大学 学生会館 3階 和室A
                    </p>
                </div>
            </div>
        </div>
    );
}

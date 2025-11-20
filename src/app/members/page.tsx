import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { User } from "lucide-react";

export const metadata: Metadata = {
    title: "部員紹介 | 大学囲碁部",
    description: "大学囲碁部の部員を紹介します。個性豊かなメンバーがあなたを待っています。",
};

// Mock Data
const MEMBERS = [
    {
        id: "1",
        name: "田中 太郎",
        grade: "3年",
        role: "部長",
        rank: "五段",
        message: "囲碁は自由なゲームです。一緒に楽しみましょう！",
    },
    {
        id: "2",
        name: "佐藤 花子",
        grade: "2年",
        role: "会計",
        rank: "初段",
        message: "初心者から始めました。女子部員も大歓迎です。",
    },
    {
        id: "3",
        name: "鈴木 一郎",
        grade: "1年",
        role: "部員",
        rank: "10級",
        message: "最近始めたばかりですが、毎日強くなっている気がします。",
    },
    {
        id: "4",
        name: "高橋 次郎",
        grade: "4年",
        role: "前部長",
        rank: "六段",
        message: "卒業までにもう少し強くなりたいです。",
    },
];

export default function MembersPage() {
    return (
        <div className="container py-12 md:py-24">
            <div className="max-w-5xl mx-auto space-y-12">
                <div className="text-center space-y-4">
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-primary">部員紹介</h1>
                    <p className="text-muted-foreground text-lg">
                        個性豊かな部員たちが、あなたをお待ちしています。
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {MEMBERS.map((member) => (
                        <Card key={member.id} className="text-center hover:shadow-md transition-shadow">
                            <CardHeader className="flex flex-col items-center pb-2">
                                <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center mb-4">
                                    <User className="h-12 w-12 text-muted-foreground" />
                                </div>
                                <CardTitle>{member.name}</CardTitle>
                                <CardDescription>{member.grade} / {member.role}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="mb-4">
                                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                                        棋力: {member.rank}
                                    </span>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    「{member.message}」
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}

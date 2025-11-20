import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Trophy, FileText, Activity } from "lucide-react";
import Link from "next/link";

export default function AdminDashboardPage() {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">ダッシュボード</h2>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">総部員数</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">32名</div>
                        <p className="text-xs text-muted-foreground">
                            先月比 +2名
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">今月の対局数</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">145局</div>
                        <p className="text-xs text-muted-foreground">
                            先月比 +12%
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">未承認の棋譜</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3件</div>
                        <p className="text-xs text-muted-foreground">
                            確認が必要です
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">次の大会</CardTitle>
                        <Trophy className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">関東リーグ</div>
                        <p className="text-xs text-muted-foreground">
                            あと14日
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>最近の対局</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex items-center">
                                    <div className="ml-4 space-y-1">
                                        <p className="text-sm font-medium leading-none">田中 太郎 (五段) vs 佐藤 花子 (初段)</p>
                                        <p className="text-sm text-muted-foreground">
                                            互先 / 黒中押し勝ち
                                        </p>
                                    </div>
                                    <div className="ml-auto font-medium text-xs text-muted-foreground">
                                        2時間前
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>クイックアクション</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Link href="/admin/games" className="block p-3 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors text-sm font-medium">
                            + 新しい対局結果を入力
                        </Link>
                        <Link href="/admin/members" className="block p-3 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors text-sm font-medium">
                            + 新入部員を登録
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Trophy, FileText, Activity } from "lucide-react";
import Link from "next/link";

async function getDashboardStats() {
    const supabase = await createClient();

    // Get Member Count
    const { count: memberCount } = await supabase
        .from("members")
        .select("*", { count: "exact", head: true });

    // Get Game Count (This Month)
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const { count: gameCount } = await supabase
        .from("games")
        .select("*", { count: "exact", head: true })
        .gte("played_at", startOfMonth.toISOString());

    // Get Recent Games
    const { data: recentGames } = await supabase
        .from("games")
        .select(`
      *,
      black_player:members!black_player_id(name, rank),
      white_player:members!white_player_id(name, rank)
    `)
        .order("played_at", { ascending: false })
        .limit(5);

    return {
        memberCount: memberCount || 0,
        gameCount: gameCount || 0,
        recentGames: recentGames || [],
    };
}

export default async function AdminDashboardPage() {
    const stats = await getDashboardStats();

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
                        <div className="text-2xl font-bold">{stats.memberCount}名</div>
                        <p className="text-xs text-muted-foreground">
                            現役・OB含む
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">今月の対局数</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.gameCount}局</div>
                        <p className="text-xs text-muted-foreground">
                            {new Date().getMonth() + 1}月
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">未承認の棋譜</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">-</div>
                        <p className="text-xs text-muted-foreground">
                            機能未実装
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">次の大会</CardTitle>
                        <Trophy className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">-</div>
                        <p className="text-xs text-muted-foreground">
                            予定なし
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
                            {stats.recentGames.length > 0 ? (
                                stats.recentGames.map((game: any) => (
                                    <div key={game.id} className="flex items-center">
                                        <div className="ml-4 space-y-1">
                                            <p className="text-sm font-medium leading-none">
                                                {game.black_player?.name} ({game.black_player?.rank}) vs {game.white_player?.name} ({game.white_player?.rank})
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {game.handicap} / {game.result}
                                            </p>
                                        </div>
                                        <div className="ml-auto font-medium text-xs text-muted-foreground">
                                            {new Date(game.played_at).toLocaleDateString()}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-muted-foreground">対局記録はありません。</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>クイックアクション</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Link href="/admin/dashboard/games" className="block p-3 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors text-sm font-medium">
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

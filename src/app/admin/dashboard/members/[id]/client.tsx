"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trophy, Target, TrendingUp } from "lucide-react";
import Link from "next/link";

interface MemberProfileClientProps {
    member: any;
    stats: {
        totalGames: number;
        wins: number;
        losses: number;
        winRate: number;
    };
    games: any[];
}

export default function MemberProfileClient({ member, stats, games }: MemberProfileClientProps) {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/members">
                        <Button variant="outline" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <h2 className="text-2xl font-bold tracking-tight">部員詳細</h2>
                </div>
            </div>

            {/* Member Info Card */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 text-2xl font-bold">
                            {member.name[0]}
                        </div>
                        <div>
                            <CardTitle className="text-2xl">{member.name}</CardTitle>
                            <p className="text-muted-foreground">
                                {member.grade}年 / {member.rank} / {member.role}
                            </p>
                        </div>
                    </div>
                </CardHeader>
                {member.introduction && (
                    <CardContent>
                        <div className="space-y-2">
                            <h3 className="font-semibold">自己紹介</h3>
                            <p className="text-muted-foreground whitespace-pre-wrap">{member.introduction}</p>
                        </div>
                    </CardContent>
                )}
            </Card>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">総対局数</CardTitle>
                        <Target className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalGames}</div>
                        <p className="text-xs text-muted-foreground">試合</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">勝利数</CardTitle>
                        <Trophy className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">{stats.wins}</div>
                        <p className="text-xs text-muted-foreground">勝</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">敗北数</CardTitle>
                        <Target className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-destructive">{stats.losses}</div>
                        <p className="text-xs text-muted-foreground">敗</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">勝率</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.winRate}%</div>
                        <p className="text-xs text-muted-foreground">
                            {stats.wins}/{stats.totalGames}
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Game History */}
            <Card>
                <CardHeader>
                    <CardTitle>対局履歴</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {games.length === 0 ? (
                            <p className="text-center text-muted-foreground py-8">
                                対局履歴がありません。
                            </p>
                        ) : (
                            games.map((game) => {
                                const isBlack = game.black_player_id === member.id;
                                const opponent = isBlack ? game.white_player : game.black_player;
                                const opponentColor = isBlack ? "白番" : "黒番";
                                const playerColor = isBlack ? "黒番" : "白番";

                                // Determine if this member won
                                const result = game.result || '';
                                let won = false;
                                if (result.startsWith('B+') && isBlack) won = true;
                                if (result.startsWith('W+') && !isBlack) won = true;

                                return (
                                    <div
                                        key={game.id}
                                        className={`flex items-center justify-between p-4 border rounded-lg ${won ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                                            }`}
                                    >
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <span className={`font-medium ${won ? 'text-green-700' : 'text-red-700'}`}>
                                                    {won ? '勝' : '敗'}
                                                </span>
                                                <span className="text-sm text-muted-foreground">
                                                    vs {opponent?.name} ({opponent?.rank})
                                                </span>
                                            </div>
                                            <div className="text-sm text-muted-foreground mt-1">
                                                {playerColor} / {game.handicap || '互先'} / {game.result}
                                                {game.event_name && ` / ${game.event_name}`}
                                            </div>
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            {new Date(game.played_at).toLocaleDateString('ja-JP')}
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

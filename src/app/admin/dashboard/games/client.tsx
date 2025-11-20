"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { addGame, GameState } from "@/app/actions/games";


const initialState: GameState = {
    message: "",
};

export default function GameEntryClient({ members }: { members: any[] }) {
    const [state, formAction, isPending] = useActionState(addGame, initialState);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">対局結果入力</h2>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>新規対局記録</CardTitle>
                </CardHeader>
                <CardContent>
                    <form action={formAction} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Date & Event */}
                            <div className="space-y-2">
                                <Label htmlFor="played_at">対局日</Label>
                                <Input id="played_at" name="played_at" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="event_name">大会・イベント名 (任意)</Label>
                                <Input id="event_name" name="event_name" placeholder="例: 春季合宿リーグ" />
                            </div>

                            {/* Black Player */}
                            <div className="space-y-2">
                                <Label htmlFor="black_player_id">黒番</Label>
                                <Select name="black_player_id">
                                    <SelectTrigger>
                                        <SelectValue placeholder="部員を選択" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {members.map((m) => (
                                            <SelectItem key={m.id} value={m.id}>{m.name} ({m.rank})</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* White Player */}
                            <div className="space-y-2">
                                <Label htmlFor="white_player_id">白番</Label>
                                <Select name="white_player_id">
                                    <SelectTrigger>
                                        <SelectValue placeholder="部員を選択" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {members.map((m) => (
                                            <SelectItem key={m.id} value={m.id}>{m.name} ({m.rank})</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Handicap & Komi */}
                            <div className="space-y-2">
                                <Label htmlFor="handicap">手合割</Label>
                                <Select name="handicap" defaultValue="互先">
                                    <SelectTrigger>
                                        <SelectValue placeholder="手合割を選択" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="互先">互先 (コミ6目半)</SelectItem>
                                        <SelectItem value="定先">定先</SelectItem>
                                        <SelectItem value="2子">2子</SelectItem>
                                        <SelectItem value="3子">3子</SelectItem>
                                        <SelectItem value="4子">4子</SelectItem>
                                        <SelectItem value="5子">5子</SelectItem>
                                        <SelectItem value="6子">6子</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Result */}
                            <div className="space-y-2">
                                <Label htmlFor="result">結果</Label>
                                <Input id="result" name="result" placeholder="例: B+R (黒中押し勝ち), W+3.5" required />
                            </div>
                        </div>

                        {/* SGF Content */}
                        <div className="space-y-2">
                            <Label htmlFor="sgf_content">SGFデータ (任意)</Label>
                            <Textarea
                                id="sgf_content"
                                name="sgf_content"
                                placeholder="(;GM[1]FF[4]CA[UTF-8]AP[CGoban:3]ST[2]...)"
                                className="font-mono text-xs h-32"
                            />
                        </div>

                        {state.message && (
                            <p className={`text-sm font-medium ${state.message.includes('エラー') ? 'text-destructive' : 'text-green-600'}`}>
                                {state.message}
                            </p>
                        )}

                        <div className="flex justify-end gap-4">
                            <Button variant="outline" type="button">キャンセル</Button>
                            <Button type="submit" disabled={isPending}>
                                {isPending ? '登録する' : '登録する'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

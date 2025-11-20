"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"; // Will need to create this
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Will need to create this

// Mock Members for Dropdown
const MEMBERS = [
    { id: "1", name: "田中 太郎 (五段)" },
    { id: "2", name: "佐藤 花子 (初段)" },
    { id: "3", name: "鈴木 一郎 (10級)" },
];

export default function GameEntryPage() {
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
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Date & Event */}
                            <div className="space-y-2">
                                <Label htmlFor="date">対局日</Label>
                                <Input id="date" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="event">大会・イベント名 (任意)</Label>
                                <Input id="event" placeholder="例: 春季合宿リーグ" />
                            </div>

                            {/* Black Player */}
                            <div className="space-y-2">
                                <Label htmlFor="black">黒番</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="部員を選択" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {MEMBERS.map((m) => (
                                            <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* White Player */}
                            <div className="space-y-2">
                                <Label htmlFor="white">白番</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="部員を選択" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {MEMBERS.map((m) => (
                                            <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Handicap & Komi */}
                            <div className="space-y-2">
                                <Label htmlFor="handicap">手合割</Label>
                                <Select defaultValue="even">
                                    <SelectTrigger>
                                        <SelectValue placeholder="手合割を選択" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="even">互先 (コミ6目半)</SelectItem>
                                        <SelectItem value="sen">定先</SelectItem>
                                        <SelectItem value="2">2子</SelectItem>
                                        <SelectItem value="3">3子</SelectItem>
                                        <SelectItem value="4">4子</SelectItem>
                                        <SelectItem value="high">5子以上</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Result */}
                            <div className="space-y-2">
                                <Label htmlFor="result">結果</Label>
                                <Input id="result" placeholder="例: B+R (黒中押し勝ち), W+3.5" />
                            </div>
                        </div>

                        {/* SGF Content */}
                        <div className="space-y-2">
                            <Label htmlFor="sgf">SGFデータ (任意)</Label>
                            <Textarea
                                id="sgf"
                                placeholder="(;GM[1]FF[4]CA[UTF-8]AP[CGoban:3]ST[2]...)"
                                className="font-mono text-xs h-32"
                            />
                            <p className="text-xs text-muted-foreground">
                                KifuDepotや各種アプリからコピーしたSGFテキストを貼り付けてください。
                            </p>
                        </div>

                        <div className="flex justify-end gap-4">
                            <Button variant="outline" type="button">キャンセル</Button>
                            <Button type="submit">登録する</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

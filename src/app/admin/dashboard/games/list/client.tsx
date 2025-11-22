"use client";

import { useState, useActionState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { updateGame, deleteGame, GameState } from "@/app/actions/games";
import { Pencil, Trash2, Plus } from "lucide-react";
import Link from "next/link";

const initialState: GameState = {
    message: "",
};

interface GameListClientProps {
    games: any[];
    members: any[];
}

export default function GameListClient({ games, members }: GameListClientProps) {
    const [editingGame, setEditingGame] = useState<any>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [state, formAction, isPending] = useActionState(updateGame, initialState);

    const handleEdit = (game: any) => {
        setEditingGame(game);
        setIsEditDialogOpen(true);
    };

    const handleDelete = async (gameId: string) => {
        if (confirm("この対局記録を削除しますか?")) {
            const formData = new FormData();
            formData.append('id', gameId);
            await deleteGame(formData);
        }
    };

    // Parse result to extract winner and method for editing
    const parseResult = (result: string) => {
        if (!result) return { winner: '', method: '' };
        const winner = result.startsWith('B') ? 'black' : 'white';
        const method = result.substring(2); // Remove "B+" or "W+"
        return { winner, method };
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">対局記録一覧</h2>
                <Link href="/admin/dashboard/games">
                    <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        新規登録
                    </Button>
                </Link>
            </div>

            {/* Games List */}
            <Card>
                <CardHeader>
                    <CardTitle>登録済み対局 ({games.length}件)</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {games.length === 0 ? (
                            <p className="text-center text-muted-foreground py-8">
                                登録されている対局記録はありません。
                            </p>
                        ) : (
                            games.map((game) => (
                                <div
                                    key={game.id}
                                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                                >
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium">
                                                {game.black_player?.name || '不明'} (黒) vs {game.white_player?.name || '不明'} (白)
                                            </span>
                                        </div>
                                        <div className="text-sm text-muted-foreground mt-1">
                                            {new Date(game.played_at).toLocaleDateString('ja-JP')} / {game.handicap || '互先'} / {game.result}
                                            {game.event_name && ` / ${game.event_name}`}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => handleEdit(game)}
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => handleDelete(game.id)}
                                            className="text-destructive hover:text-destructive/90"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Edit Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>対局記録編集</DialogTitle>
                    </DialogHeader>
                    {editingGame && (
                        <form action={formAction} className="space-y-4">
                            <input type="hidden" name="id" value={editingGame.id} />

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="played_at">対局日</Label>
                                    <Input
                                        id="played_at"
                                        name="played_at"
                                        type="date"
                                        defaultValue={editingGame.played_at}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="event_name">大会・イベント名</Label>
                                    <Input
                                        id="event_name"
                                        name="event_name"
                                        defaultValue={editingGame.event_name || ''}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="black_player_id">黒番</Label>
                                    <Select name="black_player_id" defaultValue={editingGame.black_player_id}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {members.map((m) => (
                                                <SelectItem key={m.id} value={m.id}>
                                                    {m.name} ({m.rank})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="white_player_id">白番</Label>
                                    <Select name="white_player_id" defaultValue={editingGame.white_player_id}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {members.map((m) => (
                                                <SelectItem key={m.id} value={m.id}>
                                                    {m.name} ({m.rank})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="handicap">手合割</Label>
                                    <Select name="handicap" defaultValue={editingGame.handicap || '互先'}>
                                        <SelectTrigger>
                                            <SelectValue />
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

                                <div className="space-y-2">
                                    <Label htmlFor="result">結果</Label>
                                    <Input
                                        id="result"
                                        name="result"
                                        defaultValue={editingGame.result}
                                        placeholder="例: B+R, W+3.5"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="sgf_content">SGFデータ</Label>
                                <Textarea
                                    id="sgf_content"
                                    name="sgf_content"
                                    defaultValue={editingGame.sgf_content || ''}
                                    className="font-mono text-xs h-32"
                                />
                            </div>

                            {state.message && (
                                <p className={`text-sm font-medium ${state.message.includes('エラー') ? 'text-destructive' : 'text-green-600'}`}>
                                    {state.message}
                                </p>
                            )}

                            <div className="flex justify-end gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsEditDialogOpen(false)}
                                >
                                    キャンセル
                                </Button>
                                <Button type="submit" disabled={isPending}>
                                    {isPending ? '更新中...' : '更新する'}
                                </Button>
                            </div>
                        </form>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}

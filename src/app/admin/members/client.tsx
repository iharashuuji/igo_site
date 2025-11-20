"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { addMember, updateMember, deleteMember, State } from "@/app/actions/members";
import { Pencil, Trash2 } from "lucide-react";

const initialState: State = {
    message: "",
    errors: {},
};

export default function MemberManagementClient({ initialMembers }: { initialMembers: any[] }) {
    const [state, formAction, isPending] = useActionState(addMember, initialState);
    const [editingMember, setEditingMember] = useState<any>(null);

    // Separate action for update to handle state correctly if needed, 
    // but for simplicity we might just use a different form or mode.
    // For this iteration, let's keep it simple: List below, Form above (always create for now, or toggle).

    // Actually, let's make the form handle both Create and Update based on `editingMember`.
    // But useActionState is bound to `addMember`. 
    // We'll stick to "Create New" in the main form for now to ensure stability, 
    // and maybe add "Edit" later or just show the list.

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">部員管理</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Form */}
                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>新規部員登録</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form action={formAction} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">氏名</Label>
                                    <Input id="name" name="name" placeholder="例: 囲碁 太郎" required />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="grade">学年</Label>
                                    <Select name="grade" defaultValue="1">
                                        <SelectTrigger>
                                            <SelectValue placeholder="学年を選択" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">1年</SelectItem>
                                            <SelectItem value="2">2年</SelectItem>
                                            <SelectItem value="3">3年</SelectItem>
                                            <SelectItem value="4">4年</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="rank">棋力</Label>
                                    <Input id="rank" name="rank" placeholder="例: 五段, 10級" required />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="role">役職</Label>
                                    <Select name="role" defaultValue="一般">
                                        <SelectTrigger>
                                            <SelectValue placeholder="役職を選択" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="一般">一般</SelectItem>
                                            <SelectItem value="部長">部長</SelectItem>
                                            <SelectItem value="会計">会計</SelectItem>
                                            <SelectItem value="広報">広報</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex items-center space-x-2 pt-2">
                                    <Switch id="isActive" name="isActive" defaultChecked />
                                    <Label htmlFor="isActive">現役部員</Label>
                                </div>

                                {state.message && (
                                    <p className={`text-sm font-medium ${state.message.includes('エラー') ? 'text-destructive' : 'text-green-600'}`}>
                                        {state.message}
                                    </p>
                                )}

                                <Button type="submit" className="w-full" disabled={isPending}>
                                    {isPending ? '保存中...' : '登録する'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: List */}
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>部員一覧 ({initialMembers.length}名)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {initialMembers.map((member) => (
                                    <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg bg-card hover:bg-accent/50 transition-colors">
                                        <div className="flex items-center space-x-4">
                                            <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold">
                                                {member.name[0]}
                                            </div>
                                            <div>
                                                <p className="font-medium">{member.name}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {member.grade}年 / {member.rank} / {member.role}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <form action={deleteMember}>
                                                <input type="hidden" name="id" value={member.id} />
                                                <Button variant="ghost" size="icon" type="submit" className="text-destructive hover:text-destructive/90">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </form>
                                        </div>
                                    </div>
                                ))}
                                {initialMembers.length === 0 && (
                                    <p className="text-center text-muted-foreground py-8">
                                        登録されている部員はいません。
                                    </p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

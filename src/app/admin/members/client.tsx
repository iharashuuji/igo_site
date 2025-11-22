"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { addMember, updateMember, deleteMember, State } from "@/app/actions/members";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

const initialState: State = {
    message: "",
    errors: {},
};

export default function MemberManagementClient({ initialMembers }: { initialMembers: any[] }) {
    const [addState, addFormAction, isAddPending] = useActionState(addMember, initialState);
    const [updateState, updateFormAction, isUpdatePending] = useActionState(updateMember, initialState);
    const [editingMember, setEditingMember] = useState<any>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const handleEdit = (member: any) => {
        setEditingMember(member);
        setIsEditDialogOpen(true);
    };

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
                            <form action={addFormAction} className="space-y-4">
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

                                <div className="space-y-2">
                                    <Label htmlFor="introduction">自己紹介</Label>
                                    <Textarea
                                        id="introduction"
                                        name="introduction"
                                        placeholder="部員の自己紹介や経歴など"
                                        className="h-24"
                                    />
                                </div>

                                <div className="flex items-center space-x-2 pt-2">
                                    <Switch id="isActive" name="isActive" defaultChecked />
                                    <Label htmlFor="isActive">現役部員</Label>
                                </div>

                                {addState.message && (
                                    <p className={`text-sm font-medium ${addState.message.includes('エラー') ? 'text-destructive' : 'text-green-600'}`}>
                                        {addState.message}
                                    </p>
                                )}

                                <Button type="submit" className="w-full" disabled={isAddPending}>
                                    {isAddPending ? '保存中...' : '登録する'}
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
                                        <Link href={`/admin/dashboard/members/${member.id}`} className="flex items-center space-x-4 flex-1">
                                            <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold">
                                                {member.name[0]}
                                            </div>
                                            <div>
                                                <p className="font-medium">{member.name}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {member.grade}年 / {member.rank} / {member.role}
                                                </p>
                                            </div>
                                        </Link>
                                        <div className="flex items-center space-x-2">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => handleEdit(member)}
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <form
                                                action={deleteMember}
                                                onSubmit={(e) => {
                                                    if (!confirm('本当にこの部員を削除しますか？\n※削除すると元に戻せません。')) {
                                                        e.preventDefault();
                                                    }
                                                }}
                                            >
                                                <input type="hidden" name="id" value={member.id} />
                                                <Button variant="outline" size="icon" type="submit" className="text-destructive hover:text-destructive/90">
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

            {/* Edit Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>部員情報編集</DialogTitle>
                    </DialogHeader>
                    {editingMember && (
                        <form action={updateFormAction} className="space-y-4">
                            <input type="hidden" name="id" value={editingMember.id} />

                            <div className="space-y-2">
                                <Label htmlFor="edit-name">氏名</Label>
                                <Input id="edit-name" name="name" defaultValue={editingMember.name} required />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="edit-grade">学年</Label>
                                <Select name="grade" defaultValue={editingMember.grade.toString()}>
                                    <SelectTrigger>
                                        <SelectValue />
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
                                <Label htmlFor="edit-rank">棋力</Label>
                                <Input id="edit-rank" name="rank" defaultValue={editingMember.rank} required />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="edit-role">役職</Label>
                                <Select name="role" defaultValue={editingMember.role}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="一般">一般</SelectItem>
                                        <SelectItem value="部長">部長</SelectItem>
                                        <SelectItem value="会計">会計</SelectItem>
                                        <SelectItem value="広報">広報</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="edit-introduction">自己紹介</Label>
                                <Textarea
                                    id="edit-introduction"
                                    name="introduction"
                                    defaultValue={editingMember.introduction || ''}
                                    className="h-24"
                                />
                            </div>

                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="edit-isActive"
                                    name="isActive"
                                    defaultChecked={editingMember.is_active}
                                />
                                <Label htmlFor="edit-isActive">現役部員</Label>
                            </div>

                            {updateState.message && (
                                <p className={`text-sm font-medium ${updateState.message.includes('エラー') ? 'text-destructive' : 'text-green-600'}`}>
                                    {updateState.message}
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
                                <Button type="submit" disabled={isUpdatePending}>
                                    {isUpdatePending ? '更新中...' : '更新する'}
                                </Button>
                            </div>
                        </form>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}

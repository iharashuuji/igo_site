"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch"; // Will need to create this

export default function MemberManagementPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">部員管理</h2>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>部員登録・編集</CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name */}
                            <div className="space-y-2">
                                <Label htmlFor="name">氏名</Label>
                                <Input id="name" placeholder="例: 囲碁 太郎" />
                            </div>

                            {/* Grade */}
                            <div className="space-y-2">
                                <Label htmlFor="grade">学年</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="学年を選択" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">1年</SelectItem>
                                        <SelectItem value="2">2年</SelectItem>
                                        <SelectItem value="3">3年</SelectItem>
                                        <SelectItem value="4">4年</SelectItem>
                                        <SelectItem value="ob">OB/OG</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Rank */}
                            <div className="space-y-2">
                                <Label htmlFor="rank">棋力</Label>
                                <Input id="rank" placeholder="例: 五段, 10級" />
                            </div>

                            {/* Role */}
                            <div className="space-y-2">
                                <Label htmlFor="role">役職</Label>
                                <Select defaultValue="member">
                                    <SelectTrigger>
                                        <SelectValue placeholder="役職を選択" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="member">一般</SelectItem>
                                        <SelectItem value="leader">部長</SelectItem>
                                        <SelectItem value="accountant">会計</SelectItem>
                                        <SelectItem value="pr">広報</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Avatar */}
                            <div className="space-y-2">
                                <Label htmlFor="avatar">アイコン画像</Label>
                                <Input id="avatar" type="file" accept="image/*" />
                                <p className="text-xs text-muted-foreground">
                                    ※Supabase Storageにアップロードされます。
                                </p>
                            </div>

                            {/* Active Status */}
                            <div className="flex items-center space-x-2 pt-8">
                                <Switch id="active" defaultChecked />
                                <Label htmlFor="active">現役部員として表示する</Label>
                            </div>
                        </div>

                        {/* Introduction */}
                        <div className="space-y-2">
                            <Label htmlFor="intro">自己紹介 / 一言メッセージ</Label>
                            <Textarea id="intro" placeholder="例: 囲碁は初心者ですが頑張ります！" />
                        </div>

                        <div className="flex justify-end gap-4">
                            <Button variant="outline" type="button">キャンセル</Button>
                            <Button type="submit">保存する</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

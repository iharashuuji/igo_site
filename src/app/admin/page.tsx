import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input"; // Will need to create this
import { Label } from "@/components/ui/label"; // Will need to create this

export default function AdminLoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle>管理者ログイン</CardTitle>
                    <CardDescription>
                        部員専用の管理画面です。<br />
                        登録されたメールアドレスでログインしてください。
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">メールアドレス</Label>
                            <Input id="email" type="email" placeholder="member@example.com" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">パスワード</Label>
                            <Input id="password" type="password" />
                        </div>
                        <Button className="w-full">ログイン</Button>
                    </form>
                    <div className="mt-4 text-center text-xs text-muted-foreground">
                        ※現在はモック画面です。実際の認証はSupabase Authを使用します。
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

import { login } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
                    <form action={login} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">メールアドレス</Label>
                            <Input id="email" name="email" type="email" placeholder="member@example.com" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">パスワード</Label>
                            <Input id="password" name="password" type="password" required />
                        </div>
                        <Button className="w-full">ログイン</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

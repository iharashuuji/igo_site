import { Sidebar } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-slate-900 text-white p-6 flex-shrink-0">
                <div className="mb-8">
                    <h1 className="text-xl font-bold">囲碁部 管理画面</h1>
                    <p className="text-xs text-slate-400">v2.0.0</p>
                </div>
                <nav className="space-y-2">
                    <Link href="/admin/dashboard">
                        <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800">
                            ダッシュボード
                        </Button>
                    </Link>
                    <Link href="/admin/dashboard/games">
                        <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800">
                            対局結果入力
                        </Button>
                    </Link>
                    <Link href="/admin/members">
                        <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800">
                            部員管理
                        </Button>
                    </Link>
                    <Link href="https://k8z6onfj9h.microcms.io/apis/blogs/create">
                        <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800">
                            ブログ作成
                        </Button>
                    </Link>
                    <Link href="https://www.notion.so/1dcca2c51c3080ee85dbc9bd78bc8bed?source=copy_link">
                    <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800">
                            囲碁部マニュアル確認
                        </Button>
                    </Link>
                    <div className="pt-4 mt-4 border-t border-slate-800">
                        <Link href="/">
                            <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800">
                                サイトに戻る
                            </Button>
                        </Link>
                        
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 bg-slate-50 p-6 md:p-12">
                <div className="max-w-4xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}

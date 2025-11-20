import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-primary">囲碁部</span>
                    </Link>
                </div>

                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    <Link href="/about" className="transition-colors hover:text-primary">
                        囲碁部について
                    </Link>
                    <Link href="/blog" className="transition-colors hover:text-primary">
                        活動ブログ
                    </Link>
                    <Link href="/members" className="transition-colors hover:text-primary">
                        部員紹介
                    </Link>
                    <Link href="/faq" className="transition-colors hover:text-primary">
                        よくある質問
                    </Link>
                    <Link href="/admin" className="transition-colors hover:text-primary">
                        管理者画面
                    </Link>
                </nav>

                <div className="flex items-center gap-4">
                    <Link href="/contact">
                        <Button variant="default" size="sm" className="hidden md:inline-flex">
                            入部・見学希望
                        </Button>
                    </Link>
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                </div>
            </div>
        </header>
    );
}

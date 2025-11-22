"use client";

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center space-x-2" onClick={() => setIsMenuOpen(false)}>
                        <span className="text-xl font-bold text-primary">囲碁部</span>
                    </Link>
                </div>

                {/* Desktop Nav */}
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
                    <Link href="/link" className='transition-colors hover:text-primary'>
                        リンク集
                    </Link>
                </nav>

                <div className="flex items-center gap-4">
                    <Link href="/contact">
                        <Button variant="default" size="sm" className="hidden md:inline-flex">
                            入部・見学希望
                        </Button>
                    </Link>
                    <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
                        {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="md:hidden border-t bg-background">
                    <div className="container py-4 space-y-4">
                        <nav className="flex flex-col space-y-4">
                            <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                                囲碁部について
                            </Link>
                            <Link href="/blog" className="text-sm font-medium transition-colors hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                                活動ブログ
                            </Link>
                            <Link href="/members" className="text-sm font-medium transition-colors hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                                部員紹介
                            </Link>
                            <Link href="/faq" className="text-sm font-medium transition-colors hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                                よくある質問
                            </Link>
                            <Link href="/admin" className="text-sm font-medium transition-colors hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                                管理者画面
                            </Link>
                            <Link href="/link" className="text-sm font-medium transition-colors hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                                リンク集
                            </Link>
                            <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                                <Button variant="default" size="sm" className="w-full">
                                    入部・見学希望
                                </Button>
                            </Link>
                        </nav>
                    </div>
                </div>
            )}
        </header>
    );
}

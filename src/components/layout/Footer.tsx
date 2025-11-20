import Link from 'next/link';

export function Footer() {
    return (
        <footer className="border-t bg-muted/40">
            <div className="container py-8 md:py-12">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    <div>
                        <h3 className="text-lg font-semibold text-primary mb-4">大学囲碁部</h3>
                        <p className="text-sm text-muted-foreground">
                            初心者から有段者まで、楽しく活動しています。<br />
                            見学・体験はいつでも歓迎です。
                        </p>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold mb-4">リンク</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/about" className="hover:text-primary">活動理念</Link></li>
                            <li><Link href="/blog" className="hover:text-primary">ブログ</Link></li>
                            <li><Link href="/faq" className="hover:text-primary">Q&A</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold mb-4">お問い合わせ</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/contact" className="hover:text-primary">お問い合わせフォーム</Link></li>
                            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">公式X (Twitter)</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} University Go Club. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

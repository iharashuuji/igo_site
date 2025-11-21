import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
    // 1. レスポンスを最初に定義
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });

    // 2. createServerClient の呼び出し方を変え、response を渡す
    const supabase = createServerClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => {
                        // response への書き込み処理を修正
                        response.cookies.set(name, value, options);
                    });
                },
            },
        }
    );

    // 3. セッションリフレッシュを実行
    await supabase.auth.getUser(); 
    // ↑ この呼び出しによって、setAll がトリガーされ、response に新しい Cookie が書き込まれます。

    // 4. Protect Admin Routes (このロジックは正常)
    const pathname = request.nextUrl.pathname;
    const { data: { user } } = await supabase.auth.getUser(); // 再度ユーザー情報を取得（セッションリフレッシュ後）

    // /admin および /admin 配下で、未認証ユーザーをリダイレクト
    if (pathname.startsWith('/admin') && pathname !== '/admin') {
        if (!user) {
            // ★ リダイレクトレスポンスにも、更新された Cookie が含まれるように修正
            const redirectResponse = NextResponse.redirect(new URL('/admin', request.url));
            redirectResponse.headers.set('Set-Cookie', response.headers.get('Set-Cookie') || '');
            return redirectResponse;
        }
    }

    // 5. ログイン済みの場合はダッシュボードにリダイレクト (このロジックは正常)
    if (pathname === '/admin' && user) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
    
    // 6. 最後に、Cookieが書き込まれたresponseを返す
    return response;
}
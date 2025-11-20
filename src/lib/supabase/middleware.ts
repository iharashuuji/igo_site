import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    // process.env が null/undefined ではないかチェック
    console.log('Is process.env defined?', typeof process.env !== 'undefined');

    // process.env がオブジェクトであり、キーをいくつ持っているかチェック（オブジェクト全体の確認）
    if (typeof process.env !== 'undefined' && typeof process.env === 'object') {
        const keys = Object.keys(process.env);
        console.log('process.env key count:', keys.length);
        console.log('Example key:', keys.length > 0 ? keys[0] : 'None');
    }

    // Debugging Vercel Environment Variables
    console.log('Middleware Debug: Checking Env Vars');
    console.log('SUPABASE_URL exists:', !!process.env.SUPABASE_URL);
    console.log('SUPABASE_ANON_KEY exists:', !!process.env.SUPABASE_ANON_KEY);
    console.log('NEXT_PUBLIC_SUPABASE_URL exists:', !!process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY exists:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);


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
                        request.cookies.set(name, value)
                        response.cookies.set(name, value, options)
                    })
                },
            },
        }
    )

    // Refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/server-side/nextjs
    const {
        data: { user },
    } = await supabase.auth.getUser()

    // Protect Admin Routes
    if (request.nextUrl.pathname.startsWith('/admin') && request.nextUrl.pathname !== '/admin') {
        if (!user) {
            return NextResponse.redirect(new URL('/admin', request.url))
        }
    }

    // Redirect to dashboard if already logged in and visiting login page
    if (request.nextUrl.pathname === '/admin') {
        if (user) {
            return NextResponse.redirect(new URL('/admin/dashboard', request.url))
        }
    }

    return response
}

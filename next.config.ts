/** @type {import('next').NextConfig} */
const nextConfig = {
  // (既存の設定があればそのまま残す)

  // ★ ここに env 設定を追加する
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    // (ミドルウェアで非公開キーを使う場合は以下も追加)
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
  },
};

module.exports = nextConfig;

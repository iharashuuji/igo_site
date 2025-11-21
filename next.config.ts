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
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.microcms-assets.io',
      },
      {
        protocol: 'https',
        hostname: 'k8z6onfj9h.microcms.io', // Just in case
      },
      // Add Supabase storage domain if known, otherwise generic pattern or specific if user provided
      // Assuming standard supabase project structure based on env vars, but hostname is dynamic.
      // For now, let's try to infer or allow all if acceptable, but better to be specific.
      // Since we don't have the exact supabase hostname handy in code (it's in env), 
      // we might need to be a bit broad or ask user. 
      // However, usually it's [project-ref].supabase.co
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      }
    ],
  },
};

module.exports = nextConfig;

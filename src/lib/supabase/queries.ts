import { createClient } from '@supabase/supabase-js'
import { unstable_cache } from 'next/cache'

// Use a static client for public data fetching to avoid cookie/request dependency in cache
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const getPublicMembers = unstable_cache(
    async () => {
        const supabase = createClient(supabaseUrl, supabaseAnonKey)
        const { data, error } = await supabase
            .from('members')
            .select('*')
            .eq('is_active', true)
            .order('grade', { ascending: false })
            .order('display_order', { ascending: true })

        if (error) {
            console.error('Error fetching members:', error)
            return []
        }

        return data
    },
    ['public_members'],
    { revalidate: 3600, tags: ['members'] }
)

export const getPublicPosts = unstable_cache(
    async () => {
        const supabase = createClient(supabaseUrl, supabaseAnonKey)
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .eq('is_published', true)
            .order('published_at', { ascending: false })

        if (error) {
            // Table might not exist or be empty
            return []
        }

        return data
    },
    ['public_posts'],
    { revalidate: 3600, tags: ['posts'] }
)

export const getPostBySlug = unstable_cache(
    async (slug: string) => {
        const supabase = createClient(supabaseUrl, supabaseAnonKey)
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .eq('slug', slug)
            .eq('is_published', true)
            .single()

        if (error) {
            return null
        }

        return data
    },
    ['post_by_slug'], // Note: Dynamic key generation is better but for now simple key
    { revalidate: 3600, tags: ['posts'] }
)

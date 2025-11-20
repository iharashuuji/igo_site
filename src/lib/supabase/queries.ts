import { createClient } from '@/lib/supabase/server'
import { cache } from 'react'

export const getPublicMembers = cache(async () => {
    const supabase = await createClient()
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
})

export const getPublicPosts = cache(async () => {
    const supabase = await createClient()
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
})

export const getPostBySlug = cache(async (slug: string) => {
    const supabase = await createClient()
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
})

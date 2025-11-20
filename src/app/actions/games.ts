'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export type GameState = {
    message: string
    errors?: {
        black_player_id?: string[]
        white_player_id?: string[]
        result?: string[]
    }
}

// --- Create ---

export async function addGame(prevState: GameState, formData: FormData) {
    const supabase = await createClient()

    const played_at = formData.get('played_at') as string
    const event_name = formData.get('event_name') as string
    const black_player_id = formData.get('black_player_id') as string
    const white_player_id = formData.get('white_player_id') as string
    const handicap = formData.get('handicap') as string
    const result = formData.get('result') as string
    const sgf_content = formData.get('sgf_content') as string

    if (!black_player_id || !white_player_id || !result) {
        return {
            message: '必須項目が入力されていません。',
        }
    }

    try {
        const { error } = await supabase.from('games').insert({
            played_at: played_at || new Date().toISOString(),
            event_name,
            black_player_id,
            white_player_id,
            handicap,
            result,
            sgf_content,
        })

        if (error) {
            console.error('Supabase Error:', error)
            return {
                message: 'データベースエラーが発生しました。',
            }
        }
    } catch (e) {
        return {
            message: '予期せぬエラーが発生しました。',
        }
    }

    revalidatePath('/admin/games')
    revalidatePath('/admin/dashboard')
    return { message: '対局結果を登録しました。' }
}

// --- Read ---

export async function getGames() {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('games')
        .select(`
      *,
      black_player:members!black_player_id(name, rank),
      white_player:members!white_player_id(name, rank)
    `)
        .order('played_at', { ascending: false })

    if (error) {
        console.error('Supabase Error:', error)
        return []
    }

    return data
}

'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export type State = {
    errors?: {
        name?: string[]
        grade?: string[]
        rank?: string[]
        role?: string[]
    }
    message: string
}

// --- Create ---

export async function addMember(prevState: State, formData: FormData) {
    const supabase = await createClient()

    const name = formData.get('name') as string
    const grade = formData.get('grade') as string
    const rank = formData.get('rank') as string
    const role = formData.get('role') as string
    const introduction = formData.get('introduction') as string
    const isActive = formData.get('isActive') === 'on'

    if (!name || !grade || !rank) {
        return {
            message: '必須項目が入力されていません。',
        }
    }

    try {
        const { error } = await supabase.from('members').insert({
            name,
            grade: parseInt(grade),
            rank,
            role,
            introduction,
            is_active: isActive,
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

    revalidatePath('/admin/members')
    revalidatePath('/members')
    return { message: '部員を登録しました。' }
}

// --- Read ---

export async function getMembers() {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('members')
        .select('*')
        .order('grade', { ascending: false }) // Sort by grade (4th year first)
        .order('display_order', { ascending: true })

    if (error) {
        console.error('Supabase Error:', error)
        return []
    }

    return data
}

// --- Update ---

export async function updateMember(prevState: State, formData: FormData) {
    const supabase = await createClient()

    const id = formData.get('id') as string
    const name = formData.get('name') as string
    const grade = formData.get('grade') as string
    const rank = formData.get('rank') as string
    const role = formData.get('role') as string
    const introduction = formData.get('introduction') as string
    const isActive = formData.get('isActive') === 'on'

    if (!id || !name || !grade || !rank) {
        return {
            message: '必須項目が入力されていません。',
        }
    }

    try {
        const { error } = await supabase.from('members').update({
            name,
            grade: parseInt(grade),
            rank,
            role,
            introduction,
            is_active: isActive,
            updated_at: new Date().toISOString(),
        }).eq('id', id)

        if (error) {
            console.error('Supabase Error:', error)
            return {
                message: '更新に失敗しました。',
            }
        }
    } catch (e) {
        return {
            message: '予期せぬエラーが発生しました。',
        }
    }

    revalidatePath('/admin/members')
    revalidatePath('/members')
    return { message: '部員情報を更新しました。' }
}

// --- Delete ---

export async function deleteMember(formData: FormData) {
    const supabase = await createClient()
    const id = formData.get('id') as string

    if (!id) return

    try {
        const { error } = await supabase.from('members').delete().eq('id', id)
        if (error) throw error
    } catch (e) {
        console.error('Delete Error:', e)
    }

    revalidatePath('/admin/members')
    revalidatePath('/members')
}

// --- Get Member by ID ---

export async function getMemberById(id: string) {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('members')
        .select('*')
        .eq('id', id)
        .single()

    if (error) {
        console.error('Supabase Error:', error)
        return null
    }

    return data
}

// --- Get Member Statistics ---

export async function getMemberStats(memberId: string) {
    const supabase = await createClient()

    const { data: games, error } = await supabase
        .from('games')
        .select('*')
        .or(`black_player_id.eq.${memberId},white_player_id.eq.${memberId}`)

    if (error) {
        console.error('Supabase Error:', error)
        return { totalGames: 0, wins: 0, losses: 0, winRate: 0 }
    }

    const totalGames = games?.length || 0
    let wins = 0

    games?.forEach((game: any) => {
        const result = game.result || ''
        // Check if this member won
        // B+ means black won, W+ means white won
        if (result.startsWith('B+') && game.black_player_id === memberId) {
            wins++
        } else if (result.startsWith('W+') && game.white_player_id === memberId) {
            wins++
        }
    })

    const losses = totalGames - wins
    const winRate = totalGames > 0 ? (wins / totalGames) * 100 : 0

    return { totalGames, wins, losses, winRate: Math.round(winRate * 10) / 10 }
}

// --- Get Games for Member ---

export async function getGamesForMember(memberId: string) {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('games')
        .select(`
            *,
            black_player:members!black_player_id(name, rank),
            white_player:members!white_player_id(name, rank)
        `)
        .or(`black_player_id.eq.${memberId},white_player_id.eq.${memberId}`)
        .order('played_at', { ascending: false })

    if (error) {
        console.error('Supabase Error:', error)
        return []
    }

    return data
}

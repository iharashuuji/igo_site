'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!email || !password) {
        // Ideally we should return an error, but for simple form action type compatibility
        // we will redirect with error param for now.
        redirect('/admin?error=missing_fields')
    }

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        console.error('Login Error:', error)
        redirect('/admin?error=login_failed')
    }

    redirect('/admin/dashboard')
}

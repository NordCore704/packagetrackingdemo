'use server'

import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { SignJWT } from 'jose'
import { cookies } from 'next/headers'

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || 'apexbit-super-secret-dev-key')

export async function registerAdmin(data: any) {
  try {
    const existingAdmin = await db.admin.findUnique({
      where: { email: data.email }
    })

    if (existingAdmin) {
      return { success: false, error: 'An admin with this email already exists.' }
    }

    const hashedPassword = await bcrypt.hash(data.password, 10)

    await db.admin.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      }
    })

    return { success: true }
  } catch (error) {
    return { success: false, error: 'Registration failed. Please try again.' }
  }
}

export async function loginAdmin(data: any) {
  try {
    const admin = await db.admin.findUnique({
      where: { email: data.email }
    })

    if (!admin) {
      return { success: false, error: 'Invalid email or password.' }
    }

    const isPasswordValid = await bcrypt.compare(data.password, admin.password)

    if (!isPasswordValid) {
      return { success: false, error: 'Invalid email or password.' }
    }

    // Create JWT Token
    const token = await new SignJWT({ adminId: admin.id, email: admin.email })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(SECRET_KEY)

    // Await the cookies() promise before setting the cookie
    const cookieStore = await cookies()
    cookieStore.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours
    })

    return { success: true }
  } catch (error) {
    return { success: false, error: 'Login failed. Please try again.' }
  }
}

export async function logoutAdmin() {

  const cookieStore = await cookies()
  cookieStore.delete('admin_token')
  return { success: true }
}
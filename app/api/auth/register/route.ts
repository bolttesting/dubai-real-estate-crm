import { prisma } from '@/lib/db'
import bcrypt from 'bcrypt'

export async function POST(request: Request) {
  try {
    const { email, name, password } = await request.json()
    if (!email || !password || !name) {
      return new Response('Missing fields', { status: 400 })
    }
    const exists = await prisma.user.findUnique({ where: { email } })
    if (exists) return new Response('Email in use', { status: 409 })
    const hash = await bcrypt.hash(password, 10)
    await prisma.user.create({ data: { email, name, password: hash, subscription: 'STARTER' } })
    return new Response('ok', { status: 201 })
  } catch (e) {
    return new Response('Error', { status: 500 })
  }
}



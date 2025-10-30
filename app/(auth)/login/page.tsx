"use client"
import { FormEvent, useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    const res = await signIn('credentials', { redirect: false, email, password })
    if (res?.ok) router.push('/')
    else setError('Invalid credentials')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={onSubmit} className="w-full max-w-sm space-y-4">
        <h1 className="text-xl font-semibold">Sign in</h1>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <div>
          <label className="block text-sm">Email</label>
          <input className="mt-1 w-full border rounded p-2" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm">Password</label>
          <input className="mt-1 w-full border rounded p-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button className="w-full bg-black text-white py-2 rounded">Sign in</button>
      </form>
    </div>
  )
}



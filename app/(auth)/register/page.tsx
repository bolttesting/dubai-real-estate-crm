"use client"
import { FormEvent, useState } from 'react'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setMessage('')
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, password }),
    })
    if (res.ok) setMessage('Registered. You can login now.')
    else setMessage('Registration failed')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={onSubmit} className="w-full max-w-sm space-y-4">
        <h1 className="text-xl font-semibold">Create account</h1>
        {message && <p className="text-sm">{message}</p>}
        <div>
          <label className="block text-sm">Name</label>
          <input className="mt-1 w-full border rounded p-2" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm">Email</label>
          <input className="mt-1 w-full border rounded p-2" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm">Password</label>
          <input className="mt-1 w-full border rounded p-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button className="w-full bg-black text-white py-2 rounded">Register</button>
      </form>
    </div>
  )
}



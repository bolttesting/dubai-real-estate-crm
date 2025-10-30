import Link from 'next/link'
import { prisma } from '@/lib/db'

export default async function Home() {
  const properties = await prisma.property.findMany({
    orderBy: { createdAt: 'desc' },
    take: 12,
    select: {
      id: true,
      title: true,
      community: true,
      bedrooms: true,
      bathrooms: true,
      sizeSqFt: true,
      priceAED: true,
      priceType: true,
      images: true,
    },
  })

  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Available Properties</h1>
          <div className="flex gap-3">
            <Link className="px-4 py-2 rounded border" href="/login">Login</Link>
            <Link className="px-4 py-2 rounded bg-black text-white" href="/dashboard">Dashboard</Link>
          </div>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((p) => (
            <article key={p.id} className="border rounded overflow-hidden">
              {p.images?.[0] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.images[0]} alt={p.title} className="h-40 w-full object-cover" />
              ) : (
                <div className="h-40 w-full bg-gray-100" />
              )}
              <div className="p-4 space-y-2">
                <h2 className="font-medium">{p.title}</h2>
                <p className="text-sm text-gray-600">{p.community}</p>
                <p className="text-sm">{p.bedrooms ?? 0} BR • {p.bathrooms ?? 0} BA • {p.sizeSqFt ?? 0} sqft</p>
                <p className="font-semibold">{new Intl.NumberFormat('en-AE', { style: 'currency', currency: 'AED' }).format(p.priceAED)} {p.priceType === 'RENT' ? '/yr' : ''}</p>
                <div className="pt-2 flex gap-3">
                  <Link className="px-3 py-1 rounded border" href={`/inquire/${p.id}`}>Inquire</Link>
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  )
}

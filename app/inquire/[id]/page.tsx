import { prisma } from '@/lib/db'

export default async function InquirePage({ params }: { params: { id: string } }) {
  const property = await prisma.property.findUnique({
    where: { id: params.id },
    select: { id: true, title: true, community: true, priceAED: true },
  })

  if (!property) {
    return <div className="p-8">Property not found.</div>
  }

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-xl font-semibold mb-4">Inquire about {property.title}</h1>
      <form className="space-y-4" action="/api/inquiries" method="post">
        <input type="hidden" name="propertyId" value={property.id} />
        <div>
          <label className="block text-sm">Your Name</label>
          <input name="name" required className="mt-1 w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm">Email</label>
          <input type="email" name="email" className="mt-1 w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm">Phone</label>
          <input name="phone" required className="mt-1 w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm">Message</label>
          <textarea name="message" rows={4} className="mt-1 w-full border rounded p-2" />
        </div>
        <button className="px-4 py-2 rounded bg-black text-white">Send Inquiry</button>
      </form>
    </div>
  )
}



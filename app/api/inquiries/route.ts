import { prisma } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get('content-type') || ''
    let payload: any
    if (contentType.includes('application/json')) {
      payload = await req.json()
    } else {
      const form = await req.formData()
      payload = Object.fromEntries(form.entries())
    }

    const { name, email, phone, message, propertyId } = payload
    if (!name || !phone || !propertyId) {
      return new Response('Missing fields', { status: 400 })
    }

    const lead = await prisma.lead.create({
      data: {
        name,
        email: email ?? null,
        phone,
        notes: message ?? null,
        source: 'WEBSITE',
        propertyId,
        userId: (await prisma.property.findUnique({ where: { id: propertyId }, select: { userId: true } }))?.userId!,
      },
    })

    return new Response(JSON.stringify({ id: lead.id }), { status: 201 })
  } catch {
    return new Response('Error', { status: 500 })
  }
}



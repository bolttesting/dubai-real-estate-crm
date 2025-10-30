import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const password = await bcrypt.hash('Password123!', 10)
  const user = await prisma.user.upsert({
    where: { email: 'agent@demo.ae' },
    update: {},
    create: {
      email: 'agent@demo.ae',
      password,
      name: 'Dubai Agent',
      phone: '+971500000000',
      subscription: 'STARTER',
    },
  })

  const property = await prisma.property.create({
    data: {
      title: 'Marina 1BR Partial Marina View',
      type: 'RESIDENTIAL',
      status: 'AVAILABLE',
      emirate: 'Dubai',
      community: 'Dubai Marina',
      bedrooms: 1,
      bathrooms: 1,
      sizeSqFt: 720,
      priceAED: 120000,
      priceType: 'RENT',
      paymentFrequency: 'YEARLY',
      amenities: ['Swimming Pool','Gym','Near Metro'],
      images: [],
      userId: user.id,
    },
  })

  await prisma.lead.createMany({
    data: [
      { name: 'Ahmed', phone: '+971511111111', source: 'PROPERTY_FINDER', userId: user.id, propertyId: property.id },
      { name: 'Sara', phone: '+971522222222', source: 'BAYUT', userId: user.id },
    ],
  })

  await prisma.tenant.create({
    data: {
      name: 'John Tenant',
      phone: '+971533333333',
      leaseStart: new Date(),
      leaseEnd: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      rentAmount: 120000,
      propertyId: property.id,
      userId: user.id,
    },
  })
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
}).finally(async () => {
  await prisma.$disconnect()
})



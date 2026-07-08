const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  await prisma.usuario.delete({
    where: { email: 'admin@aurum.es' },
  })
  console.log('Admin viejo eliminado')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
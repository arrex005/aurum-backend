const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const resultado = await prisma.cliente.deleteMany()
  console.log(`${resultado.count} clientes eliminados`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
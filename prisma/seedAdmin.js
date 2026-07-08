const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const prisma = new PrismaClient()

const EMAIL = 'chuss22@ejemplo.com'
const PASSWORD = 'Vacaciones13'
const NOMBRE = 'Administrador'

async function main() {
  const passwordHash = await bcrypt.hash(PASSWORD, 10)

  await prisma.usuario.upsert({
    where: { email: EMAIL },
    update: { password: passwordHash, nombre: NOMBRE },
    create: { email: EMAIL, password: passwordHash, nombre: NOMBRE },
  })

  console.log(`Usuario admin listo: ${EMAIL}`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Mapa de peso en texto a gramos
function calcularGramos(peso) {
  const p = peso.toLowerCase().trim()
  if (p.includes('kg') || p.includes('1000')) {
    const num = parseFloat(p) || 1
    return p.includes('kg') ? num * 1000 : num
  }
  if (p.includes('oz')) {
    const num = parseFloat(p) || 1
    return num * 31.1035
  }
  // asumimos gramos
  return parseFloat(p) || 0
}

async function main() {
  const productos = await prisma.producto.findMany()

  for (const producto of productos) {
    const gramos = calcularGramos(producto.peso)
    await prisma.producto.update({
      where: { id: producto.id },
      data: { pesoGramos: gramos },
    })
    console.log(`${producto.nombre}: ${gramos} g`)
  }

  console.log('Pesos actualizados correctamente')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  await prisma.producto.createMany({
    data: [
      { nombre: "Lingote de oro 1 g", metal: "Oro", tipo: "Lingote", peso: "1 g", pureza: "999,9‰", precio: 121, destacado: false },
      { nombre: "Lingote de oro 5 g", metal: "Oro", tipo: "Lingote", peso: "5 g", pureza: "999,9‰", precio: 605, destacado: false },
      { nombre: "Lingote de oro 10 g", metal: "Oro", tipo: "Lingote", peso: "10 g", pureza: "999,9‰", precio: 1210, destacado: true },
      { nombre: "Lingote de oro 20 g", metal: "Oro", tipo: "Lingote", peso: "20 g", pureza: "999,9‰", precio: 2420, destacado: false },
      { nombre: "Lingote de oro 50 g", metal: "Oro", tipo: "Lingote", peso: "50 g", pureza: "999,9‰", precio: 6050, destacado: false },
      { nombre: "Lingote de oro 100 g", metal: "Oro", tipo: "Lingote", peso: "100 g", pureza: "999,9‰", precio: 11780, destacado: true },
      { nombre: "Lingote de oro 250 g", metal: "Oro", tipo: "Lingote", peso: "250 g", pureza: "999,9‰", precio: 29450, destacado: false },
      { nombre: "Lingote de oro 500 g", metal: "Oro", tipo: "Lingote", peso: "500 g", pureza: "999,9‰", precio: 58900, destacado: false },
      { nombre: "Lingote de oro 1 kg", metal: "Oro", tipo: "Lingote", peso: "1000 g", pureza: "999,9‰", precio: 117800, destacado: true },
      { nombre: "Lingote de oro 1 oz", metal: "Oro", tipo: "Lingote", peso: "31,1 g", pureza: "999,9‰", precio: 3664, destacado: true },
      { nombre: "Moneda Krugerrand 1 oz", metal: "Oro", tipo: "Moneda", peso: "33,93 g", pureza: "916,7‰", precio: 3720, destacado: true },
      { nombre: "Moneda Maple Leaf 1 oz", metal: "Oro", tipo: "Moneda", peso: "31,1 g", pureza: "999,9‰", precio: 3690, destacado: false },
      { nombre: "Moneda American Eagle 1 oz", metal: "Oro", tipo: "Moneda", peso: "33,93 g", pureza: "916,7‰", precio: 3730, destacado: false },
      { nombre: "Moneda Filarmónica 1 oz", metal: "Oro", tipo: "Moneda", peso: "31,1 g", pureza: "999,9‰", precio: 3680, destacado: false },
      { nombre: "Lingote de plata 5 g", metal: "Plata", tipo: "Lingote", peso: "5 g", pureza: "999‰", precio: 8, destacado: false },
      { nombre: "Lingote de plata 10 g", metal: "Plata", tipo: "Lingote", peso: "10 g", pureza: "999‰", precio: 15, destacado: false },
      { nombre: "Lingote de plata 50 g", metal: "Plata", tipo: "Lingote", peso: "50 g", pureza: "999‰", precio: 72, destacado: false },
      { nombre: "Lingote de plata 100 g", metal: "Plata", tipo: "Lingote", peso: "100 g", pureza: "999‰", precio: 108, destacado: true },
      { nombre: "Lingote de plata 500 g", metal: "Plata", tipo: "Lingote", peso: "500 g", pureza: "999‰", precio: 520, destacado: false },
      { nombre: "Lingote de plata 1 kg", metal: "Plata", tipo: "Lingote", peso: "1000 g", pureza: "999‰", precio: 1050, destacado: true },
      { nombre: "Moneda Águila Americana 1 oz", metal: "Plata", tipo: "Moneda", peso: "31,1 g", pureza: "999‰", precio: 38, destacado: false },
      { nombre: "Moneda Maple Leaf Plata 1 oz", metal: "Plata", tipo: "Moneda", peso: "31,1 g", pureza: "999‰", precio: 36, destacado: false },
      { nombre: "Lingote de platino 1 oz", metal: "Platino", tipo: "Lingote", peso: "31,1 g", pureza: "999,5‰", precio: 1520, destacado: true },
      { nombre: "Lingote de platino 100 g", metal: "Platino", tipo: "Lingote", peso: "100 g", pureza: "999,5‰", precio: 4890, destacado: false },
    ]
  })
  console.log('Base de datos poblada correctamente')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
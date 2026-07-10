const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const clienteOpcional = require('../middleware/clienteOpcional')

// Reutilizamos la lógica de precios para tener el precio del gramo
let cachePrecios = null
let ultimaActualizacion = null

async function obtenerPreciosGramo() {
  const ahora = Date.now()
  if (cachePrecios && ultimaActualizacion && ahora - ultimaActualizacion < 8 * 60 * 60 * 1000) {
    return cachePrecios
  }

  const apiKey = process.env.METALPRICE_API_KEY
  const url = `https://api.metalpriceapi.com/v1/latest?api_key=${apiKey}&base=EUR&currencies=XAU,XAG,XPT,XPD`
  const res = await fetch(url)
  const data = await res.json()

  if (!data.success || !data.rates) {
    throw new Error('Error al obtener precios de metales')
  }

  const r = data.rates
  // Precio por gramo = (precio por onza) / 31.1035
  cachePrecios = {
    Oro: r.EURXAU ? r.EURXAU / 31.1035 : 0,
    Plata: r.EURXAG ? r.EURXAG / 31.1035 : 0,
    Platino: r.EURXPT ? r.EURXPT / 31.1035 : 0,
    Paladio: r.EURXPD ? r.EURXPD / 31.1035 : 0,
  }
  ultimaActualizacion = ahora
  return cachePrecios
}

function calcularPrecio(producto, preciosGramo) {
  const precioGramo = preciosGramo[producto.metal] || 0
  // Precio = peso en gramos × precio del gramo
  // (El margen se añadirá aquí en el futuro: × (1 + margen))
  return Math.round(producto.pesoGramos * precioGramo * 100) / 100
}

router.get('/', clienteOpcional, async (req, res) => {
  try {
    const { metal, tipo } = req.query
    const filtros = {}
    if (metal) filtros.metal = metal
    if (tipo) filtros.tipo = tipo

    const productos = await prisma.producto.findMany({
      where: filtros,
      orderBy: { metal: 'asc' }
    })

    const preciosGramo = await obtenerPreciosGramo()

    const productosConPrecio = productos.map((p) => {
      const base = {
        id: p.id,
        nombre: p.nombre,
        metal: p.metal,
        tipo: p.tipo,
        peso: p.peso,
        pesoGramos: p.pesoGramos,
        pureza: p.pureza,
        imagen: p.imagen,
        destacado: p.destacado,
        createdAt: p.createdAt,
      }

      // Solo enviamos el precio si el cliente está autenticado
      if (req.clienteAutenticado) {
        base.precio = calcularPrecio(p, preciosGramo) || p.precio
      } else {
        base.precio = null
      }

      return base
    })

    res.json(productosConPrecio)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener productos' })
  }
})

router.get('/:id', clienteOpcional, async (req, res) => {
  try {
    const producto = await prisma.producto.findUnique({
      where: { id: Number(req.params.id) }
    })
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' })

    if (req.clienteAutenticado) {
      const preciosGramo = await obtenerPreciosGramo()
      producto.precio = calcularPrecio(producto, preciosGramo) || producto.precio
    } else {
      producto.precio = null
    }

    res.json(producto)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener producto' })
  }
})

module.exports = router
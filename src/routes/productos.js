const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
  try {
    const { metal, tipo } = req.query
    const filtros = {}
    if (metal) filtros.metal = metal
    if (tipo) filtros.tipo = tipo

    const productos = await prisma.producto.findMany({
      where: filtros,
      orderBy: { metal: 'asc' }
    })
    res.json(productos)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const producto = await prisma.producto.findUnique({
      where: { id: Number(req.params.id) }
    })
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' })
    res.json(producto)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener producto' })
  }
})

module.exports = router
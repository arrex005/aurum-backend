const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
  try {
    const { categoria } = req.query
    const filtros = { publicado: true }
    if (categoria) filtros.categoria = categoria

    const articulos = await prisma.articulo.findMany({
      where: filtros,
      orderBy: { createdAt: 'desc' }
    })
    res.json(articulos)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener artículos' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const articulo = await prisma.articulo.findUnique({
      where: { id: Number(req.params.id) }
    })
    if (!articulo) return res.status(404).json({ error: 'Artículo no encontrado' })
    res.json(articulo)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener artículo' })
  }
})

module.exports = router
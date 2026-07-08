const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
  try {
    const testimonios = await prisma.testimonio.findMany({
      where: { publicado: true },
      orderBy: { createdAt: 'desc' }
    })
    res.json(testimonios)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener testimonios' })
  }
})

module.exports = router
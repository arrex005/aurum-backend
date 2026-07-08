const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
  try {
    const faqs = await prisma.fAQ.findMany({
      orderBy: { orden: 'asc' }
    })
    res.json(faqs)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener FAQs' })
  }
})

module.exports = router
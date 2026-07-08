const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const verificarToken = require('../middleware/verificarToken')

router.use(verificarToken)

router.get('/mensajes', async (req, res) => {
  try {
    const mensajes = await prisma.mensaje.findMany({
      orderBy: { createdAt: 'desc' }
    })
    res.json(mensajes)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener mensajes' })
  }
})

router.patch('/mensajes/:id/leido', async (req, res) => {
  try {
    const mensaje = await prisma.mensaje.update({
      where: { id: Number(req.params.id) },
      data: { leido: true }
    })
    res.json(mensaje)
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar mensaje' })
  }
})

router.delete('/mensajes/:id', async (req, res) => {
  try {
    await prisma.mensaje.delete({
      where: { id: Number(req.params.id) }
    })
    res.json({ mensaje: 'Mensaje eliminado' })
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar mensaje' })
  }
})

module.exports = router

router.get('/clientes', async (req, res) => {
  try {
    const clientes = await prisma.cliente.findMany({
      orderBy: { createdAt: 'desc' }
    })
    res.json(clientes)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener clientes' })
  }
})

router.patch('/clientes/:id/aprobar', async (req, res) => {
  try {
    const cliente = await prisma.cliente.update({
      where: { id: Number(req.params.id) },
      data: { aprobado: true }
    })
    res.json(cliente)
  } catch (error) {
    res.status(500).json({ error: 'Error al aprobar cliente' })
  }
})

router.delete('/clientes/:id', async (req, res) => {
  try {
    await prisma.cliente.delete({
      where: { id: Number(req.params.id) }
    })
    res.json({ mensaje: 'Cliente eliminado' })
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar cliente' })
  }
})
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const { loginLimiter } = require('../middleware/rateLimiters')
const { body, validationResult } = require('express-validator')
const verificarCliente = require('../middleware/verificarCliente')

router.post('/registro',
  loginLimiter,
  [
    body('nombre').trim().notEmpty().withMessage('El nombre es obligatorio').isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
    body('email').trim().isEmail().withMessage('Email no válido').normalizeEmail(),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  ],
  async (req, res) => {
    const errores = validationResult(req)
    if (!errores.isEmpty()) {
      return res.status(400).json({ error: errores.array()[0].msg })
    }

    try {
      const { email, password, nombre } = req.body

      const existente = await prisma.cliente.findUnique({ where: { email } })
      if (existente) {
        return res.status(400).json({ error: 'Ese email ya está registrado' })
      }

      const passwordHash = await bcrypt.hash(password, 10)

      const cliente = await prisma.cliente.create({
        data: { email, password: passwordHash, nombre }
      })

      res.status(201).json({ mensaje: 'Registro completado, pendiente de aprobación', id: cliente.id })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Error al registrar' })
    }
  }
)

router.post('/login', loginLimiter , async (req, res) => {
  try {
    const { email, password } = req.body

    const cliente = await prisma.cliente.findUnique({ where: { email } })
    if (!cliente) {
      return res.status(401).json({ error: 'Credenciales incorrectas' })
    }

    const passwordValida = await bcrypt.compare(password, cliente.password)
    if (!passwordValida) {
      return res.status(401).json({ error: 'Credenciales incorrectas' })
    }

    if (!cliente.aprobado) {
      return res.status(403).json({ error: 'Tu cuenta todavía no ha sido aprobada' })
    }

    const token = jwt.sign(
      { id: cliente.id, email: cliente.email, tipo: 'cliente' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({ token, cliente: { id: cliente.id, email: cliente.email, nombre: cliente.nombre } })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al iniciar sesión' })
  }
})
router.get('/perfil', verificarCliente, async (req, res) => {
  try {
    const cliente = await prisma.cliente.findUnique({
      where: { id: req.cliente.id },
      select: { id: true, email: true, nombre: true, aprobado: true, createdAt: true }
    })
    if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' })
    res.json(cliente)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener perfil' })
  }
})
module.exports = router
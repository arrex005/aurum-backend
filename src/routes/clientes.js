const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const { loginLimiter } = require('../middleware/rateLimiters')
const { body, validationResult } = require('express-validator')
const verificarCliente = require('../middleware/verificarCliente')
const { enviarCodigoVerificacion } = require('../utils/enviarEmail')

router.post('/registro',
  loginLimiter,
[
    body('nombre').trim().notEmpty().withMessage('El nombre es obligatorio')
      .isLength({ min: 2 }).withMessage('El nombre es demasiado corto')
      .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/).withMessage('El nombre solo puede contener letras'),
    body('apellidos').trim().notEmpty().withMessage('Los apellidos son obligatorios')
      .isLength({ min: 2 }).withMessage('Los apellidos son demasiado cortos')
      .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/).withMessage('Los apellidos solo pueden contener letras'),
    body('email').trim().isEmail().withMessage('Email no válido').normalizeEmail(),
    body('telefono').trim().optional({ checkFalsy: true }).matches(/^[67][0-9]{8}$/).withMessage('Si indicas teléfono, debe ser un móvil español válido (9 dígitos, empieza por 6 o 7)'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  ],
async (req, res) => {
    const errores = validationResult(req)
    if (!errores.isEmpty()) {
      return res.status(400).json({ error: errores.array()[0].msg })
    }

    try {
      const { email, password, nombre, apellidos, telefono } = req.body

      const existente = await prisma.cliente.findUnique({ where: { email } })

      if (existente && existente.emailVerificado) {
        return res.status(400).json({ error: 'Ese email ya está registrado' })
      }

      const passwordHash = await bcrypt.hash(password, 10)
      const codigo = Math.floor(100000 + Math.random() * 900000).toString()
      const codigoExpira = new Date(Date.now() + 15 * 60 * 1000)

      let cliente
      if (existente) {
        cliente = await prisma.cliente.update({
          where: { email },
          data: {
            password: passwordHash, nombre, apellidos, telefono,
            codigoVerificacion: codigo,
            codigoExpira: codigoExpira,
          }
        })
      } else {
        cliente = await prisma.cliente.create({
          data: {
            email, password: passwordHash, nombre, apellidos, telefono,
            codigoVerificacion: codigo,
            codigoExpira: codigoExpira,
          }
        })
      }

      // Enviamos el email con el código
      try {
        await enviarCodigoVerificacion(email, nombre, codigo)
      } catch (errorEmail) {
        console.error('Error enviando email:', errorEmail.message)
        // No bloqueamos el registro si el email falla, pero avisamos
      }

      res.status(201).json({ mensaje: 'Registro completado. Revisa tu email para el código de verificación.', email: email })
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

    if (!cliente.emailVerificado) {
      return res.status(403).json({ error: 'Debes verificar tu email antes de acceder' })
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
router.post('/verificar', async (req, res) => {
  try {
    const { email, codigo } = req.body

    const cliente = await prisma.cliente.findUnique({ where: { email } })
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente no encontrado' })
    }

    if (cliente.emailVerificado) {
      return res.status(400).json({ error: 'Este email ya está verificado' })
    }

    if (cliente.codigoVerificacion !== codigo) {
      return res.status(400).json({ error: 'Código incorrecto' })
    }

    if (new Date() > cliente.codigoExpira) {
      return res.status(400).json({ error: 'El código ha caducado. Solicita uno nuevo.' })
    }

    await prisma.cliente.update({
      where: { email },
      data: {
        emailVerificado: true,
        codigoVerificacion: null,
        codigoExpira: null,
      }
    })

    res.json({ mensaje: 'Email verificado correctamente. Tu cuenta está pendiente de aprobación.' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al verificar' })
  }
})
module.exports = router
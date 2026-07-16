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
    body('nombre').trim().notEmpty().withMessage('El nombre es obligatorio'),
    body('apellidos').trim().notEmpty().withMessage('Los apellidos son obligatorios'),
    body('email').trim().isEmail().withMessage('Email no válido').normalizeEmail(),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('telefono').trim().notEmpty().withMessage('El teléfono es obligatorio'),
    body('direccion').trim().notEmpty().withMessage('La dirección es obligatoria'),
    body('codigoPostal').trim().notEmpty().withMessage('El código postal es obligatorio'),
    body('ciudad').trim().notEmpty().withMessage('La ciudad es obligatoria'),
    body('provincia').trim().notEmpty().withMessage('La provincia es obligatoria'),
  ],
  async (req, res) => {
    const errores = validationResult(req)
    if (!errores.isEmpty()) {
      return res.status(400).json({ error: errores.array()[0].msg })
    }

    try {
      const { email, password, nombre, apellidos, telefono, direccion, codigoPostal, ciudad, provincia } = req.body

      const existente = await prisma.cliente.findUnique({ where: { email } })

      // Si existe y YA está verificado, no se puede volver a registrar
      if (existente && existente.emailVerificado) {
        return res.status(400).json({ error: 'Ese email ya está registrado' })
      }

      const passwordHash = await bcrypt.hash(password, 10)

      // Generamos código de 6 dígitos y su caducidad (15 min)
      const codigo = Math.floor(100000 + Math.random() * 900000).toString()
      const codigoExpira = new Date(Date.now() + 15 * 60 * 1000)

      let cliente
      if (existente) {
        // Existe pero sin verificar: actualizamos sus datos y generamos código nuevo
        cliente = await prisma.cliente.update({
          where: { email },
          data: {
            password: passwordHash, nombre, apellidos, telefono,
            direccion, codigoPostal, ciudad, provincia,
            codigoVerificacion: codigo,
            codigoExpira: codigoExpira,
          }
        })
      } else {
        // No existe: lo creamos
        cliente = await prisma.cliente.create({
          data: {
            email, password: passwordHash, nombre, apellidos, telefono,
            direccion, codigoPostal, ciudad, provincia,
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
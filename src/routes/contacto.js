const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const { body, validationResult } = require('express-validator')
const prisma = new PrismaClient()

router.post('/',
  [
    body('nombre').trim().notEmpty().withMessage('El nombre es obligatorio'),
    body('email').trim().isEmail().withMessage('Email no válido').normalizeEmail(),
    body('mensaje').trim().notEmpty().withMessage('El mensaje no puede estar vacío'),
  ],
  async (req, res) => {
    const errores = validationResult(req)
    if (!errores.isEmpty()) {
      return res.status(400).json({ error: errores.array()[0].msg })
    }

    try {
      const { nombre, email, asunto, mensaje } = req.body

      const nuevoMensaje = await prisma.mensaje.create({
        data: { nombre, email, asunto: asunto || 'Sin asunto', mensaje }
      })

      res.status(201).json({ mensaje: 'Mensaje enviado correctamente', id: nuevoMensaje.id })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Error al enviar el mensaje' })
    }
  }
)

module.exports = router
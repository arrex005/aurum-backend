const jwt = require('jsonwebtoken')

function clienteOpcional(req, res, next) {
  const authHeader = req.headers.authorization

  req.clienteAutenticado = false

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1]
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      if (decoded.tipo === 'cliente') {
        req.cliente = decoded
        req.clienteAutenticado = true
      }
    } catch (error) {
      // Token inválido: seguimos como no autenticado, sin bloquear
    }
  }

  next()
}

module.exports = clienteOpcional
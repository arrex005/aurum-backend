const express = require('express')
const cors = require('cors')
require('dotenv').config()

const productosRouter = require('./src/routes/productos')
const preciosRouter = require('./src/routes/precios')
const historicoRouter = require('./src/routes/historico')
const articulosRouter = require('./src/routes/articulos')
const testimoniosRouter = require('./src/routes/testimonios')
const faqsRouter = require('./src/routes/faqs')
const contactoRouter = require('./src/routes/contacto')
const adminRouter = require('./src/routes/admin')
const authRouter = require('./src/routes/auth')
const clientesRouter = require('./src/routes/clientes')
const piedrasRouter = require('./src/routes/piedras')
const app = express()
const PORT = process.env.PORT || 3001
const helmet = require('helmet')



const origenesPermitidos = [
  'http://localhost:5173',
  process.env.FRONTEND_URL,
  process.env.FRONTEND_URL_ALT,
].filter(Boolean)

app.use(helmet())


app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true)
    if (origenesPermitidos.includes(origin)) {
      return callback(null, true)
    }
    return callback(new Error('No permitido por CORS'))
  },
  credentials: true,
}))
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ mensaje: 'API Aurum funcionando correctamente' })
})

app.use('/api/productos', productosRouter)
app.use('/api/precios', preciosRouter)
app.use('/api/historico', historicoRouter)
app.use('/api/articulos', articulosRouter)
app.use('/api/testimonios', testimoniosRouter)
app.use('/api/faqs', faqsRouter)
app.use('/api/contacto', contactoRouter)
app.use('/api/admin', adminRouter)
app.use('/api/auth', authRouter)
app.use('/api/clientes', clientesRouter)
app.use('/api/piedras', piedrasRouter)

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
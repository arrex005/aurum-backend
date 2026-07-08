const express = require('express')
const router = express.Router()

let cache = null
let ultimaActualizacion = null

async function obtenerPrecios() {
  const ahora = Date.now()
  if (cache && ultimaActualizacion && ahora - ultimaActualizacion < 30 * 60 * 1000) {
    return cache
  }

  const apiKey = process.env.METALPRICE_API_KEY
  const url = `https://api.metalpriceapi.com/v1/latest?api_key=${apiKey}&base=EUR&currencies=XAU,XAG,XPT,XPD`

  const res = await fetch(url)
  const data = await res.json()

  if (!data.success || !data.rates) {
    throw new Error(data.error?.info || 'Error al obtener precios')
  }

  const rates = data.rates

  const metales = [
    { nombre: 'Oro', clave: 'EURXAU' },
    { nombre: 'Plata', clave: 'EURXAG' },
    { nombre: 'Platino', clave: 'EURXPT' },
    { nombre: 'Paladio', clave: 'EURXPD' },
  ]

  const resultados = metales.map((m) => {
    const precioEur = rates[m.clave] || null
    return {
      nombre: m.nombre,
      precio: precioEur,
      variacion: 0,
      variacionPct: 0,
    }
  })

  cache = resultados
  ultimaActualizacion = ahora
  return resultados
}

router.get('/', async (req, res) => {
  try {
    const precios = await obtenerPrecios()
    res.json(precios)
  } catch (error) {
    console.error('Error precios:', error.message)
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
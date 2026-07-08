const express = require('express')
const router = express.Router()

let cache = null
let ultimaActualizacion = null

async function obtenerPrecios() {
  const ahora = Date.now()
  // Caché de 8 horas
  if (cache && ultimaActualizacion && ahora - ultimaActualizacion < 8 * 60 * 60 * 1000) {
    return cache
  }

  const apiKey = process.env.METALPRICE_API_KEY

  // Endpoint "change": da precio actual + variación respecto a ayer
  const url = `https://api.metalpriceapi.com/v1/change?api_key=${apiKey}&base=EUR&currencies=XAU,XAG,XPT,XPD&date_type=recent`

  const res = await fetch(url)
  const data = await res.json()

  if (!data.success || !data.rates) {
    throw new Error(data.error?.info || 'Error al obtener precios')
  }

  const rates = data.rates

  const metales = [
    { nombre: 'Oro', clave: 'XAU' },
    { nombre: 'Plata', clave: 'XAG' },
    { nombre: 'Platino', clave: 'XPT' },
    { nombre: 'Paladio', clave: 'XPD' },
  ]

  const resultados = metales.map((m) => {
    const info = rates[m.clave]
    // end_rate viene como onzas por EUR, hay que invertir para EUR por onza
    const precioEur = info?.end_rate ? 1 / info.end_rate : null
    const precioAyer = info?.start_rate ? 1 / info.start_rate : null
    const variacion = precioEur && precioAyer ? precioEur - precioAyer : 0
    const variacionPct = precioAyer ? ((precioEur - precioAyer) / precioAyer) * 100 : 0

    return {
      nombre: m.nombre,
      precio: precioEur,
      variacion: variacion,
      variacionPct: variacionPct,
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
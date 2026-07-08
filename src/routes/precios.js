const express = require('express')
const router = express.Router()

let cache = null
let ultimaActualizacion = null

async function obtenerPrecios() {
  const ahora = Date.now()
  if (cache && ultimaActualizacion && ahora - ultimaActualizacion < 8 * 60 * 60 * 1000) {
    return cache
  }

  const apiKey = process.env.METALPRICE_API_KEY

  // 1. Precio actual (siempre disponible)
  const urlLatest = `https://api.metalpriceapi.com/v1/latest?api_key=${apiKey}&base=EUR&currencies=XAU,XAG,XPT,XPD`
  const resLatest = await fetch(urlLatest)
  const dataLatest = await resLatest.json()

  if (!dataLatest.success || !dataLatest.rates) {
    throw new Error(dataLatest.error?.info || 'Error al obtener precios')
  }

  // 2. Precio de ayer (para calcular variación)
  const ayer = new Date()
  ayer.setDate(ayer.getDate() - 1)
  const fechaAyer = ayer.toISOString().split('T')[0]
  const urlAyer = `https://api.metalpriceapi.com/v1/${fechaAyer}?api_key=${apiKey}&base=EUR&currencies=XAU,XAG,XPT,XPD`
  const resAyer = await fetch(urlAyer)
  const dataAyer = await resAyer.json()

  const ratesHoy = dataLatest.rates
  const ratesAyer = dataAyer.rates || {}

  const metales = [
    { nombre: 'Oro', clave: 'XAU' },
    { nombre: 'Plata', clave: 'XAG' },
    { nombre: 'Platino', clave: 'XPT' },
    { nombre: 'Paladio', clave: 'XPD' },
  ]

  const resultados = metales.map((m) => {
    const claveBase = `EUR${m.clave}`
    const precioHoy = ratesHoy[claveBase] || null
    const precioAyer = ratesAyer[claveBase] || null

    let variacion = 0
    let variacionPct = 0
    if (precioHoy && precioAyer) {
      variacion = precioHoy - precioAyer
      variacionPct = ((precioHoy - precioAyer) / precioAyer) * 100
    }

    return {
      nombre: m.nombre,
      precio: precioHoy,
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
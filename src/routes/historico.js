const express = require('express')
const router = express.Router()

const cache = {}

router.get('/', async (req, res) => {
  try {
    const { metal = 'XAU', periodo = 'mes' } = req.query
    const cacheKey = `${metal}-${periodo}`
    const ahora = Date.now()

    // Caché de 24 horas para no gastar el límite mensual
    if (cache[cacheKey] && ahora - cache[cacheKey].timestamp < 24 * 60 * 60 * 1000) {
      return res.json(cache[cacheKey].datos)
    }

    const apiKey = process.env.METALPRICE_API_KEY

    const hoy = new Date()
    let fechaInicio = new Date()

    if (periodo === 'mes') fechaInicio.setMonth(hoy.getMonth() - 1)
    else if (periodo === 'año') fechaInicio.setFullYear(hoy.getFullYear() - 1)
    else if (periodo === '5años') fechaInicio.setFullYear(hoy.getFullYear() - 1) // gratis máximo 365 días

    const formato = (d) => d.toISOString().split('T')[0]

    const url = `https://api.metalpriceapi.com/v1/timeframe?api_key=${apiKey}&start_date=${formato(fechaInicio)}&end_date=${formato(hoy)}&base=EUR&currencies=${metal}`

    const respuesta = await fetch(url)
    const data = await respuesta.json()

    if (!data.success || !data.rates) {
      throw new Error(data.error?.info || 'Error al obtener histórico')
    }

    // data.rates es un objeto { "2025-01-01": { "EURXAU": 0.0003 }, ... }
    const claveMetalBase = `EUR${metal}`

    const datos = Object.entries(data.rates)
      .map(([fecha, valores]) => {
        const precio = valores[claveMetalBase]
        return {
          fecha,
          precio: precio ? Math.round(precio * 100) / 100 : null,
        }
      })
      .filter((d) => d.precio !== null)
      .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))

    cache[cacheKey] = { datos, timestamp: ahora }
    res.json(datos)
  } catch (error) {
    console.error('Error histórico:', error.message)
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
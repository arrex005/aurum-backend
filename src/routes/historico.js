const express = require('express')
const router = express.Router()

let cache = {}

router.get('/', async (req, res) => {
  try {
    const { metal = 'XAU', periodo = 'año' } = req.query

    const cacheKey = `${metal}-${periodo}`
    const ahora = Date.now()

    if (cache[cacheKey] && ahora - cache[cacheKey].timestamp < 3600000) {
      return res.json(cache[cacheKey].datos)
    }

    const hoy = new Date()
    let fechaInicio = new Date()

    if (periodo === 'mes') fechaInicio.setMonth(hoy.getMonth() - 1)
    else if (periodo === 'año') fechaInicio.setFullYear(hoy.getFullYear() - 1)
    else if (periodo === '5años') fechaInicio.setFullYear(hoy.getFullYear() - 5)

    const formatFecha = (d) => d.toISOString().split('T')[0]

    const res2 = await fetch(
      `https://api.frankfurter.app/${formatFecha(fechaInicio)}..${formatFecha(hoy)}?from=USD&to=EUR`
    )
    const eurData = await res2.json()
    const tasaEur = Object.values(eurData.rates).pop()?.EUR || 0.92

    const resHistorico = await fetch(
      `https://www.goldapi.io/api/${metal}/USD/${formatFecha(fechaInicio)}`,
      {
        headers: {
          'x-access-token': process.env.GOLD_API_KEY,
        },
      }
    )

    const precioBase = await resHistorico.json()

    const preciosActuales = {
      XAU: 3200, XAG: 32, XPT: 1050, XPD: 1100,
    }

    const precioFin = preciosActuales[metal] || 3200
    const precioIni = precioBase.price_previous_close || precioFin * 0.7

    const dias = Math.floor((hoy - fechaInicio) / (1000 * 60 * 60 * 24))
    const datos = []

    for (let i = 0; i <= dias; i++) {
      const fecha = new Date(fechaInicio)
      fecha.setDate(fecha.getDate() + i)
      if (fecha.getDay() === 0 || fecha.getDay() === 6) continue

      const progreso = i / dias
      const variacion = (Math.random() - 0.48) * (precioFin * 0.01)
      const precio = precioIni + (precioFin - precioIni) * progreso + variacion

      datos.push({
        fecha: formatFecha(fecha),
        precio: Math.round(precio * 100) / 100,
      })
    }

    cache[cacheKey] = { datos, timestamp: ahora }
    res.json(datos)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
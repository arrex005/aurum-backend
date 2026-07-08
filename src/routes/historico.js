const express = require('express')
const router = express.Router()

const cache = {}

async function pedirRango(apiKey, metal, inicio, fin) {
  const formato = (d) => d.toISOString().split('T')[0]
  const url = `https://api.metalpriceapi.com/v1/timeframe?api_key=${apiKey}&start_date=${formato(inicio)}&end_date=${formato(fin)}&base=EUR&currencies=${metal}`
  const res = await fetch(url)
  const data = await res.json()
  if (!data.success || !data.rates) return []
  const claveMetalBase = `EUR${metal}`
  return Object.entries(data.rates)
    .map(([fecha, valores]) => ({
      fecha,
      precio: valores[claveMetalBase] ? Math.round(valores[claveMetalBase] * 100) / 100 : null,
    }))
    .filter((d) => d.precio !== null)
}

router.get('/', async (req, res) => {
  try {
    const { metal = 'XAU', periodo = 'mes' } = req.query
    const cacheKey = `${metal}-${periodo}`
    const ahora = Date.now()

    if (cache[cacheKey] && ahora - cache[cacheKey].timestamp < 24 * 60 * 60 * 1000) {
      return res.json(cache[cacheKey].datos)
    }

    const apiKey = process.env.METALPRICE_API_KEY
    const hoy = new Date()
    let datos = []

    if (periodo === 'mes') {
      const inicio = new Date()
      inicio.setMonth(hoy.getMonth() - 1)
      datos = await pedirRango(apiKey, metal, inicio, hoy)
    } else if (periodo === 'año') {
      const inicio = new Date()
      inicio.setFullYear(hoy.getFullYear() - 1)
      datos = await pedirRango(apiKey, metal, inicio, hoy)
    } else if (periodo === '5años') {
      // 5 consultas, una por año, porque el máximo por consulta es 365 días
      for (let i = 5; i >= 1; i--) {
        const inicio = new Date()
        inicio.setFullYear(hoy.getFullYear() - i)
        const fin = new Date()
        fin.setFullYear(hoy.getFullYear() - (i - 1))
        if (fin > hoy) fin.setTime(hoy.getTime())
        const trozo = await pedirRango(apiKey, metal, inicio, fin)
        datos = datos.concat(trozo)
      }
      // Para 5 años, reducimos puntos (1 de cada 7) para que el gráfico no vaya lento
      datos = datos.filter((_, i) => i % 7 === 0)
    }

    datos.sort((a, b) => new Date(a.fecha) - new Date(b.fecha))

    cache[cacheKey] = { datos, timestamp: ahora }
    res.json(datos)
  } catch (error) {
    console.error('Error histórico:', error.message)
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
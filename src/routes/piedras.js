const express = require('express')
const router = express.Router()

let nivodaToken = null
let tokenExpira = null

async function obtenerToken() {
  const ahora = Date.now()
  if (nivodaToken && tokenExpira && ahora < tokenExpira) {
    return nivodaToken
  }

  const query = `{
    authenticate {
      username_and_password(username: "${process.env.NIVODA_USER}", password: "${process.env.NIVODA_PASSWORD}") {
        token
      }
    }
  }`

  const res = await fetch(process.env.NIVODA_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  })

  const data = await res.json()
  const token = data?.data?.authenticate?.username_and_password?.token

  if (!token) {
    throw new Error('No se pudo autenticar con Nivoda')
  }

  nivodaToken = token
  tokenExpira = ahora + 5 * 60 * 60 * 1000
  return token
}

router.get('/', async (req, res) => {
  try {
    const token = await obtenerToken()

    const { forma, quilatesMin, quilatesMax, pagina } = req.query

    const shape = forma || 'ROUND'
    const from = quilatesMin || 0.5
    const to = quilatesMax || 5.0

    // Nivoda devuelve máximo 50 por consulta, y permite hasta 50.000 paginando
    const paginaActual = Math.max(1, Number(pagina) || 1)
    const limite = 50
    const offset = (paginaActual - 1) * limite

    const query = `
      query {
        diamonds_by_query(
          query: {
            labgrown: false,
            shapes: ["${shape}"],
            sizes: [{ from: ${from}, to: ${to} }],
            has_image: true
          },
          offset: ${offset},
          limit: ${limite},
          order: { type: price, direction: ASC }
        ) {
          items {
            id
            diamond {
              id
              image
              video
              certificate {
                shape
                carats
                color
                clarity
                cut
                lab
                certNumber
                polish
                symmetry
              }
            }
            price
            discount
          }
          total_count
        }
      }
    `

    const respuesta = await fetch(process.env.NIVODA_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query }),
    })

    const data = await respuesta.json()

    if (data.errors) {
      console.error('Errores GraphQL:', JSON.stringify(data.errors, null, 2))
      return res.status(400).json({ error: 'Error en la query', detalles: data.errors })
    }

    const resultado = data?.data?.diamonds_by_query
    const items = resultado?.items || []
    const total = resultado?.total_count || 0

    // En staging el total_count no es fiable, así que deducimos si hay más
    // página llena = probablemente hay más resultados detrás
    const hayMas = items.length === limite && offset + limite < 50000

    res.json({
      items,
      total,
      pagina: paginaActual,
      hayMas,
    })
  } catch (error) {
    console.error('Error Nivoda:', error)
    res.status(500).json({ error: error.message })
  }
})
router.get('/:id', async (req, res) => {
  try {
    const token = await obtenerToken()
    const diamanteId = req.params.id.replace('DIAMOND/', '')

    const query = `
      query {
        as(token: "${token}") {
          get_diamond_by_id(diamond_id: "${diamanteId}") {
            id
            price
            discount
            diamond {
              id
              image
              video
              availability
              supplierStockId
              mine_of_origin
              certificate {
                shape
                carats
                color
                clarity
                cut
                lab
                certNumber
                polish
                symmetry
                width
                length
                depth
                table
                girdle
                depthPercentage
                floInt
              }
            }
          }
        }
      }
    `

    const respuesta = await fetch(process.env.NIVODA_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query }),
    })

    const data = await respuesta.json()

    if (data.errors) {
      console.error('Errores GraphQL:', JSON.stringify(data.errors, null, 2))
      return res.status(400).json({ error: 'Error en la query', detalles: data.errors })
    }

    const diamante = data?.data?.as?.get_diamond_by_id || null

    if (!diamante) {
      return res.status(404).json({ error: 'Diamante no encontrado' })
    }

    res.json(diamante)
  } catch (error) {
    console.error('Error Nivoda:', error)
    res.status(500).json({ error: error.message })
  }
})
module.exports = router
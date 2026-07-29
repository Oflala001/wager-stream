require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({ origin: true }))
app.use(express.json())

app.post('/api/slots/demo', async (req, res) => {
  try {
    const { gameid, currency = 'USD', lang = 'en', homeurl, cashierurl } = req.body

    console.log('--- Launch request ---')
    console.log('gameid:', gameid)
    console.log('API URL:', process.env.SLOTSGATEWAY_API_BASE_URL)

    const payload = {
      api_login: process.env.SLOTSGATEWAY_API_LOGIN,
      api_password: process.env.SLOTSGATEWAY_API_PASSWORD,
      method: 'getGameDemo',
      lang,
      gameid: gameid || 'onlyplay/SaintBananas',
      homeurl: homeurl || 'http://localhost:5173',
      cashierurl: cashierurl || 'http://localhost:5173',
      currency,
    }

    console.log('Sending to Slotsgateway...')

    const apiRes = await fetch(process.env.SLOTSGATEWAY_API_BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const data = await apiRes.json()
    console.log('Slotsgateway reply:', JSON.stringify(data, null, 2))

    if (data.error !== 0 && data.error !== '0') {
      return res.status(400).json({
        error: data.message || 'Game launch failed',
        code: data.error,
      })
    }

    return res.json({
      url: data.response,
      session_id: data.session_id,
    })
  } catch (err) {
    console.error('Server error:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

app.get('/health', (_, res) => res.json({ ok: true }))

// --- KEEP THE REST OF YOUR EXISTING CODE ABOVE UNCHANGED ---

app.get('/health', (_, res) => res.json({ ok: true }))

// Export for Vercel serverless, or listen locally if run directly
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Slots backend running on http://localhost:${PORT}`)
  })
}

module.exports = app
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method Not Allowed' })
  }
  try {
    const body = req.body || {}
    console.log('WA log:', body)
    return res.status(200).json({ ok: true })
  } catch (e) {
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

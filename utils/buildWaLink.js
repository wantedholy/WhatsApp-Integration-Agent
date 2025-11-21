export default function buildWaLink({ phone, message = '', url, utm }) {
  const cleaned = String(phone || '').replace(/[^0-9]/g, '')
  const base = `https://wa.me/${cleaned}`
  let msg = message
  if (url) msg += `\n\nPage: ${url}`
  if (utm && typeof utm === 'object') {
    const pairs = Object.entries(utm).map(([k, v]) => `${k}=${v}`).join('&')
    msg += `\nUTM: ${pairs}`
  }
  const encoded = encodeURIComponent(msg)
  return `${base}?text=${encoded}`
}

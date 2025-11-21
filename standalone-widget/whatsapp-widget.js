;(function () {
  const PHONE = (window.WIDGET_WA_NUMBER || '919999999999').toString().replace(/[^0-9]/g, '')
  const DEFAULT_MESSAGE = window.WIDGET_WA_MESSAGE || 'Hi, I have a query.'
  const CSS_ID = 'wa-embed-css'

  const CSS = `
.wa-embed-fab{position:fixed;right:24px;bottom:24px;width:64px;height:64px;border-radius:50%;background:#25D366;display:flex;align-items:center;justify-content:center;box-shadow:0 12px 30px rgba(0,0,0,0.2);z-index:999999}
.wa-embed-fab img{width:36px;height:36px}
.wa-embed-panel{position:fixed;right:24px;bottom:100px;width:320px;max-width:calc(100vw - 48px);background:#fff;border-radius:12px;box-shadow:0 12px 30px rgba(0,0,0,0.18);z-index:999999;display:none}
.wa-embed-panel.visible{display:block}
.wa-embed-panel .header{background:#10a04a;color:#fff;padding:12px;border-radius:12px 12px 0 0;display:flex;gap:12px;align-items:center}
.wa-embed-panel .body{padding:12px}
.wa-embed-panel input,.wa-embed-panel textarea{width:100%;padding:8px;margin-top:8px;border-radius:6px;border:1px solid #ddd}
.wa-embed-panel .send{background:#10a04a;color:#fff;padding:10px;border-radius:999px;border:none;width:100%;margin-top:12px}
`

  function inject() {
    if (!document.getElementById(CSS_ID)) {
      const s = document.createElement('style')
      s.id = CSS_ID
      s.textContent = CSS
      document.head.appendChild(s)
    }

    const fab = document.createElement('button')
    fab.className = 'wa-embed-fab'
    fab.innerHTML = '<img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" />'
    document.body.appendChild(fab)

    const panel = document.createElement('div')
    panel.className = 'wa-embed-panel'
    panel.innerHTML = `
      <div class="header">
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" width="36"/>
        <div><strong>WhatsApp</strong><div style="font-size:12px;opacity:0.9">Replies quickly</div></div>
      </div>
      <div class="body">
        <input id="wa_name" placeholder="Name"/>
        <input id="wa_email" placeholder="Email"/>
        <textarea id="wa_msg" placeholder="Type your message"></textarea>
        <button id="wa_send" class="send">Start Conversation</button>
      </div>`
    document.body.appendChild(panel)

    fab.addEventListener('click', () => {
      panel.classList.toggle('visible')
    })

    function link() {
      const name = (document.getElementById('wa_name') && document.getElementById('wa_name').value) || ''
      const email = (document.getElementById('wa_email') && document.getElementById('wa_email').value) || ''
      const msg = (document.getElementById('wa_msg') && document.getElementById('wa_msg').value) || ''
      const page = window.location.href
      const text = `${DEFAULT_MESSAGE}\nName: ${name}\nEmail: ${email}\nMessage: ${msg}\nPage: ${page}`
      return `https://wa.me/${PHONE}?text=` + encodeURIComponent(text)
    }

    const sendBtn = document.getElementById('wa_send')
    if (sendBtn) {
      sendBtn.addEventListener('click', () => {
        const url = link()
        try {
          window.open(url, '_blank', 'noopener,noreferrer')
        } catch (e) {
          window.location.href = url
        }
      })
    }

    window.__WA_EMBED_PANEL = panel
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject)
  } else {
    inject()
  }
})()

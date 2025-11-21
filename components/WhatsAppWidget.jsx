'use client'

import { useState } from 'react'
import buildWaLink from '../utils/buildWaLink'

export default function WhatsAppWidget({ phone = '919999999999', defaultMessage = 'Hello' }) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')

  async function handleSend() {
    const pageUrl = typeof window !== 'undefined' ? window.location.href : ''
    const message = `${defaultMessage}\nName: ${name}\nEmail: ${email}\nMessage: ${msg}`
    const waUrl = buildWaLink({ phone, message, url: pageUrl, utm: { source: 'widget' } })

    try {
      window.open(waUrl, '_blank', 'noopener,noreferrer')
    } catch (e) {
      window.location.href = waUrl
    }

    try {
      await fetch('/api/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, name, email, message, page: pageUrl })
      })
    } catch (e) {}
  }

  return (
    <div>
      <button aria-label="Open WhatsApp" className={`wa-fab ${open ? 'open' : ''}`} onClick={() => setOpen(!open)}>
        <img src="/wa-icon.png" alt="WhatsApp" />
      </button>

      <div className={`wa-panel ${open ? 'visible' : ''}`}>
        <div className="wa-panel-header">
          <div className="wa-avatar">
            <img src="/wa-icon.png" alt="assistant" />
          </div>
          <div>
            <strong>Assistant</strong>
            <div className="subtitle">Typically replies within few seconds</div>
          </div>
        </div>

        <div className="wa-panel-body">
          <p className="welcome">We are here to help you!</p>

          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" />

          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />

          <label>Message</label>
          <textarea value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Your question" />

          <button className="wa-send-btn" onClick={handleSend}>Start Conversation</button>
        </div>
      </div>

      <style jsx>{`
        .wa-fab{position:fixed;right:24px;bottom:24px;background:#12a84b;border-radius:999px;border:none;width:68px;height:68px;box-shadow:0 8px 20px rgba(0,0,0,0.2);display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:99999}
        .wa-fab img{width:36px;height:36px}
        .wa-panel{position:fixed;right:24px;bottom:100px;width:320px;max-width:90vw;background:#f6f1ec;border-radius:12px;box-shadow:0 12px 40px rgba(0,0,0,0.2);transform:translateY(20px);opacity:0;pointer-events:none;transition:all .25s;z-index:99999}
        .wa-panel.visible{transform:translateY(0);opacity:1;pointer-events:auto}
        .wa-panel-header{display:flex;gap:12px;padding:12px 16px;background:#10a04a;color:#fff;border-radius:12px 12px 0 0}
        .wa-avatar img{width:44px;height:44px;border-radius:50%;background:#fff;padding:4px}
        .subtitle{font-size:12px;opacity:0.9}
        .wa-panel-body{padding:12px 16px}
        .wa-panel-body label{display:block;margin-top:8px;font-size:13px}
        .wa-panel-body input,.wa-panel-body textarea{width:100%;padding:8px;margin-top:6px;border-radius:6px;border:1px solid #ddd}
        .wa-send-btn{margin-top:12px;width:100%;background:#10a04a;color:#fff;padding:12px;border-radius:30px;border:none;cursor:pointer}
      `}</style>
    </div>
  )
}

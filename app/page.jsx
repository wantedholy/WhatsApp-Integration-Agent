import dynamic from 'next/dynamic'
import DashboardCard from '../components/DashboardCard'

const WhatsAppWidget = dynamic(() => import('../components/WhatsAppWidget'), { ssr: false })

export default function Home() {
  return (
    <div className="page-container">
      <header className="header">
        <h1>Admin Dashboard</h1>
      </header>

      <main className="main-grid">
        <DashboardCard title="Users" value="1,234" />
        <DashboardCard title="Signups (30d)" value="312" />
        <DashboardCard title="Open Messages" value="21" />
      </main>

      <WhatsAppWidget
        phone={process.env.NEXT_PUBLIC_WA_NUMBER || '919999999999'}
        defaultMessage={process.env.NEXT_PUBLIC_WA_MESSAGE || 'Hi! I have a question about your program'}
      />
    </div>
  )
}

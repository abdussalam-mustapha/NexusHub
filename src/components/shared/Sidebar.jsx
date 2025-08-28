import { Link, useLocation } from 'react-router-dom'
import './Sidebar.css'
import { Rss, Users, Briefcase, Calendar, ShoppingCart, Home, Building } from 'lucide-react'

function Sidebar({ activeSection }) {
  const location = useLocation()
  
  const menuItems = [
    { id: 'feed', icon: Rss, label: 'Feed', path: '/networking' },
    { id: 'connections', icon: Users, label: 'Connections', path: '/networking' },
    { id: 'jobs', icon: Briefcase, label: 'Jobs', path: '/networking' },
    { id: 'events', icon: Calendar, label: 'Events', path: '/networking' },
    { id: 'ecommerce', icon: ShoppingCart, label: 'E-commerce', path: '/ecommerce' },
    { id: 'realestate', icon: Building, label: 'Real Estate', path: '/realestate' }
  ]

  const getActiveSection = () => {
    if (activeSection) return activeSection
    
    const path = location.pathname
    if (path.includes('ecommerce')) return 'ecommerce'
    if (path.includes('realestate')) return 'realestate'
    if (path.includes('networking')) return 'feed'
    return 'feed'
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <Link to="/" className="logo">
          <span className="logo-icon">✦</span>
          <span className="logo-text">NexusHub</span>
        </Link>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const IconComponent = item.icon
          const isActive = getActiveSection() === item.id
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <IconComponent className="nav-icon" />
              <span className="nav-label">{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar

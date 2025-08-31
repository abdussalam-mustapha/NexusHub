import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import './Sidebar.css'
import { Rss, Users, Briefcase, Calendar, ShoppingCart, Home, Building, Map, List, UserCheck, Heart, LogOut } from 'lucide-react'
import logoImg from '../../assets/NexusHub.png'

function Sidebar({ activeSection }) {
  const location = useLocation()
  const { logout, user } = useAuth()
  
  const handleLogout = () => {
    logout()
  }

  const getMenuItems = () => {
    const currentSection = activeSection || getActiveSection()
    
    switch (currentSection) {
      case 'realestate':
        return [
          { id: 'property-map', icon: Map, label: 'Property Map', path: '/realestate' },
          { id: 'listings', icon: List, label: 'Listings', path: '/realestate' },
          { id: 'agent-directory', icon: UserCheck, label: 'Agent Directory', path: '/realestate' },
          { id: 'saved-properties', icon: Heart, label: 'Saved Properties', path: '/realestate' }
        ]
      case 'ecommerce':
        return [
          { id: 'all-products', icon: ShoppingCart, label: 'All Products', path: '/ecommerce' },
          { id: 'categories', icon: List, label: 'Categories', path: '/ecommerce' },
          { id: 'orders', icon: Briefcase, label: 'Orders', path: '/ecommerce' },
          { id: 'settings', icon: Building, label: 'Settings', path: '/ecommerce' }
        ]
      default:
        return [
          { id: 'feed', icon: Rss, label: 'Feed', path: '/networking' },
          { id: 'connections', icon: Users, label: 'Connections', path: '/networking' },
          { id: 'jobs', icon: Briefcase, label: 'Jobs', path: '/networking' },
          { id: 'events', icon: Calendar, label: 'Events', path: '/networking' }
        ]
    }
  }

  const getActiveSection = () => {
    if (activeSection) return activeSection
    
    const path = location.pathname
    if (path.includes('ecommerce')) return 'ecommerce'
    if (path.includes('realestate')) return 'realestate'
    if (path.includes('networking')) return 'networking'
    return 'networking'
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <Link to="/" className="logo">
          <img src={logoImg} alt="NexusHub" className="logo-image" />
        </Link>
      </div>
      
      <nav className="sidebar-nav">
        {getMenuItems().map((item, index) => {
          const IconComponent = item.icon
          const isActive = index === 0 // Make first item active by default
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
      
      {/* User Profile and Logout */}
      <div className="sidebar-footer">
        {user && (
          <div className="user-profile">
            <span className="user-name">{user.firstName} {user.lastName}</span>
            <span className="user-email">{user.email}</span>
          </div>
        )}
        <button onClick={handleLogout} className="logout-btn">
          <LogOut className="nav-icon" />
          <span className="nav-label">Logout</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar

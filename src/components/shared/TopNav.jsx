import { Link, useLocation } from 'react-router-dom'
import './TopNav.css'
import { Search, User, MessageCircle, Menu, X } from 'lucide-react'
import { useState } from 'react'

function TopNav({ title, showSearch = true }) {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const tabs = [
    { label: 'E-commerce', path: '/ecommerce' },
    { label: 'Networking', path: '/networking' },
    { label: 'Real Estate', path: '/realestate' }
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      <header className="top-nav">
        <div className="nav-left">
          <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X className="menu-icon" /> : <Menu className="menu-icon" />}
          </button>
          
          <div className={`nav-tabs ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            {tabs.map((tab) => (
              <Link
                key={tab.path}
                to={tab.path}
                className={`nav-tab ${location.pathname === tab.path ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {tab.label}
              </Link>
            ))}
          </div>
        </div>
        
        {showSearch && (
          <div className="search-container">
            <Search className="search-icon" />
            <input 
              type="text" 
              placeholder="Search people or posts..." 
              className="search-input"
            />
            <button className="search-btn">Search</button>
          </div>
        )}
        
        <div className="nav-right">
          <Link to="/" className="btn-primary">Home</Link>
          <button className="user-avatar">
            <User className="user-icon" />
          </button>
          <button className="chat-icon-btn">
            <MessageCircle className="chat-icon" />
          </button>
        </div>
      </header>
      
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setIsMobileMenuOpen(false)} />
      )}
    </>
  )
}

export default TopNav

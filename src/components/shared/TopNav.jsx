import { Link, useLocation } from 'react-router-dom'
import './TopNav.css'
import { Search, User, MessageCircle } from 'lucide-react'

function TopNav({ title, showSearch = true }) {
  const location = useLocation()
  
  const tabs = [
    { label: 'E-commerce', path: '/ecommerce' },
    { label: 'Networking', path: '/networking' },
    { label: 'Real Estate', path: '/realestate' }
  ]

  return (
    <header className="top-nav">
      <div className="nav-left">
        <div className="nav-tabs">
          {tabs.map((tab) => (
            <Link
              key={tab.path}
              to={tab.path}
              className={`nav-tab ${location.pathname === tab.path ? 'active' : ''}`}
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
  )
}

export default TopNav

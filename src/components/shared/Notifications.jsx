import { useState, useEffect } from 'react'
import { X, Check, Info, AlertTriangle, AlertCircle, Heart, ShoppingCart, Home } from 'lucide-react'
import './Notifications.css'

function Notifications() {
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    // Listen for custom notification events
    const handleNotification = (event) => {
      addNotification(event.detail)
    }

    window.addEventListener('notification', handleNotification)
    return () => window.removeEventListener('notification', handleNotification)
  }, [])

  const addNotification = (notification) => {
    const id = Date.now()
    const newNotification = {
      id,
      ...notification,
      timestamp: new Date().toISOString()
    }
    
    setNotifications(prev => [...prev, newNotification])
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      removeNotification(id)
    }, 5000)
  }

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id))
  }

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <Check className="notification-icon" />
      case 'error':
        return <AlertCircle className="notification-icon" />
      case 'warning':
        return <AlertTriangle className="notification-icon" />
      case 'cart':
        return <ShoppingCart className="notification-icon" />
      case 'favorite':
        return <Heart className="notification-icon" />
      case 'property':
        return <Home className="notification-icon" />
      default:
        return <Info className="notification-icon" />
    }
  }

  return (
    <div className="notifications-container">
      {notifications.map(notification => (
        <div 
          key={notification.id} 
          className={`notification ${notification.type}`}
        >
          {getIcon(notification.type)}
          <div className="notification-content">
            <div className="notification-title">{notification.title}</div>
            <div className="notification-message">{notification.message}</div>
          </div>
          <button 
            className="notification-close"
            onClick={() => removeNotification(notification.id)}
          >
            <X className="close-icon" />
          </button>
        </div>
      ))}
    </div>
  )
}

// Helper function to trigger notifications
export const showNotification = (type, title, message) => {
  const event = new CustomEvent('notification', {
    detail: { type, title, message }
  })
  window.dispatchEvent(event)
}

export default Notifications

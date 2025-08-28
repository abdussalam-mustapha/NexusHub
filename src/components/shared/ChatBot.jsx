import { useState } from 'react'
import './ChatBot.css'
import { MessageCircle, X, Send, Mic } from 'lucide-react'

function ChatBot({ activeSection = 'general' }) {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hello! I'm Sensay AI, your personalized assistant. How can I help you today?",
      timestamp: new Date()
    }
  ])

  const getQuickActions = () => {
    switch(activeSection) {
      case 'ecommerce':
        return ['Order Tracking', 'Product Returns', 'Price Comparison', 'Shipping Info', 'Customer Support', 'Wishlist']
      case 'networking':
        return ['Find Connections', 'Job Opportunities', 'Event RSVP', 'Message Templates', 'Profile Tips', 'Industry News']
      case 'realestate':
        return ['Loan Pre-Approval', 'Schedule Viewing', 'Market Analysis', 'Property Alerts', 'Agent Contact', 'Mortgage Calculator']
      case 'landing':
        return ['Explore Modules', 'Pricing Plans', 'AI Features', 'Get Started', 'Learn More', 'Contact Sales']
      default:
        return ['Order Tracking', 'Product Returns', 'Loan Pre-Approval', 'Schedule Viewing', 'Resume Upload', 'Event Calendar']
    }
  }

  const getBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase()
    
    if (activeSection === 'landing') {
      if (lowerMessage.includes('module') || lowerMessage.includes('explore')) {
        return {
          text: "NexusHub offers three core modules: E-commerce Catalog, Real Estate Hub, and Networking Feed. Which one interests you most?",
          badge: 'Welcome'
        }
      }
      if (lowerMessage.includes('pricing') || lowerMessage.includes('plan')) {
        return {
          text: "We offer flexible plans: Basic (Free), Pro ($29/month), and Enterprise ($99/month). Would you like details about any specific plan?",
          badge: 'Welcome'
        }
      }
      if (lowerMessage.includes('ai') || lowerMessage.includes('sensay')) {
        return {
          text: "Sensay AI is our intelligent assistant that provides personalized recommendations, smart automation, and predictive insights across all modules!",
          badge: 'Welcome'
        }
      }
      if (lowerMessage.includes('get started') || lowerMessage.includes('start')) {
        return {
          text: "Great! You can start by exploring our modules or signing up for a free Basic account. Which module would you like to try first?",
          badge: 'Welcome'
        }
      }
    }
    
    if (activeSection === 'ecommerce') {
      if (lowerMessage.includes('product') || lowerMessage.includes('recommendation')) {
        return {
          text: "Great! Are you interested in a specific category, or perhaps products that are trending right now?",
          badge: 'E-commerce'
        }
      }
      if (lowerMessage.includes('order') || lowerMessage.includes('tracking')) {
        return {
          text: "I can help you track your order. Please provide your order number or email address.",
          badge: 'E-commerce'
        }
      }
    }
    
    if (activeSection === 'networking') {
      if (lowerMessage.includes('connection') || lowerMessage.includes('network')) {
        return {
          text: "I can help you expand your network! Would you like me to suggest people in your industry or help you craft connection messages?",
          badge: 'Networking'
        }
      }
      if (lowerMessage.includes('job') || lowerMessage.includes('career')) {
        return {
          text: "Looking for new opportunities? I can help you find relevant job postings or review your profile.",
          badge: 'Networking'
        }
      }
    }
    
    if (activeSection === 'realestate') {
      if (lowerMessage.includes('property') || lowerMessage.includes('house')) {
        return {
          text: "I can help you find the perfect property! What's your preferred location and budget range?",
          badge: 'Real Estate'
        }
      }
      if (lowerMessage.includes('loan') || lowerMessage.includes('mortgage')) {
        return {
          text: "I can assist with loan pre-approval and mortgage calculations. What's your target loan amount?",
          badge: 'Real Estate'
        }
      }
    }
    
    return {
      text: "Thank you for your message! How else can I assist you today?",
      badge: null
    }
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'user',
        text: message,
        timestamp: new Date()
      }
      
      setMessages([...messages, newMessage])
      setMessage('')
      
      // Simulate bot response
      setTimeout(() => {
        const response = getBotResponse(message)
        const botResponse = {
          id: messages.length + 2,
          sender: 'bot',
          text: response.text,
          timestamp: new Date(),
          badge: response.badge
        }
        setMessages(prev => [...prev, botResponse])
      }, 1000)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  const handleQuickAction = (action) => {
    const newMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: action,
      timestamp: new Date()
    }
    setMessages([...messages, newMessage])
    
    // Auto-response for quick actions
    setTimeout(() => {
      const response = getBotResponse(action)
      const botResponse = {
        id: messages.length + 2,
        sender: 'bot',
        text: response.text,
        timestamp: new Date(),
        badge: response.badge
      }
      setMessages(prev => [...prev, botResponse])
    }, 800)
  }

  return (
    <>
      {/* Chat Icon */}
      <button 
        className={`chatbot-icon ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <MessageCircle className="chat-icon" />
      </button>

      {/* Chat Popup */}
      {isOpen && (
        <div className="chatbot-popup">
          <div className="chat-header">
            <div className="chat-title">
              <div className="bot-avatar">🤖</div>
              <span>Sensay AI</span>
            </div>
            <button 
              className="close-btn"
              onClick={() => setIsOpen(false)}
            >
              <X className="close-icon" />
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`message ${msg.sender}`}>
                {msg.sender === 'bot' && (
                  <div className="message-avatar">🤖</div>
                )}
                <div className="message-content">
                  {msg.badge && (
                    <span className="message-badge">{msg.badge}</span>
                  )}
                  <p>{msg.text}</p>
                </div>
                {msg.sender === 'user' && (
                  <div className="message-avatar">👤</div>
                )}
              </div>
            ))}
            
            {/* Quick Actions - Show for first few messages */}
            {messages.length <= 2 && (
              <div className="quick-actions">
                {getQuickActions().map((action, index) => (
                  <button
                    key={index}
                    className="quick-action-btn"
                    onClick={() => handleQuickAction(action)}
                  >
                    {action}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="chat-input">
            <button className="mic-btn">
              <Mic className="mic-icon" />
            </button>
            <input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="message-input"
            />
            <button 
              className="send-btn"
              onClick={handleSendMessage}
            >
              <Send className="send-icon" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default ChatBot

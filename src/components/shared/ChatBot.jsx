import { useState } from 'react'
import './ChatBot.css'
import { MessageCircle, X, Send, Mic } from 'lucide-react'

function ChatBot({ activeSection = 'general' }) {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
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

  const getBotResponse = async (userMessage) => {
    try {
      const response = await fetch(import.meta.env.VITE_SENSAY_QUERY_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-ORGANIZATION-SECRET': import.meta.env.VITE_X_ORGANIZATION_SECRET,
          'X-USER-ID': import.meta.env.VITE_X_USER_ID,
          'X-API-Version': import.meta.env.VITE_X_API_VERSION,
        },
        body: JSON.stringify({
          content: userMessage
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      
      // Extract the content from the API response and add context-aware badge
      const aiResponse = data.content || data.message || data.response || "I'm sorry, I couldn't process your request right now. Please try again.";
      
      // Determine badge based on active section
      let badge = null;
      switch(activeSection) {
        case 'ecommerce':
          badge = 'E-commerce';
          break;
        case 'networking':
          badge = 'Networking';
          break;
        case 'realestate':
          badge = 'Real Estate';
          break;
        case 'landing':
          badge = 'Welcome';
          break;
        default:
          badge = 'AI Assistant';
      }
      
      return {
        text: aiResponse,
        badge: badge
      };
    } catch (error) {
      console.error('Error getting bot response:', error);
      return {
        text: "I'm experiencing some technical difficulties. Please try again in a moment.",
        badge: 'System'
      };
    }
  }

  const handleSendMessage = async () => {
    if (message.trim() && !isLoading) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'user',
        text: message,
        timestamp: new Date()
      }
      
      setMessages([...messages, newMessage])
      const currentMessage = message
      setMessage('')
      setIsLoading(true)
      
      try {
        const response = await getBotResponse(currentMessage)
        const botResponse = {
          id: messages.length + 2,
          sender: 'bot',
          text: response.text,
          timestamp: new Date(),
          badge: response.badge
        }
        setMessages(prev => [...prev, botResponse])
      } catch (error) {
        console.error('Error sending message:', error)
        const errorResponse = {
          id: messages.length + 2,
          sender: 'bot',
          text: "I'm sorry, there was an error processing your message. Please try again.",
          timestamp: new Date(),
          badge: 'System'
        }
        setMessages(prev => [...prev, errorResponse])
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSendMessage()
    }
  }

  const handleQuickAction = async (action) => {
    if (isLoading) return
    
    const newMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: action,
      timestamp: new Date()
    }
    setMessages([...messages, newMessage])
    setIsLoading(true)
    
    try {
      const response = await getBotResponse(action)
      const botResponse = {
        id: messages.length + 2,
        sender: 'bot',
        text: response.text,
        timestamp: new Date(),
        badge: response.badge
      }
      setMessages(prev => [...prev, botResponse])
    } catch (error) {
      console.error('Error with quick action:', error)
      const errorResponse = {
        id: messages.length + 2,
        sender: 'bot',
        text: "I'm sorry, there was an error processing your request. Please try again.",
        timestamp: new Date(),
        badge: 'System'
      }
      setMessages(prev => [...prev, errorResponse])
    } finally {
      setIsLoading(false)
    }
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
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="message bot">
                <div className="message-avatar">🤖</div>
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Quick Actions - Show for first few messages */}
            {messages.length <= 2 && !isLoading && (
              <div className="quick-actions">
                {getQuickActions().map((action, index) => (
                  <button
                    key={index}
                    className="quick-action-btn"
                    onClick={() => handleQuickAction(action)}
                    disabled={isLoading}
                  >
                    {action}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="chat-input">
            <button className="mic-btn" disabled={isLoading}>
              <Mic className="mic-icon" />
            </button>
            <input
              type="text"
              placeholder={isLoading ? "AI is thinking..." : "Type your message..."}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="message-input"
              disabled={isLoading}
            />
            <button 
              className="send-btn"
              onClick={handleSendMessage}
              disabled={isLoading || !message.trim()}
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

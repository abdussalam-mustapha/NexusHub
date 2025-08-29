import './RealEstateListings.css'
import Sidebar from '../shared/Sidebar'
import TopNav from '../shared/TopNav'
import ChatBot from '../shared/ChatBot'
import { Search, Filter, MapPin, Home, Bath, Square, Heart, Phone, Mail, Grid, Map, Calculator, TrendingUp } from 'lucide-react'
import ava1 from '../../assets/ava1.png'
import ava2 from '../../assets/ava2.png'
import ava3 from '../../assets/ava3.png'
import testimonial3 from '../../assets/testimonial3.jpg'

function RealEstateListings() {
  const listings = [
    {
      id: 1,
      title: "123 Ocean View Dr, Miami, FL",
      price: 1250000,
      beds: 4,
      baths: 3,
      sqft: 2800,
      badge: "New",
      image: "�️",
      agent: {
        name: "Sarah J.",
        avatar: ava1
      }
    },
    {
      id: 2,
      title: "456 Cityscape Blvd, New York, NY",
      price: 575000,
      beds: 2,
      baths: 1,
      sqft: 1200,
      badge: "Reduced",
      image: "🏙️",
      agent: {
        name: "David K.",
        avatar: ava2
      }
    },
    {
      id: 3,
      title: "789 Oak Lane, Springfield, IL",
      price: 889999,
      beds: 5,
      baths: 3.5,
      sqft: 3500,
      badge: "Featured",
      image: "🏡",
      agent: {
        name: "Emily R.",
        avatar: ava3
      }
    },
    {
      id: 4,
      title: "101 Urban St, Seattle, WA",
      price: 420000,
      beds: 2,
      baths: 1,
      sqft: 750,
      badge: null,
      image: "🏢",
      agent: {
        name: "Mark P.",
        avatar: ava1
      }
    },
    {
      id: 5,
      title: "202 Countryside Rd, Napa, CA",
      price: 2100000,
      beds: 6,
      baths: 5,
      sqft: 5000,
      badge: "New",
      image: "🍇",
      agent: {
        name: "Jessica M.",
        avatar: testimonial3
      }
    },
    {
      id: 6,
      title: "303 Forest Path, Asheville, NC",
      price: 310000,
      beds: 3,
      baths: 2,
      sqft: 1500,
      badge: "Reduced",
      image: "�",
      agent: {
        name: "Michael B.",
        avatar: ava2
      }
    }
  ]

  const formatPrice = (price) => {
    return `$${price.toLocaleString()}`
  }

  return (
    <div className="real-estate-listings">
      <Sidebar activeSection="realestate" />
      <TopNav title="Real Estate Listings" />
      <ChatBot activeSection="realestate" />
      
      <main className="main-content">
        <div className="listings-header">
          <h1>Real Estate Listings</h1>
          <div className="view-controls">
            <button className="view-btn active">
              <Grid className="view-icon" />
              Grid View
            </button>
            <button className="view-btn">
              <Map className="view-icon" />
              Map View
            </button>
            <select className="sort-select">
              <option>Relevance</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest First</option>
            </select>
          </div>
        </div>

        <div className="listings-layout">
          <div className="properties-grid">
            {listings.map(property => (
              <div key={property.id} className="property-card">
                {property.badge && (
                  <div className={`property-badge ${property.badge.toLowerCase()}`}>
                    {property.badge}
                  </div>
                )}
                
                <div className="property-image">
                  <div className="image-placeholder">{property.image}</div>
                  <button className="favorite-btn">
                    <Heart className="heart-icon" />
                  </button>
                </div>
                
                <div className="property-info">
                  <div className="property-price">{formatPrice(property.price)}</div>
                  <div className="property-title">{property.title}</div>
                  
                  <div className="property-details">
                    <div className="detail-item">
                      <Home className="detail-icon" />
                      <span>{property.beds} Beds</span>
                    </div>
                    <div className="detail-item">
                      <Bath className="detail-icon" />
                      <span>{property.baths} Baths</span>
                    </div>
                    <div className="detail-item">
                      <Square className="detail-icon" />
                      <span>{property.sqft.toLocaleString()} sqft</span>
                    </div>
                  </div>
                  
                  <div className="property-agent">
                    <div className="agent-info">
                      <div className="agent-avatar">
                        <img src={property.agent.avatar} alt={property.agent.name} />
                      </div>
                      <span className="agent-name">{property.agent.name}</span>
                    </div>
                    <button className="view-details-btn">View Details</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="sidebar-right">
            <div className="mortgage-calculator">
              <h3>Mortgage Calculator</h3>
              <p>Estimate your monthly payments.</p>
              
              <div className="calculator-inputs">
                <div className="input-group">
                  <label>Home Price</label>
                  <input type="text" defaultValue="350000" />
                </div>
                <div className="input-group">
                  <label>Down Payment</label>
                  <input type="text" defaultValue="70000" />
                </div>
                <div className="input-group">
                  <label>Interest Rate (4.5%)</label>
                  <div className="slider-container">
                    <input type="range" min="1" max="10" defaultValue="4.5" step="0.1" className="slider" />
                  </div>
                </div>
                <div className="input-group">
                  <label>Loan Term (30 years)</label>
                  <div className="slider-container">
                    <input type="range" min="5" max="40" defaultValue="30" step="1" className="slider" />
                  </div>
                </div>
              </div>
              
              <button className="calculate-btn">Calculate</button>
            </div>

            <div className="area-overview">
              <h3>Area Overview</h3>
              <div className="map-placeholder">
                <div className="map-icon">🗺️</div>
                <div className="map-dots">
                  <div className="dot blue"></div>
                  <div className="dot orange"></div>
                  <div className="dot red"></div>
                </div>
              </div>
              <p>Explore amenities and local points of interest.</p>
              <a href="#" className="view-map-link">View full map</a>
            </div>
          </aside>
        </div>

        <div className="advanced-filters">
          <button className="filters-btn">
            <Filter className="filter-icon" />
            Advanced Filters
          </button>
        </div>

        <footer className="listings-footer">
          <div className="footer-links">
            <a href="#ecommerce">E-commerce</a>
            <a href="#networking">Networking</a>
            <a href="#realestate">Real Estate</a>
            <a href="#company">Company</a>
          </div>
          <div className="footer-social">
            <a href="#facebook">📘</a>
            <a href="#twitter">🐦</a>
            <a href="#linkedin">💼</a>
            <a href="#instagram">📷</a>
          </div>
        </footer>
      </main>
    </div>
  )
}

export default RealEstateListings

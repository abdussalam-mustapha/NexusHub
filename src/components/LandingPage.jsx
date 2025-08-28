import { Link } from 'react-router-dom'
import './LandingPage.css'
import ChatBot from './shared/ChatBot'
import { ShoppingCart, Brain, Shield, Users, Zap, Globe, Star, Check } from 'lucide-react'

// Import images
import ecommerceImg from '../assets/ecommerce.png'
import realestateImg from '../assets/realestate.png'
import networkingImg from '../assets/networking.png'
import testimonial1Img from '../assets/testimonial1.jpg'
import testimonial2Img from '../assets/testimonial2.webp'
import testimonial3Img from '../assets/testimonial3.jpg'
import sensayAIImg from '../assets/sensayAI.png'

function LandingPage() {
  return (
    <div className="landing-page">
      <ChatBot activeSection="landing" />
      
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-text">NexusHub</span>
          </div>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#modules">Modules</a>
            <a href="#pricing">Pricing</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </div>
          <button className="nav-cta">Get Started</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Unifying Your Digital World: Commerce, Property, & Connections
          </h1>
          <p className="hero-subtitle">
            Experience the next generation of integrated digital platforms combining Real Estate, E-commerce, and Professional Networking, powered by Senay AI.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary">Explore Modules</button>
            <button className="btn-secondary">Learn More</button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="container">
          <h2 className="section-title">Experience the Future of Integrated Digital Living</h2>
          <div className="features-grid">
            <div className="feature-card">
              <ShoppingCart className="feature-icon" />
              <h3>Seamless E-commerce</h3>
              <p>Shop with confidence using our AI-powered personalized recommendations and integrated transactions, all powered by AI.</p>
            </div>
            <div className="feature-card">
              <Brain className="feature-icon" />
              <h3>AI-Driven Personalization</h3>
              <p>Experience tailored content and suggestions based on your preferences and behavior, with AI algorithms constantly optimizing your experience.</p>
            </div>
            <div className="feature-card">
              <Globe className="feature-icon" />
              <h3>Cross-Domain Integration</h3>
              <p>Seamlessly switch between commerce, real estate, and networking as your needs evolve.</p>
            </div>
            <div className="feature-card">
              <Zap className="feature-icon" />
              <h3>Intuitive User Experience</h3>
              <p>A sleek, modern, and responsive design ensures seamless interactions across all devices and use cases.</p>
            </div>
            <div className="feature-card">
              <Shield className="feature-icon" />
              <h3>Robust Security & Privacy</h3>
              <p>Your data is protected with advanced security protocols and transparent privacy controls, giving you peace of mind.</p>
            </div>
            <div className="feature-card">
              <Users className="feature-icon" />
              <h3>Vibrant Community Hub</h3>
              <p>Connect with like-minded individuals, share ideas, and collaborate on projects through our integrated social networking features.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="modules" id="modules">
        <div className="container">
          <h2 className="section-title">Dive into Our Core Modules</h2>
          <div className="modules-grid">
            <div className="module-card">
              <div className="module-image">
                <img src={ecommerceImg} alt="E-commerce Dashboard" className="module-img" />
              </div>
              <h3>E-commerce Catalog</h3>
              <p>Explore a vast selection of products with intelligent search, personalized recommendations, and seamless purchasing experience.</p>
              <Link to="/ecommerce" className="btn-module">Explore Catalog</Link>
            </div>
            <div className="module-card">
              <div className="module-image">
                <img src={realestateImg} alt="Real Estate Platform" className="module-img" />
              </div>
              <h3>Real Estate Hub</h3>
              <p>Find your dream property with our advanced search filters, virtual tours, and AI-powered market insights.</p>
              <Link to="/realestate" className="btn-module">View Properties</Link>
            </div>
            <div className="module-card">
              <div className="module-image">
                <img src={networkingImg} alt="Networking Platform" className="module-img" />
              </div>
              <h3>Networking Feed</h3>
              <p>Connect with professionals, share ideas, and discover opportunities in our integrated social networking platform.</p>
              <Link to="/networking" className="btn-module">Join Network</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="container">
          <h2 className="section-title">What Our Users Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="star-filled" />
                ))}
              </div>
              <p>"NexusHub has completely transformed how I manage my digital life. The integration between modules is seamless."</p>
              <div className="testimonial-author">
                <img src={testimonial1Img} alt="Sarah Chen" className="author-avatar" />
                <div>
                  <strong>Sarah Chen</strong>
                  <span>Real Estate Agent</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="star-filled" />
                ))}
              </div>
              <p>"The AI recommendations are incredibly accurate. It's like having a personal assistant that truly understands my needs."</p>
              <div className="testimonial-author">
                <img src={testimonial2Img} alt="Michael Wong" className="author-avatar" />
                <div>
                  <strong>Michael Wong</strong>
                  <span>Business Owner</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="star-filled" />
                ))}
              </div>
              <p>"Connecting with other professionals has never been easier. The networking features are top-notch."</p>
              <div className="testimonial-author">
                <img src={testimonial3Img} alt="Jessica Lee" className="author-avatar" />
                <div>
                  <strong>Jessica Lee</strong>
                  <span>Marketing Director</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Assistant Section */}
      <section className="ai-assistant">
        <div className="container">
          <div className="ai-content">
            <div className="ai-text">
              <h2>Your Intelligent Co-pilot: The Senay AI Assistant</h2>
              <p>Powered by our advanced Senay AI, the NexusHub assistant enhances every aspect of your experience, from intelligent recommendations to automated task management, from streamlining the perfect property search to discovering connections and opportunities.</p>
              <div className="ai-features">
                <div className="ai-feature">
                  <Check className="check-icon" />
                  <span>Personalized Recommendations: Discover products, properties, and connections tailored to your preferences</span>
                </div>
                <div className="ai-feature">
                  <Check className="check-icon" />
                  <span>Smart Automation: Streamline your workflow with intelligent automation and task management</span>
                </div>
                <div className="ai-feature">
                  <Check className="check-icon" />
                  <span>Predictive Insights: Get ahead of trends with AI-powered market analysis and behavioral predictions</span>
                </div>
              </div>
              <button className="btn-ai">Meet Senay AI</button>
            </div>
            <div className="ai-visual">
              <img src={sensayAIImg} alt="Senay AI Assistant" className="ai-avatar-img" />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing" id="pricing">
        <div className="container">
          <h2 className="section-title">Flexible Plans for Every Need</h2>
          <div className="pricing-grid">
            <div className="pricing-card">
              <h3>Basic</h3>
              <div className="price">
                <span className="currency">$</span>
                <span className="amount">0</span>
                <span className="period">per month</span>
              </div>
              <ul className="features-list">
                <li><Check className="check-icon" />Access to basic modules</li>
                <li><Check className="check-icon" />Limited AI recommendations</li>
                <li><Check className="check-icon" />Standard customer support</li>
                <li><Check className="check-icon" />Basic profile features</li>
                <li><Check className="check-icon" />Standard account manager</li>
              </ul>
              <button className="btn-pricing">Get Started</button>
            </div>
            <div className="pricing-card featured">
              <div className="popular-badge">Most Popular</div>
              <h3>Pro</h3>
              <div className="price">
                <span className="currency">$</span>
                <span className="amount">29</span>
                <span className="period">per month</span>
              </div>
              <ul className="features-list">
                <li><Check className="check-icon" />Full access to all modules</li>
                <li><Check className="check-icon" />Advanced AI personalization</li>
                <li><Check className="check-icon" />Priority customer support</li>
                <li><Check className="check-icon" />Enhanced networking features</li>
                <li><Check className="check-icon" />Dedicated account manager</li>
              </ul>
              <button className="btn-pricing-featured">Get Started</button>
            </div>
            <div className="pricing-card">
              <h3>Enterprise</h3>
              <div className="price">
                <span className="currency">$</span>
                <span className="amount">99</span>
                <span className="period">per month</span>
              </div>
              <ul className="features-list">
                <li><Check className="check-icon" />Full enterprise platform access</li>
                <li><Check className="check-icon" />Custom AI training & analytics</li>
                <li><Check className="check-icon" />24/7 dedicated support</li>
                <li><Check className="check-icon" />Advanced team collaboration</li>
                <li><Check className="check-icon" />Dedicated account manager</li>
              </ul>
              <button className="btn-pricing">Contact Sales</button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter">
        <div className="container">
          <h2>Stay Up-to-Date with NexusAI</h2>
          <p>Subscribe to our newsletter for the latest updates, exclusive insights, and platform enhancements.</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Enter your email" />
            <button className="btn-newsletter">Subscribe</button>
          </div>
          <div className="newsletter-consent">
            <input type="checkbox" id="consent" />
            <label htmlFor="consent">I agree to receive marketing communications from NexusHub</label>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>NexusHub</h4>
              <p>Unifying your digital world through intelligent commerce, property solutions, and meaningful connections.</p>
            </div>
            <div className="footer-section">
              <h4>Features</h4>
              <ul>
                <li><a href="#">E-commerce</a></li>
                <li><a href="#">Real Estate</a></li>
                <li><a href="#">Networking</a></li>
                <li><a href="#">AI Assistant</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Resources</h4>
              <ul>
                <li><a href="#">Documentation</a></li>
                <li><a href="#">API Reference</a></li>
                <li><a href="#">Support Center</a></li>
                <li><a href="#">Community</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Company</h4>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Press</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Legal</h4>
              <ul>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Cookie Policy</a></li>
                <li><a href="#">GDPR</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 NexusHub Technologies. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage

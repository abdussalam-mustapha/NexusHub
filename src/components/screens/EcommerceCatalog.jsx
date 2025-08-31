import './EcommerceCatalog.css'
import Sidebar from '../shared/Sidebar'
import TopNav from '../shared/TopNav'
import ChatBot from '../shared/ChatBot'
import { Search, Filter, Star, Heart, ShoppingCart, Package, Facebook, Twitter, Linkedin, Instagram, Camera } from 'lucide-react'

// Product Images
import smartHomeImg from '../../assets/smart-home-device-kitchen.jpg'
import wirelessMouseImg from '../../assets/wireless-computer-mouse-with-sphere.jpg'
import headphonesImg from '../../assets/headphones-displayed-against-dark-background.jpg'
import ssdStorageImg from '../../assets/man-using-external-storage-used.jpg'
import smartLightImg from '../../assets/view-futuristic-lighting-lamp-design.jpg'
import teaPotImg from '../../assets/modern-metallic-teapot-with-transparent-pot-filtered-coffee-thick-wooden-table-cafe-shop.jpg'
import coffeeImg from '../../assets/machine-grinding-coffee-beans.jpg'
import airFryerImg from '../../assets/close-up-air-fryer.jpg'
import robotVacuumImg from '../../assets/still-life-robotic-vacuum.jpg'
import acousticPanelsImg from '../../assets/acoustic-foam-studio.jpg'
import smartGardenImg from '../../assets/indoor_smRT_GARDEN.jpeg'
import photoFrameImg from '../../assets/photo_frame.jpg'

function EcommerceCatalog() {
  const trendingProducts = [
    {
      id: 1,
      name: "Smart Home Hub X10",
      price: 199.99,
      originalPrice: 249.99,
      rating: 4.8,
      reviews: 1504,
      image: smartHomeImg,
      badge: "Bestseller",
      brand: "Tech Innovations",
      colors: ["blue", "gray"]
    },
    {
      id: 2,
      name: "Wireless Ergonomic Mouse",
      price: 45.00,
      originalPrice: 59.00,
      rating: 4.7,
      reviews: 850,
      image: wirelessMouseImg,
      badge: null,
      brand: "ErgoTech",
      colors: ["black", "white"]
    },
    {
      id: 3,
      name: "Noise Cancelling Headphones",
      price: 175.50,
      originalPrice: 200.00,
      rating: 4.9,
      reviews: 930,
      image: headphonesImg,
      badge: "Bestseller",
      brand: "AudioLux",
      colors: ["black", "silver"]
    },
    {
      id: 4,
      name: "Portable SSD 1TB",
      price: 89.99,
      originalPrice: 170.00,
      rating: 4.8,
      reviews: 1200,
      image: ssdStorageImg,
      badge: null,
      brand: "DataVault",
      colors: ["orange", "blue", "red"]
    }
  ]

  const newArrivals = [
    {
      id: 5,
      name: "Smart LED Light Strips",
      price: 29.99,
      originalPrice: 39.00,
      rating: 4.5,
      reviews: 700,
      image: smartLightImg,
      badge: "Bestseller",
      brand: "LumiFlow",
      colors: ["multicolor"]
    },
    {
      id: 6,
      name: "Electric Kettle & Tea Infuser",
      price: 65.00,
      originalPrice: 80.00,
      rating: 4.7,
      reviews: 920,
      image: teaPotImg,
      badge: "Bestseller",
      brand: "ZenKitchen",
      colors: ["white", "black"]
    },
    {
      id: 7,
      name: "Espresso Machine Pro",
      price: 499.99,
      originalPrice: 600.00,
      rating: 4.8,
      reviews: 3400,
      image: coffeeImg,
      badge: "Bestseller",
      brand: "BrewMaster",
      colors: ["silver", "black"]
    },
    {
      id: 8,
      name: "Smart Air Fryer XL",
      price: 120.00,
      originalPrice: 150.00,
      rating: 4.6,
      reviews: 1800,
      image: airFryerImg,
      badge: null,
      brand: "KitchenChef Appliances",
      colors: ["black", "white"]
    }
  ]

  const topBestsellers = [
    {
      id: 9,
      name: "Robot Vacuum Cleaner",
      price: 299.00,
      originalPrice: 400.00,
      rating: 4.7,
      reviews: 1800,
      image: robotVacuumImg,
      badge: "Bestseller",
      brand: "CleanRobo",
      colors: ["black", "white", "gray"]
    },
    {
      id: 10,
      name: "Acoustic Wall Panels",
      price: 75.00,
      originalPrice: 90.00,
      rating: 4.8,
      reviews: 600,
      image: acousticPanelsImg,
      badge: null,
      brand: "SoundSpace Designs",
      colors: ["wood", "black", "white"]
    },
    {
      id: 11,
      name: "Smart Garden Kit",
      price: 110.00,
      originalPrice: 135.00,
      rating: 4.6,
      reviews: 600,
      image: smartGardenImg,
      badge: null,
      brand: "GreenThumb Tech",
      colors: ["green", "white"]
    },
    {
      id: 12,
      name: "Digital Photo Frame",
      price: 79.99,
      originalPrice: 99.00,
      rating: 4.9,
      reviews: 340,
      image: photoFrameImg,
      badge: null,
      brand: "MemoryView",
      colors: ["black", "white"]
    }
  ]

  const ProductCard = ({ product }) => (
    <div className="product-card">
      {product.badge && (
        <div className="product-badge">{product.badge}</div>
      )}
      
      <div className="product-image">
        {(typeof product.image === 'string' && !product.image.includes('/assets/')) ? (
          <div className="image-placeholder">{product.image}</div>
        ) : (
          <img src={product.image} alt={product.name} className="product-image-content" />
        )}
        <button className="wishlist-btn">
          <Heart className="heart-icon" />
        </button>
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-price">
          <span className="current-price">${product.price}</span>
          {product.originalPrice && (
            <span className="original-price">${product.originalPrice}</span>
          )}
        </div>
        
        <div className="product-brand">
          <Package className="brand-icon" />
          <span className="brand-name">{product.brand}</span>
        </div>
        
        <div className="product-rating">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`star ${i < Math.floor(product.rating) ? 'filled' : ''}`} 
              />
            ))}
          </div>
          <span className="rating-text">
            {product.rating} ({product.reviews} reviews)
          </span>
        </div>

        {product.colors && (
          <div className="product-colors">
            {product.colors.map((color, index) => (
              <div key={index} className={`color-dot ${color}`}></div>
            ))}
          </div>
        )}
        
        <button className="add-to-cart-btn">
          Add to Cart
        </button>
      </div>
    </div>
  )

  return (
    <div className="ecommerce-catalog">
      <Sidebar activeSection="ecommerce" />
      <TopNav title="E-commerce Catalog" />
      <ChatBot activeSection="ecommerce" />
      
      <main className="main-content">
        <div className="catalog-header">
          <h1>E-commerce Catalog</h1>
        </div>

        <div className="catalog-content">
          <aside className="filters-sidebar">
            <div className="filters-header">
              <Filter className="filter-icon" />
              <span>Filters</span>
            </div>
            
            <div className="price-range-filter">
              <h4>Price Range</h4>
              <div className="price-inputs">
                <input type="number" placeholder="Min" className="price-input" />
                <span>-</span>
                <input type="number" placeholder="Max" className="price-input" />
              </div>
            </div>

            <div className="brand-filter">
              <h4>Brand</h4>
              <div className="brand-checkboxes">
                <label className="brand-option">
                  <input type="checkbox" defaultChecked />
                  <span className="checkmark"></span>
                  Tech Innovations
                </label>
                <label className="brand-option">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                  ErgoGear
                </label>
                <label className="brand-option">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                  AudioLux
                </label>
                <label className="brand-option">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                  DataVault
                </label>
                <a href="#" className="view-all-link">View all Brands</a>
              </div>
            </div>

            <div className="rating-filter">
              <h4>Customer Rating</h4>
              <div className="rating-options">
                <label className="rating-option">
                  <input type="checkbox" defaultChecked />
                  <span className="checkmark"></span>
                  5 Stars
                </label>
                <label className="rating-option">
                  <input type="checkbox" defaultChecked />
                  <span className="checkmark"></span>
                  4 Stars & up
                </label>
                <label className="rating-option">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                  3 Stars & up
                </label>
                <label className="rating-option">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                  2 Stars & up
                </label>
                <label className="rating-option">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                  1 Star & up
                </label>
              </div>
            </div>
          </aside>

          <div className="products-section">
            <section className="product-section">
              <h2>Trending Products</h2>
              <div className="products-grid">
                {trendingProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>

            <section className="product-section">
              <h2>New Arrivals</h2>
              <div className="products-grid">
                {newArrivals.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>

            <section className="product-section">
              <h2>Top Bestsellers</h2>
              <div className="products-grid">
                {topBestsellers.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          </div>
        </div>

        <footer className="catalog-footer">
          <div className="footer-links">
            <a href="#ecommerce">E-commerce</a>
            <a href="#networking">Networking</a>
            <a href="#realestate">Real Estate</a>
            <a href="#company">Company</a>
          </div>
          <div className="footer-social">
            <a href="#facebook"><Facebook className="social-icon" /></a>
            <a href="#twitter"><Twitter className="social-icon" /></a>
            <a href="#linkedin"><Linkedin className="social-icon" /></a>
            <a href="#instagram"><Instagram className="social-icon" /></a>
          </div>
        </footer>
      </main>
    </div>
  )
}

export default EcommerceCatalog

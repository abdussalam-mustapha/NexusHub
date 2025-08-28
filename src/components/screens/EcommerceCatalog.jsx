import './EcommerceCatalog.css'
import Sidebar from '../shared/Sidebar'
import TopNav from '../shared/TopNav'
import { Search, Filter, Star, Heart, ShoppingCart } from 'lucide-react'

function EcommerceCatalog() {
  const categories = [
    "All Categories", "Electronics", "Fashion", "Home & Garden", 
    "Sports & Outdoors", "Books", "Health & Beauty", "Automotive"
  ]

  const products = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: 129.99,
      originalPrice: 179.99,
      rating: 4.5,
      reviews: 324,
      image: "📱",
      badge: "Best Seller",
      discount: "28% OFF"
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 199.99,
      originalPrice: 249.99,
      rating: 4.7,
      reviews: 156,
      image: "⌚",
      badge: "New",
      discount: "20% OFF"
    },
    {
      id: 3,
      name: "Premium Coffee Maker",
      price: 89.99,
      originalPrice: null,
      rating: 4.3,
      reviews: 89,
      image: "☕",
      badge: null,
      discount: null
    },
    {
      id: 4,
      name: "Laptop Backpack",
      price: 39.99,
      originalPrice: 59.99,
      rating: 4.4,
      reviews: 203,
      image: "🎒",
      badge: "Popular",
      discount: "33% OFF"
    },
    {
      id: 5,
      name: "LED Desk Lamp",
      price: 24.99,
      originalPrice: 34.99,
      rating: 4.2,
      reviews: 67,
      image: "💡",
      badge: null,
      discount: "29% OFF"
    },
    {
      id: 6,
      name: "Wireless Mouse",
      price: 19.99,
      originalPrice: null,
      rating: 4.6,
      reviews: 445,
      image: "🖱️",
      badge: "Top Rated",
      discount: null
    }
  ]

  const filters = [
    { name: "Price Range", options: ["$0 - $25", "$25 - $50", "$50 - $100", "$100+"] },
    { name: "Brand", options: ["Apple", "Samsung", "Sony", "Nike", "Adidas"] },
    { name: "Rating", options: ["4 Stars & Up", "3 Stars & Up", "2 Stars & Up"] },
    { name: "Shipping", options: ["Free Shipping", "Fast Delivery", "Prime Eligible"] }
  ]

  return (
    <div className="ecommerce-catalog">
      <Sidebar activeSection="ecommerce" />
      <TopNav title="E-commerce Catalog" />
      
      
    </div>
  )
}

export default EcommerceCatalog

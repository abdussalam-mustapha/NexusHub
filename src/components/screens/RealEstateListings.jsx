import './RealEstateListings.css'
import Sidebar from '../shared/Sidebar'
import TopNav from '../shared/TopNav'
import { Search, Filter, MapPin, Bed, Bath, Square, Heart, Phone, Mail } from 'lucide-react'

function RealEstateListings() {
  const propertyTypes = ["All Types", "House", "Apartment", "Condo", "Villa", "Townhouse"]
  
  const listings = [
    {
      id: 1,
      title: "Modern Downtown Apartment",
      price: 485000,
      address: "123 Main St, Downtown",
      beds: 2,
      baths: 2,
      sqft: 1200,
      type: "Apartment",
      status: "For Sale",
      image: "🏢",
      agent: {
        name: "Sarah Johnson",
        phone: "(555) 123-4567",
        email: "sarah@realestate.com"
      },
      features: ["Modern Kitchen", "City View", "Parking"]
    },
    {
      id: 2,
      title: "Spacious Family Home",
      price: 675000,
      address: "456 Oak Avenue, Suburbs",
      beds: 4,
      baths: 3,
      sqft: 2400,
      type: "House",
      status: "For Sale",
      image: "🏡",
      agent: {
        name: "Mike Davis",
        phone: "(555) 987-6543",
        email: "mike@realestate.com"
      },
      features: ["Large Yard", "Garage", "Updated Kitchen"]
    },
    {
      id: 3,
      title: "Luxury Waterfront Condo",
      price: 1250000,
      address: "789 Harbor View, Waterfront",
      beds: 3,
      baths: 2,
      sqft: 1800,
      type: "Condo",
      status: "For Sale",
      image: "🌊",
      agent: {
        name: "Emma Wilson",
        phone: "(555) 456-7890",
        email: "emma@realestate.com"
      },
      features: ["Ocean View", "Balcony", "Concierge"]
    },
    {
      id: 4,
      title: "Cozy Studio Apartment",
      price: 1800,
      address: "321 College St, University Area",
      beds: 0,
      baths: 1,
      sqft: 450,
      type: "Studio",
      status: "For Rent",
      image: "🏠",
      agent: {
        name: "David Chen",
        phone: "(555) 234-5678",
        email: "david@realestate.com"
      },
      features: ["Close to University", "Furnished", "Utilities Included"]
    },
    {
      id: 5,
      title: "Executive Villa",
      price: 2100000,
      address: "555 Elite Drive, Luxury District",
      beds: 5,
      baths: 4,
      sqft: 3500,
      type: "Villa",
      status: "For Sale",
      image: "🏰",
      agent: {
        name: "Lisa Anderson",
        phone: "(555) 345-6789",
        email: "lisa@realestate.com"
      },
      features: ["Pool", "Tennis Court", "Wine Cellar"]
    },
    {
      id: 6,
      title: "Urban Loft",
      price: 3200,
      address: "777 Art District, Creative Quarter",
      beds: 1,
      baths: 1,
      sqft: 800,
      type: "Loft",
      status: "For Rent",
      image: "🎨",
      agent: {
        name: "Tom Rodriguez",
        phone: "(555) 567-8901",
        email: "tom@realestate.com"
      },
      features: ["High Ceilings", "Exposed Brick", "Industrial Style"]
    }
  ]

  const formatPrice = (price, status) => {
    if (status === "For Rent") {
      return `$${price.toLocaleString()}/month`
    }
    return `$${price.toLocaleString()}`
  }

  return (
    <div className="real-estate-listings">
      <Sidebar activeSection="realestate" />
      <TopNav title="Real Estate Listings" />
      
    
    </div>
  )
}

export default RealEstateListings

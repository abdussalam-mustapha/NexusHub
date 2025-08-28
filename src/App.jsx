import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import LandingPage from './components/LandingPage'
import NetworkingFeed from './components/screens/NetworkingFeed'
import EcommerceCatalog from './components/screens/EcommerceCatalog'
import RealEstateListings from './components/screens/RealEstateListings'

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/networking" element={<NetworkingFeed />} />
          <Route path="/ecommerce" element={<EcommerceCatalog />} />
          <Route path="/realestate" element={<RealEstateListings />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

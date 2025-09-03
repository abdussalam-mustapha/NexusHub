import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'
import ProtectedRoute from './components/ProtectedRoute'
import LandingPage from './components/LandingPage'
import Authentication from './components/Authentication'
import NetworkingFeed from './components/screens/NetworkingFeed'
import EcommerceCatalog from './components/screens/EcommerceCatalog'
import RealEstateListings from './components/screens/RealEstateListings'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="app">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/auth" element={<Authentication />} />
              <Route path="/networking" element={
                <ProtectedRoute>
                  <NetworkingFeed />
                </ProtectedRoute>
              } />
              <Route path="/ecommerce" element={
                <ProtectedRoute>
                  <EcommerceCatalog />
                </ProtectedRoute>
              } />
              <Route path="/realestate" element={
                <ProtectedRoute>
                  <RealEstateListings />
                </ProtectedRoute>
              } />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  )
}

export default App

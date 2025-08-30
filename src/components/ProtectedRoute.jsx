import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()

  console.log('ProtectedRoute - isAuthenticated:', isAuthenticated, 'loading:', loading, 'location:', location.pathname);

  if (loading) {
    console.log('ProtectedRoute - Still loading auth state');
    // Show loading spinner while checking auth status
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: '#1a1d21',
        color: '#ffffff'
      }}>
        <div>Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    console.log('ProtectedRoute - Not authenticated, redirecting to auth');
    // Redirect to auth page with return url
    return <Navigate to="/auth" state={{ from: location }} replace />
  }

  console.log('ProtectedRoute - Authenticated, rendering children');
  return children
}

export default ProtectedRoute

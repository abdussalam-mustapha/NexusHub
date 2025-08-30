import { useState } from 'react'
import { useGoogleLogin } from '@react-oauth/google';
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './Authentication.css'

function Authentication() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    agreeToTerms: false
  })
  const [loading, setLoading] = useState(false)
  
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  
  // Get the page user was trying to access, default to dashboard
  const from = location.state?.from?.pathname || '/networking'
  
  console.log('Authentication component loaded');
  console.log('Location state:', location.state);
  console.log('Redirect destination (from):', from);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock user data (in real app, this would come from your auth API)
      const userData = {
        id: Date.now(),
        email: formData.email,
        firstName: formData.firstName || 'John',
        lastName: formData.lastName || 'Doe',
        avatar: '/src/assets/ava1.png'
      }
      
      // Login user
      login(userData)
      
      // Redirect to the page they were trying to access
      navigate(from, { replace: true })
    } catch (error) {
      console.error('Authentication error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      try {
        console.log('Google OAuth success, fetching user info...');
        
        // Fetch user info from Google
        const googleUser = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { 'Authorization': `Bearer ${tokenResponse.access_token}` },
        }).then(res => res.json());

        console.log('Google user info:', googleUser);

        const userData = {
          id: googleUser.sub,
          email: googleUser.email,
          firstName: googleUser.given_name,
          lastName: googleUser.family_name,
          avatar: googleUser.picture,
        };

        console.log('Logging in user:', userData);
        console.log('Redirect destination:', from);

        // Login user with callback for navigation
        login(userData, () => {
          console.log('Login callback executed, navigating to:', from);
          navigate(from, { replace: true });
        });

      } catch (error) {
        console.error('Google login error:', error);
      } finally {
        setLoading(false);
      }
    },
    onError: (error) => {
      console.error('Google login failed:', error);
      setLoading(false);
    },
    // Force popup mode to avoid redirect issues
    flow: 'implicit',
  });

  return (
    <div className="authentication">
      <div className="auth-container">
        {/* Left Side - Branding */}
        <div className="auth-branding">
          <div className="branding-content">
            <div className="logo">
              <span className="logo-text">NexusHub</span>
            </div>
            <h2 className="branding-title">
              {isSignUp ? 'Join NexusHub Today' : 'Welcome Back to NexusHub'}
            </h2>
            <p className="branding-subtitle">
              {isSignUp 
                ? 'Create your account and unlock the full potential of integrated digital commerce, real estate, and professional networking.'
                : 'Access your unified platform for e-commerce, real estate, and professional networking.'
              }
            </p>          
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="auth-form-section">
          <div className="auth-form-container">
            <div className="auth-header">
              <h1>{isSignUp ? 'Create Account' : 'Sign In'}</h1>
              <p>
                {isSignUp 
                  ? 'Join thousands of users already using NexusHub'
                  : 'Welcome back! Please sign in to your account'
                }
              </p>
            </div>

            {/* Google Sign In Button */}
            <button 
              className="google-btn" 
              onClick={handleGoogleSignIn}
              disabled={loading}
            >
              <svg className="google-icon" viewBox="0 0 24 24" width="20" height="20">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {loading ? 'Signing in...' : 'Continue with Google'}
            </button>

            <div className="divider">
              <span>or</span>
            </div>

            {/* Auth Form */}
          

            {/* Back to Home */}
            <div className="back-home">
              <Link to="/" className="back-link">← Back to Home</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Authentication

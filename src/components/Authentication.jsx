import { useState } from 'react'
import { GoogleLogin } from '@react-oauth/google';
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

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    try {
      console.log('Google OAuth success with credential:', credentialResponse);
      
      // Decode the JWT token to get user info
      const userInfo = JSON.parse(atob(credentialResponse.credential.split('.')[1]));
      console.log('Decoded user info:', userInfo);

      const userData = {
        id: userInfo.sub,
        email: userInfo.email,
        firstName: userInfo.given_name,
        lastName: userInfo.family_name,
        avatar: userInfo.picture,
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
  };

  const handleGoogleError = () => {
    console.error('Google login failed');
    setLoading(false);
  };

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
            <div className="google-login-wrapper">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                useOneTap={false}
                theme="outline"
                size="large"
                width="100%"
                text="continue_with"
                shape="rectangular"
                disabled={loading}
              />
            </div>

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

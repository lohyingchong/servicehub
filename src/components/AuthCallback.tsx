import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthCallback: React.FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    // Handle authentication callback
    const handleCallback = async () => {
      try {
        // In a real app, you would handle the OAuth callback here
        // For now, just redirect to home
        setTimeout(() => {
          navigate('/')
        }, 2000)
      } catch (error) {
        console.error('Auth callback error:', error)
        navigate('/')
      }
    }

    handleCallback()
  }, [navigate])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Completing sign in...</h2>
        <p className="text-gray-600">Please wait while we redirect you.</p>
      </div>
    </div>
  )
}

export default AuthCallback

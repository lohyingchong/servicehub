import { useState, useEffect } from 'react'
import { auth, googleProvider } from '../firebase/firebase'
import { signInWithPopup, signOut as firebaseSignOut, onAuthStateChanged, User } from 'firebase/auth'

export const useGoogleAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
    })

    return () => unsubscribe()
  }, [])

  const signInWithGoogle = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      const result = await signInWithPopup(auth, googleProvider)
      return result.user
    } catch (error: any) {
      let errorMessage = 'Failed to sign in with Google'
      
      switch (error.code) {
        case 'auth/popup-closed-by-user':
          errorMessage = 'Sign-in popup was closed'
          break
        case 'auth/popup-blocked':
          errorMessage = 'Sign-in popup was blocked by browser'
          break
        case 'auth/cancelled-popup-request':
          errorMessage = 'Sign-in was cancelled'
          break
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your connection'
          break
        case 'auth/too-many-requests':
          errorMessage = 'Too many requests. Please try again later'
          break
        default:
          errorMessage = error.message || 'Failed to sign in with Google'
      }
      
      setError(errorMessage)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      await firebaseSignOut(auth)
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to sign out'
      setError(errorMessage)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return {
    user,
    isLoading,
    error,
    signInWithGoogle,
    signOut
  }
}

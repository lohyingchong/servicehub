import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getAnalytics } from 'firebase/analytics'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAacV3a21VawczBG_vUiGAx7x0Q0XuuPss",
  authDomain: "finaldevmatch.firebaseapp.com",
  projectId: "finaldevmatch",
  storageBucket: "finaldevmatch.firebasestorage.app",
  messagingSenderId: "546111784778",
  appId: "1:546111784778:web:cb1f9c2706483b9a8ee3b3",
  measurementId: "G-VM8J7Y3C5J"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

// Configure Google provider
googleProvider.setCustomParameters({
  prompt: 'select_account'
})

// Initialize Analytics
export const analytics = getAnalytics(app)

export default app

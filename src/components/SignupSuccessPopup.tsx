import React from 'react'
import { CheckCircle, X } from 'lucide-react'

interface SignupSuccessPopupProps {
  isOpen: boolean
  onClose: () => void
  userName: string
}

const SignupSuccessPopup: React.FC<SignupSuccessPopupProps> = ({ isOpen, onClose, userName }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 w-full max-w-md shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 hover:bg-white/30 transition-all duration-200"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome aboard, {userName}!
          </h2>
          
          <p className="text-gray-600 mb-6">
            Your account has been created successfully. You can now explore all the features of our platform.
          </p>
          
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-xl hover:shadow-green-500/25 transition-all duration-200"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  )
}

export default SignupSuccessPopup

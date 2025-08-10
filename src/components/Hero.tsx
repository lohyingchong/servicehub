import React from 'react'

interface HeroProps {
  onOpenAuth: (mode: 'login' | 'signup') => void
}

const Hero: React.FC<HeroProps> = ({ onOpenAuth }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary-200/30 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Connect with
          <span className="block bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            Trusted Service Providers
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          Find verified professionals for all your needs. From home repairs to digital services, 
          we connect you with the best providers in your area.
        </p>

        {/* Get Started Button */}
        <div className="mb-16">
          <button
            onClick={() => onOpenAuth('signup')}
            className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-primary-700 hover:to-secondary-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Get Started Free
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-6">
            <div className="text-2xl font-bold text-primary-600 mb-2">10K+</div>
            <div className="text-sm text-gray-600">Verified Providers</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-6">
            <div className="text-2xl font-bold text-primary-600 mb-2">50K+</div>
            <div className="text-sm text-gray-600">Happy Customers</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-6">
            <div className="text-2xl font-bold text-primary-600 mb-2">4.9★</div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-6">
            <div className="text-2xl font-bold text-primary-600 mb-2">24/7</div>
            <div className="text-sm text-gray-600">Support Available</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

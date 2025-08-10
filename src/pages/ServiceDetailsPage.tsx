import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Star, MapPin, Clock, Shield, Award, MessageCircle, Bookmark, CreditCard, ArrowLeft } from 'lucide-react'
import ServiceChatbot from '../components/ServiceChatbot'
import SubscriptionSuccessPopup from '../components/SubscriptionSuccessPopup'
import { useSubscriptions } from '../hooks/useSubscriptions'

const ServiceDetailsPage: React.FC = () => {
  const { id } = useParams()
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [showChatbot, setShowChatbot] = useState(false)
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)
  const { subscribeToService, isSubscribed } = useSubscriptions()

  // Mock service data - in a real app, this would be fetched based on the ID
  const service = {
    id: parseInt(id || '1'),
    title: 'Professional House Cleaning',
    provider: {
      name: 'Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.9,
      reviews: 127,
      verified: true,
      memberSince: '2020',
      responseTime: '< 1 hour'
    },
    category: 'Home Services',
    price: '$25/hour',
    location: 'Downtown',
    images: [
      'https://images.pexels.com/photos/4239146/pexels-photo-4239146.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/4239013/pexels-photo-4239013.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/4239142/pexels-photo-4239142.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Professional deep cleaning service for homes and apartments. I use only eco-friendly products and provide all necessary equipment. My service includes dusting, vacuuming, mopping, bathroom and kitchen deep cleaning, and organizing.',
    features: [
      'Eco-friendly cleaning products',
      'All equipment provided',
      'Flexible scheduling',
      'Satisfaction guaranteed',
      'Insured and bonded',
      'Background checked'
    ],
    packages: [
      {
        name: 'Basic Clean',
        price: '$80',
        duration: '2-3 hours',
        description: 'Standard cleaning for 1-2 bedroom homes',
        features: ['Dusting', 'Vacuuming', 'Bathroom cleaning', 'Kitchen cleaning']
      },
      {
        name: 'Deep Clean',
        price: '$150',
        duration: '4-5 hours',
        description: 'Comprehensive cleaning for any size home',
        features: ['Everything in Basic', 'Inside appliances', 'Baseboards', 'Light fixtures', 'Organizing']
      },
      {
        name: 'Move-in/out',
        price: '$200',
        duration: '5-6 hours',
        description: 'Complete cleaning for moving',
        features: ['Everything in Deep Clean', 'Inside cabinets', 'Windows', 'Carpet cleaning']
      }
    ],
    reviews: [
      {
        id: 1,
        author: 'Jennifer M.',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Sarah did an amazing job! My house has never been cleaner. She was professional, punctual, and very thorough. Highly recommend!'
      },
      {
        id: 2,
        author: 'Michael R.',
        rating: 5,
        date: '1 month ago',
        comment: 'Excellent service! Sarah pays attention to every detail and uses great eco-friendly products. Will definitely book again.'
      },
      {
        id: 3,
        author: 'Lisa K.',
        rating: 4,
        date: '2 months ago',
        comment: 'Very satisfied with the cleaning service. Sarah was friendly and did a great job. Only minor issue was running slightly late, but she made up for it with quality work.'
      }
    ]
  }

  const isServiceSubscribed = isSubscribed(service.id)

  const handleSubscribeClick = () => {
    if (isServiceSubscribed) {
      // If already subscribed, show chatbot directly
      setShowChatbot(true)
    } else {
      // Show confirmation dialog
      setShowConfirmation(true)
    }
  }

  const handleConfirmSubscription = () => {
    // Subscribe to the service
    subscribeToService({
      id: service.id,
      title: service.title,
      provider: service.provider,
      category: service.category,
      price: { amount: service.price },
      gallery: service.images
    })
    
    setShowConfirmation(false)
    setShowSuccessPopup(true)
  }

  const handleSuccessClose = () => {
    setShowSuccessPopup(false)
    setShowChatbot(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            to="/services"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Services</span>
          </Link>
        </div>

        {/* Service Images */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          <div className="lg:col-span-2">
            <img
              src={service.images[0]}
              alt={service.title}
              className="w-full h-96 object-cover rounded-2xl"
            />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
            {service.images.slice(1).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${service.title} ${index + 2}`}
                className="w-full h-44 lg:h-44 object-cover rounded-2xl"
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Service Info */}
            <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {service.title}
                  </h1>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{service.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>Responds {service.provider.responseTime}</span>
                    </div>
                  </div>
                </div>
                <button className="w-10 h-10 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center hover:bg-white/30 transition-all">
                  <Bookmark className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              <div className="flex items-center space-x-1 mb-6">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="text-lg font-semibold text-gray-900">
                  {service.provider.rating}
                </span>
                <span className="text-gray-600">
                  ({service.provider.reviews} reviews)
                </span>
              </div>

              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Subscription Button */}
              <div className="mb-6">
                <button
                  onClick={handleSubscribeClick}
                  className={`w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-3 ${
                    isServiceSubscribed
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-xl hover:shadow-green-500/25'
                      : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-xl hover:shadow-blue-500/25'
                  }`}
                >
                  <CreditCard className="h-5 w-5" />
                  <span>
                    {isServiceSubscribed ? 'Access Service Chat' : 'Subscribe to Service'}
                  </span>
                </button>
                {isServiceSubscribed && (
                  <p className="text-sm text-green-600 mt-2 flex items-center space-x-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>You are subscribed to this service</span>
                  </p>
                )}
              </div>

              {/* Features */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">What's Included</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Packages */}
            <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Service Packages</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {service.packages.map((pkg, index) => (
                  <div
                    key={index}
                    className="bg-white/30 backdrop-blur-sm border border-white/40 rounded-xl p-6 hover:bg-white/40 transition-all"
                  >
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {pkg.name}
                    </h4>
                    <div className="text-2xl font-bold text-blue-600 mb-2">
                      {pkg.price}
                    </div>
                    <div className="text-sm text-gray-600 mb-3">
                      {pkg.duration}
                    </div>
                    <p className="text-gray-700 text-sm mb-4">
                      {pkg.description}
                    </p>
                    <ul className="space-y-1 mb-6">
                      {pkg.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="text-sm text-gray-600 flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-2 px-4 rounded-lg font-medium hover:shadow-lg transition-all duration-200">
                      Select Package
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Customer Reviews</h3>
              <div className="space-y-6">
                {service.reviews.map((review) => (
                  <div key={review.id} className="border-b border-white/20 pb-6 last:border-b-0 last:pb-0">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">
                            {review.author.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{review.author}</div>
                          <div className="text-sm text-gray-600">{review.date}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Provider Card */}
            <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-6">
              <div className="text-center mb-6">
                <div className="relative inline-block mb-4">
                  <img
                    src={service.provider.avatar}
                    alt={service.provider.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  {service.provider.verified && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {service.provider.name}
                </h3>
                <p className="text-gray-600 mb-3">Professional Cleaner</p>
                
                <div className="flex items-center justify-center space-x-1 mb-4">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="font-medium text-gray-900">
                    {service.provider.rating}
                  </span>
                  <span className="text-gray-600">
                    ({service.provider.reviews} reviews)
                  </span>
                </div>

                <div className="space-y-2 text-sm text-gray-600 mb-6">
                  <div className="flex items-center justify-center space-x-2">
                    <Shield className="h-4 w-4" />
                    <span>Verified & Insured</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Award className="h-4 w-4" />
                    <span>Member since {service.provider.memberSince}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>Responds {service.provider.responseTime}</span>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 px-4 rounded-xl font-semibold mb-3 hover:shadow-lg transition-all duration-200">
                  Contact Provider
                </button>
                
                <button className="w-full bg-white/20 backdrop-blur-sm border border-white/30 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-white/30 transition-all duration-200 flex items-center justify-center space-x-2">
                  <MessageCircle className="h-4 w-4" />
                  <span>Send Message</span>
                </button>
              </div>
            </div>

            {/* Pricing Summary */}
            <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Starting Price</h3>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {service.price}
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Prices may vary based on service complexity and location
              </p>
              <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-200">
                Get Quote
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowConfirmation(false)}
          />
          
          <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 w-full max-w-md shadow-2xl">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100/20 border border-blue-300/30 mb-6">
                <CreditCard className="h-8 w-8 text-blue-500" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Confirm Subscription
              </h2>
              
              <p className="text-gray-600 mb-6">
                Are you sure you want to subscribe to "{service.title}" by {service.provider.name}?
              </p>
              
              <div className="space-y-3">
                <button
                  onClick={handleConfirmSubscription}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-200"
                >
                  Yes, Subscribe Now
                </button>
                
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="w-full bg-white/20 backdrop-blur-sm border border-white/30 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-white/30 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Popup */}
      <SubscriptionSuccessPopup
        isOpen={showSuccessPopup}
        onClose={handleSuccessClose}
        serviceName={service.title}
        serviceId={service.id}
        providerName={service.provider.name}
        service={{
          id: service.id,
          title: service.title,
          category: service.category,
          provider: service.provider
        }}
      />

      {/* Service Chatbot */}
      <ServiceChatbot
        isOpen={showChatbot}
        onClose={() => setShowChatbot(false)}
        service={{
          id: service.id,
          title: service.title,
          category: service.category,
          provider: service.provider
        }}
      />
    </div>
  )
}

export default ServiceDetailsPage

import React from 'react'
import { Star, MapPin, Clock, ArrowRight, Bookmark } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useWishlist } from '../hooks/useWishlist'

interface Service {
  id: number
  title: string
  description: string
  category: string
  provider: {
    name: string
    image: string
    rating: number
    reviews: number
    location: string
    responseTime: string
  }
  price: {
    type: 'hourly' | 'fixed' | 'package'
    amount: string
    originalAmount?: string
  }
  skills: string[]
  featured: boolean
  gallery: string[]
}

interface ServiceCardProps {
  service: Service
  viewMode: 'grid' | 'list'
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, viewMode }) => {
  const {
    toggleBookmark,
    isBookmarked,
    isInitialized
  } = useWishlist()

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    console.log('ServiceCard - Bookmark clicked for service:', service.id)
    console.log('ServiceCard - Service object:', service)
    
    if (!isInitialized) {
      console.log('ServiceCard - Wishlist not initialized yet')
      return
    }
    
    toggleBookmark(service)
  }

  const bookmarked = isBookmarked(service.id)
  console.log(`ServiceCard - Service ${service.id} bookmark status:`, bookmarked)

  if (viewMode === 'list') {
    return (
      <div className="group cursor-pointer bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/20 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Gallery */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="grid grid-cols-2 gap-2 h-48">
              <img
                src={service.gallery[0]}
                alt={service.title}
                className="w-full h-full object-cover rounded-xl col-span-2"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1'
                }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {service.description}
                </p>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <button 
                  onClick={handleBookmarkClick}
                  disabled={!isInitialized}
                  className={`p-2 backdrop-blur-sm border rounded-xl transition-all duration-200 ${
                    bookmarked
                      ? 'bg-blue-500/20 border-blue-300/50 text-blue-600'
                      : 'bg-white/20 border-white/30 text-gray-600 hover:bg-white/30'
                  } ${!isInitialized ? 'opacity-50 cursor-not-allowed' : ''}`}
                  title={bookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
                >
                  <Bookmark className={`h-4 w-4 ${bookmarked ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-2 mb-4">
              {service.skills.slice(0, 4).map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100/50 backdrop-blur-sm text-blue-700 text-xs px-3 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
              {service.skills.length > 4 && (
                <span className="text-xs text-gray-500 px-3 py-1">
                  +{service.skills.length - 4} more
                </span>
              )}
            </div>

            {/* Provider & Stats */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={service.provider.image}
                  alt={service.provider.name}
                  className="w-10 h-10 rounded-full border-2 border-white/30"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
                  }}
                />
                <div>
                  <p className="font-medium text-gray-900">{service.provider.name}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      <span>{service.provider.rating}</span>
                      <span>({service.provider.reviews})</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span>{service.provider.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{service.provider.responseTime}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-lg font-bold text-gray-900">
                  {service.price.amount}
                  {service.price.originalAmount && (
                    <span className="text-sm text-gray-500 line-through ml-2">
                      {service.price.originalAmount}
                    </span>
                  )}
                </div>
                <div className="text-xs text-gray-600 capitalize">
                  {service.price.type} rate
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="group cursor-pointer bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden hover:bg-white/20 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1">
      {/* Gallery */}
      <div className="relative">
        <img
          src={service.gallery[0]}
          alt={service.title}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.currentTarget.src = 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1'
          }}
        />
        
        {service.featured && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
            Featured
          </div>
        )}
        
        <div className="absolute top-4 right-4 flex space-x-2">
          <button 
            onClick={handleBookmarkClick}
            disabled={!isInitialized}
            className={`p-2 backdrop-blur-sm border rounded-full transition-all duration-200 ${
              bookmarked
                ? 'bg-blue-500/20 border-blue-300/50 text-blue-600'
                : 'bg-white/20 border-white/30 text-white hover:bg-white/30'
            } ${!isInitialized ? 'opacity-50 cursor-not-allowed' : ''}`}
            title={bookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
          >
            <Bookmark className={`h-4 w-4 ${bookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>

        <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-3 py-1 flex items-center space-x-1">
          <Star className="h-3 w-3 text-yellow-500 fill-current" />
          <span className="text-xs font-semibold text-white">{service.provider.rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {service.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2">
            {service.description}
          </p>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1 mb-4">
          {service.skills.slice(0, 3).map((skill, index) => (
            <span
              key={index}
              className="bg-blue-100/50 backdrop-blur-sm text-blue-700 text-xs px-2 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
          {service.skills.length > 3 && (
            <span className="text-xs text-gray-500">
              +{service.skills.length - 3}
            </span>
          )}
        </div>

        {/* Provider */}
        <div className="flex items-center space-x-3 mb-4">
          <img
            src={service.provider.image}
            alt={service.provider.name}
            className="w-8 h-8 rounded-full border-2 border-white/30"
            onError={(e) => {
              e.currentTarget.src = 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
            }}
          />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">{service.provider.name}</p>
            <div className="flex items-center space-x-2 text-xs text-gray-600">
              <div className="flex items-center space-x-1">
                <MapPin className="h-3 w-3" />
                <span>{service.provider.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{service.provider.responseTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-bold text-gray-900">
              {service.price.amount}
              {service.price.originalAmount && (
                <span className="text-sm text-gray-500 line-through ml-2">
                  {service.price.originalAmount}
                </span>
              )}
            </div>
            <div className="text-xs text-gray-600 capitalize">
              {service.price.type} rate
            </div>
          </div>
          
          <Link 
            to={`/services/${service.id}`}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200 flex items-center space-x-2 group"
          >
            <span>View Details</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ServiceCard

import React from 'react'
import { Link } from 'react-router-dom'
import { Star, MapPin, ArrowRight, Search } from 'lucide-react'

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

interface SearchDropdownProps {
  results: Service[]
  isVisible: boolean
  searchQuery: string
  onClose: () => void
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({ 
  results, 
  isVisible, 
  searchQuery, 
  onClose 
}) => {
  if (!isVisible || !searchQuery.trim()) {
    return null
  }

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text
    
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
    const parts = text.split(regex)
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <span key={index} className="bg-yellow-200 text-yellow-800 px-1 rounded">
          {part}
        </span>
      ) : (
        part
      )
    )
  }

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-md border border-white/30 rounded-2xl shadow-xl z-50 max-h-96 overflow-y-auto">
      {results.length === 0 ? (
        <div className="p-6 text-center">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Search className="h-6 w-6 text-gray-400" />
          </div>
          <p className="text-gray-600 font-medium">No services found</p>
          <p className="text-sm text-gray-500 mt-1">
            Try searching for different keywords
          </p>
        </div>
      ) : (
        <>
          <div className="p-4 border-b border-gray-200/50">
            <p className="text-sm text-gray-600">
              Found {results.length} service{results.length !== 1 ? 's' : ''} for "{searchQuery}"
            </p>
          </div>
          
          <div className="max-h-80 overflow-y-auto">
            {results.slice(0, 6).map((service) => (
              <Link
                key={service.id}
                to={`/services/${service.id}`}
                onClick={onClose}
                className="block p-4 hover:bg-gray-50/50 transition-colors border-b border-gray-100/50 last:border-b-0"
              >
                <div className="flex items-start space-x-4">
                  <img
                    src={service.gallery[0]}
                    alt={service.title}
                    className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1'
                    }}
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                      {highlightText(service.title, searchQuery)}
                    </h4>
                    
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {highlightText(service.description, searchQuery)}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <img
                            src={service.provider.image}
                            alt={service.provider.name}
                            className="w-4 h-4 rounded-full"
                            onError={(e) => {
                              e.currentTarget.src = 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=1'
                            }}
                          />
                          <span>{highlightText(service.provider.name, searchQuery)}</span>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          <span>{service.provider.rating}</span>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>{service.provider.location}</span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="font-semibold text-gray-900 text-sm">
                          {service.price.amount}
                        </div>
                      </div>
                    </div>
                    
                    {/* Skills that match search */}
                    {service.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {service.skills
                          .filter(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
                          .slice(0, 3)
                          .map((skill, index) => (
                            <span
                              key={index}
                              className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
                            >
                              {highlightText(skill, searchQuery)}
                            </span>
                          ))}
                      </div>
                    )}
                  </div>
                  
                  <ArrowRight className="h-4 w-4 text-gray-400 flex-shrink-0 mt-1" />
                </div>
              </Link>
            ))}
            
            {results.length > 6 && (
              <Link
                to={`/services?search=${encodeURIComponent(searchQuery)}`}
                onClick={onClose}
                className="block p-4 text-center bg-gray-50/50 hover:bg-gray-100/50 transition-colors"
              >
                <span className="text-blue-600 font-medium">
                  View all {results.length} results
                </span>
              </Link>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default SearchDropdown

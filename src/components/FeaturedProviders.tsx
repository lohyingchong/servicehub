import React from 'react'
import { Star, MapPin, Clock } from 'lucide-react'

const providers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    service: 'House Cleaning',
    rating: 4.9,
    reviews: 127,
    location: 'Downtown',
    price: '$25/hour',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    responseTime: '< 1 hour',
    verified: true
  },
  {
    id: 2,
    name: 'Mike Chen',
    service: 'Web Development',
    rating: 5.0,
    reviews: 89,
    location: 'Tech District',
    price: '$75/hour',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    responseTime: '< 2 hours',
    verified: true
  },
  {
    id: 3,
    name: 'Emma Davis',
    service: 'Graphic Design',
    rating: 4.8,
    reviews: 156,
    location: 'Creative Quarter',
    price: '$50/hour',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
    responseTime: '< 30 min',
    verified: true
  },
  {
    id: 4,
    name: 'David Wilson',
    service: 'Plumbing',
    rating: 4.7,
    reviews: 203,
    location: 'Citywide',
    price: '$60/hour',
    image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400',
    responseTime: '< 1 hour',
    verified: true
  }
]

const FeaturedProviders: React.FC = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Service Providers
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Meet our top-rated professionals who consistently deliver exceptional service
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {providers.map((provider) => (
            <div
              key={provider.id}
              className="group bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-6 hover:bg-white/30 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 cursor-pointer"
            >
              <div className="relative mb-4">
                <img
                  src={provider.image}
                  alt={provider.name}
                  className="w-16 h-16 rounded-full object-cover mx-auto"
                />
                {provider.verified && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>

              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {provider.name}
                </h3>
                
                <p className="text-blue-600 font-medium mb-3">
                  {provider.service}
                </p>

                <div className="flex items-center justify-center space-x-1 mb-3">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-900">
                    {provider.rating}
                  </span>
                  <span className="text-sm text-gray-600">
                    ({provider.reviews} reviews)
                  </span>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center justify-center space-x-1">
                    <MapPin className="h-3 w-3" />
                    <span>{provider.location}</span>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>Responds {provider.responseTime}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">
                      {provider.price}
                    </span>
                    <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-200">
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-white/20 backdrop-blur-sm border border-white/30 text-gray-700 px-8 py-3 rounded-xl font-semibold hover:bg-white/30 transition-all duration-200">
            View All Providers
          </button>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProviders

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, Star, MapPin, Clock, Bookmark } from 'lucide-react'
import { useWishlist } from '../hooks/useWishlist'

const services = [
  {
    id: '1',
    name: 'Professional House Cleaning',
    provider: 'Sarah Johnson',
    category: 'Home Services',
    price: '0.66ETH/Month',
    rating: 4.9,
    reviews: 127,
    location: 'Downtown',
    responseTime: '< 1 hour',
    image: 'https://images.pexels.com/photos/4239146/pexels-photo-4239146.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Deep cleaning service for homes and apartments. Eco-friendly products used.',
    verified: true
  },
  {
    id: '2',
    name: 'Custom Web Development',
    provider: 'Mike Chen',
    category: 'Technical Services',
    price: '0.77ETH/Month',
    rating: 5.0,
    reviews: 89,
    location: 'Tech District',
    responseTime: '< 2 hours',
    image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Full-stack web development with modern technologies. React, Node.js, and more.',
    verified: true
  },
  {
    id: '3',
    name: 'Brand Identity Design',
    provider: 'Emma Davis',
    category: 'Creative Services',
    price: '0.44ETH/Month',
    rating: 4.8,
    reviews: 156,
    location: 'Creative Quarter',
    responseTime: '< 30 min',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Complete brand identity packages including logo, colors, and guidelines.',
    verified: true
  },
  {
    id: '4',
    name: 'Emergency Plumbing',
    provider: 'David Wilson',
    category: 'Home Services',
    price: '0.77ETH/Month',
    rating: 4.7,
    reviews: 203,
    location: 'Citywide',
    responseTime: '< 1 hour',
    image: 'https://images.pexels.com/photos/8486944/pexels-photo-8486944.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: '24/7 emergency plumbing services. Licensed and insured professionals.',
    verified: true
  },
  {
    id: '5',
    name: 'Personal Training',
    provider: 'Lisa Rodriguez',
    category: 'Health & Wellness',
    price: '0.33ETH/Month',
    rating: 4.9,
    reviews: 94,
    location: 'Fitness District',
    responseTime: '< 3 hours',
    image: 'https://images.pexels.com/photos/863926/pexels-photo-863926.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Personalized fitness training programs. Weight loss and strength building.',
    verified: true
  },
  {
    id: '6',
    name: 'Business Consulting',
    provider: 'Robert Kim',
    category: 'Business Services',
    price: '0.68ETH/Month',
    rating: 4.8,
    reviews: 67,
    location: 'Business District',
    responseTime: '< 4 hours',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Strategic business consulting for startups and established companies.',
    verified: true
  }
]

const categories = ['All', 'Home Services', 'Technical Services', 'Creative Services', 'Business Services', 'Health & Wellness']

const ServicesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('rating')
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const filteredServices = services
    .filter(service => {
      const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           service.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           service.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating
        case 'price':
          return parseFloat(a.price.replace(/[^\d.]/g, '')) - parseFloat(b.price.replace(/[^\d.]/g, ''))
        case 'reviews':
          return b.reviews - a.reviews
        default:
          return 0
      }
    })

  const handleBookmark = (service: typeof services[0]) => {
    if (isInWishlist(service.id, 'service')) {
      removeFromWishlist(service.id, 'service')
    } else {
      addToWishlist({
        id: service.id,
        type: 'service',
        name: service.name,
        description: service.description,
        price: service.price,
        rating: service.rating,
        image: service.image
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Browse All Services
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover professional services from verified providers in your area
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search services, providers, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 text-gray-900"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-600" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            >
              <option value="rating">Sort by Rating</option>
              <option value="price">Sort by Price</option>
              <option value="reviews">Sort by Reviews</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-6 hover:bg-white/30 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300"
            >
              <div className="relative mb-4">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-48 object-cover rounded-xl"
                />
                <button
                  onClick={() => handleBookmark(service)}
                  className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    isInWishlist(service.id, 'service')
                      ? 'bg-red-500 text-white'
                      : 'bg-white/80 text-gray-600 hover:bg-white'
                  }`}
                >
                  <Bookmark className={`h-4 w-4 ${isInWishlist(service.id, 'service') ? 'fill-current' : ''}`} />
                </button>
                {service.verified && (
                  <div className="absolute top-3 left-3 bg-blue-500 text-white px-2 py-1 rounded-lg text-xs font-medium">
                    Verified
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {service.name}
                  </h3>
                  <span className="text-lg font-bold text-gray-900">
                    {service.price}
                  </span>
                </div>

                <p className="text-blue-600 font-medium mb-2">
                  by {service.provider}
                </p>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {service.description}
                </p>

                <div className="flex items-center space-x-1 mb-3">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-900">
                    {service.rating}
                  </span>
                  <span className="text-sm text-gray-600">
                    ({service.reviews} reviews)
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3" />
                    <span>{service.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>Responds {service.responseTime}</span>
                  </div>
                </div>

                <Link
                  to={`/services/${service.id}`}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 px-4 rounded-xl font-medium hover:shadow-lg transition-all duration-200 block text-center"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No services found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('All')
              }}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ServicesPage

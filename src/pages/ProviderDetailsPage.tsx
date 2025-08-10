import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { 
  Star, 
  MapPin, 
  Clock, 
  Award, 
  Users, 
  Briefcase, 
  CheckCircle, 
  ArrowLeft,
  MessageCircle,
  Heart,
  Share2,
  Calendar,
  Globe,
  Shield,
  Trophy,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { providers } from '../data/providersData'
import { useWishlist } from '../hooks/useWishlist'

const ProviderDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [activeTab, setActiveTab] = useState<'overview' | 'portfolio' | 'reviews'>('overview')
  const [currentPortfolioIndex, setCurrentPortfolioIndex] = useState(0)
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const provider = providers.find(p => p.id === parseInt(id || '0'))

  if (!provider) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Provider Not Found</h1>
            <Link 
              to="/providers"
              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200"
            >
              Back to Providers
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'busy':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'unavailable':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case 'available':
        return 'Available Now'
      case 'busy':
        return 'Busy'
      case 'unavailable':
        return 'Unavailable'
      default:
        return 'Unknown'
    }
  }

  const handleBookmark = () => {
    if (isInWishlist(provider.id.toString(), 'provider')) {
      removeFromWishlist(provider.id.toString(), 'provider')
    } else {
      addToWishlist({
        id: provider.id.toString(),
        type: 'provider',
        name: provider.name,
        description: `${provider.title} - ${provider.bio}`,
        price: provider.hourlyRate,
        rating: provider.rating,
        image: provider.image
      })
    }
  }

  const nextPortfolioItem = () => {
    setCurrentPortfolioIndex((prev) => 
      prev === provider.portfolio.length - 1 ? 0 : prev + 1
    )
  }

  const prevPortfolioItem = () => {
    setCurrentPortfolioIndex((prev) => 
      prev === 0 ? provider.portfolio.length - 1 : prev - 1
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link 
          to="/providers"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Providers</span>
        </Link>

        {/* Provider Header */}
        <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-8 mb-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Profile Section */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="text-center">
                <div className="relative inline-block mb-4">
                  <img
                    src={provider.image}
                    alt={provider.name}
                    className="w-32 h-32 rounded-3xl object-cover border-4 border-white/50 shadow-lg"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1'
                    }}
                  />
                  {provider.verified && (
                    <div className="absolute -top-2 -right-2 bg-blue-500 rounded-full p-2">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                  )}
                  {provider.featured && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-3 py-1 rounded-full font-semibold flex items-center space-x-1">
                        <Trophy className="h-3 w-3" />
                        <span>Featured</span>
                      </span>
                    </div>
                  )}
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-2">{provider.name}</h1>
                <p className="text-xl text-blue-600 font-semibold mb-4">{provider.title}</p>

                <div className="flex items-center justify-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    <span className="font-bold text-lg">{provider.rating}</span>
                    <span className="text-gray-600">({provider.totalReviews} reviews)</span>
                  </div>
                </div>

                <div className="flex items-center justify-center mb-6">
                  <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getAvailabilityColor(provider.availability)}`}>
                    {getAvailabilityText(provider.availability)}
                  </span>
                </div>

                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-gray-900 mb-1">{provider.hourlyRate}</div>
                  <div className="text-gray-600">Starting rate</div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200 flex items-center justify-center space-x-2">
                    <MessageCircle className="h-5 w-5" />
                    <span>Contact Provider</span>
                  </button>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={handleBookmark}
                      className={`flex-1 px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                        isInWishlist(provider.id.toString(), 'provider')
                          ? 'bg-red-100 text-red-700 border border-red-200'
                          : 'bg-white/50 text-gray-700 border border-white/30 hover:bg-white/70'
                      }`}
                    >
                      <Heart className={`h-4 w-4 ${isInWishlist(provider.id.toString(), 'provider') ? 'fill-current' : ''}`} />
                      <span>{isInWishlist(provider.id.toString(), 'provider') ? 'Saved' : 'Save'}</span>
                    </button>
                    
                    <button className="flex-1 bg-white/50 text-gray-700 border border-white/30 px-4 py-2 rounded-xl font-medium hover:bg-white/70 transition-all duration-200 flex items-center justify-center space-x-2">
                      <Share2 className="h-4 w-4" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Info Section */}
            <div className="flex-1">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className="bg-white/30 rounded-xl p-4">
                    <Briefcase className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{provider.completedProjects}</div>
                    <div className="text-sm text-gray-600">Projects</div>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="bg-white/30 rounded-xl p-4">
                    <Award className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{provider.yearsExperience}</div>
                    <div className="text-sm text-gray-600">Years Exp.</div>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="bg-white/30 rounded-xl p-4">
                    <Clock className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{provider.responseTime}</div>
                    <div className="text-sm text-gray-600">Response</div>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="bg-white/30 rounded-xl p-4">
                    <MapPin className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                    <div className="text-lg font-bold text-gray-900">{provider.location}</div>
                    <div className="text-sm text-gray-600">Location</div>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
                <p className="text-gray-600 leading-relaxed">{provider.bio}</p>
              </div>

              {/* Specialties */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {provider.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="bg-blue-100/50 backdrop-blur-sm text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {provider.languages.map((language, index) => (
                    <span
                      key={index}
                      className="bg-gray-100/50 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full text-sm flex items-center space-x-1"
                    >
                      <Globe className="h-3 w-3" />
                      <span>{language}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl overflow-hidden">
          <div className="border-b border-white/20">
            <nav className="flex">
              {[
                { id: 'overview', label: 'Overview', icon: Users },
                { id: 'portfolio', label: 'Portfolio', icon: Briefcase },
                { id: 'reviews', label: 'Reviews', icon: Star }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id as any)}
                  className={`flex-1 px-6 py-4 text-sm font-medium transition-colors flex items-center justify-center space-x-2 ${
                    activeTab === id
                      ? 'text-blue-600 border-b-2 border-blue-600 bg-white/10'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-white/5'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Skills & Expertise</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {provider.skills.map((skill, index) => (
                      <div
                        key={index}
                        className="bg-white/30 backdrop-blur-sm border border-white/30 rounded-lg p-3 text-center"
                      >
                        <span className="text-sm font-medium text-gray-900">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'portfolio' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Portfolio</h3>
                {provider.portfolio.length > 0 ? (
                  <div className="relative">
                    <div className="bg-white/30 backdrop-blur-sm border border-white/30 rounded-2xl overflow-hidden">
                      <div className="relative h-64 md:h-80">
                        <img
                          src={provider.portfolio[currentPortfolioIndex].image}
                          alt={provider.portfolio[currentPortfolioIndex].title}
                          className="w-full h-full object-cover"
                        />
                        
                        {provider.portfolio.length > 1 && (
                          <>
                            <button
                              onClick={prevPortfolioItem}
                              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                            >
                              <ChevronLeft className="h-5 w-5" />
                            </button>
                            <button
                              onClick={nextPortfolioItem}
                              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                            >
                              <ChevronRight className="h-5 w-5" />
                            </button>
                          </>
                        )}
                      </div>
                      
                      <div className="p-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">
                          {provider.portfolio[currentPortfolioIndex].title}
                        </h4>
                        <p className="text-gray-600">
                          {provider.portfolio[currentPortfolioIndex].description}
                        </p>
                      </div>
                    </div>
                    
                    {provider.portfolio.length > 1 && (
                      <div className="flex justify-center mt-4 space-x-2">
                        {provider.portfolio.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentPortfolioIndex(index)}
                            className={`w-3 h-3 rounded-full transition-colors ${
                              index === currentPortfolioIndex
                                ? 'bg-blue-600'
                                : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No portfolio items available</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Client Reviews</h3>
                {provider.testimonials.length > 0 ? (
                  <div className="space-y-6">
                    {provider.testimonials.map((testimonial, index) => (
                      <div
                        key={index}
                        className="bg-white/30 backdrop-blur-sm border border-white/30 rounded-2xl p-6"
                      >
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {testimonial.client.charAt(0)}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-gray-900">{testimonial.client}</h4>
                              <div className="flex items-center space-x-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < testimonial.rating
                                        ? 'text-yellow-500 fill-current'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            
                            <p className="text-gray-600 mb-2">{testimonial.comment}</p>
                            <p className="text-sm text-blue-600 font-medium">Project: {testimonial.project}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No reviews available</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProviderDetailsPage

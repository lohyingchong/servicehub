import React from 'react'
import { Star, MapPin, Clock, Award, Users, Briefcase, CheckCircle, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Provider } from '../data/providersData'

interface ProviderCardProps {
  provider: Provider
  viewMode: 'grid' | 'list'
}

const ProviderCard: React.FC<ProviderCardProps> = ({ provider, viewMode }) => {
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
        return 'Available'
      case 'busy':
        return 'Busy'
      case 'unavailable':
        return 'Unavailable'
      default:
        return 'Unknown'
    }
  }

  if (viewMode === 'list') {
    return (
      <div className="group cursor-pointer bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/20 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Profile Section */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="flex items-start space-x-4">
              <div className="relative">
                <img
                  src={provider.image}
                  alt={provider.name}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-white/30"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
                  }}
                />
                {provider.verified && (
                  <div className="absolute -top-1 -right-1 bg-blue-500 rounded-full p-1">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {provider.name}
                    </h3>
                    <p className="text-blue-600 font-medium">{provider.title}</p>
                  </div>
                  
                  <div className="flex flex-col items-end space-y-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getAvailabilityColor(provider.availability)}`}>
                      {getAvailabilityText(provider.availability)}
                    </span>
                    {provider.featured && (
                      <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                        Featured
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="font-medium">{provider.rating}</span>
                    <span>({provider.totalReviews} reviews)</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{provider.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{provider.responseTime}</span>
                  </div>
                </div>
                
                <div className="text-lg font-bold text-gray-900 mb-2">
                  {provider.hourlyRate}
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1">
            <p className="text-gray-600 mb-4 line-clamp-2">
              {provider.bio}
            </p>

            {/* Specialties */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Specialties</h4>
              <div className="flex flex-wrap gap-2">
                {provider.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="bg-blue-100/50 backdrop-blur-sm text-blue-700 text-xs px-3 py-1 rounded-full"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Top Skills</h4>
              <div className="flex flex-wrap gap-2">
                {provider.skills.slice(0, 5).map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-100/50 backdrop-blur-sm text-gray-700 text-xs px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
                {provider.skills.length > 5 && (
                  <span className="text-xs text-gray-500 px-3 py-1">
                    +{provider.skills.length - 5} more
                  </span>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Briefcase className="h-4 w-4" />
                  <span>{provider.completedProjects} projects</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Award className="h-4 w-4" />
                  <span>{provider.yearsExperience} years exp.</span>
                </div>
              </div>
              
              <Link 
                to={`/providers/${provider.id}`}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200 flex items-center space-x-2 group"
              >
                <span>View Profile</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="group cursor-pointer bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden hover:bg-white/20 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start space-x-4">
          <div className="relative">
            <img
              src={provider.image}
              alt={provider.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-white/30"
              onError={(e) => {
                e.currentTarget.src = 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
              }}
            />
            {provider.verified && (
              <div className="absolute -top-1 -right-1 bg-blue-500 rounded-full p-1">
                <CheckCircle className="h-3 w-3 text-white" />
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {provider.name}
                </h3>
                <p className="text-blue-600 font-medium text-sm">{provider.title}</p>
              </div>
              
              <div className="flex flex-col items-end space-y-1">
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getAvailabilityColor(provider.availability)}`}>
                  {getAvailabilityText(provider.availability)}
                </span>
                {provider.featured && (
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                    Featured
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-3 text-sm text-gray-600 mb-2">
              <div className="flex items-center space-x-1">
                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                <span className="font-medium">{provider.rating}</span>
                <span>({provider.totalReviews})</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="h-3 w-3" />
                <span>{provider.location}</span>
              </div>
            </div>
            
            <div className="text-lg font-bold text-gray-900">
              {provider.hourlyRate}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-4">
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {provider.bio}
        </p>

        {/* Specialties */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {provider.specialties.slice(0, 2).map((specialty, index) => (
              <span
                key={index}
                className="bg-blue-100/50 backdrop-blur-sm text-blue-700 text-xs px-2 py-1 rounded-full"
              >
                {specialty}
              </span>
            ))}
            {provider.specialties.length > 2 && (
              <span className="text-xs text-gray-500 px-2 py-1">
                +{provider.specialties.length - 2}
              </span>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center space-x-1">
            <Briefcase className="h-3 w-3" />
            <span>{provider.completedProjects}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Award className="h-3 w-3" />
            <span>{provider.yearsExperience}y exp.</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-3 w-3" />
            <span>{provider.responseTime}</span>
          </div>
        </div>

        {/* CTA */}
        <Link 
          to={`/providers/${provider.id}`}
          className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200 flex items-center justify-center space-x-2 group"
        >
          <span>View Profile</span>
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  )
}

export default ProviderCard

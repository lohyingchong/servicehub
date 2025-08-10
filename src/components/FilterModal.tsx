import React, { useState } from 'react'
import { X, Filter, Star, DollarSign, Clock, MapPin, Check } from 'lucide-react'

interface FilterModalProps {
  isOpen: boolean
  onClose: () => void
  onApplyFilters: (filters: FilterOptions) => void
  currentFilters: FilterOptions
}

export interface FilterOptions {
  priceRange: {
    min: number
    max: number
  }
  rating: number
  responseTime: string[]
  location: string[]
  priceType: string[]
  skills: string[]
}

const FilterModal: React.FC<FilterModalProps> = ({ 
  isOpen, 
  onClose, 
  onApplyFilters, 
  currentFilters 
}) => {
  const [filters, setFilters] = useState<FilterOptions>(currentFilters)

  const priceRanges = [
    { label: 'Under 0.1 ETH', min: 0, max: 0.1 },
    { label: '0.1 - 0.5 ETH', min: 0.1, max: 0.5 },
    { label: '0.5 - 1 ETH', min: 0.5, max: 1 },
    { label: '1 - 2 ETH', min: 1, max: 2 },
    { label: '2+ ETH', min: 2, max: 10 }
  ]

  const responseTimeOptions = [
    'Within 1 hour',
    'Within 6 hours',
    'Within 24 hours',
    'Within 3 days'
  ]

  const locationOptions = [
    'New York, NY',
    'Los Angeles, CA',
    'Chicago, IL',
    'Houston, TX',
    'Phoenix, AZ',
    'Philadelphia, PA',
    'San Antonio, TX',
    'San Diego, CA',
    'Dallas, TX',
    'San Jose, CA'
  ]

  const priceTypeOptions = [
    { value: 'hourly', label: 'Hourly Rate' },
    { value: 'fixed', label: 'Fixed Price' },
    { value: 'package', label: 'Package Deal' }
  ]

  const skillOptions = [
    'React', 'JavaScript', 'TypeScript', 'Node.js', 'Python',
    'UI/UX Design', 'Graphic Design', 'Logo Design', 'Branding',
    'SEO', 'Content Marketing', 'Social Media', 'PPC',
    'Photography', 'Video Editing', 'Animation',
    'Content Writing', 'Copywriting', 'Technical Writing'
  ]

  const handlePriceRangeChange = (min: number, max: number) => {
    setFilters(prev => ({
      ...prev,
      priceRange: { min, max }
    }))
  }

  const handleRatingChange = (rating: number) => {
    setFilters(prev => ({
      ...prev,
      rating: prev.rating === rating ? 0 : rating
    }))
  }

  const handleArrayFilterChange = (
    filterKey: keyof FilterOptions,
    value: string,
    checked: boolean
  ) => {
    setFilters(prev => ({
      ...prev,
      [filterKey]: checked
        ? [...(prev[filterKey] as string[]), value]
        : (prev[filterKey] as string[]).filter(item => item !== value)
    }))
  }

  const handleApplyFilters = () => {
    onApplyFilters(filters)
    onClose()
  }

  const handleClearFilters = () => {
    const clearedFilters: FilterOptions = {
      priceRange: { min: 0, max: 10 },
      rating: 0,
      responseTime: [],
      location: [],
      priceType: [],
      skills: []
    }
    setFilters(clearedFilters)
  }

  const getActiveFilterCount = () => {
    let count = 0
    if (filters.rating > 0) count++
    if (filters.priceRange.min > 0 || filters.priceRange.max < 10) count++
    if (filters.responseTime.length > 0) count++
    if (filters.location.length > 0) count++
    if (filters.priceType.length > 0) count++
    if (filters.skills.length > 0) count++
    return count
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white/95 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Filter className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Filter Services</h2>
                <p className="text-sm text-gray-600">
                  {getActiveFilterCount()} filter{getActiveFilterCount() !== 1 ? 's' : ''} applied
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100/50 rounded-xl transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Price Range */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-gray-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Price Range (ETH)</h3>
                </div>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <label key={range.label} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="priceRange"
                        checked={filters.priceRange.min === range.min && filters.priceRange.max === range.max}
                        onChange={() => handlePriceRangeChange(range.min, range.max)}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-gray-700">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-gray-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Minimum Rating</h3>
                </div>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <label key={rating} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="rating"
                        checked={filters.rating === rating}
                        onChange={() => handleRatingChange(rating)}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="text-gray-700 ml-2">{rating}+ stars</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Response Time */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-gray-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Response Time</h3>
                </div>
                <div className="space-y-2">
                  {responseTimeOptions.map((time) => (
                    <label key={time} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.responseTime.includes(time)}
                        onChange={(e) => handleArrayFilterChange('responseTime', time, e.target.checked)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-gray-700">{time}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-gray-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Location</h3>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {locationOptions.map((location) => (
                    <label key={location} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.location.includes(location)}
                        onChange={(e) => handleArrayFilterChange('location', location, e.target.checked)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-gray-700">{location}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Type */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-gray-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Pricing Type</h3>
                </div>
                <div className="space-y-2">
                  {priceTypeOptions.map((type) => (
                    <label key={type.value} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.priceType.includes(type.value)}
                        onChange={(e) => handleArrayFilterChange('priceType', type.value, e.target.checked)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-gray-700">{type.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Check className="h-5 w-5 text-gray-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Skills</h3>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {skillOptions.map((skill) => (
                    <label key={skill} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.skills.includes(skill)}
                        onChange={(e) => handleArrayFilterChange('skills', skill, e.target.checked)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-gray-700">{skill}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-gray-200/50 bg-gray-50/50">
            <button
              onClick={handleClearFilters}
              className="text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              Clear All Filters
            </button>
            <div className="flex items-center space-x-3">
              <button
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleApplyFilters}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200"
              >
                Apply Filters ({getActiveFilterCount()})
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterModal

import React, { useState } from 'react'
import { Search, Filter, Grid, List, Users, TrendingUp } from 'lucide-react'
import { providers } from '../data/providersData'
import ProviderCard from '../components/ProviderCard'

const categories = [
  'All Categories',
  'Web Development',
  'Mobile Development', 
  'Design & Creative',
  'Digital Marketing',
  'Photography',
  'Writing & Content',
  'Audio & Music',
  'Business Services'
]

const sortOptions = [
  { value: 'rating', label: 'Highest Rated' },
  { value: 'reviews', label: 'Most Reviews' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'experience', label: 'Most Experienced' },
  { value: 'projects', label: 'Most Projects' }
]

const ServiceProvidersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [sortBy, setSortBy] = useState('rating')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)

  const getProviderCategory = (specialties: string[]) => {
    const specialty = specialties[0]?.toLowerCase() || ''
    
    if (specialty.includes('web') || specialty.includes('development')) return 'Web Development'
    if (specialty.includes('mobile') || specialty.includes('app')) return 'Mobile Development'
    if (specialty.includes('design') || specialty.includes('brand') || specialty.includes('ui')) return 'Design & Creative'
    if (specialty.includes('marketing') || specialty.includes('seo')) return 'Digital Marketing'
    if (specialty.includes('photo')) return 'Photography'
    if (specialty.includes('content') || specialty.includes('writing')) return 'Writing & Content'
    if (specialty.includes('audio') || specialty.includes('music')) return 'Audio & Music'
    return 'Business Services'
  }

  const filteredProviders = providers
    .filter(provider => {
      const matchesSearch = 
        provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
        provider.specialties.some(specialty => specialty.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const providerCategory = getProviderCategory(provider.specialties)
      const matchesCategory = selectedCategory === 'All Categories' || providerCategory === selectedCategory
      
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating
        case 'reviews':
          return b.totalReviews - a.totalReviews
        case 'price-low':
          return parseFloat(a.hourlyRate.replace(/[^\d.]/g, '')) - parseFloat(b.hourlyRate.replace(/[^\d.]/g, ''))
        case 'price-high':
          return parseFloat(b.hourlyRate.replace(/[^\d.]/g, '')) - parseFloat(a.hourlyRate.replace(/[^\d.]/g, ''))
        case 'experience':
          return b.yearsExperience - a.yearsExperience
        case 'projects':
          return b.completedProjects - a.completedProjects
        default:
          return 0
      }
    })

  const featuredProviders = filteredProviders.filter(p => p.featured)
  const regularProviders = filteredProviders.filter(p => !p.featured)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Service Providers
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with verified professionals who deliver exceptional service. Browse our curated network of talented providers.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-6 text-center">
            <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{providers.length}+</div>
            <div className="text-gray-600">Verified Providers</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-6 text-center">
            <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">4.8</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-6 text-center">
            <Filter className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{categories.length - 1}</div>
            <div className="text-gray-600">Service Categories</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, skills, or expertise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 text-gray-900"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 min-w-[200px]"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 min-w-[180px]"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>

            {/* View Toggle */}
            <div className="flex bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing {filteredProviders.length} provider{filteredProviders.length !== 1 ? 's' : ''}
            {selectedCategory !== 'All Categories' && ` in ${selectedCategory}`}
          </p>
        </div>

        {/* Featured Providers */}
        {featuredProviders.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
              <span>Featured Providers</span>
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                Premium
              </div>
            </h2>
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {featuredProviders.map((provider) => (
                <ProviderCard
                  key={provider.id}
                  provider={provider}
                  viewMode={viewMode}
                />
              ))}
            </div>
          </div>
        )}

        {/* Regular Providers */}
        {regularProviders.length > 0 && (
          <div>
            {featuredProviders.length > 0 && (
              <h2 className="text-2xl font-bold text-gray-900 mb-6">All Providers</h2>
            )}
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {regularProviders.map((provider) => (
                <ProviderCard
                  key={provider.id}
                  provider={provider}
                  viewMode={viewMode}
                />
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredProviders.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No providers found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('All Categories')
                setSortBy('rating')
              }}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ServiceProvidersPage

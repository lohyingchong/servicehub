import React, { useState } from 'react'
import { Bookmark, Star, MapPin, Clock, Trash2, ExternalLink } from 'lucide-react'
import { useWishlist } from '../hooks/useWishlist'

const SavedItemsPage: React.FC = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist()
  const [filter, setFilter] = useState<'all' | 'service' | 'provider'>('all')

  const filteredItems = wishlist.filter(item => 
    filter === 'all' || item.type === filter
  )

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <Bookmark className="h-12 w-12 text-gray-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">No Saved Items</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Start exploring services and providers to build your personalized collection of favorites.
            </p>
            <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-200">
              Browse Services
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Saved Items
            </h1>
            <p className="text-xl text-gray-600">
              Your bookmarked services and providers ({wishlist.length} items)
            </p>
          </div>
          
          {wishlist.length > 0 && (
            <button
              onClick={clearWishlist}
              className="mt-4 sm:mt-0 bg-red-500/20 backdrop-blur-sm border border-red-500/30 text-red-600 px-4 py-2 rounded-xl font-medium hover:bg-red-500/30 transition-all duration-200 flex items-center space-x-2"
            >
              <Trash2 className="h-4 w-4" />
              <span>Clear All</span>
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-4 mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                filter === 'all'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/20 text-gray-700 hover:bg-white/30'
              }`}
            >
              All ({wishlist.length})
            </button>
            <button
              onClick={() => setFilter('service')}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                filter === 'service'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/20 text-gray-700 hover:bg-white/30'
              }`}
            >
              Services ({wishlist.filter(item => item.type === 'service').length})
            </button>
            <button
              onClick={() => setFilter('provider')}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                filter === 'provider'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/20 text-gray-700 hover:bg-white/30'
              }`}
            >
              Providers ({wishlist.filter(item => item.type === 'provider').length})
            </button>
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={`${item.type}-${item.id}`}
              className="group bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-6 hover:bg-white/30 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300"
            >
              {/* Item Image */}
              {item.image && (
                <div className="relative mb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-xl"
                  />
                  <div className="absolute top-3 left-3 bg-blue-500 text-white px-2 py-1 rounded-lg text-xs font-medium capitalize">
                    {item.type}
                  </div>
                  <button
                    onClick={() => removeFromWishlist(item.id, item.type)}
                    className="absolute top-3 right-3 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-all"
                  >
                    <Bookmark className="h-4 w-4 fill-current" />
                  </button>
                </div>
              )}

              {/* Item Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {item.name}
                </h3>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {item.description}
                </p>

                {/* Rating and Price */}
                <div className="flex items-center justify-between mb-4">
                  {item.rating && (
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-900">
                        {item.rating}
                      </span>
                    </div>
                  )}
                  
                  {item.price && (
                    <span className="text-lg font-bold text-gray-900">
                      {item.price}
                    </span>
                  )}
                </div>

                {/* Added Date */}
                <div className="text-xs text-gray-500 mb-4">
                  Saved on {formatDate(item.addedAt)}
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <button className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-2 px-4 rounded-xl font-medium hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2">
                    <ExternalLink className="h-4 w-4" />
                    <span>View Details</span>
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item.id, item.type)}
                    className="w-10 h-10 bg-red-500/20 backdrop-blur-sm border border-red-500/30 text-red-600 rounded-xl flex items-center justify-center hover:bg-red-500/30 transition-all"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results for Filter */}
        {filteredItems.length === 0 && wishlist.length > 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bookmark className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No {filter === 'all' ? '' : filter + 's'} found
            </h3>
            <p className="text-gray-600">
              You haven't saved any {filter === 'all' ? 'items' : filter + 's'} yet.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SavedItemsPage

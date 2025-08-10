import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Clock, CreditCard, MessageCircle, X, Star, MapPin, CheckCircle, AlertCircle } from 'lucide-react'
import { useSubscriptions } from '../hooks/useSubscriptions'
import ServiceChatbot from '../components/ServiceChatbot'

const SubscribedServicesPage: React.FC = () => {
  const { subscribedServices, cancelSubscription, getSubscriptionStats } = useSubscriptions()
  const [showChatbot, setShowChatbot] = useState(false)
  const [selectedService, setSelectedService] = useState<any>(null)
  const [showCancelConfirm, setShowCancelConfirm] = useState<number | null>(null)
  const [filter, setFilter] = useState<'all' | 'active' | 'cancelled'>('all')

  const stats = getSubscriptionStats()

  const filteredServices = subscribedServices.filter(service => {
    if (filter === 'all') return true
    return service.status === filter
  })

  const handleChatAccess = (service: any) => {
    setSelectedService({
      id: service.id,
      title: service.title,
      category: service.category,
      provider: { name: service.provider }
    })
    setShowChatbot(true)
  }

  const handleCancelSubscription = (serviceId: number) => {
    cancelSubscription(serviceId)
    setShowCancelConfirm(null)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100/20 border-green-300/30'
      case 'cancelled':
        return 'text-red-600 bg-red-100/20 border-red-300/30'
      default:
        return 'text-gray-600 bg-gray-100/20 border-gray-300/30'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4" />
      case 'cancelled':
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            My Subscribed Services
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Manage your active subscriptions and access your services
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Subscriptions</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalSubscriptions}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100/20 border border-blue-300/30 rounded-xl flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Services</p>
                <p className="text-2xl font-bold text-green-600">{stats.activeSubscriptions}</p>
              </div>
              <div className="w-12 h-12 bg-green-100/20 border border-green-300/30 rounded-xl flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Spent</p>
                <p className="text-2xl font-bold text-purple-600">{stats.totalSpent.toFixed(2)} ETH</p>
              </div>
              <div className="w-12 h-12 bg-purple-100/20 border border-purple-300/30 rounded-xl flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">This Month</p>
                <p className="text-2xl font-bold text-orange-600">{stats.todayActivities}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100/20 border border-orange-300/30 rounded-xl flex items-center justify-center">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-2 mb-8 inline-flex">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-xl font-medium transition-all ${
              filter === 'all'
                ? 'bg-white/40 text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            All ({stats.totalSubscriptions})
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-6 py-2 rounded-xl font-medium transition-all ${
              filter === 'active'
                ? 'bg-white/40 text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Active ({stats.activeSubscriptions})
          </button>
          <button
            onClick={() => setFilter('cancelled')}
            className={`px-6 py-2 rounded-xl font-medium transition-all ${
              filter === 'cancelled'
                ? 'bg-white/40 text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Cancelled ({stats.totalSubscriptions - stats.activeSubscriptions})
          </button>
        </div>

        {/* Services List */}
        {filteredServices.length > 0 ? (
          <div className="space-y-6">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-6 hover:bg-white/30 transition-all duration-200"
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  {/* Service Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full lg:w-32 h-32 object-cover rounded-xl"
                    />
                  </div>

                  {/* Service Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">
                          {service.title}
                        </h3>
                        <p className="text-blue-600 font-medium mb-2">
                          by {service.provider}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>Subscribed {formatDate(service.subscribedAt)}</span>
                          </span>
                          {service.nextBilling && (
                            <span className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>Next billing {formatDate(service.nextBilling)}</span>
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(service.status)}`}>
                          {getStatusIcon(service.status)}
                          <span className="capitalize">{service.status}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900">
                            {service.price}
                          </div>
                          <div className="text-sm text-gray-600 capitalize">
                            {service.planType}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3">
                      {service.status === 'active' && (
                        <>
                          <button
                            onClick={() => handleChatAccess(service)}
                            className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
                          >
                            <MessageCircle className="h-4 w-4" />
                            <span>Access Service</span>
                          </button>
                          
                          <Link
                            to={`/services/${service.id}`}
                            className="bg-white/20 backdrop-blur-sm border border-white/30 text-gray-700 px-6 py-2 rounded-xl font-medium hover:bg-white/30 transition-all duration-200"
                          >
                            View Details
                          </Link>
                          
                          <button
                            onClick={() => setShowCancelConfirm(service.id)}
                            className="bg-red-100/20 border border-red-300/30 text-red-600 px-6 py-2 rounded-xl font-medium hover:bg-red-100/30 transition-all duration-200"
                          >
                            Cancel Subscription
                          </button>
                        </>
                      )}
                      
                      {service.status === 'cancelled' && (
                        <Link
                          to={`/services/${service.id}`}
                          className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-200"
                        >
                          Subscribe Again
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {filter === 'all' ? 'No subscriptions yet' : `No ${filter} subscriptions`}
            </h3>
            <p className="text-gray-600 mb-6">
              {filter === 'all' 
                ? 'Start exploring services and subscribe to get access to professional providers.'
                : `You don't have any ${filter} subscriptions at the moment.`
              }
            </p>
            <Link
              to="/services"
              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200"
            >
              Browse Services
            </Link>
          </div>
        )}
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowCancelConfirm(null)}
          />
          
          <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 w-full max-w-md shadow-2xl">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100/20 border border-red-300/30 mb-6">
                <X className="h-8 w-8 text-red-500" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Cancel Subscription
              </h2>
              
              <p className="text-gray-600 mb-6">
                Are you sure you want to cancel this subscription? You'll lose access to the service.
              </p>
              
              <div className="space-y-3">
                <button
                  onClick={() => handleCancelSubscription(showCancelConfirm)}
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-xl hover:shadow-red-500/25 transition-all duration-200"
                >
                  Yes, Cancel Subscription
                </button>
                
                <button
                  onClick={() => setShowCancelConfirm(null)}
                  className="w-full bg-white/20 backdrop-blur-sm border border-white/30 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-white/30 transition-all duration-200"
                >
                  Keep Subscription
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Service Chatbot */}
      {selectedService && (
        <ServiceChatbot
          isOpen={showChatbot}
          onClose={() => {
            setShowChatbot(false)
            setSelectedService(null)
          }}
          service={selectedService}
        />
      )}
    </div>
  )
}

export default SubscribedServicesPage

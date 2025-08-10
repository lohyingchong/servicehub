import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { 
  Star, 
  MapPin, 
  Clock, 
  CheckCircle, 
  ArrowLeft, 
  Bookmark, 
  BookmarkCheck,
  Share2,
  Calendar,
  Shield,
  Users,
  Timer,
  Award,
  Zap
} from 'lucide-react'
import { servicesData } from '../data/servicesData'
import { useWishlist } from '../hooks/useWishlist'
import { useSubscriptions } from '../hooks/useSubscriptions'
import SchedulingModal from '../components/SchedulingModal'
import ServiceChatbot from '../components/ServiceChatbot'

const ServiceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [activeTab, setActiveTab] = useState('overview')
  const [showSubscriptionConfirm, setShowSubscriptionConfirm] = useState(false)
  const [showSchedulingModal, setShowSchedulingModal] = useState(false)
  const [showChatbot, setShowChatbot] = useState(false)
  
  const { isBookmarked, addToBookmarks, removeFromBookmarks } = useWishlist()
  const { isSubscribed, subscribeToService } = useSubscriptions()

  const service = servicesData.find(s => s.id === parseInt(id || '0'))

  if (!service) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Not Found</h2>
          <p className="text-gray-600 mb-6">The service you're looking for doesn't exist.</p>
          <Link
            to="/services"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Services</span>
          </Link>
        </div>
      </div>
    )
  }

  const bookmarked = isBookmarked(service.id)
  const subscribed = isSubscribed(service.id)

  const handleBookmarkToggle = () => {
    if (bookmarked) {
      removeFromBookmarks(service.id)
    } else {
      addToBookmarks(service)
    }
  }

  const handleSubscribeClick = () => {
    if (!subscribed) {
      setShowSubscriptionConfirm(true)
    }
  }

  const handleSubscriptionConfirm = () => {
    subscribeToService(service)
    setShowSubscriptionConfirm(false)
    // Automatically show chatbot after successful subscription
    setTimeout(() => {
      setShowChatbot(true)
    }, 500) // Small delay for smooth transition
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: service.title,
          text: service.description,
          url: window.location.href,
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      // You could show a toast notification here
    }
  }

  const handleScheduleSuccess = (details: any) => {
    console.log('Appointment scheduled:', details)
  }

  const formatPrice = (price: any) => {
    if (typeof price === 'string') return price
    if (price?.amount) return price.amount
    return 'Contact for pricing'
  }

  const getOriginalPrice = (price: any) => {
    if (price?.originalAmount && price.originalAmount !== price.amount) {
      return price.originalAmount
    }
    return null
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Subscription Confirmation Modal */}
      {showSubscriptionConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white/95 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl w-full max-w-md mx-4">
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Confirm Subscription</h3>
                <p className="text-gray-600">
                  Are you sure you want to subscribe to "{service.title}" by {service.provider.name}?
                </p>
              </div>

              <div className="bg-gray-50/50 backdrop-blur-sm border border-gray-200/50 rounded-xl p-4 mb-6">
                <div className="flex items-center space-x-3">
                  <img
                    src={service.provider.image}
                    alt={service.provider.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{service.provider.name}</h4>
                    <p className="text-sm text-gray-600">{service.title}</p>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span>{service.provider.rating} ({service.provider.reviews} reviews)</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">{formatPrice(service.price)}</div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowSubscriptionConfirm(false)}
                  className="flex-1 px-4 py-3 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubscriptionConfirm}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-green-500/25 transition-all duration-200"
                >
                  Yes, Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Service Chatbot */}
      <ServiceChatbot
        isOpen={showChatbot}
        onClose={() => setShowChatbot(false)}
        service={service}
      />

      {/* Scheduling Modal */}
      <SchedulingModal
        isOpen={showSchedulingModal}
        onClose={() => setShowSchedulingModal(false)}
        service={service}
        onScheduleSuccess={handleScheduleSuccess}
      />

      {/* Breadcrumb */}
      <div className="bg-white/10 backdrop-blur-md border-b border-white/20 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link to="/services" className="text-gray-600 hover:text-blue-600 transition-colors">
              Services
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-blue-600 capitalize">{service.category}</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{service.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Service Header */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden">
              {/* Category Badge */}
              <div className="px-6 pt-6">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100/50 text-blue-700 border border-blue-200/50 backdrop-blur-sm capitalize">
                    {service.category}
                  </span>
                  {subscribed && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100/50 text-green-700 border border-green-200/50 backdrop-blur-sm">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Subscribed
                    </span>
                  )}
                </div>

                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="font-medium">{service.provider.rating}</span>
                    <span>({service.provider.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{service.provider.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>Responds in {service.provider.responseTime}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-3 mb-6">
                  <button
                    onClick={handleBookmarkToggle}
                    className={`p-3 rounded-xl border transition-all duration-200 ${
                      bookmarked
                        ? 'bg-blue-500 border-blue-500 text-white'
                        : 'bg-white/20 border-white/30 text-gray-700 hover:bg-white/30'
                    }`}
                    title={bookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
                  >
                    {bookmarked ? (
                      <BookmarkCheck className="h-5 w-5" />
                    ) : (
                      <Bookmark className="h-5 w-5" />
                    )}
                  </button>

                  <button
                    onClick={handleShare}
                    className="p-3 bg-white/20 border border-white/30 text-gray-700 rounded-xl hover:bg-white/30 transition-all duration-200"
                    title="Share service"
                  >
                    <Share2 className="h-5 w-5" />
                  </button>

                  <button
                    onClick={() => setShowSchedulingModal(true)}
                    className="p-3 bg-white/20 border border-white/30 text-gray-700 rounded-xl hover:bg-white/30 transition-all duration-200"
                    title="Schedule consultation"
                  >
                    <Calendar className="h-5 w-5" />
                  </button>

                  {subscribed && (
                    <button
                      onClick={() => setShowChatbot(true)}
                      className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200"
                      title="Open service assistant"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              {/* Service Image */}
              <div className="px-6 pb-6">
                <img
                  src={service.gallery[0]}
                  alt={service.title}
                  className="w-full h-64 sm:h-80 object-cover rounded-xl"
                />
              </div>

              {/* Skills Tags */}
              {service.skills && service.skills.length > 0 && (
                <div className="px-6 pb-6">
                  <div className="flex flex-wrap gap-2">
                    {service.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100/50 text-gray-700 border border-gray-200/50 backdrop-blur-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Tabs */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden">
              <div className="flex border-b border-white/20">
                {[
                  { id: 'overview', label: 'Overview' },
                  { id: 'portfolio', label: 'Portfolio' },
                  { id: 'reviews', label: 'Reviews' },
                  { id: 'faq', label: 'FAQ' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 px-6 py-4 text-sm font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-700 hover:bg-white/20'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Service Description</h3>
                      <p className="text-gray-700 leading-relaxed mb-6">
                        {service.description}
                      </p>
                      <p className="text-gray-700 leading-relaxed">
                        This comprehensive service includes detailed planning, execution, and delivery of high-quality 
                        results. I work closely with clients to understand their specific needs and provide customized 
                        solutions that exceed expectations. With years of experience in the industry, I bring expertise and 
                        professionalism to every project.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">What's Included</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          'Initial consultation and planning',
                          'Professional execution',
                          'Final delivery and handover',
                          'Regular progress updates',
                          'Quality assurance testing',
                          '30-day support period'
                        ].map((item, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'portfolio' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-900">Portfolio Gallery</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {service.gallery.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Portfolio ${index + 1}`}
                          className="w-full h-48 object-cover rounded-xl"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-900">Customer Reviews</h3>
                    <div className="space-y-4">
                      {[1, 2, 3].map((review) => (
                        <div key={review} className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-4">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-medium">
                              U{review}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">User {review}</div>
                              <div className="flex items-center space-x-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                                ))}
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-700">
                            Excellent service! Very professional and delivered exactly what was promised. 
                            Highly recommend for anyone looking for quality work.
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'faq' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-900">Frequently Asked Questions</h3>
                    <div className="space-y-4">
                      {[
                        {
                          question: "How long does the project take?",
                          answer: "Project timeline varies based on scope and complexity. Typical projects take 2-4 weeks from start to finish."
                        },
                        {
                          question: "Do you offer revisions?",
                          answer: "Yes, I include up to 3 rounds of revisions in the base package to ensure you're completely satisfied."
                        },
                        {
                          question: "What's your payment structure?",
                          answer: "I typically work with a 50% upfront payment and 50% upon completion. Payment plans can be discussed for larger projects."
                        }
                      ].map((faq, index) => (
                        <div key={index} className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-4">
                          <h4 className="font-medium text-gray-900 mb-2">{faq.question}</h4>
                          <p className="text-gray-700">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Provider Info */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <div className="flex items-center space-x-4 mb-6">
                <img
                  src={service.provider.image}
                  alt={service.provider.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{service.provider.name}</h3>
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span>{service.provider.rating} ({service.provider.reviews} reviews)</span>
                  </div>
                  <p className="text-sm text-gray-600">{service.provider.location}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Users className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">73</div>
                  <div className="text-sm text-gray-600">Projects</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Timer className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">3 hours</div>
                  <div className="text-sm text-gray-600">Response</div>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-sm text-green-600 mb-6">
                <Shield className="h-4 w-4" />
                <span>Verified Professional</span>
              </div>

              {/* Appointment Booking Button */}
              <button
                onClick={() => setShowSchedulingModal(true)}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 px-6 rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200 flex items-center justify-center space-x-2 mb-4"
              >
                <Calendar className="h-5 w-5" />
                <span>Book Appointment</span>
              </button>
            </div>

            {/* Pricing */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <div className="text-right mb-4">
                <div className="text-3xl font-bold text-gray-900">
                  {formatPrice(service.price)}
                  {getOriginalPrice(service.price) && (
                    <span className="text-lg text-gray-500 line-through ml-2">
                      {getOriginalPrice(service.price)}
                    </span>
                  )}
                </div>
                <div className="text-sm text-gray-600">Package Rate</div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Service fee</span>
                  <span className="text-gray-900">{formatPrice(service.price)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Platform fee</span>
                  <span className="text-gray-900">0 ETH</span>
                </div>
                <hr className="border-white/20" />
                <div className="flex justify-between font-semibold">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">{formatPrice(service.price)}</span>
                </div>
              </div>

              {subscribed ? (
                <div className="space-y-3">
                  <div className="bg-green-500 text-white px-4 py-3 rounded-xl text-center font-medium flex items-center justify-center space-x-2">
                    <CheckCircle className="h-5 w-5" />
                    <span>Subscribed</span>
                  </div>
                  
                  <div className="bg-green-50/50 backdrop-blur-sm border border-green-200/50 rounded-xl p-4">
                    <div className="flex items-center space-x-2 text-green-700 text-sm mb-2">
                      <CheckCircle className="h-4 w-4" />
                      <span className="font-medium">Successfully Subscribed!</span>
                    </div>
                    <p className="text-green-600 text-sm">
                      Use the chat assistant to get help with your service.
                    </p>
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleSubscribeClick}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-6 rounded-xl font-medium hover:shadow-lg hover:shadow-green-500/25 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <span>Subscribe Now</span>
                  <Zap className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Trust & Safety */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Trust & Safety</h3>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm text-gray-700">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span>Identity verified</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-700">
                  <Award className="h-4 w-4 text-blue-500" />
                  <span>Professional certification</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Background checked</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-700">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>Top rated provider</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServiceDetailPage

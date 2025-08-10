import React, { useState } from 'react'
import { CheckCircle2, X, Calendar, Star, ArrowRight, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import SchedulingModal from './SchedulingModal'

interface SubscriptionSuccessPopupProps {
  isOpen: boolean
  onClose: () => void
  serviceName?: string
  serviceId?: number
  providerName?: string
  service?: {
    id: number
    title: string
    category: string
    provider: {
      name: string
      email?: string
    }
  }
}

const SubscriptionSuccessPopup: React.FC<SubscriptionSuccessPopupProps> = ({ 
  isOpen, 
  onClose,
  serviceName,
  serviceId,
  providerName,
  service
}) => {
  const [isSchedulingOpen, setIsSchedulingOpen] = useState(false)

  if (!isOpen) return null

  const handleScheduleAppointment = () => {
    setIsSchedulingOpen(true)
  }

  const handleScheduleSuccess = (details: any) => {
    setIsSchedulingOpen(false)
    // Could show a success message or redirect
  }

  // Create service object for scheduling if not provided
  const schedulingService = service || {
    id: serviceId || 0,
    title: serviceName || 'Professional Service',
    category: 'consultation',
    provider: {
      name: providerName || 'Service Provider',
      email: `${providerName?.toLowerCase().replace(' ', '.')}@servicepro.com`
    }
  }

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
        
        <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 w-full max-w-md shadow-2xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 hover:bg-white/30 transition-all duration-200"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100/20 border border-green-300/30 mb-6">
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Subscription Successful!
            </h2>
            
            <p className="text-gray-600 mb-6">
              You've successfully subscribed to {serviceName || 'this service'}
              {providerName && ` by ${providerName}`}. You can now access all features and benefits.
            </p>
            
            <div className="space-y-3">
              <button
                onClick={handleScheduleAppointment}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-xl hover:shadow-green-500/25 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Clock className="h-4 w-4" />
                <span>Schedule Appointment</span>
              </button>

              <button
                onClick={onClose}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-200"
              >
                Continue Exploring
              </button>
              
              {serviceId && (
                <Link
                  to={`/services/${serviceId}`}
                  onClick={onClose}
                  className="w-full bg-white/20 backdrop-blur-sm border border-white/30 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-white/30 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Star className="h-4 w-4" />
                  <span>View Service Details</span>
                </Link>
              )}
              
              <Link
                to="/saved-items"
                onClick={onClose}
                className="w-full bg-white/20 backdrop-blur-sm border border-white/30 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-white/30 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Calendar className="h-4 w-4" />
                <span>Manage Subscriptions</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scheduling Modal */}
      <SchedulingModal
        isOpen={isSchedulingOpen}
        onClose={() => setIsSchedulingOpen(false)}
        service={schedulingService}
        onScheduleSuccess={handleScheduleSuccess}
      />
    </>
  )
}

export default SubscriptionSuccessPopup

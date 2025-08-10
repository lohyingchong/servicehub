import React, { useState, useEffect } from 'react'
import { X, Calendar, Clock, User, Video, Phone, MapPin, CheckCircle, AlertCircle } from 'lucide-react'
import { useGoogleCalendar } from '../hooks/useGoogleCalendar'

interface SchedulingModalProps {
  isOpen: boolean
  onClose: () => void
  service: {
    id: number
    title: string
    category: string
    provider: {
      name: string
      email?: string
    }
  }
  onScheduleSuccess: (details: SchedulingDetails) => void
}

interface SchedulingDetails {
  date: string
  time: string
  duration: string
  topic: string
  contactMethod: string
  meetingLink?: string
}

const SchedulingModal: React.FC<SchedulingModalProps> = ({ 
  isOpen, 
  onClose, 
  service, 
  onScheduleSuccess 
}) => {
  const [schedulingData, setSchedulingData] = useState<SchedulingDetails>({
    date: '',
    time: '',
    duration: '30',
    topic: '',
    contactMethod: 'video'
  })
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [step, setStep] = useState<'form' | 'confirmation'>('form')

  const { isLoading, error, createEvent, getAvailableSlots } = useGoogleCalendar()

  useEffect(() => {
    if (schedulingData.date) {
      loadAvailableSlots(schedulingData.date)
    }
  }, [schedulingData.date])

  const loadAvailableSlots = async (date: string) => {
    const slots = await getAvailableSlots(date)
    setAvailableSlots(slots)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const startDateTime = new Date(`${schedulingData.date}T${schedulingData.time}:00`)
      const endDateTime = new Date(startDateTime.getTime() + parseInt(schedulingData.duration) * 60000)

      const eventData = {
        summary: `Consultation: ${service.title}`,
        description: `Professional consultation with ${service.provider.name} regarding "${service.title}"\n\nTopic: ${schedulingData.topic}\n\nService Category: ${service.category}`,
        start: {
          dateTime: startDateTime.toISOString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        end: {
          dateTime: endDateTime.toISOString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        attendees: [
          { email: 'user@example.com' }, // Current user's email
          { email: service.provider.email || `${service.provider.name.toLowerCase().replace(' ', '.')}@servicepro.com` }
        ],
        conferenceData: schedulingData.contactMethod === 'video' ? {
          createRequest: {
            requestId: `consultation_${Date.now()}`,
            conferenceSolutionKey: { type: 'hangoutsMeet' }
          }
        } : undefined
      }

      const success = await createEvent(eventData)

      if (success) {
        setStep('confirmation')
        onScheduleSuccess({
          ...schedulingData,
          meetingLink: schedulingData.contactMethod === 'video' ? 'https://meet.google.com/abc-defg-hij' : undefined
        })
      }
    } catch (err) {
      console.error('Failed to schedule consultation:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setStep('form')
    setSchedulingData({
      date: '',
      time: '',
      duration: '30',
      topic: '',
      contactMethod: 'video'
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <Calendar className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {step === 'form' ? 'Schedule Consultation' : 'Consultation Scheduled'}
              </h2>
              <p className="text-sm text-gray-600">
                {service.title} • {service.provider.name}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100/50 rounded-xl transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {step === 'form' ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Date Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Date
                </label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={schedulingData.date}
                  onChange={(e) => setSchedulingData(prev => ({ ...prev, date: e.target.value, time: '' }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>

              {/* Time Selection */}
              {schedulingData.date && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Available Time Slots
                  </label>
                  {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="w-6 h-6 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
                      <span className="ml-2 text-gray-600">Loading available slots...</span>
                    </div>
                  ) : availableSlots.length > 0 ? (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {availableSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSchedulingData(prev => ({ ...prev, time: slot }))}
                          className={`p-3 text-sm font-medium rounded-xl border transition-all ${
                            schedulingData.time === slot
                              ? 'bg-blue-500 text-white border-blue-500'
                              : 'bg-white border-gray-300 text-gray-700 hover:border-blue-300 hover:bg-blue-50'
                          }`}
                        >
                          {new Date(`2000-01-01T${slot}:00`).toLocaleTimeString([], { 
                            hour: 'numeric', 
                            minute: '2-digit',
                            hour12: true 
                          })}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Clock className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                      <p>No available slots for this date</p>
                      <p className="text-sm">Please select a different date</p>
                    </div>
                  )}
                </div>
              )}

              {/* Duration and Contact Method */}
              {schedulingData.time && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Duration
                      </label>
                      <select
                        value={schedulingData.duration}
                        onChange={(e) => setSchedulingData(prev => ({ ...prev, duration: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      >
                        <option value="15">15 minutes</option>
                        <option value="30">30 minutes</option>
                        <option value="45">45 minutes</option>
                        <option value="60">1 hour</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contact Method
                      </label>
                      <select
                        value={schedulingData.contactMethod}
                        onChange={(e) => setSchedulingData(prev => ({ ...prev, contactMethod: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      >
                        <option value="video">Video Call</option>
                        <option value="phone">Phone Call</option>
                        <option value="in-person">In Person</option>
                      </select>
                    </div>
                  </div>

                  {/* Topic */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      What would you like to discuss?
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={schedulingData.topic}
                      onChange={(e) => setSchedulingData(prev => ({ ...prev, topic: e.target.value }))}
                      placeholder="Briefly describe what you'd like to discuss during the consultation..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
                    />
                  </div>

                  {/* Error Display */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start space-x-3">
                      <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium text-red-800">Scheduling Error</h4>
                        <p className="text-sm text-red-700 mt-1">{error}</p>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="flex items-center justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-green-500/25 transition-all duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Scheduling...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="h-4 w-4" />
                          <span>Schedule Consultation</span>
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}
            </form>
          ) : (
            /* Confirmation Step */
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Consultation Scheduled!
                </h3>
                <p className="text-gray-600">
                  Your consultation with {service.provider.name} has been successfully scheduled.
                </p>
              </div>

              {/* Meeting Details */}
              <div className="bg-gray-50/50 rounded-xl p-6 text-left space-y-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-900">
                      {new Date(`${schedulingData.date}T${schedulingData.time}`).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    <p className="text-sm text-gray-600">
                      {new Date(`${schedulingData.date}T${schedulingData.time}`).toLocaleTimeString([], {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true
                      })} • {schedulingData.duration} minutes
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-900">{service.provider.name}</p>
                    <p className="text-sm text-gray-600">{service.title}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  {schedulingData.contactMethod === 'video' ? (
                    <Video className="h-5 w-5 text-gray-600" />
                  ) : schedulingData.contactMethod === 'phone' ? (
                    <Phone className="h-5 w-5 text-gray-600" />
                  ) : (
                    <MapPin className="h-5 w-5 text-gray-600" />
                  )}
                  <div>
                    <p className="font-medium text-gray-900">
                      {schedulingData.contactMethod === 'video' ? 'Video Call' :
                       schedulingData.contactMethod === 'phone' ? 'Phone Call' : 'In Person'}
                    </p>
                    {schedulingData.meetingLink && (
                      <a 
                        href={schedulingData.meetingLink}
                        className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        {schedulingData.meetingLink}
                      </a>
                    )}
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-200">
                  <p className="text-sm font-medium text-gray-700 mb-1">Discussion Topic:</p>
                  <p className="text-sm text-gray-600">{schedulingData.topic}</p>
                </div>
              </div>

              {/* Next Steps */}
              <div className="bg-blue-50/50 rounded-xl p-4">
                <h4 className="font-medium text-blue-900 mb-2">What's Next?</h4>
                <ul className="text-sm text-blue-800 space-y-1 text-left">
                  <li>• Calendar invitation sent to your email</li>
                  <li>• {service.provider.name} will receive a notification</li>
                  <li>• You'll receive a reminder 24 hours before the meeting</li>
                  {schedulingData.contactMethod === 'video' && (
                    <li>• Meeting link will be included in the calendar event</li>
                  )}
                </ul>
              </div>

              <button
                onClick={handleClose}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SchedulingModal

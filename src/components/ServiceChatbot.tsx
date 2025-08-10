import React, { useState, useRef, useEffect } from 'react'
import { 
  X, 
  Send, 
  Bot, 
  User, 
  Minimize2, 
  Maximize2,
  MessageCircle,
  Sparkles,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Calendar,
  Clock,
  CheckCircle
} from 'lucide-react'

interface Message {
  id: string
  type: 'user' | 'bot' | 'system'
  content: string
  timestamp: Date
  isTyping?: boolean
  showScheduling?: boolean
  showFeedback?: boolean
}

interface ServiceChatbotProps {
  isOpen: boolean
  onClose: () => void
  service: {
    id: number
    title: string
    category: string
    provider: {
      name: string
    }
  }
}

interface SchedulingData {
  date: string
  time: string
  duration: string
  topic: string
  contactMethod: string
}

const ServiceChatbot: React.FC<ServiceChatbotProps> = ({ isOpen, onClose, service }) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [showSchedulingForm, setShowSchedulingForm] = useState(false)
  const [schedulingData, setSchedulingData] = useState<SchedulingData>({
    date: '',
    time: '',
    duration: '30',
    topic: '',
    contactMethod: 'video'
  })
  const [isScheduling, setIsScheduling] = useState(false)
  const [unhelpfulCount, setUnhelpfulCount] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initialize with welcome message
      const welcomeMessage: Message = {
        id: `msg_${Date.now()}`,
        type: 'bot',
        content: `Hi! I'm your dedicated assistant for "${service.title}" by ${service.provider.name}. I'm here to help you with any questions about this ${service.category} service. How can I assist you today?`,
        timestamp: new Date()
      }
      setMessages([welcomeMessage])
    }
  }, [isOpen, service])

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus()
    }
  }, [isOpen, isMinimized])

  const detectComplexQuery = (userMessage: string): boolean => {
    const complexPatterns = [
      /how do i|how can i|what should i|which is better|compare|versus|vs/i,
      /technical|implementation|architecture|best practice|recommendation/i,
      /custom|specific|detailed|complex|advanced/i,
      /integration|api|database|security|performance/i,
      /budget|timeline|scope|requirements|specifications/i
    ]
    
    return complexPatterns.some(pattern => pattern.test(userMessage))
  }

  const generateBotResponse = (userMessage: string): { content: string; showScheduling?: boolean; showFeedback?: boolean } => {
    const lowerMessage = userMessage.toLowerCase()
    const { title, category, provider } = service

    // Check if this is a complex query that might need professional help
    const isComplex = detectComplexQuery(userMessage)

    // Service-specific responses based on category
    const categoryResponses: Record<string, string[]> = {
      development: [
        `For ${title}, I can help you understand the development process, timeline, and technical requirements.`,
        `${provider.name} specializes in modern development practices. What specific aspect would you like to know about?`,
        `This development service includes planning, coding, testing, and deployment. What questions do you have?`
      ],
      design: [
        `${title} involves creative design work. I can explain the design process, revisions, and deliverables.`,
        `${provider.name} will work with you on visual concepts and brand alignment. What design aspects interest you?`,
        `This design service covers concept development, iterations, and final delivery. How can I help?`
      ],
      marketing: [
        `For ${title}, I can explain marketing strategies, target audience analysis, and campaign metrics.`,
        `${provider.name} will help boost your online presence. What marketing questions do you have?`,
        `This marketing service includes strategy development and performance tracking. What would you like to know?`
      ],
      photography: [
        `${title} includes professional photography services. I can explain the shoot process, editing, and delivery.`,
        `${provider.name} will capture high-quality images for your needs. What photography details interest you?`,
        `This photography service covers planning, shooting, and post-processing. How can I assist?`
      ],
      writing: [
        `For ${title}, I can explain the writing process, research methods, and content strategy.`,
        `${provider.name} will create engaging content tailored to your audience. What writing questions do you have?`,
        `This writing service includes research, drafting, and revisions. What would you like to know?`
      ],
      audio: [
        `${title} involves professional audio production. I can explain recording, editing, and mastering processes.`,
        `${provider.name} will deliver high-quality audio content. What audio production aspects interest you?`,
        `This audio service covers recording, editing, and final production. How can I help?`
      ]
    }

    // Common question patterns
    if (lowerMessage.includes('timeline') || lowerMessage.includes('how long')) {
      return {
        content: `The timeline for "${title}" typically depends on project complexity. ${provider.name} will provide a detailed schedule during the initial consultation. Most ${category} projects are completed within 1-3 weeks, but I can help you understand the specific phases involved.`,
        showFeedback: true
      }
    }

    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('payment')) {
      return {
        content: `The pricing for "${title}" is already outlined in your subscription. ${provider.name} offers transparent pricing with no hidden fees. Payment is typically structured based on project milestones. Would you like me to explain the payment schedule?`,
        showFeedback: true
      }
    }

    if (lowerMessage.includes('process') || lowerMessage.includes('how it works')) {
      return {
        content: `The process for "${title}" typically involves: 1) Initial consultation to understand your needs, 2) Planning and strategy development, 3) Execution and regular updates, 4) Review and revisions, 5) Final delivery. ${provider.name} will guide you through each step.`,
        showFeedback: true
      }
    }

    if (lowerMessage.includes('revision') || lowerMessage.includes('changes')) {
      return {
        content: `${provider.name} includes revisions as part of "${title}". Most ${category} services include 2-3 rounds of revisions to ensure you're completely satisfied. Additional revisions can be discussed if needed.`,
        showFeedback: true
      }
    }

    if (lowerMessage.includes('communication') || lowerMessage.includes('contact')) {
      return {
        content: `${provider.name} maintains regular communication throughout "${title}". You'll receive progress updates, and you can reach out anytime with questions. They typically respond within their stated response time.`,
        showFeedback: true
      }
    }

    if (lowerMessage.includes('deliverable') || lowerMessage.includes('what will i get')) {
      return {
        content: `For "${title}", you'll receive professional deliverables specific to ${category} services. ${provider.name} will provide a detailed list of what's included during your consultation. All files and materials will be delivered in the agreed formats.`,
        showFeedback: true
      }
    }

    if (lowerMessage.includes('experience') || lowerMessage.includes('portfolio')) {
      return {
        content: `${provider.name} has extensive experience in ${category} services. You can view their portfolio and previous work examples. Their rating and reviews reflect their expertise in delivering "${title}" and similar services.`,
        showFeedback: true
      }
    }

    if (lowerMessage.includes('start') || lowerMessage.includes('begin') || lowerMessage.includes('next step')) {
      return {
        content: `Great! Since you've subscribed to "${title}", ${provider.name} will contact you soon to schedule your initial consultation. They'll discuss your specific requirements, timeline, and next steps. You should hear from them within their stated response time.`,
        showFeedback: true
      }
    }

    if (lowerMessage.includes('cancel') || lowerMessage.includes('refund')) {
      return {
        content: `If you need to discuss cancellation or refunds for "${title}", please contact ${provider.name} directly. Most services have a satisfaction guarantee, and they'll work with you to address any concerns.`,
        showFeedback: true
      }
    }

    // For complex queries, suggest professional consultation
    if (isComplex) {
      return {
        content: `That's a great question about "${title}"! While I can provide general information, your specific requirements might benefit from a detailed discussion with ${provider.name} directly. They can provide personalized recommendations based on your exact needs and project scope.`,
        showScheduling: true,
        showFeedback: true
      }
    }

    // Default responses based on category
    const responses = categoryResponses[category] || [
      `I'm here to help with any questions about "${title}" by ${provider.name}. What specific information would you like to know?`,
      `This ${category} service offers professional expertise. How can I assist you with your questions?`,
      `${provider.name} will provide excellent service. What aspects would you like me to explain?`
    ]

    return {
      content: responses[Math.floor(Math.random() * responses.length)],
      showFeedback: true
    }
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: `msg_${Date.now()}_user`,
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const response = generateBotResponse(userMessage.content)
      const botMessage: Message = {
        id: `msg_${Date.now()}_bot`,
        type: 'bot',
        content: response.content,
        timestamp: new Date(),
        showScheduling: response.showScheduling,
        showFeedback: response.showFeedback
      }

      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000) // 1-2 second delay
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
  }

  const handleFeedback = (messageId: string, isHelpful: boolean) => {
    if (!isHelpful) {
      setUnhelpfulCount(prev => prev + 1)
      
      // After 2 unhelpful responses, suggest professional consultation
      if (unhelpfulCount >= 1) {
        const suggestionMessage: Message = {
          id: `msg_${Date.now()}_suggestion`,
          type: 'system',
          content: `I notice my responses might not be fully addressing your needs. Would you like to schedule a consultation with ${service.provider.name}? They can provide personalized guidance and answer your specific questions in detail.`,
          timestamp: new Date(),
          showScheduling: true
        }
        setMessages(prev => [...prev, suggestionMessage])
      }
    }
  }

  const handleScheduleConsultation = () => {
    setShowSchedulingForm(true)
  }

  const handleSchedulingSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsScheduling(true)

    try {
      // Create Google Calendar event
      const eventDetails = {
        summary: `Consultation: ${service.title}`,
        description: `Professional consultation with ${service.provider.name} regarding "${service.title}"\n\nTopic: ${schedulingData.topic}\n\nService Category: ${service.category}`,
        start: {
          dateTime: `${schedulingData.date}T${schedulingData.time}:00`,
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        end: {
          dateTime: new Date(new Date(`${schedulingData.date}T${schedulingData.time}:00`).getTime() + parseInt(schedulingData.duration) * 60000).toISOString().slice(0, 19),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        attendees: [
          { email: 'user@example.com' }, // This would be the current user's email
          { email: `${service.provider.name.toLowerCase().replace(' ', '.')}@servicepro.com` }
        ],
        conferenceData: schedulingData.contactMethod === 'video' ? {
          createRequest: {
            requestId: `consultation_${Date.now()}`,
            conferenceSolutionKey: { type: 'hangoutsMeet' }
          }
        } : undefined
      }

      // Simulate API call to create calendar event
      await new Promise(resolve => setTimeout(resolve, 2000))

      const confirmationMessage: Message = {
        id: `msg_${Date.now()}_confirmation`,
        type: 'system',
        content: `✅ **Consultation Scheduled Successfully!**\n\n📅 **Date & Time:** ${new Date(`${schedulingData.date}T${schedulingData.time}`).toLocaleDateString()} at ${new Date(`${schedulingData.date}T${schedulingData.time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}\n⏱️ **Duration:** ${schedulingData.duration} minutes\n👤 **With:** ${service.provider.name}\n📝 **Topic:** ${schedulingData.topic}\n\nA calendar invitation has been sent to your email with ${schedulingData.contactMethod === 'video' ? 'video call' : schedulingData.contactMethod} details. ${service.provider.name} will also receive a notification and may reach out to confirm the meeting details.\n\n*You can find this event in your Google Calendar.*`,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, confirmationMessage])
      setShowSchedulingForm(false)
      setSchedulingData({
        date: '',
        time: '',
        duration: '30',
        topic: '',
        contactMethod: 'video'
      })
    } catch (error) {
      const errorMessage: Message = {
        id: `msg_${Date.now()}_error`,
        type: 'system',
        content: `❌ Sorry, there was an issue scheduling your consultation. Please try again or contact ${service.provider.name} directly. You can also try scheduling through their profile page.`,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsScheduling(false)
    }
  }

  const clearChat = () => {
    setMessages([{
      id: `msg_${Date.now()}`,
      type: 'bot',
      content: `Hi! I'm your dedicated assistant for "${service.title}" by ${service.provider.name}. I'm here to help you with any questions about this ${service.category} service. How can I assist you today?`,
      timestamp: new Date()
    }])
    setUnhelpfulCount(0)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`bg-white/95 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl transition-all duration-300 ${
        isMinimized ? 'w-80 h-16' : 'w-full max-w-4xl h-[80vh]'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Service Assistant</h3>
              <p className="text-sm text-gray-600 truncate max-w-xs">
                {service.title} • {service.provider.name}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-2 hover:bg-gray-100/50 rounded-xl transition-colors"
              title={isMinimized ? 'Maximize' : 'Minimize'}
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </button>
            <button
              onClick={clearChat}
              className="p-2 hover:bg-gray-100/50 rounded-xl transition-colors"
              title="Clear chat"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100/50 rounded-xl transition-colors"
              title="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 h-96">
              {messages.map((message) => (
                <div key={message.id}>
                  <div
                    className={`flex items-start space-x-3 ${
                      message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-gray-500 to-gray-600'
                        : message.type === 'system'
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                        : 'bg-gradient-to-r from-blue-500 to-cyan-500'
                    }`}>
                      {message.type === 'user' ? (
                        <User className="h-4 w-4 text-white" />
                      ) : message.type === 'system' ? (
                        <Calendar className="h-4 w-4 text-white" />
                      ) : (
                        <Bot className="h-4 w-4 text-white" />
                      )}
                    </div>
                    
                    <div className={`flex-1 max-w-xs sm:max-w-md lg:max-w-lg ${
                      message.type === 'user' ? 'text-right' : ''
                    }`}>
                      <div className={`inline-block p-3 rounded-2xl ${
                        message.type === 'user'
                          ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                          : message.type === 'system'
                          ? 'bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200 text-gray-900'
                          : 'bg-white/50 backdrop-blur-sm border border-white/30 text-gray-900'
                      }`}>
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">
                          {message.content}
                        </p>
                      </div>
                      
                      {/* Scheduling Button */}
                      {message.showScheduling && (
                        <div className="mt-3">
                          <button
                            onClick={handleScheduleConsultation}
                            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-green-500/25 transition-all duration-200 flex items-center space-x-2"
                          >
                            <Calendar className="h-4 w-4" />
                            <span>Schedule Consultation</span>
                          </button>
                        </div>
                      )}

                      {/* Feedback Buttons */}
                      {message.showFeedback && message.type === 'bot' && (
                        <div className="flex items-center space-x-2 mt-2">
                          <button
                            onClick={() => handleFeedback(message.id, true)}
                            className="p-1 hover:bg-green-100 rounded transition-colors"
                            title="Helpful"
                          >
                            <ThumbsUp className="h-3 w-3 text-green-600" />
                          </button>
                          <button
                            onClick={() => handleFeedback(message.id, false)}
                            className="p-1 hover:bg-red-100 rounded transition-colors"
                            title="Not helpful"
                          >
                            <ThumbsDown className="h-3 w-3 text-red-600" />
                          </button>
                        </div>
                      )}
                      
                      <div className={`flex items-center space-x-2 mt-1 text-xs text-gray-500 ${
                        message.type === 'user' ? 'justify-end' : ''
                      }`}>
                        <span>{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        {(message.type === 'bot' || message.type === 'system') && (
                          <button
                            onClick={() => copyMessage(message.content)}
                            className="hover:text-gray-700 transition-colors"
                            title="Copy message"
                          >
                            <Copy className="h-3 w-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-white/50 backdrop-blur-sm border border-white/30 rounded-2xl p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Scheduling Form */}
            {showSchedulingForm && (
              <div className="border-t border-white/20 p-4 bg-gray-50/50">
                <div className="bg-white/70 backdrop-blur-sm border border-white/30 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      <span>Schedule Consultation with {service.provider.name}</span>
                    </h4>
                    <button
                      onClick={() => setShowSchedulingForm(false)}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                      <X className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>

                  <form onSubmit={handleSchedulingSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Preferred Date
                        </label>
                        <input
                          type="date"
                          required
                          min={new Date().toISOString().split('T')[0]}
                          value={schedulingData.date}
                          onChange={(e) => setSchedulingData(prev => ({ ...prev, date: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Preferred Time
                        </label>
                        <input
                          type="time"
                          required
                          value={schedulingData.time}
                          onChange={(e) => setSchedulingData(prev => ({ ...prev, time: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Duration
                        </label>
                        <select
                          value={schedulingData.duration}
                          onChange={(e) => setSchedulingData(prev => ({ ...prev, duration: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        >
                          <option value="15">15 minutes</option>
                          <option value="30">30 minutes</option>
                          <option value="45">45 minutes</option>
                          <option value="60">1 hour</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Contact Method
                        </label>
                        <select
                          value={schedulingData.contactMethod}
                          onChange={(e) => setSchedulingData(prev => ({ ...prev, contactMethod: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        >
                          <option value="video">Video Call</option>
                          <option value="phone">Phone Call</option>
                          <option value="in-person">In Person</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        What would you like to discuss?
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={schedulingData.topic}
                        onChange={(e) => setSchedulingData(prev => ({ ...prev, topic: e.target.value }))}
                        placeholder="Briefly describe what you'd like to discuss during the consultation..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
                      />
                    </div>

                    <div className="flex items-center justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setShowSchedulingForm(false)}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isScheduling}
                        className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-xl font-medium hover:shadow-lg hover:shadow-green-500/25 transition-all duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isScheduling ? (
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
                  </form>
                </div>
              </div>
            )}

            {/* Input */}
            {!showSchedulingForm && (
              <div className="border-t border-white/20 p-4">
                <div className="flex items-center space-x-3">
                  <div className="flex-1 relative">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={`Ask me anything about "${service.title}"...`}
                      className="w-full bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-3 pr-12 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
                      disabled={isTyping}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <Sparkles className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-3 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                  <div className="flex items-center space-x-4">
                    <span>Press Enter to send</span>
                    <span>•</span>
                    <span>Powered by AI</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="h-3 w-3" />
                    <span>{messages.length} messages</span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default ServiceChatbot

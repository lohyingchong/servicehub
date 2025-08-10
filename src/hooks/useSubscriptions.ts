import { useState, useEffect } from 'react'

interface SubscribedService {
  id: number
  title: string
  provider: string
  category: string
  price: string
  image: string
  subscribedAt: string
  status: 'active' | 'cancelled'
  nextBilling?: string
  planType: 'monthly' | 'yearly' | 'one-time'
}

interface SubscriptionActivity {
  id: string
  serviceId: number
  serviceTitle: string
  action: 'subscribed' | 'cancelled'
  timestamp: string
  sessionId: string
}

export const useSubscriptions = () => {
  const [subscribedServices, setSubscribedServices] = useState<SubscribedService[]>([])
  const [subscriptionActivities, setSubscriptionActivities] = useState<SubscriptionActivity[]>([])
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`)
  const [isInitialized, setIsInitialized] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    console.log('useSubscriptions - Loading from localStorage...')
    try {
      const savedSubscriptions = localStorage.getItem('marketplace-subscriptions')
      const savedActivities = localStorage.getItem('marketplace-subscription-activities')
      
      if (savedSubscriptions) {
        const parsed = JSON.parse(savedSubscriptions)
        console.log('useSubscriptions - Loaded subscriptions:', parsed)
        setSubscribedServices(Array.isArray(parsed) ? parsed : [])
      } else {
        // Initialize with some sample subscribed services that match the current data
        const sampleSubscriptions: SubscribedService[] = [
          {
            id: 1,
            title: 'Modern Web Application Development',
            provider: 'Marcus Johnson',
            category: 'development',
            price: '0.9 ETH',
            image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
            subscribedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
            status: 'active',
            nextBilling: new Date(Date.now() + 23 * 24 * 60 * 60 * 1000).toISOString(), // 23 days from now
            planType: 'one-time'
          },
          {
            id: 3,
            title: 'SEO & Digital Marketing Strategy',
            provider: 'Emily Rodriguez',
            category: 'marketing',
            price: '0.67 ETH/month',
            image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
            subscribedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days ago
            status: 'active',
            nextBilling: new Date(Date.now() + 16 * 24 * 60 * 60 * 1000).toISOString(), // 16 days from now
            planType: 'monthly'
          },
          {
            id: 7,
            title: 'E-commerce Store Development',
            provider: 'Ryan Foster',
            category: 'development',
            price: '0.56 ETH',
            image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
            subscribedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(), // 21 days ago
            status: 'active',
            planType: 'one-time'
          },
          {
            id: 10,
            title: 'Wedding Photography Package',
            provider: 'Chris Martinez',
            category: 'photography',
            price: '0.64 ETH',
            image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
            subscribedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
            status: 'cancelled',
            planType: 'one-time'
          }
        ]
        setSubscribedServices(sampleSubscriptions)
      }
      
      if (savedActivities) {
        const parsed = JSON.parse(savedActivities)
        console.log('useSubscriptions - Loaded activities:', parsed)
        setSubscriptionActivities(Array.isArray(parsed) ? parsed : [])
      }
    } catch (error) {
      console.error('Error loading subscription data:', error)
      setSubscribedServices([])
      setSubscriptionActivities([])
    } finally {
      setIsInitialized(true)
    }
  }, [])

  // Save subscriptions to localStorage whenever items change (only after initialization)
  useEffect(() => {
    if (!isInitialized) return
    
    console.log('useSubscriptions - Saving subscriptions to localStorage:', subscribedServices)
    try {
      localStorage.setItem('marketplace-subscriptions', JSON.stringify(subscribedServices))
    } catch (error) {
      console.error('Error saving subscriptions:', error)
    }
  }, [subscribedServices, isInitialized])

  // Save activities to localStorage whenever activities change (only after initialization)
  useEffect(() => {
    if (!isInitialized) return
    
    console.log('useSubscriptions - Saving activities to localStorage:', subscriptionActivities)
    try {
      localStorage.setItem('marketplace-subscription-activities', JSON.stringify(subscriptionActivities))
    } catch (error) {
      console.error('Error saving subscription activities:', error)
    }
  }, [subscriptionActivities, isInitialized])

  const logActivity = (serviceId: number, serviceTitle: string, action: 'subscribed' | 'cancelled') => {
    const activity: SubscriptionActivity = {
      id: `activity_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      serviceId,
      serviceTitle,
      action,
      timestamp: new Date().toISOString(),
      sessionId
    }

    console.log('useSubscriptions - Logging activity:', activity)
    setSubscriptionActivities(prev => [activity, ...prev].slice(0, 100)) // Keep last 100 activities
  }

  const subscribeToService = (service: any) => {
    console.log('useSubscriptions - Subscribing to service:', service)
    
    if (!service || !service.id) {
      console.error('Invalid service object:', service)
      return
    }

    // Extract price amount from the service data format
    let priceAmount = '0 ETH'
    if (service.price?.amount) {
      priceAmount = service.price.amount
    } else if (typeof service.price === 'string') {
      priceAmount = service.price
    }

    const subscription: SubscribedService = {
      id: service.id,
      title: service.title || 'Untitled Service',
      provider: service.provider?.name || 'Unknown Provider',
      category: service.category || 'general',
      price: priceAmount,
      image: service.gallery?.[0] || service.image || 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      subscribedAt: new Date().toISOString(),
      status: 'active',
      nextBilling: service.price?.type === 'hourly' || priceAmount.includes('/month') ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() : undefined,
      planType: service.price?.type === 'hourly' || priceAmount.includes('/month') ? 'monthly' : 'one-time'
    }

    setSubscribedServices(prev => {
      const exists = prev.find(item => item.id === service.id)
      if (exists) {
        console.log('useSubscriptions - Service already subscribed:', service.id)
        // If cancelled, reactivate it
        if (exists.status === 'cancelled') {
          logActivity(service.id, service.title, 'subscribed')
          return prev.map(item => 
            item.id === service.id 
              ? { ...item, status: 'active' as const, subscribedAt: new Date().toISOString() }
              : item
          )
        }
        return prev
      }
      
      // Log the activity
      logActivity(service.id, service.title, 'subscribed')
      
      const newItems = [...prev, subscription]
      console.log('useSubscriptions - New subscribed services:', newItems)
      return newItems
    })
  }

  const cancelSubscription = (serviceId: number) => {
    console.log('useSubscriptions - Cancelling subscription:', serviceId)
    
    setSubscribedServices(prev => {
      const serviceToCancel = prev.find(item => item.id === serviceId)
      if (serviceToCancel) {
        // Log the activity
        logActivity(serviceId, serviceToCancel.title, 'cancelled')
      }
      return prev.map(item => 
        item.id === serviceId 
          ? { ...item, status: 'cancelled' as const }
          : item
      )
    })
  }

  const isSubscribed = (serviceId: number) => {
    if (!serviceId) return false
    const result = subscribedServices.some(item => item.id === serviceId && item.status !== 'cancelled')
    console.log(`useSubscriptions - Is service ${serviceId} subscribed?`, result)
    return result
  }

  const getSubscriptionStats = () => {
    const activeSubscriptions = subscribedServices.filter(s => s.status === 'active')
    const totalSpent = subscribedServices.reduce((total, service) => {
      const amount = parseFloat(service.price.replace(/[^0-9.]/g, '')) || 0
      return total + amount
    }, 0)

    const today = new Date().toDateString()
    const todayActivities = subscriptionActivities.filter(
      activity => new Date(activity.timestamp).toDateString() === today
    )
    
    const stats = {
      totalSubscriptions: subscribedServices.length,
      activeSubscriptions: activeSubscriptions.length,
      totalSpent,
      totalActivities: subscriptionActivities.length,
      todayActivities: todayActivities.length,
      recentActivities: subscriptionActivities.slice(0, 10)
    }
    
    console.log('useSubscriptions - Subscription stats:', stats)
    return stats
  }

  // Debug current state
  console.log('useSubscriptions - Current state:', {
    subscribedServicesLength: subscribedServices.length,
    subscriptionActivitiesLength: subscriptionActivities.length,
    isInitialized,
    sessionId
  })

  return {
    subscribedServices,
    subscriptionActivities,
    subscribeToService,
    cancelSubscription,
    isSubscribed,
    getSubscriptionStats,
    subscriptionCount: subscribedServices.length,
    activeSubscriptionCount: subscribedServices.filter(s => s.status === 'active').length,
    sessionId,
    isInitialized
  }
}

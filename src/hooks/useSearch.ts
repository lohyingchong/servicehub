import { useState, useMemo } from 'react'
import { services } from '../data/servicesData'

interface Service {
  id: number
  title: string
  description: string
  category: string
  provider: {
    name: string
    image: string
    rating: number
    reviews: number
    location: string
    responseTime: string
  }
  price: {
    type: 'hourly' | 'fixed' | 'package'
    amount: string
    originalAmount?: string
  }
  skills: string[]
  featured: boolean
  gallery: string[]
}

export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Service[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const filteredServices = useMemo(() => {
    if (!searchQuery.trim()) {
      return []
    }

    const query = searchQuery.toLowerCase().trim()
    
    return services.filter(service => {
      // Search in title
      const titleMatch = service.title.toLowerCase().includes(query)
      
      // Search in description
      const descriptionMatch = service.description.toLowerCase().includes(query)
      
      // Search in provider name
      const providerMatch = service.provider.name.toLowerCase().includes(query)
      
      // Search in skills
      const skillsMatch = service.skills.some(skill => 
        skill.toLowerCase().includes(query)
      )
      
      // Search in category
      const categoryMatch = service.category.toLowerCase().includes(query)
      
      // Search in location
      const locationMatch = service.provider.location.toLowerCase().includes(query)
      
      return titleMatch || descriptionMatch || providerMatch || skillsMatch || categoryMatch || locationMatch
    })
  }, [searchQuery])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setIsSearching(query.length > 0)
    setSearchResults(filteredServices)
  }

  const clearSearch = () => {
    setSearchQuery('')
    setSearchResults([])
    setIsSearching(false)
  }

  return {
    searchQuery,
    searchResults: filteredServices,
    isSearching,
    handleSearch,
    clearSearch,
    hasResults: filteredServices.length > 0
  }
}

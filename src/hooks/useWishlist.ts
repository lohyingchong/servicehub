import { useState, useEffect } from 'react'

interface WishlistItem {
  id: string
  type: 'service' | 'provider'
  name: string
  description: string
  price?: string
  rating?: number
  image?: string
  addedAt: string
}

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([])

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('servicepro-wishlist')
    if (saved) {
      try {
        setWishlist(JSON.parse(saved))
      } catch (error) {
        console.error('Error loading wishlist:', error)
      }
    }
  }, [])

  // Save to localStorage whenever wishlist changes
  useEffect(() => {
    localStorage.setItem('servicepro-wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  const addToWishlist = (item: Omit<WishlistItem, 'addedAt'>) => {
    const newItem: WishlistItem = {
      ...item,
      addedAt: new Date().toISOString()
    }
    
    setWishlist(prev => {
      // Check if item already exists
      if (prev.some(existing => existing.id === item.id && existing.type === item.type)) {
        return prev
      }
      return [...prev, newItem]
    })
  }

  const removeFromWishlist = (id: string, type: 'service' | 'provider') => {
    setWishlist(prev => prev.filter(item => !(item.id === id && item.type === type)))
  }

  const isInWishlist = (id: string, type: 'service' | 'provider') => {
    return wishlist.some(item => item.id === id && item.type === type)
  }

  const clearWishlist = () => {
    setWishlist([])
  }

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
    bookmarkCount: wishlist.length
  }
}

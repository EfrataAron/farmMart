'use client'

import React, { createContext, useContext, useReducer, useEffect } from 'react'
import Cookies from 'js-cookie'

export interface CartItem {
  id: number
  title: string
  price: number
  quantity: number
  unit: string
  image: string
  maxQuantity?: number
}

interface CartState {
  items: CartItem[]
  totalItems: number
  totalPrice: number
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> & { quantity?: number } }
  | { type: 'REMOVE_ITEM'; payload: { id: number } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartState }

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id)
      const quantityToAdd = action.payload.quantity || 1
      
      let updatedItems: CartItem[]
      
      if (existingItem) {
        updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item
        )
      } else {
        updatedItems = [
          ...state.items,
          {
            ...action.payload,
            quantity: quantityToAdd
          }
        ]
      }
      
      const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0)
      const totalPrice = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      
      return {
        items: updatedItems,
        totalItems,
        totalPrice
      }
    }
    
    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(item => item.id !== action.payload.id)
      const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0)
      const totalPrice = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      
      return {
        items: updatedItems,
        totalItems,
        totalPrice
      }
    }
    
    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: { id: action.payload.id } })
      }
      
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      )
      
      const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0)
      const totalPrice = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      
      return {
        items: updatedItems,
        totalItems,
        totalPrice
      }
    }
    
    case 'CLEAR_CART': {
      return {
        items: [],
        totalItems: 0,
        totalPrice: 0
      }
    }
    
    case 'LOAD_CART': {
      return action.payload
    }
    
    default:
      return state
  }
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0
}

interface CartContextType {
  state: CartState
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  isInCart: (id: number) => boolean
  getItemQuantity: (id: number) => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Load cart from cookie on mount
  useEffect(() => {
    const cookie = Cookies.get('agrilink_cart')
    if (cookie) {
      try {
        const parsed = JSON.parse(cookie)
        if (parsed && typeof parsed === 'object' && parsed.items) {
          dispatch({ type: 'LOAD_CART', payload: parsed })
        }
      } catch (e) {
        // Log the error for debugging (invalid cookie)
        console.error('Failed to parse cart cookie:', e);
      }
    }
  }, [])

  // Save cart to cookie on state change
  useEffect(() => {
    Cookies.set('agrilink_cart', JSON.stringify(state), { expires: 0.00694 }) // 10 minutes
  }, [state])

  const addItem = (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    dispatch({ type: 'ADD_ITEM', payload: item })
  }

  const removeItem = (id: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } })
  }

  const updateQuantity = (id: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const isInCart = (id: number) => {
    return state.items.some(item => item.id === id)
  }

  const getItemQuantity = (id: number) => {
    const item = state.items.find(item => item.id === id)
    return item ? item.quantity : 0
  }

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isInCart,
        getItemQuantity
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

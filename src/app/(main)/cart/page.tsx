'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/contexts/CartContext'
import { FiArrowLeft, FiTrash2, FiPlus, FiMinus, FiShoppingCart } from 'react-icons/fi'
import CheckoutModal from '@/components/checkout/CheckoutModal'
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export default function CartPage() {
  const { state, removeItem, updateQuantity, clearCart } = useCart()
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false)
  const router = useRouter();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const handleQuantityChange = (id: number, change: number) => {
    const currentItem = state.items.find(item => item.id === id)
    if (currentItem) {
      const newQuantity = currentItem.quantity + change
      if (newQuantity > 0) {
        updateQuantity(id, newQuantity)
      }
    }
  }

  const handleRemoveItem = (id: number) => {
    removeItem(id)
  }

  if (state.items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
        {/* Header */}
        <div className="flex items-center gap-2 mb-8">
          <Link href="/" passHref>
            <button
              className="p-2 rounded hover:bg-gray-100"
              aria-label="Go to homepage"
            >
              <FiArrowLeft size={22} />
            </button>
          </Link>
          <h1 className="text-2xl font-semibold">Shopping Cart</h1>
        </div>

        {/* Empty Cart */}
        <div className="text-center py-16">
          <FiShoppingCart className="mx-auto text-6xl text-gray-300 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-600 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Add some products to get started!</p>
          <Link
            href="/"
            className="inline-block bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center gap-2 mb-8">
        <Link href="/" passHref>
          <button
            className="p-2 rounded hover:bg-gray-100"
            aria-label="Go to homepage"
          >
            <FiArrowLeft size={22} />
          </button>
        </Link>
        <h1 className="text-2xl font-semibold">Shopping Cart ({state.totalItems} items)</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            {/* Cart Header */}
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold">Cart Items</h2>
              <button
                onClick={clearCart}
                className="text-red-600 hover:text-red-700 text-sm font-medium"
              >
                Clear All
              </button>
            </div>

            {/* Cart Items List */}
            <div className="divide-y divide-gray-200">
              {state.items.map((item) => (
                <div key={item.id} className="p-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={80}
                        height={80}
                        className="w-20 h-20 object-cover rounded-lg border"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium text-gray-900 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-orange-600 font-semibold">
                        UGX {item.price.toLocaleString()}/{item.unit}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleQuantityChange(item.id, -1)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                          disabled={item.quantity <= 1}
                        >
                          <FiMinus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.id, 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        >
                          <FiPlus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Subtotal */}
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          UGX {(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                        aria-label="Remove item"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6 sticky top-4">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal ({state.totalItems} items)</span>
                <span className="font-medium">UGX {state.totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                <span className="font-medium">UGX 2,000</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-orange-600">
                    UGX {(state.totalPrice + 2000).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button 
                onClick={() => {
                  if (!isLoggedIn) {
                    router.push('/login');
                  } else {
                    setIsCheckoutModalOpen(true);
                  }
                }}
                className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition font-semibold"
              >
                Proceed to Checkout
              </button>
              <Link
                href="/"
                className="block w-full text-center border border-orange-600 text-orange-600 py-3 rounded-lg hover:bg-orange-50 transition font-semibold"
              >
                Continue Shopping
              </Link>
            </div>

            {/* Delivery Info */}
            <div className="mt-6 p-4 bg-orange-50 rounded-lg">
              <h3 className="font-medium text-orange-800 mb-2">Delivery Information</h3>
              <ul className="text-sm text-orange-700 space-y-1">
                <li>• Free delivery on orders over UGX 50,000</li>
                <li>• Standard delivery: 1-3 business days</li>
                <li>• Fresh products guaranteed</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal 
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
      />
    </div>
  )
}



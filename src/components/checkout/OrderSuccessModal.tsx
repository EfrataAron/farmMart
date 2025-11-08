'use client'

import React from 'react'
import { FiCheck, FiX } from 'react-icons/fi'

interface OrderSuccessModalProps {
  isOpen: boolean
  onClose: () => void
  orderNumber: string
  totalAmount: number
}

export default function OrderSuccessModal({ 
  isOpen, 
  onClose, 
  orderNumber, 
  totalAmount 
}: OrderSuccessModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0   flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Order Confirmed</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiCheck className="w-8 h-8 text-green-600" />
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
          <p className="text-gray-600 mb-4">
            Your order has been successfully placed and is being processed.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="text-sm text-gray-600 mb-1">Order Number</div>
            <div className="font-bold text-lg">{orderNumber}</div>
            <div className="text-sm text-gray-600 mt-2">Total Amount</div>
            <div className="font-bold text-green-600 text-xl">
              UGX {totalAmount.toLocaleString()}
            </div>
          </div>
          
          <div className="text-sm text-gray-600 mb-6">
            <p>You will receive a confirmation email shortly.</p>
            <p>Expected delivery: 1-3 business days</p>
          </div>
          
          <button
            onClick={onClose}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  )
}

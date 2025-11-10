'use client'

import React, { useState } from 'react'
import { FiX, FiCreditCard, FiUser, FiMapPin, FiLoader } from 'react-icons/fi'
import { useCart } from '@/contexts/CartContext'
import OrderSuccessModal from './OrderSuccessModal'

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { state, clearCart } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderCompleted, setOrderCompleted] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')

  const [formData, setFormData] = useState({
    // Customer Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Delivery Information
    address: '',
    city: '',
    district: '',
    postalCode: '',
    
    // Payment Information
    paymentMethod: 'mobile_money',
    mobileNumber: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    
    // Additional
    deliveryNotes: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setOrderCompleted(true)
      setOrderNumber(`AGR-${Date.now()}`)
      clearCart()
    }, 2000)
  }

  if (!isOpen) return null

  const totalAmount = state.totalPrice + 2000 // Including delivery fee

  const handleCloseModal = () => {
    onClose()
    setOrderCompleted(false)
    setIsProcessing(false)
    setOrderNumber('')
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      district: '',
      postalCode: '',
      paymentMethod: 'mobile_money',
      mobileNumber: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardName: '',
      deliveryNotes: ''
    })
  }

//Api call set up
// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();
//   setIsProcessing(true);

//   // Prepare the order payload
//   const orderPayload = {
//     customer: {
//       firstName: formData.firstName,
//       lastName: formData.lastName,
//       email: formData.email,
//       phone: formData.phone,
//     },
//     delivery: {
//       address: formData.address,
//       city: formData.city,
//       district: formData.district,
//       postalCode: formData.postalCode,
//       notes: formData.deliveryNotes,
//     },
//     payment: {
//       method: formData.paymentMethod,
//       mobileNumber: formData.mobileNumber,
//       cardNumber: formData.cardNumber,
//       expiryDate: formData.expiryDate,
//       cvv: formData.cvv,
//       cardName: formData.cardName,
//     },
//     items: state.items,
//     subtotal: state.totalPrice,
//     deliveryFee: 2000,
//     total: state.totalPrice + 2000,
//   };

//   try {
//     const response = await fetch('/api/orders', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(orderPayload),
//     });

//     if (!response.ok) {
//       throw new Error('Order submission failed');
//     }

//     const data = await response.json();

//     setIsProcessing(false);
//     setOrderCompleted(true);
//     setOrderNumber(data.orderNumber || `AGR-${Date.now()}`);
//     clearCart();
//   } catch (error) {
//     setIsProcessing(false);
//     alert('There was an error processing your order. Please try again.');
//     // Optionally, handle error state here
//   }
// };



  return (
    <>
      <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm   flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {orderCompleted ? 'Order Confirmed' : 'Checkout'}
          </h2>
          <button
            onClick={handleCloseModal}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>



        {/* Processing State */}
        {isProcessing && (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiLoader className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Processing Payment...</h3>
            <p className="text-gray-600">
              Please wait while we process your payment securely.
            </p>
          </div>
        )}

        {/* Main Checkout Form */}
        {!isProcessing && (
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Left Column - Forms */}
              <div className="space-y-6">
                
                {/* Step 1: Customer Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <FiUser className="mr-2" />
                    Customer Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Step 2: Delivery Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <FiMapPin className="mr-2" />
                    Delivery Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address *
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          District *
                        </label>
                        <input
                          type="text"
                          name="district"
                          value={formData.district}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Delivery Notes (Optional)
                      </label>
                      <textarea
                        name="deliveryNotes"
                        value={formData.deliveryNotes}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Any special instructions for delivery..."
                      />
                    </div>
                  </div>
                </div>

                {/* Step 3: Payment Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <FiCreditCard className="mr-2" />
                    Payment Information
                  </h3>
                  
                  {/* Payment Method Selection */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Payment Method *
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="mobile_money"
                          checked={formData.paymentMethod === 'mobile_money'}
                          onChange={handleInputChange}
                          className="mr-3"
                        />
                        <div>
                          <div className="font-medium">Mobile Money</div>
                          <div className="text-sm text-gray-500">MTN, Airtel</div>
                        </div>
                      </label>
                      <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          checked={formData.paymentMethod === 'card'}
                          onChange={handleInputChange}
                          className="mr-3"
                        />
                        <div>
                          <div className="font-medium">Card Payment</div>
                          <div className="text-sm text-gray-500">Visa, Mastercard</div>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Mobile Money Form */}
                  {formData.paymentMethod === 'mobile_money' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="e.g., 0701234567"
                        required
                      />
                    </div>
                  )}

                  {/* Card Payment Form */}
                  {formData.paymentMethod === 'card' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Card Number *
                        </label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="1234 5678 9012 3456"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Expiry Date *
                          </label>
                          <input
                            type="text"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            placeholder="MM/YY"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            CVV *
                          </label>
                          <input
                            type="text"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            placeholder="123"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Cardholder Name *
                        </label>
                        <input
                          type="text"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column - Order Summary */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                
                {/* Items */}
                <div className="space-y-3 mb-6">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-200">
                      <div className="flex-1">
                        <div className="font-medium text-sm">{item.title}</div>
                        <div className="text-sm text-gray-600">
                          {item.quantity} × UGX {item.price.toLocaleString()}
                        </div>
                      </div>
                      <div className="font-medium">
                        UGX {(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>UGX {state.totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Delivery Fee</span>
                    <span>UGX 2,000</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold pt-2 border-t">
                    <span>Total</span>
                    <span className="text-orange-600">UGX {totalAmount.toLocaleString()}</span>
                  </div>
                </div>

                {/* Place Order Button */}
                <button
                  type="submit"
                  className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition font-semibold flex items-center justify-center"
                >
                  <FiCreditCard className="mr-2" />
                  Place Order - UGX {totalAmount.toLocaleString()}
                </button>

                {/* Security Info */}
                <div className="mt-4 text-center text-sm text-gray-500">
                  <p>🔒 Your payment information is secure and encrypted</p>
                </div>
              </div>
            </div>
          </form>
        )}
        </div>
      </div>

      {/* Order Success Modal */}
      <OrderSuccessModal
        isOpen={orderCompleted}
        onClose={handleCloseModal}
        orderNumber={orderNumber}
        totalAmount={totalAmount}
      />
    </>
  )
}


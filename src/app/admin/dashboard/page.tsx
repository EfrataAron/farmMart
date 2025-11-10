'use client'

import React from 'react'
import { 
  FiUsers, 
  FiShoppingCart, 
  FiPackage, 
  FiMessageSquare,
  FiMoreVertical
} from 'react-icons/fi'

// Sample data for best sellers
const bestSellers = [
  {
    id: 1,
    name: 'Berries',
    sales: 999,
    revenue: 126.50,
    image: '/images/berries.jpg'
  },
  {
    id: 2,
    name: 'Oranges',
    sales: 999,
    revenue: 126.50,
    image: '/images/oranges.jpg'
  },
  {
    id: 3,
    name: 'Vegetables',
    sales: 999,
    revenue: 126.50,
    image: '/images/vegetables.jpg'
  }
]

// Sample data for farmers and users
const farmers = [
  {
    id: 1,
    name: 'John Smith',
    description: 'Organic farmer from California',
    avatar: '/avatars/farmer1.jpg'
  },
  {
    id: 2,
    name: 'Jane Garcia',
    description: 'Vegetable specialist from Florida',
    avatar: '/avatars/farmer2.jpg'
  }
]

const users = [
  {
    id: 1,
    name: 'Mike Johnson',
    description: 'Premium buyer from New York',
    avatar: '/avatars/user1.jpg'
  },
  {
    id: 2,
    name: 'Sarah Wilson',
    description: 'Regular customer from Texas',
    avatar: '/avatars/user2.jpg'
  }
]

export default function Dashboard() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900">
            Dashboard
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Welcome back! Here&apos;s what&apos;s happening with your platform today.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Farmers</p>
              <p className="text-2xl font-bold text-gray-900">10K</p>
            </div>
            <FiUsers className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Buyers</p>
              <p className="text-2xl font-bold text-gray-900">500K</p>
            </div>
            <FiShoppingCart className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Messages</p>
              <p className="text-2xl font-bold text-gray-900">90</p>
            </div>
            <FiMessageSquare className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Orders this month</p>
              <p className="text-2xl font-bold text-gray-900">700</p>
            </div>
            <FiPackage className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Charts and Best Sellers Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Sale Graph */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Sale Graph</h3>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">Weekly</button>
              <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded">Monthly</button>
              <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">Yearly</button>
            </div>
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
            <span className="text-gray-400">Graph Placeholder</span>
          </div>
        </div>

        {/* Best Sellers */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Best Sellers</h3>
            <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
              Report
            </button>
          </div>
          <div className="space-y-4">
            {bestSellers.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden">
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                      <FiPackage className="w-6 h-6 text-gray-600" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{item.name}</h4>
                    <p className="text-sm text-gray-600">{item.sales} sales</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-gray-900">${item.revenue}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Farmers and Users Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Farmers */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Farmers</h3>
            <button className="text-gray-400 hover:text-gray-600">
              <FiMoreVertical className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-4">
            {farmers.map((farmer) => (
              <div key={farmer.id} className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                    <FiUsers className="w-6 h-6 text-gray-600" />
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{farmer.name}</h4>
                  <p className="text-sm text-gray-600">{farmer.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Users */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Users</h3>
            <button className="text-gray-400 hover:text-gray-600">
              <FiMoreVertical className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-4">
            {users.map((user) => (
              <div key={user.id} className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                    <FiUsers className="w-6 h-6 text-gray-600" />
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{user.name}</h4>
                  <p className="text-sm text-gray-600">{user.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Activity</h3>
          <button className="text-gray-400 hover:text-gray-600">
            <FiMoreVertical className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <FiUsers className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-900">New user registered</p>
              <p className="text-xs text-gray-500">2 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <FiShoppingCart className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-900">New order placed</p>
              <p className="text-xs text-gray-500">5 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <FiPackage className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-900">Product added to inventory</p>
              <p className="text-xs text-gray-500">10 minutes ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
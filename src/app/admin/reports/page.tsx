'use client'

import React, { useState,  } from 'react'
import { 
  FiTrendingUp, 
  FiUsers, 
  FiShoppingCart, 
  FiDollarSign, 
  FiPackage,
  FiDownload,
  FiBarChart,
  FiPieChart,
  FiActivity,
  FiCheckCircle,
  FiClock,
  FiStar,
  FiMessageCircle,
  FiChevronDown
} from 'react-icons/fi'

// Types (keeping the same as before)
interface PlatformMetrics {
  totalUsers: number
  totalFarmers: number
  totalBuyers: number
  totalAdmins: number
  totalProducts: number
  approvedProducts: number
  pendingProducts: number
  rejectedProducts: number
  totalOrders: number
  completedOrders: number
  pendingOrders: number
  canceledOrders: number
  totalRevenue: number
  platformCommission: number
  activeListings: number
  expiredListings: number
  totalMessages: number
  avgResponseTime: number
  userGrowth: number
  revenueGrowth: number
  orderGrowth: number
  productGrowth: number
}

interface ActivityData {
  date: string
  newUsers: number
  newProducts: number
  orders: number
  revenue: number
  messages: number
}

interface CategoryAnalytics {
  category: string
  totalProducts: number
  approvedProducts: number
  pendingProducts: number
  revenue: number
  orders: number
  avgPrice: number
  topFarmer: string
  growth: number
}

interface FarmerPerformance {
  id: string
  name: string
  email: string
  joinDate: string
  totalProducts: number
  approvedProducts: number
  pendingProducts: number
  rejectedProducts: number
  totalOrders: number
  totalRevenue: number
  avgRating: number
  responseTime: number
  status: 'active' | 'suspended' | 'inactive'
  lastActive: string
}

interface BuyerAnalytics {
  id: string
  name: string
  email: string
  joinDate: string
  totalOrders: number
  totalSpent: number
  avgOrderValue: number
  favoriteCategory: string
  lastOrder: string
  status: 'active' | 'inactive'
}

// Sample data (same as before)
const platformMetrics: PlatformMetrics = {
  totalUsers: 2847,
  totalFarmers: 1205,
  totalBuyers: 1642,
  totalAdmins: 5,
  totalProducts: 3456,
  approvedProducts: 3233,
  pendingProducts: 178,
  rejectedProducts: 45,
  totalOrders: 1789,
  completedOrders: 1456,
  pendingOrders: 267,
  canceledOrders: 66,
  totalRevenue: 456780,
  platformCommission: 45678,
  activeListings: 3233,
  expiredListings: 223,
  totalMessages: 8934,
  avgResponseTime: 2.4,
  userGrowth: 12.5,
  revenueGrowth: 18.3,
  orderGrowth: 15.7,
  productGrowth: 8.9
}

const activityData: ActivityData[] = [
  { date: '2025-01-01', newUsers: 45, newProducts: 23, orders: 78, revenue: 2400, messages: 156 },
  { date: '2025-01-02', newUsers: 52, newProducts: 31, orders: 89, revenue: 2800, messages: 167 },
  { date: '2025-01-03', newUsers: 38, newProducts: 19, orders: 67, revenue: 2100, messages: 134 },
  { date: '2025-01-04', newUsers: 61, newProducts: 28, orders: 94, revenue: 3200, messages: 189 },
  { date: '2025-01-05', newUsers: 47, newProducts: 25, orders: 82, revenue: 2600, messages: 145 },
  { date: '2025-01-06', newUsers: 55, newProducts: 33, orders: 91, revenue: 2900, messages: 172 },
  { date: '2025-01-07', newUsers: 49, newProducts: 27, orders: 85, revenue: 2700, messages: 158 }
]

const categoryAnalytics: CategoryAnalytics[] = [
  { category: 'Vegetables', totalProducts: 1456, approvedProducts: 1367, pendingProducts: 67, revenue: 178900, orders: 2456, avgPrice: 4.50, topFarmer: 'Green Valley Farm', growth: 15.2 },
  { category: 'Fruits', totalProducts: 892, approvedProducts: 834, pendingProducts: 45, revenue: 145600, orders: 1789, avgPrice: 6.80, topFarmer: 'Sunshine Orchards', growth: 12.8 },
  { category: 'Grains', totalProducts: 654, approvedProducts: 612, pendingProducts: 34, revenue: 89200, orders: 1234, avgPrice: 3.20, topFarmer: 'Heritage Grains Co.', growth: 8.9 },
  { category: 'Dairy & Eggs', totalProducts: 454, approvedProducts: 420, pendingProducts: 32, revenue: 67800, orders: 987, avgPrice: 5.90, topFarmer: 'Fresh Farm Dairy', growth: 18.7 }
]

const topFarmers: FarmerPerformance[] = [
  { id: 'F001', name: 'Green Valley Farm', email: 'contact@greenvalley.com', joinDate: '2024-01-15', totalProducts: 45, approvedProducts: 43, pendingProducts: 2, rejectedProducts: 0, totalOrders: 234, totalRevenue: 12500, avgRating: 4.8, responseTime: 1.2, status: 'active', lastActive: '2025-01-07' },
  { id: 'F002', name: 'Sunshine Orchards', email: 'info@sunshineorchards.com', joinDate: '2024-02-20', totalProducts: 38, approvedProducts: 36, pendingProducts: 1, rejectedProducts: 1, totalOrders: 189, totalRevenue: 9800, avgRating: 4.7, responseTime: 1.8, status: 'active', lastActive: '2025-01-07' },
  { id: 'F003', name: 'Heritage Grains Co.', email: 'sales@heritagegrains.com', joinDate: '2023-11-10', totalProducts: 32, approvedProducts: 31, pendingProducts: 1, rejectedProducts: 0, totalOrders: 156, totalRevenue: 8900, avgRating: 4.6, responseTime: 2.1, status: 'active', lastActive: '2025-01-06' },
  { id: 'F004', name: 'Fresh Farm Dairy', email: 'orders@freshfarmdairy.com', joinDate: '2024-03-15', totalProducts: 28, approvedProducts: 26, pendingProducts: 2, rejectedProducts: 0, totalOrders: 134, totalRevenue: 7600, avgRating: 4.9, responseTime: 0.9, status: 'active', lastActive: '2025-01-07' },
  { id: 'F005', name: 'Organic Gardens', email: 'info@organicgardens.com', joinDate: '2024-04-22', totalProducts: 25, approvedProducts: 23, pendingProducts: 1, rejectedProducts: 1, totalOrders: 112, totalRevenue: 6800, avgRating: 4.4, responseTime: 2.5, status: 'active', lastActive: '2025-01-05' }
]

const topBuyers: BuyerAnalytics[] = [
  { id: 'B001', name: 'Fresh Market Chain', email: 'procurement@freshmarket.com', joinDate: '2024-01-10', totalOrders: 156, totalSpent: 45600, avgOrderValue: 292.31, favoriteCategory: 'Vegetables', lastOrder: '2025-01-07', status: 'active' },
  { id: 'B002', name: 'Organic Food Co.', email: 'buyers@organicfood.com', joinDate: '2024-02-15', totalOrders: 134, totalSpent: 38900, avgOrderValue: 290.30, favoriteCategory: 'Fruits', lastOrder: '2025-01-06', status: 'active' },
  { id: 'B003', name: 'Local Restaurant Group', email: 'chef@localrestaurants.com', joinDate: '2024-03-20', totalOrders: 98, totalSpent: 28700, avgOrderValue: 292.86, favoriteCategory: 'Vegetables', lastOrder: '2025-01-05', status: 'active' },
  { id: 'B004', name: 'Healthy Eats Delivery', email: 'orders@healthyeats.com', joinDate: '2024-04-12', totalOrders: 89, totalSpent: 24500, avgOrderValue: 275.28, favoriteCategory: 'Dairy & Eggs', lastOrder: '2025-01-07', status: 'active' },
  { id: 'B005', name: 'School District #45', email: 'nutrition@schooldistrict45.edu', joinDate: '2024-05-30', totalOrders: 76, totalSpent: 19800, avgOrderValue: 260.53, favoriteCategory: 'Grains', lastOrder: '2025-01-04', status: 'active' }
]

export default function ReportsPage() {
  const [timeRange, setTimeRange] = useState<string>('last_7_days')
  const [reportType, setReportType] = useState<string>('overview')
  // const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const formatPercentage = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`
  }

  // const getStatusColor = (status: string) => {
  //   switch (status) {
  //     case 'active': return 'bg-green-100 text-green-800'
  //     case 'inactive': return 'bg-gray-100 text-gray-800'
  //     case 'suspended': return 'bg-red-100 text-red-800'
  //     default: return 'bg-gray-100 text-gray-800'
  //   }
  // }

  return (
    <div className="p-3 sm:p-4 md:p-6 lg:p-8 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
        <div className="flex-1 min-w-0">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 truncate">
            Reports & Analytics
          </h1>
          <p className="text-sm text-gray-600 mt-1">Platform performance and user insights</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 shrink-0">
          <div className="relative">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white pr-8"
            >
              <option value="last_7_days">Last 7 Days</option>
              <option value="last_30_days">Last 30 Days</option>
              <option value="last_6_months">Last 6 Months</option>
              <option value="last_year">Last Year</option>
            </select>
            <FiChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
          </div>
          
          <div className="relative">
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white pr-8"
            >
              <option value="overview">Overview</option>
              <option value="users">Users</option>
              <option value="products">Products</option>
              <option value="orders">Orders</option>
              <option value="revenue">Revenue</option>
            </select>
            <FiChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
          </div>
          
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
            <FiDownload className="w-4 h-4" />
            <span className="hidden sm:inline">Export Report</span>
            <span className="sm:hidden">Export</span>
          </button>
        </div>
      </div>

      {/* Key Metrics Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <div className="bg-white p-4 sm:p-5 lg:p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-600 mb-1">Total Users</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">
                {platformMetrics.totalUsers.toLocaleString()}
              </p>
              <p className="text-sm text-green-600 flex items-center gap-1">
                <FiTrendingUp className="w-3 h-3 shrink-0" />
                <span className="truncate">{formatPercentage(platformMetrics.userGrowth)}</span>
              </p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center shrink-0 ml-3">
              <FiUsers className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 lg:p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-600 mb-1">Total Products</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">
                {platformMetrics.totalProducts.toLocaleString()}
              </p>
              <p className="text-sm text-green-600 flex items-center gap-1">
                <FiTrendingUp className="w-3 h-3 shrink-0" />
                <span className="truncate">{formatPercentage(platformMetrics.productGrowth)}</span>
              </p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center shrink-0 ml-3">
              <FiPackage className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 lg:p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-600 mb-1">Total Orders</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">
                {platformMetrics.totalOrders.toLocaleString()}
              </p>
              <p className="text-sm text-green-600 flex items-center gap-1">
                <FiTrendingUp className="w-3 h-3 shrink-0" />
                <span className="truncate">{formatPercentage(platformMetrics.orderGrowth)}</span>
              </p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-full flex items-center justify-center shrink-0 ml-3">
              <FiShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 lg:p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">
                {formatCurrency(platformMetrics.totalRevenue)}
              </p>
              <p className="text-sm text-green-600 flex items-center gap-1">
                <FiTrendingUp className="w-3 h-3 shrink-0" />
                <span className="truncate">{formatPercentage(platformMetrics.revenueGrowth)}</span>
              </p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center shrink-0 ml-3">
              <FiDollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-6">
        <div className="bg-white p-3 sm:p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-600 truncate">Farmers</p>
              <p className="text-sm sm:text-lg font-semibold text-gray-900 truncate">
                {platformMetrics.totalFarmers.toLocaleString()}
              </p>
            </div>
            <FiUsers className="w-4 h-4 text-green-600 shrink-0" />
          </div>
        </div>

        <div className="bg-white p-3 sm:p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-600 truncate">Buyers</p>
              <p className="text-sm sm:text-lg font-semibold text-gray-900 truncate">
                {platformMetrics.totalBuyers.toLocaleString()}
              </p>
            </div>
            <FiShoppingCart className="w-4 h-4 text-blue-600 shrink-0" />
          </div>
        </div>

        <div className="bg-white p-3 sm:p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-600 truncate">Pending</p>
              <p className="text-sm sm:text-lg font-semibold text-orange-600 truncate">
                {platformMetrics.pendingProducts}
              </p>
            </div>
            <FiClock className="w-4 h-4 text-orange-600 shrink-0" />
          </div>
        </div>

        <div className="bg-white p-3 sm:p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-600 truncate">Approved</p>
              <p className="text-sm sm:text-lg font-semibold text-green-600 truncate">
                {platformMetrics.approvedProducts.toLocaleString()}
              </p>
            </div>
            <FiCheckCircle className="w-4 h-4 text-green-600 shrink-0" />
          </div>
        </div>

        <div className="bg-white p-3 sm:p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-600 truncate">Messages</p>
              <p className="text-sm sm:text-lg font-semibold text-gray-900 truncate">
                {platformMetrics.totalMessages.toLocaleString()}
              </p>
            </div>
            <FiMessageCircle className="w-4 h-4 text-purple-600 shrink-0" />
          </div>
        </div>

        <div className="bg-white p-3 sm:p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-600 truncate">Response Time</p>
              <p className="text-sm sm:text-lg font-semibold text-gray-900 truncate">
                {platformMetrics.avgResponseTime}h
              </p>
            </div>
            <FiActivity className="w-4 h-4 text-indigo-600 shrink-0" />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
        {/* Daily Activity Chart */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Daily Activity</h3>
            <FiBarChart className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-3 sm:space-y-4">
            {activityData.map((data, index) => (
              <div key={index} className="flex items-center justify-between gap-3">
                <span className="text-sm text-gray-600 w-16 sm:w-20 shrink-0">
                  {new Date(data.date).toLocaleDateString(undefined, { 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </span>
                <div className="flex-1 mx-2 sm:mx-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${Math.min((data.revenue / 3500) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-900 w-16 sm:w-20 text-right shrink-0">
                  {formatCurrency(data.revenue)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Performance */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Category Performance</h3>
            <FiPieChart className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {categoryAnalytics.map((category, index) => (
              <div key={index} className="border-b border-gray-100 pb-3 last:border-b-0">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-900 truncate pr-2">
                    {category.category}
                  </span>
                  <span className="text-sm text-green-600 shrink-0">
                    {formatPercentage(category.growth)}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-gray-600 mb-2">
                  <span className="truncate pr-2">{category.totalProducts} products</span>
                  <span className="shrink-0">{formatCurrency(category.revenue)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <div 
                    className={`h-1 rounded-full transition-all duration-300 ${
                      index === 0 ? 'bg-green-500' : 
                      index === 1 ? 'bg-blue-500' : 
                      index === 2 ? 'bg-orange-500' : 'bg-purple-500'
                    }`}
                    style={{ width: `${Math.min((category.revenue / 200000) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Tables */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        {/* Top Farmers */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Top Performing Farmers</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Farmer
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Products
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {topFarmers.slice(0, 5).map((farmer, index) => (
                  <tr key={farmer.id} className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 shrink-0">
                          <span className="text-green-600 font-medium text-sm">#{index + 1}</span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-medium text-gray-900 truncate">{farmer.name}</div>
                          <div className="text-sm text-gray-500 truncate">{farmer.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{farmer.totalProducts}</div>
                      <div className="text-sm text-green-600">{farmer.approvedProducts} approved</div>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatCurrency(farmer.totalRevenue)}
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-sm text-gray-900 mr-1">{farmer.avgRating}</span>
                        <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Buyers */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Top Buyers</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Buyer
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Orders
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Spent
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Avg Order
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {topBuyers.slice(0, 5).map((buyer, index) => (
                  <tr key={buyer.id} className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 shrink-0">
                          <span className="text-blue-600 font-medium text-sm">#{index + 1}</span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-medium text-gray-900 truncate">{buyer.name}</div>
                          <div className="text-sm text-gray-500 truncate">{buyer.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {buyer.totalOrders}
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatCurrency(buyer.totalSpent)}
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(buyer.avgOrderValue)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
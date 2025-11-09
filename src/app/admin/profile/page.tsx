'use client'

import React, { useState } from 'react'
import { 
  FiUser, 
  FiShield,
  FiKey,
  FiCamera,
  FiDownload,
  FiRefreshCw,
  FiEdit,
  FiMonitor,
  FiSave,
  FiClock,
  FiUsers,
  FiPackage,
  FiShoppingCart,
  FiMessageSquare,
  FiBell,
  FiDatabase,
  FiActivity
} from 'react-icons/fi'

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true)
  type NotificationKey = 'newUsers' | 'newOrders' | 'systemAlerts' | 'productApprovals' | 'messages';

  const [notifications, setNotifications] = useState<Record<NotificationKey, boolean>>({
    newUsers: true,
    newOrders: true,
    systemAlerts: true,
    productApprovals: true,
    messages: false
  })

  const [adminData, setAdminData] = useState({
    id: 'ADM-001',
    name: 'Siraje Admin',
    email: 'siraje@agrilink.com',
    phone: '+1 (555) 123-4567',
    role: 'Super Admin',
    joinDate: '2024-01-15',
    lastLogin: '2025-01-07 14:30',
    profileImage: '/admin-avatar.jpg'
  })

  const [stats] = useState({
    totalUsers: 1247,
    productsApproved: 342,
    ordersProcessed: 156,
    messagesHandled: 89,
    activeHours: 12
  })

  const [activeSessions] = useState([
    { device: 'Desktop - Chrome', location: 'New York, USA', time: '2025-01-07 14:30', current: true },
    { device: 'Mobile - Safari', location: 'New York, USA', time: '2025-01-07 08:15', current: false },
    { device: 'Desktop - Firefox', location: 'New York, USA', time: '2025-01-06 16:45', current: false }
  ])

  const handleSave = () => {
    setIsEditing(false)
    // Save logic here
  }

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const handleNotificationChange = (key: NotificationKey) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!')
      return
    }
    
    if (passwordData.newPassword.length < 8) {
      alert('New password must be at least 8 characters long!')
      return
    }
    
    // Here you would typically make an API call to change the password
    try {
      // Simulate API call
      console.log('Changing password...')
      alert('Password changed successfully!')
      setShowPasswordModal(false)
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } catch {
      alert('Failed to change password. Please try again.')
    }
  }

  // Download anchor ref
  const downloadRef = React.useRef<HTMLAnchorElement>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadName, setDownloadName] = useState<string>('');
  const [pendingWhatsappUrl] = useState<string | null>(null);
  const whatsappRef = React.useRef<HTMLAnchorElement>(null);
  
  const handleExportData = (format: 'csv' | 'json' | 'whatsapp') => {
    const userData = {
      name: adminData.name,
      email: adminData.email,
      role: adminData.role,
      phone: adminData.phone,
      joinedDate: adminData.joinDate,
      lastLogin: adminData.lastLogin,
      id: adminData.id,
      totalUsers: stats.totalUsers,
      productsApproved: stats.productsApproved,
      ordersProcessed: stats.ordersProcessed,
      messagesHandled: stats.messagesHandled,
      activeHours: stats.activeHours
    }
    if (format === 'csv') {
      const csvContent = [
        'Field,Value',
        `Name,${userData.name}`,
        `Email,${userData.email}`,
        `Role,${userData.role}`,
        `Phone,${userData.phone}`,
        `ID,${userData.id}`,
        `Joined Date,${userData.joinedDate}`,
        `Last Login,${userData.lastLogin}`,
        `Total Users Managed,${userData.totalUsers}`,
        `Products Approved,${userData.productsApproved}`,
        `Orders Processed,${userData.ordersProcessed}`,
        `Messages Handled,${userData.messagesHandled}`,
        `Active Hours Today,${userData.activeHours}h`
      ].join('\n')
      const blob = new Blob([csvContent], { type: 'text/csv' })
      const url = URL.createObjectURL(blob)
      setDownloadUrl(url)
      setDownloadName('admin_profile_data.csv')
      setTimeout(() => {
        if (downloadRef.current) {
          downloadRef.current.click();
        }
        URL.revokeObjectURL(url);
        setDownloadUrl(null);
      }, 0);
    } else if (format === 'json') {
      const jsonContent = JSON.stringify(userData, null, 2)
      const blob = new Blob([jsonContent], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      setDownloadUrl(url)
      setDownloadName('admin_profile_data.json')
      setTimeout(() => {
        if (downloadRef.current) {
          downloadRef.current.click();
        }
        URL.revokeObjectURL(url);
        setDownloadUrl(null);
      }, 0);
    } else if (format === 'whatsapp') {
      const whatsappMessage = `🌾 AgriLink Admin Profile:
      
      👤 Name: ${userData.name}
      📧 Email: ${userData.email}
      🏢 Role: ${userData.role}
      📱 Phone: ${userData.phone}
      🆔 ID: ${userData.id}
      📅 Joined: ${userData.joinedDate}
      🕐 Last Login: ${userData.lastLogin}
      
      📊 Admin Statistics:
      👥 Total Users: ${userData.totalUsers}
      ✅ Products Approved: ${userData.productsApproved}
      📦 Orders Processed: ${userData.ordersProcessed}
      💬 Messages Handled: ${userData.messagesHandled}
      ⏰ Active Hours Today: ${userData.activeHours}h`
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`
      window.open(whatsappUrl, '_blank');
    }
    setShowExportModal(false)
  }
  
  // No need for download or WhatsApp effects anymore

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-white">
            Admin Profile
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Manage your admin account and preferences
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <button 
            onClick={() => setShowExportModal(true)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <FiDownload className="w-4 h-4" />
            Export Data
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <FiRefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Profile Information</h2>
              <button
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
              >
                {isEditing ? <FiSave className="w-4 h-4" /> : <FiEdit className="w-4 h-4" />}
                {isEditing ? 'Save' : 'Edit'}
              </button>
            </div>

            <div className="flex items-center gap-6 mb-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gray-300 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                    <FiUser className="w-8 h-8 text-white" />
                  </div>
                </div>
                <button className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow-md border border-gray-300">
                  <FiCamera className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">{adminData.name}</h3>
                <p className="text-sm text-gray-600">{adminData.role}</p>
                <p className="text-sm text-gray-500">ID: {adminData.id}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                <input
                  type="text"
                  value={adminData.name}
                  onChange={(e) => setAdminData({...adminData, name: e.target.value})}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50 dark:disabled:bg-gray-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                <input
                  type="email"
                  value={adminData.email}
                  onChange={(e) => setAdminData({...adminData, email: e.target.value})}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50 dark:disabled:bg-gray-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={adminData.phone}
                  onChange={(e) => setAdminData({...adminData, phone: e.target.value})}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50 dark:disabled:bg-gray-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Join Date</label>
                <input
                  type="text"
                  value={adminData.joinDate}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-300"
                />
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Security Settings</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <FiKey className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Change Password</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Update your account password</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowPasswordModal(true)}
                  className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 dark:bg-blue-900 dark:text-blue-300 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors"
                >
                  Change
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <FiShield className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-600">Add an extra layer of security</p>
                  </div>
                </div>
                <button
                  onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    twoFactorEnabled ? 'bg-green-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Active Sessions */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Active Sessions</h2>
            <div className="space-y-3">
              {activeSessions.map((session, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FiMonitor className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-900">
                        {session.device}
                        {session.current && <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Current</span>}
                      </p>
                      <p className="text-sm text-gray-600">{session.location} • {session.time}</p>
                    </div>
                  </div>
                  {!session.current && (
                    <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                      End Session
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Stats & Preferences */}
        <div className="space-y-6">
          {/* Admin Statistics */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Admin Statistics</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FiUsers className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">Total Users</span>
                </div>
                <span className="font-semibold text-gray-900">{stats.totalUsers}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FiPackage className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">Products Approved</span>
                </div>
                <span className="font-semibold text-gray-900">{stats.productsApproved}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FiShoppingCart className="w-5 h-5 text-purple-600" />
                  <span className="text-gray-700">Orders Processed</span>
                </div>
                <span className="font-semibold text-gray-900">{stats.ordersProcessed}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FiMessageSquare className="w-5 h-5 text-orange-600" />
                  <span className="text-gray-700">Messages Handled</span>
                </div>
                <span className="font-semibold text-gray-900">{stats.messagesHandled}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FiClock className="w-5 h-5 text-red-600" />
                  <span className="text-gray-700">Active Hours Today</span>
                </div>
                <span className="font-semibold text-gray-900">{stats.activeHours}h</span>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Preferences</h2>
            <div className="space-y-4">
              {/* You can add other preference options here in the future */}
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Theme settings have been moved to the Settings page for better organization.
              </p>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Notifications</h2>
            <div className="space-y-4">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FiBell className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  </div>
                  <button
                    onClick={() => handleNotificationChange(key as NotificationKey)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      value ? 'bg-green-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        value ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-3 text-left bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                <FiActivity className="w-5 h-5" />
                System Health Check
              </button>
              <button className="w-full flex items-center gap-3 p-3 text-left bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
                <FiDatabase className="w-5 h-5" />
                Backup Database
              </button>
              <button className="w-full flex items-center gap-3 p-3 text-left bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
                <FiRefreshCw className="w-5 h-5" />
                Clear Cache
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0  bg-opacity-30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Change Password</h3>
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter current password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                    required
                    minLength={8}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter new password (min 8 characters)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Confirm new password"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowPasswordModal(false)
                      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
                    }}
                    className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Export Data Modal */}
      {showExportModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
      <div className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Export Profile Data</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
      Choose how you&apos;d like to export your profile and admin statistics:
      </p>
      
      <div className="space-y-3">
      <button
      onClick={() => handleExportData('csv')}
      className="w-full flex items-center gap-3 p-4 text-left border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
      <FiDownload className="w-5 h-5 text-green-600" />
      <div>
      <p className="font-medium text-gray-900 dark:text-white">CSV File</p>
      <p className="text-sm text-gray-600 dark:text-gray-400">Download as spreadsheet file</p>
      </div>
      </button>
      
      <button
      onClick={() => handleExportData('json')}
      className="w-full flex items-center gap-3 p-4 text-left border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
      <FiDatabase className="w-5 h-5 text-blue-600" />
      <div>
      <p className="font-medium text-gray-900 dark:text-white">JSON File</p>
      <p className="text-sm text-gray-600 dark:text-gray-400">Download as JSON data file</p>
      </div>
      </button>
      
      <button
      onClick={() => handleExportData('whatsapp')}
      className="w-full flex items-center gap-3 p-4 text-left border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
      <FiMessageSquare className="w-5 h-5 text-green-500" />
      <div>
      <p className="font-medium text-gray-900 dark:text-white">Share via WhatsApp</p>
      <p className="text-sm text-gray-600 dark:text-gray-400">Share profile summary on WhatsApp</p>
      </div>
      </button>
      </div>
      
      <div className="flex gap-3 pt-6">
      <button
      onClick={() => setShowExportModal(false)}
      className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
      >
      Cancel
      </button>
      </div>
      {/* Hidden anchor for download */}
      <a
      ref={downloadRef}
      href={downloadUrl || undefined}
      download={downloadName}
      style={{ display: 'none' }}
      >
      Download
      </a>
      {/* Hidden anchor for WhatsApp */}
      <a
        ref={whatsappRef}
        href={pendingWhatsappUrl || undefined}
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: 'none' }}
      >
        WhatsApp
      </a>
      </div>
      </div>
      </div>
      )}
    </div>
  )
}
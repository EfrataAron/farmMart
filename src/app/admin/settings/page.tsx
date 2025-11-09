'use client'

import React, { useState, useEffect } from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import { 
  FiSettings, 
  FiShield, 
  FiDollarSign,
  FiUsers,
  FiPackage,
  FiTruck,
  FiBell,
  FiSave,
  FiAlertTriangle,
  FiServer,
  FiRefreshCw,
  FiMoon,
  FiSun,
  FiMonitor,
  FiEye,
} from 'react-icons/fi'

interface PlatformSettings {
  general: {
    platformName: string
    platformLogo: string
    platformDescription: string
    contactEmail: string
    contactPhone: string
    address: string
    timezone: string
    language: string
    currency: string
    dateFormat: string
    timeFormat: string
  }
  appearance: {
    darkMode: boolean
    theme: 'light' | 'dark' | 'system'
    primaryColor: string
    compactMode: boolean
    animationsEnabled: boolean
    sidebarCollapsed: boolean
  }
  business: {
    commissionRate: number
    minimumOrderValue: number
    maxOrderValue: number
    defaultShippingFee: number
    taxRate: number
    refundPolicy: string
    termsOfService: string
    privacyPolicy: string
  }
  users: {
    allowSelfRegistration: boolean
    requireEmailVerification: boolean
    autoApproveUsers: boolean
    passwordMinLength: number
    enableTwoFactor: boolean
    sessionTimeout: number
    maxLoginAttempts: number
    lockoutDuration: number
  }
  products: {
    autoApproveProducts: boolean
    requireProductImages: boolean
    maxImagesPerProduct: number
    allowProductReviews: boolean
    requireProductDescription: boolean
    minDescriptionLength: number
    enableProductCategories: boolean
    allowBulkUpload: boolean
  }
  orders: {
    autoConfirmOrders: boolean
    orderCancellationWindow: number
    requireSignature: boolean
    enableOrderTracking: boolean
    defaultPaymentMethod: string
    allowCashOnDelivery: boolean
    orderNumberFormat: string
    enableInstantPayment: boolean
  }
  notifications: {
    emailNotifications: boolean
    smsNotifications: boolean
    pushNotifications: boolean
    newUserNotifications: boolean
    newOrderNotifications: boolean
    lowStockNotifications: boolean
    paymentNotifications: boolean
    systemAlerts: boolean
  }
  security: {
    enableSSL: boolean
    enableFirewall: boolean
    enableBruteForceProtection: boolean
    enableRateLimiting: boolean
    dataEncryption: boolean
    backupFrequency: string
    auditLogging: boolean
    ipWhitelist: string[]
  }
  system: {
    maintenanceMode: boolean
    debugMode: boolean
    cacheEnabled: boolean
    compressionEnabled: boolean
    cdnEnabled: boolean
    analyticsEnabled: boolean
    errorReporting: boolean
    performanceMonitoring: boolean
  }
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general')
  const { theme, setTheme } = useTheme()
  const [settings, setSettings] = useState<PlatformSettings>({
    general: {
      platformName: 'AgriLink',
      platformLogo: '/logo.png',
      platformDescription: 'Connecting farmers directly with buyers',
      contactEmail: 'support@agrilink.com',
      contactPhone: '+1 (555) 123-4567',
      address: '123 Agriculture St, Farm City, FC 12345',
      timezone: 'America/New_York',
      language: 'en',
      currency: 'USD',
      dateFormat: 'MM/DD/YYYY',
      timeFormat: '12h'
    },
    appearance: {
      darkMode: theme === 'dark',
      theme: theme,
      primaryColor: '#059669',
      compactMode: false,
      animationsEnabled: true,
      sidebarCollapsed: false
    },
    business: {
      commissionRate: 5.0,
      minimumOrderValue: 25.00,
      maxOrderValue: 10000.00,
      defaultShippingFee: 15.00,
      taxRate: 8.5,
      refundPolicy: '30 days return policy',
      termsOfService: 'Terms and conditions apply',
      privacyPolicy: 'Privacy policy in effect'
    },
    users: {
      allowSelfRegistration: true,
      requireEmailVerification: true,
      autoApproveUsers: false,
      passwordMinLength: 8,
      enableTwoFactor: true,
      sessionTimeout: 30,
      maxLoginAttempts: 5,
      lockoutDuration: 15
    },
    products: {
      autoApproveProducts: false,
      requireProductImages: true,
      maxImagesPerProduct: 10,
      allowProductReviews: true,
      requireProductDescription: true,
      minDescriptionLength: 50,
      enableProductCategories: true,
      allowBulkUpload: true
    },
    orders: {
      autoConfirmOrders: false,
      orderCancellationWindow: 24,
      requireSignature: false,
      enableOrderTracking: true,
      defaultPaymentMethod: 'credit_card',
      allowCashOnDelivery: true,
      orderNumberFormat: 'ORD-{YYYY}-{MM}-{###}',
      enableInstantPayment: true
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      newUserNotifications: true,
      newOrderNotifications: true,
      lowStockNotifications: true,
      paymentNotifications: true,
      systemAlerts: true
    },
    security: {
      enableSSL: true,
      enableFirewall: true,
      enableBruteForceProtection: true,
      enableRateLimiting: true,
      dataEncryption: true,
      backupFrequency: 'daily',
      auditLogging: true,
      ipWhitelist: []
    },
    system: {
      maintenanceMode: false,
      debugMode: false,
      cacheEnabled: true,
      compressionEnabled: true,
      cdnEnabled: true,
      analyticsEnabled: true,
      errorReporting: true,
      performanceMonitoring: true
    }
  })

  const [hasChanges, setHasChanges] = useState(false)
  const [saving, setSaving] = useState(false)

  // Sync settings with theme context
  useEffect(() => {
    setSettings(prev => ({
      ...prev,
      appearance: {
        ...prev.appearance,
        theme: theme,
        darkMode: theme === 'dark'
      }
    }))
  }, [theme])

  const tabs = [
    { id: 'general', label: 'General', icon: FiSettings },
    { id: 'appearance', label: 'Appearance', icon: FiEye },
    { id: 'business', label: 'Business', icon: FiDollarSign },
    { id: 'users', label: 'Users', icon: FiUsers },
    { id: 'products', label: 'Products', icon: FiPackage },
    { id: 'orders', label: 'Orders', icon: FiTruck },
    { id: 'notifications', label: 'Notifications', icon: FiBell },
    { id: 'security', label: 'Security', icon: FiShield },
    { id: 'system', label: 'System', icon: FiServer }
  ]

  const handleToggle = <S extends keyof PlatformSettings, F extends keyof PlatformSettings[S]>(
    section: S,
    field: F
  ) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: !prev[section][field]
      }
    }))
    setHasChanges(true)
    
    // Handle dark mode toggle immediately
    if (section === 'appearance' && field === 'darkMode') {
      const newValue = !settings.appearance.darkMode
      if (newValue) {
        setTheme('dark')
      } else {
        setTheme('light')
      }
    }
  }

  const handleInputChange = (section: keyof PlatformSettings, field: string, value: string | number) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
    setHasChanges(true)
    
    // Handle theme changes immediately
    if (section === 'appearance' && field === 'theme') {
      setTheme(value as 'light' | 'dark' | 'system')
    }
  }

  const handleSave = async () => {
    setSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setSaving(false)
    setHasChanges(false)
    // Show success message
  }

  const handleReset = () => {
    // Reset to default values
    setHasChanges(false)
  }

  const ToggleSwitch = ({ enabled, onToggle, label }: { enabled: boolean; onToggle: () => void; label: string }) => (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-gray-700">{label}</span>
      <button
        onClick={onToggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          enabled ? 'bg-green-600' : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  )

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900">
            Platform Settings
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Configure your platform settings and preferences
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleReset}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <FiRefreshCw className="w-4 h-4" />
            Reset
          </button>
          <button
            onClick={handleSave}
            disabled={!hasChanges || saving}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? <FiRefreshCw className="w-4 h-4 animate-spin" /> : <FiSave className="w-4 h-4" />}
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Changes Alert */}
      {hasChanges && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2">
            <FiAlertTriangle className="w-5 h-5 text-yellow-600" />
            <span className="text-sm text-yellow-800">
              You have unsaved changes. Don&apos;t forget to save your settings.
            </span>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 bg-gray-50 border-r border-gray-200">
            <div className="p-4">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-green-100 text-green-800'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6">
            {/* General Settings */}
            {activeTab === 'general' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">General Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Platform Name</label>
                      <input
                        type="text"
                        value={settings.general.platformName}
                        onChange={(e) => handleInputChange('general', 'platformName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                      <input
                        type="email"
                        value={settings.general.contactEmail}
                        onChange={(e) => handleInputChange('general', 'contactEmail', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
                      <input
                        type="tel"
                        value={settings.general.contactPhone}
                        onChange={(e) => handleInputChange('general', 'contactPhone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                      <select
                        value={settings.general.timezone}
                        onChange={(e) => handleInputChange('general', 'timezone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="America/New_York">Eastern Time</option>
                        <option value="America/Chicago">Central Time</option>
                        <option value="America/Denver">Mountain Time</option>
                        <option value="America/Los_Angeles">Pacific Time</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                      <select
                        value={settings.general.currency}
                        onChange={(e) => handleInputChange('general', 'currency', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                        <option value="CAD">CAD ($)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                      <select
                        value={settings.general.language}
                        onChange={(e) => handleInputChange('general', 'language', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Platform Description</label>
                    <textarea
                      value={settings.general.platformDescription}
                      onChange={(e) => handleInputChange('general', 'platformDescription', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <textarea
                      value={settings.general.address}
                      onChange={(e) => handleInputChange('general', 'address', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Appearance Settings */}
            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Appearance Settings</h3>
                  
                  {/* Theme Settings */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <h4 className="text-md font-medium text-gray-800 mb-4">Theme</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Theme Mode</label>
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleInputChange('appearance', 'theme', 'light')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-colors ${
                              settings.appearance.theme === 'light'
                                ? 'border-green-500 bg-green-50 text-green-700'
                                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                            }`}
                          >
                            <FiSun className="w-4 h-4" />
                            Light
                          </button>
                          <button
                            onClick={() => handleInputChange('appearance', 'theme', 'dark')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-colors ${
                              settings.appearance.theme === 'dark'
                                ? 'border-green-500 bg-green-50 text-green-700'
                                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                            }`}
                          >
                            <FiMoon className="w-4 h-4" />
                            Dark
                          </button>
                          <button
                            onClick={() => handleInputChange('appearance', 'theme', 'system')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-colors ${
                              settings.appearance.theme === 'system'
                                ? 'border-green-500 bg-green-50 text-green-700'
                                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                            }`}
                          >
                            <FiMonitor className="w-4 h-4" />
                            System
                          </button>
                        </div>
                      </div>
                      
                      <ToggleSwitch
                        enabled={settings.appearance.darkMode}
                        onToggle={() => handleToggle('appearance', 'darkMode')}
                        label="Enable Dark Mode (Override)"
                      />
                    </div>
                  </div>

                  {/* Layout Settings */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <h4 className="text-md font-medium text-gray-800 mb-4">Layout</h4>
                    <div className="space-y-3">
                      <ToggleSwitch
                        enabled={settings.appearance.compactMode}
                        onToggle={() => handleToggle('appearance', 'compactMode')}
                        label="Compact Mode"
                      />
                      <ToggleSwitch
                        enabled={settings.appearance.sidebarCollapsed}
                        onToggle={() => handleToggle('appearance', 'sidebarCollapsed')}
                        label="Collapsed Sidebar by Default"
                      />
                      <ToggleSwitch
                        enabled={settings.appearance.animationsEnabled}
                        onToggle={() => handleToggle('appearance', 'animationsEnabled')}
                        label="Enable Animations"
                      />
                    </div>
                  </div>

                  {/* Color Settings */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-md font-medium text-gray-800 mb-4">Colors</h4>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          value={settings.appearance.primaryColor}
                          onChange={(e) => handleInputChange('appearance', 'primaryColor', e.target.value)}
                          className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={settings.appearance.primaryColor}
                          onChange={(e) => handleInputChange('appearance', 'primaryColor', e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="#059669"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Business Settings */}
            {activeTab === 'business' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Commission Rate (%)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={settings.business.commissionRate}
                        onChange={(e) => handleInputChange('business', 'commissionRate', parseFloat(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tax Rate (%)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={settings.business.taxRate}
                        onChange={(e) => handleInputChange('business', 'taxRate', parseFloat(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Order Value ($)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={settings.business.minimumOrderValue}
                        onChange={(e) => handleInputChange('business', 'minimumOrderValue', parseFloat(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Order Value ($)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={settings.business.maxOrderValue}
                        onChange={(e) => handleInputChange('business', 'maxOrderValue', parseFloat(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Default Shipping Fee ($)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={settings.business.defaultShippingFee}
                        onChange={(e) => handleInputChange('business', 'defaultShippingFee', parseFloat(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* User Settings */}
            {activeTab === 'users' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">User Management</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-3">Registration Settings</h4>
                      <div className="space-y-3">
                        <ToggleSwitch
                          enabled={settings.users.allowSelfRegistration}
                          onToggle={() => handleToggle('users', 'allowSelfRegistration')}
                          label="Allow Self Registration"
                        />
                        <ToggleSwitch
                          enabled={settings.users.requireEmailVerification}
                          onToggle={() => handleToggle('users', 'requireEmailVerification')}
                          label="Require Email Verification"
                        />
                        <ToggleSwitch
                          enabled={settings.users.autoApproveUsers}
                          onToggle={() => handleToggle('users', 'autoApproveUsers')}
                          label="Auto-Approve New Users"
                        />
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-3">Security Settings</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Password Min Length</label>
                          <input
                            type="number"
                            value={settings.users.passwordMinLength}
                            onChange={(e) => handleInputChange('users', 'passwordMinLength', parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                          <input
                            type="number"
                            value={settings.users.sessionTimeout}
                            onChange={(e) => handleInputChange('users', 'sessionTimeout', parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Max Login Attempts</label>
                          <input
                            type="number"
                            value={settings.users.maxLoginAttempts}
                            onChange={(e) => handleInputChange('users', 'maxLoginAttempts', parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Lockout Duration (minutes)</label>
                          <input
                            type="number"
                            value={settings.users.lockoutDuration}
                            onChange={(e) => handleInputChange('users', 'lockoutDuration', parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                        </div>
                      </div>
                      <div className="mt-3">
                        <ToggleSwitch
                          enabled={settings.users.enableTwoFactor}
                          onToggle={() => handleToggle('users', 'enableTwoFactor')}
                          label="Enable Two-Factor Authentication"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Product Settings */}
            {activeTab === 'products' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Management</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-3">Product Approval</h4>
                      <div className="space-y-3">
                        <ToggleSwitch
                          enabled={settings.products.autoApproveProducts}
                          onToggle={() => handleToggle('products', 'autoApproveProducts')}
                          label="Auto-Approve New Products"
                        />
                        <ToggleSwitch
                          enabled={settings.products.requireProductImages}
                          onToggle={() => handleToggle('products', 'requireProductImages')}
                          label="Require Product Images"
                        />
                        <ToggleSwitch
                          enabled={settings.products.requireProductDescription}
                          onToggle={() => handleToggle('products', 'requireProductDescription')}
                          label="Require Product Description"
                        />
                        <ToggleSwitch
                          enabled={settings.products.allowProductReviews}
                          onToggle={() => handleToggle('products', 'allowProductReviews')}
                          label="Allow Product Reviews"
                        />
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-3">Product Limits</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Max Images Per Product</label>
                          <input
                            type="number"
                            value={settings.products.maxImagesPerProduct}
                            onChange={(e) => handleInputChange('products', 'maxImagesPerProduct', parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Min Description Length</label>
                          <input
                            type="number"
                            value={settings.products.minDescriptionLength}
                            onChange={(e) => handleInputChange('products', 'minDescriptionLength', parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Settings</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-3">Notification Channels</h4>
                      <div className="space-y-3">
                        <ToggleSwitch
                          enabled={settings.notifications.emailNotifications}
                          onToggle={() => handleToggle('notifications', 'emailNotifications')}
                          label="Email Notifications"
                        />
                        <ToggleSwitch
                          enabled={settings.notifications.smsNotifications}
                          onToggle={() => handleToggle('notifications', 'smsNotifications')}
                          label="SMS Notifications"
                        />
                        <ToggleSwitch
                          enabled={settings.notifications.pushNotifications}
                          onToggle={() => handleToggle('notifications', 'pushNotifications')}
                          label="Push Notifications"
                        />
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-3">Event Notifications</h4>
                      <div className="space-y-3">
                        <ToggleSwitch
                          enabled={settings.notifications.newUserNotifications}
                          onToggle={() => handleToggle('notifications', 'newUserNotifications')}
                          label="New User Registrations"
                        />
                        <ToggleSwitch
                          enabled={settings.notifications.newOrderNotifications}
                          onToggle={() => handleToggle('notifications', 'newOrderNotifications')}
                          label="New Orders"
                        />
                        <ToggleSwitch
                          enabled={settings.notifications.paymentNotifications}
                          onToggle={() => handleToggle('notifications', 'paymentNotifications')}
                          label="Payment Notifications"
                        />
                        <ToggleSwitch
                          enabled={settings.notifications.systemAlerts}
                          onToggle={() => handleToggle('notifications', 'systemAlerts')}
                          label="System Alerts"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-3">Security Features</h4>
                      <div className="space-y-3">
                        <ToggleSwitch
                          enabled={settings.security.enableSSL}
                          onToggle={() => handleToggle('security', 'enableSSL')}
                          label="Enable SSL/TLS"
                        />
                        <ToggleSwitch
                          enabled={settings.security.enableFirewall}
                          onToggle={() => handleToggle('security', 'enableFirewall')}
                          label="Enable Firewall"
                        />
                        <ToggleSwitch
                          enabled={settings.security.enableBruteForceProtection}
                          onToggle={() => handleToggle('security', 'enableBruteForceProtection')}
                          label="Brute Force Protection"
                        />
                        <ToggleSwitch
                          enabled={settings.security.enableRateLimiting}
                          onToggle={() => handleToggle('security', 'enableRateLimiting')}
                          label="Rate Limiting"
                        />
                        <ToggleSwitch
                          enabled={settings.security.dataEncryption}
                          onToggle={() => handleToggle('security', 'dataEncryption')}
                          label="Data Encryption"
                        />
                        <ToggleSwitch
                          enabled={settings.security.auditLogging}
                          onToggle={() => handleToggle('security', 'auditLogging')}
                          label="Audit Logging"
                        />
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-3">Backup Settings</h4>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Backup Frequency</label>
                        <select
                          value={settings.security.backupFrequency}
                          onChange={(e) => handleInputChange('security', 'backupFrequency', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                          <option value="hourly">Hourly</option>
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* System Settings */}
            {activeTab === 'system' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">System Settings</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-3">System Status</h4>
                      <div className="space-y-3">
                        <ToggleSwitch
                          enabled={settings.system.maintenanceMode}
                          onToggle={() => handleToggle('system', 'maintenanceMode')}
                          label="Maintenance Mode"
                        />
                        <ToggleSwitch
                          enabled={settings.system.debugMode}
                          onToggle={() => handleToggle('system', 'debugMode')}
                          label="Debug Mode"
                        />
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-3">Performance Settings</h4>
                      <div className="space-y-3">
                        <ToggleSwitch
                          enabled={settings.system.cacheEnabled}
                          onToggle={() => handleToggle('system', 'cacheEnabled')}
                          label="Enable Caching"
                        />
                        <ToggleSwitch
                          enabled={settings.system.compressionEnabled}
                          onToggle={() => handleToggle('system', 'compressionEnabled')}
                          label="Enable Compression"
                        />
                        <ToggleSwitch
                          enabled={settings.system.cdnEnabled}
                          onToggle={() => handleToggle('system', 'cdnEnabled')}
                          label="Enable CDN"
                        />
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-3">Monitoring & Analytics</h4>
                      <div className="space-y-3">
                        <ToggleSwitch
                          enabled={settings.system.analyticsEnabled}
                          onToggle={() => handleToggle('system', 'analyticsEnabled')}
                          label="Enable Analytics"
                        />
                        <ToggleSwitch
                          enabled={settings.system.errorReporting}
                          onToggle={() => handleToggle('system', 'errorReporting')}
                          label="Error Reporting"
                        />
                        <ToggleSwitch
                          enabled={settings.system.performanceMonitoring}
                          onToggle={() => handleToggle('system', 'performanceMonitoring')}
                          label="Performance Monitoring"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
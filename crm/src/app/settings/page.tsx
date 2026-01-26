'use client'

import { useState } from 'react'
import { Header } from '@/components/layout'
import { Button, Input, Select } from '@/components/ui'
import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Mail,
  Building,
  CreditCard,
  Truck,
  Save,
  Check,
} from 'lucide-react'
import toast from 'react-hot-toast'

type SettingsTab = 'profile' | 'notifications' | 'security' | 'appearance' | 'business' | 'billing' | 'integrations'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile')
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate save
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
    toast.success('Settings saved successfully')
  }

  const tabs = [
    { id: 'profile' as const, label: 'Profile', icon: <User className="w-4 h-4" /> },
    { id: 'notifications' as const, label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
    { id: 'security' as const, label: 'Security', icon: <Shield className="w-4 h-4" /> },
    { id: 'appearance' as const, label: 'Appearance', icon: <Palette className="w-4 h-4" /> },
    { id: 'business' as const, label: 'Business', icon: <Building className="w-4 h-4" /> },
    { id: 'billing' as const, label: 'Billing', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'integrations' as const, label: 'Integrations', icon: <Globe className="w-4 h-4" /> },
  ]

  return (
    <div className="min-h-screen">
      <Header title="Settings" subtitle="Manage your account and preferences" />

      <div className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-64 shrink-0">
            <nav className="card p-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {tab.icon}
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="card">
              {activeTab === 'profile' && <ProfileSettings />}
              {activeTab === 'notifications' && <NotificationSettings />}
              {activeTab === 'security' && <SecuritySettings />}
              {activeTab === 'appearance' && <AppearanceSettings />}
              {activeTab === 'business' && <BusinessSettings />}
              {activeTab === 'billing' && <BillingSettings />}
              {activeTab === 'integrations' && <IntegrationSettings />}

              {/* Save Button */}
              <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
                <Button onClick={handleSave} isLoading={isSaving} leftIcon={<Save className="w-4 h-4" />}>
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProfileSettings() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Profile Information</h2>
        <p className="text-sm text-gray-500 mt-1">Update your account details and personal information.</p>
      </div>

      <div className="flex items-center gap-6">
        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-2xl font-semibold text-gray-600">
          AR
        </div>
        <div>
          <Button variant="outline" size="sm">Change Photo</Button>
          <p className="text-xs text-gray-500 mt-2">JPG, PNG or GIF. Max 2MB.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input label="First Name" defaultValue="Admin" />
        <Input label="Last Name" defaultValue="User" />
        <Input label="Email Address" type="email" defaultValue="admin@tiredeals.com" />
        <Input label="Phone Number" type="tel" defaultValue="(555) 123-4567" />
        <div className="md:col-span-2">
          <Input label="Job Title" defaultValue="System Administrator" />
        </div>
      </div>
    </div>
  )
}

function NotificationSettings() {
  const [emailNotifications, setEmailNotifications] = useState({
    newOrders: true,
    orderUpdates: true,
    lowStock: true,
    supportTickets: true,
    marketing: false,
  })

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Notification Preferences</h2>
        <p className="text-sm text-gray-500 mt-1">Choose how you want to be notified.</p>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-900">Email Notifications</h3>
        {[
          { key: 'newOrders', label: 'New Orders', description: 'Receive email when new orders are placed' },
          { key: 'orderUpdates', label: 'Order Updates', description: 'Receive email for order status changes' },
          { key: 'lowStock', label: 'Low Stock Alerts', description: 'Receive email when inventory is low' },
          { key: 'supportTickets', label: 'Support Tickets', description: 'Receive email for new support tickets' },
          { key: 'marketing', label: 'Marketing Updates', description: 'Receive product and feature updates' },
        ].map((item) => (
          <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-900">{item.label}</p>
              <p className="text-sm text-gray-500">{item.description}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={emailNotifications[item.key as keyof typeof emailNotifications]}
                onChange={(e) =>
                  setEmailNotifications({ ...emailNotifications, [item.key]: e.target.checked })
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-primary-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

function SecuritySettings() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Security Settings</h2>
        <p className="text-sm text-gray-500 mt-1">Manage your password and security preferences.</p>
      </div>

      <div className="space-y-6">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-900">Change Password</h3>
          <div className="mt-4 space-y-4">
            <Input label="Current Password" type="password" />
            <Input label="New Password" type="password" />
            <Input label="Confirm New Password" type="password" />
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h3>
              <p className="text-sm text-gray-500 mt-1">Add an extra layer of security to your account.</p>
            </div>
            <Button variant="outline" size="sm">Enable</Button>
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-900">Active Sessions</h3>
          <p className="text-sm text-gray-500 mt-1">Manage your active sessions across devices.</p>
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
              <div>
                <p className="text-sm font-medium text-gray-900">Chrome on MacOS</p>
                <p className="text-xs text-gray-500">Current session • Last active now</p>
              </div>
              <span className="badge badge-success">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AppearanceSettings() {
  const [theme, setTheme] = useState('light')
  const [density, setDensity] = useState('comfortable')

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Appearance</h2>
        <p className="text-sm text-gray-500 mt-1">Customize how the CRM looks and feels.</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Theme</label>
          <div className="grid grid-cols-3 gap-4">
            {['light', 'dark', 'system'].map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`p-4 rounded-lg border-2 text-center transition-colors ${
                  theme === t
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <p className="text-sm font-medium text-gray-900 capitalize">{t}</p>
              </button>
            ))}
          </div>
        </div>

        <Select
          label="Display Density"
          value={density}
          onChange={(e) => setDensity(e.target.value)}
          options={[
            { value: 'compact', label: 'Compact' },
            { value: 'comfortable', label: 'Comfortable' },
            { value: 'spacious', label: 'Spacious' },
          ]}
        />

        <Select
          label="Date Format"
          options={[
            { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
            { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
            { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' },
          ]}
        />

        <Select
          label="Time Zone"
          options={[
            { value: 'America/New_York', label: 'Eastern Time (ET)' },
            { value: 'America/Chicago', label: 'Central Time (CT)' },
            { value: 'America/Denver', label: 'Mountain Time (MT)' },
            { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
          ]}
        />
      </div>
    </div>
  )
}

function BusinessSettings() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Business Information</h2>
        <p className="text-sm text-gray-500 mt-1">Update your business details.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input label="Business Name" defaultValue="TireDeals Inc." />
        <Input label="Business Email" type="email" defaultValue="support@tiredeals.com" />
        <Input label="Business Phone" type="tel" defaultValue="1-800-TIREDEALS" />
        <Input label="Tax ID / EIN" defaultValue="XX-XXXXXXX" />
        <div className="md:col-span-2">
          <Input label="Address Line 1" defaultValue="123 Tire Street" />
        </div>
        <Input label="City" defaultValue="Houston" />
        <Input label="State" defaultValue="TX" />
        <Input label="ZIP Code" defaultValue="77001" />
        <Input label="Country" defaultValue="United States" />
      </div>
    </div>
  )
}

function BillingSettings() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Billing & Subscription</h2>
        <p className="text-sm text-gray-500 mt-1">Manage your subscription and payment methods.</p>
      </div>

      <div className="p-4 bg-primary-50 border border-primary-200 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-primary-900">Enterprise Plan</p>
            <p className="text-sm text-primary-700">Unlimited users, all features included</p>
          </div>
          <span className="badge badge-primary">Active</span>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-900">Payment Methods</h3>
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                VISA
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">•••• •••• •••• 4242</p>
                <p className="text-xs text-gray-500">Expires 12/2027</p>
              </div>
            </div>
            <span className="text-xs text-primary-600 font-medium">Default</span>
          </div>
        </div>
        <Button variant="outline" size="sm">Add Payment Method</Button>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-900">Billing History</h3>
        <div className="overflow-hidden rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { date: 'Jan 1, 2025', description: 'Enterprise Plan - Monthly', amount: '$299.00', status: 'Paid' },
                { date: 'Dec 1, 2024', description: 'Enterprise Plan - Monthly', amount: '$299.00', status: 'Paid' },
                { date: 'Nov 1, 2024', description: 'Enterprise Plan - Monthly', amount: '$299.00', status: 'Paid' },
              ].map((invoice, i) => (
                <tr key={i}>
                  <td className="px-4 py-3 text-sm text-gray-900">{invoice.date}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{invoice.description}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{invoice.amount}</td>
                  <td className="px-4 py-3">
                    <span className="badge badge-success">{invoice.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function IntegrationSettings() {
  const integrations = [
    { name: 'Shipping Carriers', description: 'FedEx, UPS, USPS', connected: true, icon: <Truck className="w-5 h-5" /> },
    { name: 'Email Service', description: 'SendGrid', connected: true, icon: <Mail className="w-5 h-5" /> },
    { name: 'Google Analytics', description: 'Track website visitors', connected: false, icon: <Globe className="w-5 h-5" /> },
  ]

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Integrations</h2>
        <p className="text-sm text-gray-500 mt-1">Connect third-party services to enhance your CRM.</p>
      </div>

      <div className="space-y-4">
        {integrations.map((integration) => (
          <div key={integration.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-gray-600 border border-gray-200">
                {integration.icon}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{integration.name}</p>
                <p className="text-sm text-gray-500">{integration.description}</p>
              </div>
            </div>
            {integration.connected ? (
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 text-sm text-success-600">
                  <Check className="w-4 h-4" />
                  Connected
                </span>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
            ) : (
              <Button variant="primary" size="sm">Connect</Button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

'use client'

import { Header } from '@/components/layout'
import { useState } from 'react'
import {
  Truck,
  Settings,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Eye,
  EyeOff,
  RefreshCw,
  TestTube,
  Save,
  ExternalLink,
  Info,
  Package,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface CarrierConfig {
  carrier: string
  name: string
  logo: string
  isActive: boolean
  isConnected: boolean
  testMode: boolean
  accountNumber: string
  defaultService: string
  markupPercent: number
  lastSync: Date | null
  services: string[]
}

// Mock data
const carriers: CarrierConfig[] = [
  {
    carrier: 'FEDEX',
    name: 'FedEx',
    logo: '/carriers/fedex.png',
    isActive: true,
    isConnected: true,
    testMode: false,
    accountNumber: '****5678',
    defaultService: 'FEDEX_GROUND',
    markupPercent: 5,
    lastSync: new Date(Date.now() - 3600000),
    services: ['Ground', 'Express', '2Day', 'Overnight'],
  },
  {
    carrier: 'UPS',
    name: 'UPS',
    logo: '/carriers/ups.png',
    isActive: true,
    isConnected: true,
    testMode: false,
    accountNumber: '****9012',
    defaultService: 'UPS_GROUND',
    markupPercent: 5,
    lastSync: new Date(Date.now() - 7200000),
    services: ['Ground', '3 Day Select', '2nd Day Air', 'Next Day Air'],
  },
  {
    carrier: 'USPS',
    name: 'USPS',
    logo: '/carriers/usps.png',
    isActive: true,
    isConnected: true,
    testMode: true,
    accountNumber: '****3456',
    defaultService: 'PRIORITY_MAIL',
    markupPercent: 0,
    lastSync: new Date(Date.now() - 14400000),
    services: ['Priority Mail', 'Priority Mail Express', 'Ground Advantage'],
  },
  {
    carrier: 'DHL',
    name: 'DHL',
    logo: '/carriers/dhl.png',
    isActive: false,
    isConnected: false,
    testMode: true,
    accountNumber: '',
    defaultService: '',
    markupPercent: 0,
    lastSync: null,
    services: [],
  },
]

const stats = {
  shipmentsToday: 42,
  avgShippingCost: 28.50,
  onTimeRate: 96.5,
  activeCarriers: 3,
}

export default function ShippingSettingsPage() {
  const [selectedCarrier, setSelectedCarrier] = useState<CarrierConfig | null>(null)
  const [showApiKey, setShowApiKey] = useState(false)

  return (
    <div className="min-h-screen">
      <Header
        title="Shipping Integration"
        subtitle="Configure carrier APIs for real-time tracking and label generation"
      />

      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Shipments Today"
            value={stats.shipmentsToday}
            icon={<Package className="w-5 h-5" />}
            color="blue"
          />
          <StatCard
            title="Avg. Shipping Cost"
            value={`$${stats.avgShippingCost.toFixed(2)}`}
            icon={<Truck className="w-5 h-5" />}
            color="green"
          />
          <StatCard
            title="On-Time Delivery"
            value={`${stats.onTimeRate}%`}
            icon={<CheckCircle className="w-5 h-5" />}
            color="purple"
          />
          <StatCard
            title="Active Carriers"
            value={stats.activeCarriers}
            icon={<Settings className="w-5 h-5" />}
            color="amber"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Carriers List */}
          <div className="lg:col-span-1">
            <div className="card">
              <div className="card-header">
                <h2 className="text-lg font-semibold text-gray-900">Shipping Carriers</h2>
              </div>
              <div className="divide-y">
                {carriers.map((carrier) => (
                  <button
                    key={carrier.carrier}
                    onClick={() => setSelectedCarrier(carrier)}
                    className={cn(
                      'w-full p-4 text-left hover:bg-gray-50 transition-colors',
                      selectedCarrier?.carrier === carrier.carrier && 'bg-primary-50'
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center font-bold text-gray-600">
                        {carrier.name.slice(0, 2)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">{carrier.name}</span>
                          {carrier.testMode && (
                            <span className="text-xs px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded">
                              Test
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          {carrier.isConnected ? (
                            <span className="flex items-center gap-1 text-xs text-green-600">
                              <CheckCircle className="w-3 h-3" />
                              Connected
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-xs text-gray-400">
                              <XCircle className="w-3 h-3" />
                              Not Connected
                            </span>
                          )}
                          {carrier.isActive && (
                            <span className="text-xs text-gray-400">•</span>
                          )}
                          {carrier.isActive ? (
                            <span className="text-xs text-green-600">Active</span>
                          ) : (
                            <span className="text-xs text-gray-400">Inactive</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Carrier Configuration */}
          <div className="lg:col-span-2">
            {selectedCarrier ? (
              <CarrierConfigPanel
                carrier={selectedCarrier}
                showApiKey={showApiKey}
                setShowApiKey={setShowApiKey}
              />
            ) : (
              <div className="card p-8 text-center">
                <Truck className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Select a carrier to configure settings</p>
              </div>
            )}
          </div>
        </div>

        {/* API Documentation Links */}
        <div className="card">
          <div className="card-header">
            <h2 className="text-lg font-semibold text-gray-900">API Documentation</h2>
          </div>
          <div className="card-body grid grid-cols-1 md:grid-cols-3 gap-4">
            <DocLink
              carrier="FedEx"
              description="Rate API, Tracking API, Ship API"
              url="https://developer.fedex.com/"
            />
            <DocLink
              carrier="UPS"
              description="Rating, Tracking, Shipping APIs"
              url="https://developer.ups.com/"
            />
            <DocLink
              carrier="USPS"
              description="Web Tools APIs for shipping"
              url="https://www.usps.com/business/web-tools-apis/"
            />
          </div>
        </div>

        {/* Webhook Configuration */}
        <div className="card">
          <div className="card-header">
            <h2 className="text-lg font-semibold text-gray-900">Webhook Configuration</h2>
            <p className="text-sm text-gray-500">Receive real-time tracking updates</p>
          </div>
          <div className="card-body">
            <div className="bg-gray-50 rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Webhook Endpoint URL
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value="https://api.tiredeals.com/webhooks/shipping"
                  readOnly
                  className="input flex-1 bg-white font-mono text-sm"
                />
                <button className="btn btn-secondary">
                  Copy
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Configure this URL in each carrier&apos;s developer portal to receive tracking events.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function CarrierConfigPanel({
  carrier,
  showApiKey,
  setShowApiKey,
}: {
  carrier: CarrierConfig
  showApiKey: boolean
  setShowApiKey: (show: boolean) => void
}) {
  const [config, setConfig] = useState({
    apiKey: '••••••••••••••••••••••••',
    apiSecret: '••••••••••••••••••••••••',
    accountNumber: carrier.accountNumber,
    testMode: carrier.testMode,
    defaultService: carrier.defaultService,
    markupPercent: carrier.markupPercent,
    isActive: carrier.isActive,
  })

  return (
    <div className="card">
      <div className="card-header flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center font-bold text-gray-600">
            {carrier.name.slice(0, 2)}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{carrier.name} Configuration</h2>
            <p className="text-sm text-gray-500">
              {carrier.isConnected ? 'Connected' : 'Not connected'} •
              Last sync: {carrier.lastSync ? new Date(carrier.lastSync).toLocaleString() : 'Never'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn btn-secondary">
            <TestTube className="w-4 h-4 mr-2" />
            Test Connection
          </button>
          <button className="btn btn-secondary">
            <RefreshCw className="w-4 h-4 mr-2" />
            Sync
          </button>
        </div>
      </div>

      <div className="card-body space-y-6">
        {/* Status */}
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
          <div className={cn(
            'p-2 rounded-lg',
            carrier.isConnected ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
          )}>
            {carrier.isConnected ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
          </div>
          <div className="flex-1">
            <p className="font-medium text-gray-900">
              {carrier.isConnected ? 'API Connected' : 'API Not Connected'}
            </p>
            <p className="text-sm text-gray-500">
              {carrier.isConnected
                ? 'Your API credentials are valid and active'
                : 'Enter your API credentials to connect'}
            </p>
          </div>
          {config.testMode && (
            <span className="flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm">
              <AlertTriangle className="w-4 h-4" />
              Test Mode
            </span>
          )}
        </div>

        {/* API Credentials */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">API Credentials</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              API Key
            </label>
            <div className="relative">
              <input
                type={showApiKey ? 'text' : 'password'}
                value={config.apiKey}
                onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
                className="input pr-10"
              />
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showApiKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              API Secret
            </label>
            <div className="relative">
              <input
                type="password"
                value={config.apiSecret}
                onChange={(e) => setConfig({ ...config, apiSecret: e.target.value })}
                className="input pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <EyeOff className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Account Number
            </label>
            <input
              type="text"
              value={config.accountNumber}
              onChange={(e) => setConfig({ ...config, accountNumber: e.target.value })}
              className="input"
            />
          </div>
        </div>

        {/* Settings */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Settings</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Default Service
            </label>
            <select
              value={config.defaultService}
              onChange={(e) => setConfig({ ...config, defaultService: e.target.value })}
              className="input"
            >
              {carrier.services.map((service) => (
                <option key={service} value={service.toUpperCase().replace(/ /g, '_')}>
                  {service}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rate Markup (%)
            </label>
            <input
              type="number"
              value={config.markupPercent}
              onChange={(e) => setConfig({ ...config, markupPercent: parseFloat(e.target.value) })}
              className="input w-32"
              min="0"
              max="100"
            />
            <p className="text-xs text-gray-500 mt-1">
              Add this percentage to carrier rates shown to customers
            </p>
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={config.testMode}
                onChange={(e) => setConfig({ ...config, testMode: e.target.checked })}
                className="w-4 h-4 rounded border-gray-300 text-primary-600"
              />
              <span className="text-sm text-gray-700">Test Mode</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={config.isActive}
                onChange={(e) => setConfig({ ...config, isActive: e.target.checked })}
                className="w-4 h-4 rounded border-gray-300 text-primary-600"
              />
              <span className="text-sm text-gray-700">Active</span>
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t">
          <button className="btn btn-secondary">
            Cancel
          </button>
          <button className="btn btn-primary">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string
  value: string | number
  icon: React.ReactNode
  color: 'blue' | 'green' | 'purple' | 'amber'
}) {
  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    amber: 'bg-amber-50 text-amber-600',
  }

  return (
    <div className="card p-4">
      <div className="flex items-center gap-4">
        <div className={cn('p-3 rounded-xl', colors[color])}>
          {icon}
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className="text-sm text-gray-500">{title}</p>
        </div>
      </div>
    </div>
  )
}

function DocLink({
  carrier,
  description,
  url,
}: {
  carrier: string
  description: string
  url: string
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
    >
      <div className="flex-1">
        <p className="font-medium text-gray-900">{carrier} Developer Portal</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <ExternalLink className="w-5 h-5 text-gray-400" />
    </a>
  )
}

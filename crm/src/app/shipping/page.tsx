'use client'

import { useState } from 'react'
import { Header } from '@/components/layout'
import Link from 'next/link'
import {
  Search,
  Filter,
  Truck,
  Package,
  MapPin,
  Clock,
  CheckCircle,
  AlertTriangle,
  ExternalLink,
  RefreshCw,
  Eye,
} from 'lucide-react'
import { formatDate, formatRelativeTime } from '@/lib/utils'

// Mock shipments data
const shipments = [
  {
    id: '1',
    orderId: 'TD-A1B2C3',
    carrier: 'FEDEX',
    trackingNumber: '794644790135',
    status: 'IN_TRANSIT',
    customer: { firstName: 'John', lastName: 'Smith' },
    destination: { city: 'Los Angeles', state: 'CA', zipCode: '90001' },
    shippedAt: new Date(Date.now() - 86400000),
    estimatedDelivery: new Date(Date.now() + 172800000),
    lastUpdate: 'Package in transit - Phoenix, AZ',
    lastUpdateTime: new Date(Date.now() - 7200000),
    events: [
      { status: 'In Transit', location: 'Phoenix, AZ', timestamp: new Date(Date.now() - 7200000) },
      { status: 'Departed Facility', location: 'Dallas, TX', timestamp: new Date(Date.now() - 43200000) },
      { status: 'Arrived at FedEx', location: 'Dallas, TX', timestamp: new Date(Date.now() - 57600000) },
      { status: 'Shipment Picked Up', location: 'Memphis, TN', timestamp: new Date(Date.now() - 86400000) },
    ],
  },
  {
    id: '2',
    orderId: 'TD-D4E5F6',
    carrier: 'UPS',
    trackingNumber: '1Z999AA10123456784',
    status: 'OUT_FOR_DELIVERY',
    customer: { firstName: 'Sarah', lastName: 'Johnson' },
    destination: { city: 'San Diego', state: 'CA', zipCode: '92101' },
    shippedAt: new Date(Date.now() - 172800000),
    estimatedDelivery: new Date(),
    lastUpdate: 'Out for delivery',
    lastUpdateTime: new Date(Date.now() - 3600000),
    events: [
      { status: 'Out for Delivery', location: 'San Diego, CA', timestamp: new Date(Date.now() - 3600000) },
      { status: 'At Local Facility', location: 'San Diego, CA', timestamp: new Date(Date.now() - 28800000) },
      { status: 'In Transit', location: 'Los Angeles, CA', timestamp: new Date(Date.now() - 86400000) },
    ],
  },
  {
    id: '3',
    orderId: 'TD-G7H8I9',
    carrier: 'FEDEX',
    trackingNumber: '794644790136',
    status: 'DELIVERED',
    customer: { firstName: 'Mike', lastName: 'Wilson' },
    destination: { city: 'Phoenix', state: 'AZ', zipCode: '85001' },
    shippedAt: new Date(Date.now() - 345600000),
    estimatedDelivery: new Date(Date.now() - 86400000),
    deliveredAt: new Date(Date.now() - 86400000),
    lastUpdate: 'Delivered - Signed by M. Wilson',
    lastUpdateTime: new Date(Date.now() - 86400000),
    signedBy: 'M. Wilson',
    events: [
      { status: 'Delivered', location: 'Phoenix, AZ', timestamp: new Date(Date.now() - 86400000) },
      { status: 'Out for Delivery', location: 'Phoenix, AZ', timestamp: new Date(Date.now() - 100800000) },
      { status: 'At Local Facility', location: 'Phoenix, AZ', timestamp: new Date(Date.now() - 172800000) },
    ],
  },
  {
    id: '4',
    orderId: 'TD-J1K2L3',
    carrier: 'USPS',
    trackingNumber: '9400111899223033005076',
    status: 'EXCEPTION',
    customer: { firstName: 'Emily', lastName: 'Brown' },
    destination: { city: 'Denver', state: 'CO', zipCode: '80202' },
    shippedAt: new Date(Date.now() - 259200000),
    estimatedDelivery: new Date(Date.now() - 86400000),
    lastUpdate: 'Delivery attempted - No access to delivery location',
    lastUpdateTime: new Date(Date.now() - 43200000),
    events: [
      { status: 'Exception', location: 'Denver, CO', timestamp: new Date(Date.now() - 43200000) },
      { status: 'Out for Delivery', location: 'Denver, CO', timestamp: new Date(Date.now() - 57600000) },
      { status: 'In Transit', location: 'Salt Lake City, UT', timestamp: new Date(Date.now() - 172800000) },
    ],
  },
  {
    id: '5',
    orderId: 'TD-M4N5O6',
    carrier: 'UPS',
    trackingNumber: '1Z999AA10123456785',
    status: 'LABEL_CREATED',
    customer: { firstName: 'David', lastName: 'Lee' },
    destination: { city: 'Seattle', state: 'WA', zipCode: '98101' },
    shippedAt: null,
    estimatedDelivery: new Date(Date.now() + 345600000),
    lastUpdate: 'Shipping label created, waiting for pickup',
    lastUpdateTime: new Date(Date.now() - 14400000),
    events: [
      { status: 'Label Created', location: 'Memphis, TN', timestamp: new Date(Date.now() - 14400000) },
    ],
  },
]

const carrierLogos: Record<string, { bg: string; text: string }> = {
  FEDEX: { bg: 'bg-purple-100', text: 'text-purple-700' },
  UPS: { bg: 'bg-amber-100', text: 'text-amber-700' },
  USPS: { bg: 'bg-blue-100', text: 'text-blue-700' },
  DHL: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
}

const statusConfig: Record<string, { icon: React.ReactNode; color: string; badge: string }> = {
  PENDING: { icon: <Clock className="w-4 h-4" />, color: 'text-gray-500', badge: 'badge-gray' },
  LABEL_CREATED: { icon: <Package className="w-4 h-4" />, color: 'text-gray-500', badge: 'badge-gray' },
  PICKED_UP: { icon: <Truck className="w-4 h-4" />, color: 'text-blue-500', badge: 'badge-info' },
  IN_TRANSIT: { icon: <Truck className="w-4 h-4" />, color: 'text-blue-500', badge: 'badge-info' },
  OUT_FOR_DELIVERY: { icon: <Truck className="w-4 h-4" />, color: 'text-primary-500', badge: 'badge-primary' },
  DELIVERED: { icon: <CheckCircle className="w-4 h-4" />, color: 'text-success-500', badge: 'badge-success' },
  EXCEPTION: { icon: <AlertTriangle className="w-4 h-4" />, color: 'text-danger-500', badge: 'badge-danger' },
  RETURNED: { icon: <RefreshCw className="w-4 h-4" />, color: 'text-warning-500', badge: 'badge-warning' },
}

export default function ShippingPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [selectedCarrier, setSelectedCarrier] = useState('')
  const [expandedShipment, setExpandedShipment] = useState<string | null>(null)

  const filteredShipments = shipments.filter(shipment => {
    const matchesSearch =
      shipment.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `${shipment.customer.firstName} ${shipment.customer.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = !selectedStatus || shipment.status === selectedStatus
    const matchesCarrier = !selectedCarrier || shipment.carrier === selectedCarrier

    return matchesSearch && matchesStatus && matchesCarrier
  })

  // Stats
  const stats = {
    total: shipments.length,
    inTransit: shipments.filter(s => s.status === 'IN_TRANSIT').length,
    outForDelivery: shipments.filter(s => s.status === 'OUT_FOR_DELIVERY').length,
    delivered: shipments.filter(s => s.status === 'DELIVERED').length,
    exceptions: shipments.filter(s => s.status === 'EXCEPTION').length,
  }

  return (
    <div className="min-h-screen">
      <Header
        title="Shipping & Tracking"
        subtitle="Track all shipments and delivery status"
      />

      <div className="p-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Package className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-sm text-gray-500">Total</p>
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Truck className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.inTransit}</p>
                <p className="text-sm text-gray-500">In Transit</p>
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-100 rounded-lg">
                <Truck className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.outForDelivery}</p>
                <p className="text-sm text-gray-500">Out for Delivery</p>
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-success-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.delivered}</p>
                <p className="text-sm text-gray-500">Delivered</p>
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-danger-50 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-danger-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.exceptions}</p>
                <p className="text-sm text-gray-500">Exceptions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by tracking #, order #, or customer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-10"
            />
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="select w-48"
          >
            <option value="">All Statuses</option>
            <option value="LABEL_CREATED">Label Created</option>
            <option value="IN_TRANSIT">In Transit</option>
            <option value="OUT_FOR_DELIVERY">Out for Delivery</option>
            <option value="DELIVERED">Delivered</option>
            <option value="EXCEPTION">Exception</option>
          </select>
          <select
            value={selectedCarrier}
            onChange={(e) => setSelectedCarrier(e.target.value)}
            className="select w-40"
          >
            <option value="">All Carriers</option>
            <option value="FEDEX">FedEx</option>
            <option value="UPS">UPS</option>
            <option value="USPS">USPS</option>
            <option value="DHL">DHL</option>
          </select>
          <button className="btn-outline btn-md">
            <RefreshCw className="w-4 h-4" />
            Refresh All
          </button>
        </div>

        {/* Shipments List */}
        <div className="space-y-4">
          {filteredShipments.map((shipment) => {
            const config = statusConfig[shipment.status]
            const carrierStyle = carrierLogos[shipment.carrier]
            const isExpanded = expandedShipment === shipment.id

            return (
              <div key={shipment.id} className="card overflow-hidden">
                {/* Main Row */}
                <div
                  className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setExpandedShipment(isExpanded ? null : shipment.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Carrier Badge */}
                      <div className={`px-3 py-1.5 rounded-lg font-semibold text-sm ${carrierStyle.bg} ${carrierStyle.text}`}>
                        {shipment.carrier}
                      </div>

                      {/* Status Icon */}
                      <div className={config.color}>
                        {config.icon}
                      </div>

                      {/* Info */}
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="font-medium text-gray-900">{shipment.trackingNumber}</span>
                          <span className={config.badge}>
                            {shipment.status.replace(/_/g, ' ')}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                          <Link href={`/orders/${shipment.orderId}`} className="text-primary-600 hover:underline">
                            {shipment.orderId}
                          </Link>
                          <span>•</span>
                          <span>{shipment.customer.firstName} {shipment.customer.lastName}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {shipment.destination.city}, {shipment.destination.state}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-sm text-gray-900">{shipment.lastUpdate}</p>
                        <p className="text-xs text-gray-500">{formatRelativeTime(shipment.lastUpdateTime)}</p>
                      </div>
                      <div className="text-right">
                        {shipment.status === 'DELIVERED' ? (
                          <p className="text-sm text-success-600 font-medium">
                            Delivered {formatDate(shipment.deliveredAt!)}
                          </p>
                        ) : shipment.estimatedDelivery ? (
                          <>
                            <p className="text-xs text-gray-500">Est. Delivery</p>
                            <p className="text-sm font-medium">{formatDate(shipment.estimatedDelivery)}</p>
                          </>
                        ) : null}
                      </div>
                      <div className="flex gap-2">
                        <a
                          href={`https://www.${shipment.carrier.toLowerCase()}.com/track?tracknum=${shipment.trackingNumber}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-ghost btn-sm"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Tracking Timeline */}
                {isExpanded && (
                  <div className="border-t border-gray-100 bg-gray-50 p-4">
                    <h4 className="font-medium text-gray-900 mb-4">Tracking History</h4>
                    <div className="relative">
                      {/* Timeline line */}
                      <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-gray-200" />

                      {/* Events */}
                      <div className="space-y-4">
                        {shipment.events.map((event, index) => (
                          <div key={index} className="flex items-start gap-4 relative">
                            <div className={`w-4 h-4 rounded-full border-2 ${
                              index === 0 ? 'bg-primary-500 border-primary-500' : 'bg-white border-gray-300'
                            }`} />
                            <div className="flex-1 pb-2">
                              <div className="flex items-center justify-between">
                                <p className={`font-medium ${index === 0 ? 'text-gray-900' : 'text-gray-600'}`}>
                                  {event.status}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {formatDate(event.timestamp, {
                                    month: 'short',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: '2-digit',
                                  })}
                                </p>
                              </div>
                              <p className="text-sm text-gray-500">{event.location}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Delivery Info */}
                    {shipment.signedBy && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Signed by:</span> {shipment.signedBy}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Empty State */}
        {filteredShipments.length === 0 && (
          <div className="empty-state py-16">
            <Package className="empty-state-icon" />
            <h3 className="empty-state-title">No shipments found</h3>
            <p className="empty-state-description">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

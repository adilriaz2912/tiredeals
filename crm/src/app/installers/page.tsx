'use client'

import { useState } from 'react'
import { Header } from '@/components/layout'
import Link from 'next/link'
import {
  Search,
  Filter,
  Plus,
  MapPin,
  Phone,
  Mail,
  Globe,
  Star,
  Clock,
  CheckCircle,
  Wrench,
  Send,
  Eye,
  Edit,
  MoreHorizontal,
  Users,
  DollarSign,
} from 'lucide-react'
import { formatPhone } from '@/lib/utils'

// Mock installers data
const installers = [
  {
    id: '1',
    name: 'ABC Tire Shop',
    type: 'INDEPENDENT',
    email: 'service@abctireshop.com',
    phone: '5551234567',
    website: 'www.abctireshop.com',
    address: {
      street1: '123 Auto Center Dr',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90001',
    },
    services: ['Tire Installation', 'Wheel Balancing', 'TPMS Service', 'Alignment'],
    certifications: ['ASE Certified', 'TIA Certified'],
    rating: 4.8,
    reviewCount: 156,
    isPartner: true,
    isVerified: true,
    isActive: true,
    commissionRate: 5,
    installationFee: 20,
    ordersThisMonth: 24,
    totalOrders: 312,
    contactPerson: 'John Manager',
    businessHours: {
      mon: '8:00 AM - 6:00 PM',
      tue: '8:00 AM - 6:00 PM',
      wed: '8:00 AM - 6:00 PM',
      thu: '8:00 AM - 6:00 PM',
      fri: '8:00 AM - 6:00 PM',
      sat: '9:00 AM - 4:00 PM',
      sun: 'Closed',
    },
  },
  {
    id: '2',
    name: 'Quick Tire Service',
    type: 'CHAIN',
    email: 'manager@quicktire.com',
    phone: '5559876543',
    website: 'www.quicktireservice.com',
    address: {
      street1: '456 Service Road',
      city: 'San Diego',
      state: 'CA',
      zipCode: '92101',
    },
    services: ['Tire Installation', 'Wheel Balancing', 'TPMS Service'],
    certifications: ['TIA Certified'],
    rating: 4.5,
    reviewCount: 89,
    isPartner: true,
    isVerified: true,
    isActive: true,
    commissionRate: 4,
    installationFee: 18,
    ordersThisMonth: 18,
    totalOrders: 245,
    contactPerson: 'Sarah Service',
    businessHours: {
      mon: '7:00 AM - 7:00 PM',
      tue: '7:00 AM - 7:00 PM',
      wed: '7:00 AM - 7:00 PM',
      thu: '7:00 AM - 7:00 PM',
      fri: '7:00 AM - 7:00 PM',
      sat: '8:00 AM - 5:00 PM',
      sun: '10:00 AM - 3:00 PM',
    },
  },
  {
    id: '3',
    name: 'Premium Tire Center',
    type: 'INDEPENDENT',
    email: 'info@premiumtire.com',
    phone: '5555551234',
    website: 'www.premiumtirecenter.com',
    address: {
      street1: '789 Premium Blvd',
      city: 'Phoenix',
      state: 'AZ',
      zipCode: '85001',
    },
    services: ['Tire Installation', 'Wheel Balancing', 'TPMS Service', 'Alignment', 'Custom Wheels'],
    certifications: ['ASE Certified', 'TIA Certified', 'Michelin Certified'],
    rating: 4.9,
    reviewCount: 234,
    isPartner: true,
    isVerified: true,
    isActive: true,
    commissionRate: 6,
    installationFee: 25,
    ordersThisMonth: 32,
    totalOrders: 456,
    contactPerson: 'Mike Premium',
    businessHours: {
      mon: '8:00 AM - 6:00 PM',
      tue: '8:00 AM - 6:00 PM',
      wed: '8:00 AM - 6:00 PM',
      thu: '8:00 AM - 6:00 PM',
      fri: '8:00 AM - 6:00 PM',
      sat: '9:00 AM - 3:00 PM',
      sun: 'Closed',
    },
  },
  {
    id: '4',
    name: 'Budget Tire Pros',
    type: 'FRANCHISE',
    email: 'contact@budgettire.com',
    phone: '5552223333',
    website: null,
    address: {
      street1: '321 Budget Way',
      city: 'Denver',
      state: 'CO',
      zipCode: '80202',
    },
    services: ['Tire Installation', 'Wheel Balancing'],
    certifications: [],
    rating: 4.2,
    reviewCount: 67,
    isPartner: false,
    isVerified: false,
    isActive: true,
    commissionRate: null,
    installationFee: null,
    ordersThisMonth: 8,
    totalOrders: 45,
    contactPerson: 'Tom Budget',
    businessHours: {
      mon: '9:00 AM - 5:00 PM',
      tue: '9:00 AM - 5:00 PM',
      wed: '9:00 AM - 5:00 PM',
      thu: '9:00 AM - 5:00 PM',
      fri: '9:00 AM - 5:00 PM',
      sat: 'Closed',
      sun: 'Closed',
    },
  },
  {
    id: '5',
    name: 'AutoNation Tire Dept',
    type: 'DEALERSHIP',
    email: 'tires@autonation.com',
    phone: '5554445555',
    website: 'www.autonation.com/tires',
    address: {
      street1: '999 Dealer Row',
      city: 'Seattle',
      state: 'WA',
      zipCode: '98101',
    },
    services: ['Tire Installation', 'Wheel Balancing', 'TPMS Service', 'Alignment'],
    certifications: ['OEM Certified'],
    rating: 4.6,
    reviewCount: 123,
    isPartner: true,
    isVerified: true,
    isActive: true,
    commissionRate: 3,
    installationFee: 30,
    ordersThisMonth: 15,
    totalOrders: 178,
    contactPerson: 'Auto Service Mgr',
    businessHours: {
      mon: '7:00 AM - 8:00 PM',
      tue: '7:00 AM - 8:00 PM',
      wed: '7:00 AM - 8:00 PM',
      thu: '7:00 AM - 8:00 PM',
      fri: '7:00 AM - 8:00 PM',
      sat: '8:00 AM - 6:00 PM',
      sun: '10:00 AM - 4:00 PM',
    },
  },
]

const typeLabels: Record<string, string> = {
  INDEPENDENT: 'Independent',
  CHAIN: 'Chain',
  DEALERSHIP: 'Dealership',
  FRANCHISE: 'Franchise',
}

const typeColors: Record<string, string> = {
  INDEPENDENT: 'badge-primary',
  CHAIN: 'badge-info',
  DEALERSHIP: 'badge-gray',
  FRANCHISE: 'badge-warning',
}

export default function InstallersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [selectedState, setSelectedState] = useState('')
  const [partnersOnly, setPartnersOnly] = useState(false)
  const [showBulkEmailModal, setShowBulkEmailModal] = useState(false)
  const [selectedInstallers, setSelectedInstallers] = useState<string[]>([])

  const filteredInstallers = installers.filter(installer => {
    const matchesSearch =
      installer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      installer.address.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      installer.address.zipCode.includes(searchQuery)

    const matchesType = !selectedType || installer.type === selectedType
    const matchesState = !selectedState || installer.address.state === selectedState
    const matchesPartner = !partnersOnly || installer.isPartner

    return matchesSearch && matchesType && matchesState && matchesPartner
  })

  // Stats
  const stats = {
    total: installers.length,
    partners: installers.filter(i => i.isPartner).length,
    verified: installers.filter(i => i.isVerified).length,
    avgRating: (installers.reduce((sum, i) => sum + i.rating, 0) / installers.length).toFixed(1),
  }

  const toggleSelectInstaller = (id: string) => {
    setSelectedInstallers(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const toggleSelectAll = () => {
    if (selectedInstallers.length === filteredInstallers.length) {
      setSelectedInstallers([])
    } else {
      setSelectedInstallers(filteredInstallers.map(i => i.id))
    }
  }

  return (
    <div className="min-h-screen">
      <Header
        title="Local Installers"
        subtitle="Manage your installer network and partnerships"
      />

      <div className="p-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Wrench className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-sm text-gray-500">Total Installers</p>
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-100 rounded-lg">
                <Users className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.partners}</p>
                <p className="text-sm text-gray-500">Partners</p>
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-success-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.verified}</p>
                <p className="text-sm text-gray-500">Verified</p>
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Star className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.avgRating}</p>
                <p className="text-sm text-gray-500">Avg Rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, city, or ZIP code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-10"
            />
          </div>

          <div className="flex gap-3 flex-wrap">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="select w-36"
            >
              <option value="">All Types</option>
              <option value="INDEPENDENT">Independent</option>
              <option value="CHAIN">Chain</option>
              <option value="DEALERSHIP">Dealership</option>
              <option value="FRANCHISE">Franchise</option>
            </select>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="select w-32"
            >
              <option value="">All States</option>
              <option value="CA">California</option>
              <option value="AZ">Arizona</option>
              <option value="CO">Colorado</option>
              <option value="WA">Washington</option>
            </select>
            <label className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="checkbox"
                checked={partnersOnly}
                onChange={(e) => setPartnersOnly(e.target.checked)}
                className="w-4 h-4 text-primary-600 rounded"
              />
              <span className="text-sm">Partners Only</span>
            </label>

            {selectedInstallers.length > 0 && (
              <button
                onClick={() => setShowBulkEmailModal(true)}
                className="btn-primary btn-md"
              >
                <Send className="w-4 h-4" />
                Email Selected ({selectedInstallers.length})
              </button>
            )}

            <Link href="/installers/new" className="btn-primary btn-md">
              <Plus className="w-4 h-4" />
              Add Installer
            </Link>
          </div>
        </div>

        {/* Installers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredInstallers.map((installer) => (
            <div key={installer.id} className="card overflow-hidden">
              <div className="p-4">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={selectedInstallers.includes(installer.id)}
                      onChange={() => toggleSelectInstaller(installer.id)}
                      className="w-4 h-4 mt-1 text-primary-600 rounded"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/installers/${installer.id}`}
                          className="font-semibold text-gray-900 hover:text-primary-600"
                        >
                          {installer.name}
                        </Link>
                        {installer.isVerified && (
                          <CheckCircle className="w-4 h-4 text-primary-500" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={typeColors[installer.type]}>
                          {typeLabels[installer.type]}
                        </span>
                        {installer.isPartner && (
                          <span className="badge badge-success">Partner</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold text-yellow-700">{installer.rating}</span>
                    <span className="text-xs text-yellow-600">({installer.reviewCount})</span>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    {installer.address.street1}, {installer.address.city}, {installer.address.state} {installer.address.zipCode}
                  </div>
                  <div className="flex items-center gap-4">
                    <a href={`tel:${installer.phone}`} className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-primary-600">
                      <Phone className="w-4 h-4 text-gray-400" />
                      {formatPhone(installer.phone)}
                    </a>
                    <a href={`mailto:${installer.email}`} className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-primary-600">
                      <Mail className="w-4 h-4 text-gray-400" />
                      Email
                    </a>
                    {installer.website && (
                      <a href={`https://${installer.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-primary-600">
                        <Globe className="w-4 h-4 text-gray-400" />
                        Website
                      </a>
                    )}
                  </div>
                </div>

                {/* Services */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {installer.services.map((service) => (
                    <span key={service} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                      {service}
                    </span>
                  ))}
                </div>

                {/* Stats Row */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">This Month: </span>
                      <span className="font-medium">{installer.ordersThisMonth} orders</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Total: </span>
                      <span className="font-medium">{installer.totalOrders} orders</span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Link
                      href={`/installers/${installer.id}`}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <Link
                      href={`/installers/${installer.id}/edit`}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg">
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Partner Footer */}
              {installer.isPartner && installer.commissionRate && (
                <div className="px-4 py-3 bg-primary-50 border-t border-primary-100">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <span className="text-primary-700">
                        <span className="font-medium">{installer.commissionRate}%</span> commission
                      </span>
                      <span className="text-primary-700">
                        <span className="font-medium">${installer.installationFee}</span>/tire install fee
                      </span>
                    </div>
                    <span className="text-primary-600 font-medium">Partner</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredInstallers.length === 0 && (
          <div className="empty-state py-16">
            <Wrench className="empty-state-icon" />
            <h3 className="empty-state-title">No installers found</h3>
            <p className="empty-state-description">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        {/* Bulk Email Modal */}
        {showBulkEmailModal && (
          <BulkEmailModal
            installerCount={selectedInstallers.length}
            onClose={() => setShowBulkEmailModal(false)}
            onSend={() => {
              // Handle send
              setShowBulkEmailModal(false)
              setSelectedInstallers([])
            }}
          />
        )}
      </div>
    </div>
  )
}

function BulkEmailModal({
  installerCount,
  onClose,
  onSend,
}: {
  installerCount: number
  onClose: () => void
  onSend: () => void
}) {
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal max-w-xl" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="text-lg font-semibold">Email Installers</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            ×
          </button>
        </div>
        <div className="modal-body space-y-4">
          <div className="bg-primary-50 text-primary-700 p-3 rounded-lg text-sm">
            This email will be sent to <strong>{installerCount} installer(s)</strong>
          </div>

          <div>
            <label className="label">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter email subject..."
              className="input"
            />
          </div>

          <div>
            <label className="label">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message..."
              rows={6}
              className="input"
            />
            <p className="text-xs text-gray-500 mt-1">
              Available variables: {'{installer_name}'}, {'{customer_name}'}, {'{order_number}'}, {'{tire_details}'}
            </p>
          </div>

          <div>
            <label className="label">Quick Templates</label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => {
                  setSubject('New Tire Installation Request')
                  setMessage(`Hi {installer_name},\n\nWe have a customer who purchased tires and would like to schedule installation at your shop.\n\nCustomer: {customer_name}\nOrder: {order_number}\nTires: {tire_details}\n\nPlease contact the customer to arrange an appointment.\n\nThank you,\nTireDeals Team`)
                }}
                className="btn-outline btn-sm"
              >
                Installation Request
              </button>
              <button
                onClick={() => {
                  setSubject('Partnership Opportunity with TireDeals')
                  setMessage(`Hi {installer_name},\n\nWe'd like to invite you to join our installer partner network. As a TireDeals partner, you'll receive:\n\n- Regular customer referrals\n- Competitive commission rates\n- Marketing support\n\nInterested? Reply to this email to learn more.\n\nBest regards,\nTireDeals Team`)
                }}
                className="btn-outline btn-sm"
              >
                Partnership Invite
              </button>
              <button
                onClick={() => {
                  setSubject('Monthly Newsletter - TireDeals Partners')
                  setMessage(`Hi {installer_name},\n\nHere's your monthly update from TireDeals:\n\n- New tire brands now available\n- Updated commission structure\n- Upcoming promotions\n\nThank you for your continued partnership!\n\nTireDeals Team`)
                }}
                className="btn-outline btn-sm"
              >
                Newsletter
              </button>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button onClick={onClose} className="btn-outline btn-md">
            Cancel
          </button>
          <button
            onClick={onSend}
            disabled={!subject || !message}
            className="btn-primary btn-md"
          >
            <Send className="w-4 h-4" />
            Send Email
          </button>
        </div>
      </div>
    </div>
  )
}

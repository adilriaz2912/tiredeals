'use client'

import { useState } from 'react'
import { Header } from '@/components/layout'
import Link from 'next/link'
import {
  Search,
  Filter,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Eye,
  Plus,
  Calendar,
} from 'lucide-react'
import { formatDate, formatCurrency } from '@/lib/utils'

// Mock warranties data
const warranties = [
  {
    id: '1',
    customer: { id: '1', firstName: 'John', lastName: 'Smith' },
    order: { id: 'TD-A1B2C3', orderNumber: 'TD-A1B2C3' },
    tire: { name: 'Michelin Defender T+H', size: '215/55R17' },
    vehicle: { year: 2022, make: 'Toyota', model: 'Camry' },
    type: 'MILEAGE',
    status: 'ACTIVE',
    startDate: new Date('2024-06-15'),
    endDate: new Date('2030-06-15'),
    mileageStart: 45000,
    mileageLimit: 80000,
    claimCount: 0,
    daysRemaining: 1967,
  },
  {
    id: '2',
    customer: { id: '2', firstName: 'Sarah', lastName: 'Johnson' },
    order: { id: 'TD-D4E5F6', orderNumber: 'TD-D4E5F6' },
    tire: { name: 'Goodyear Assurance', size: '225/65R17' },
    vehicle: { year: 2021, make: 'Honda', model: 'CR-V' },
    type: 'ROAD_HAZARD',
    status: 'ACTIVE',
    startDate: new Date('2024-09-01'),
    endDate: new Date('2025-09-01'),
    mileageStart: null,
    mileageLimit: null,
    claimCount: 0,
    daysRemaining: 220,
  },
  {
    id: '3',
    customer: { id: '3', firstName: 'Mike', lastName: 'Wilson' },
    order: { id: 'TD-G7H8I9', orderNumber: 'TD-G7H8I9' },
    tire: { name: 'Bridgestone Turanza', size: '235/45R18' },
    vehicle: { year: 2023, make: 'BMW', model: '3 Series' },
    type: 'MILEAGE',
    status: 'ACTIVE',
    startDate: new Date('2024-03-20'),
    endDate: new Date('2029-03-20'),
    mileageStart: 12000,
    mileageLimit: 70000,
    claimCount: 1,
    daysRemaining: 1515,
  },
  {
    id: '4',
    customer: { id: '4', firstName: 'Emily', lastName: 'Brown' },
    order: { id: 'TD-J1K2L3', orderNumber: 'TD-J1K2L3' },
    tire: { name: 'Continental TrueContact', size: '205/55R16' },
    vehicle: { year: 2020, make: 'Ford', model: 'Focus' },
    type: 'ROAD_HAZARD',
    status: 'EXPIRED',
    startDate: new Date('2023-06-10'),
    endDate: new Date('2024-06-10'),
    mileageStart: null,
    mileageLimit: null,
    claimCount: 0,
    daysRemaining: 0,
  },
  {
    id: '5',
    customer: { id: '5', firstName: 'David', lastName: 'Lee' },
    order: { id: 'TD-M4N5O6', orderNumber: 'TD-M4N5O6' },
    tire: { name: 'Pirelli P4 Four Seasons', size: '215/60R16' },
    vehicle: { year: 2022, make: 'Chevrolet', model: 'Malibu' },
    type: 'MILEAGE',
    status: 'CLAIMED',
    startDate: new Date('2024-01-15'),
    endDate: new Date('2029-01-15'),
    mileageStart: 28000,
    mileageLimit: 65000,
    claimCount: 1,
    daysRemaining: 1450,
  },
]

const claims = [
  {
    id: '1',
    claimNumber: 'CLM-001',
    warrantyId: '5',
    customer: { firstName: 'David', lastName: 'Lee' },
    tire: { name: 'Pirelli P4 Four Seasons' },
    status: 'UNDER_REVIEW',
    reason: 'Premature tread wear',
    submittedAt: new Date(Date.now() - 172800000),
    currentMileage: 42000,
  },
  {
    id: '2',
    claimNumber: 'CLM-002',
    warrantyId: '3',
    customer: { firstName: 'Mike', lastName: 'Wilson' },
    tire: { name: 'Bridgestone Turanza' },
    status: 'APPROVED',
    reason: 'Sidewall damage from road hazard',
    submittedAt: new Date(Date.now() - 604800000),
    resolution: 'Pro-rated replacement - $85 credit',
    currentMileage: 25000,
  },
]

const typeLabels: Record<string, string> = {
  MILEAGE: 'Mileage Warranty',
  ROAD_HAZARD: 'Road Hazard',
  MANUFACTURER: 'Manufacturer',
  WORKMANSHIP: 'Workmanship',
}

const statusConfig: Record<string, { badge: string; label: string }> = {
  ACTIVE: { badge: 'badge-success', label: 'Active' },
  EXPIRED: { badge: 'badge-gray', label: 'Expired' },
  VOIDED: { badge: 'badge-danger', label: 'Voided' },
  CLAIMED: { badge: 'badge-info', label: 'Claimed' },
}

const claimStatusConfig: Record<string, { badge: string; label: string }> = {
  SUBMITTED: { badge: 'badge-warning', label: 'Submitted' },
  UNDER_REVIEW: { badge: 'badge-info', label: 'Under Review' },
  APPROVED: { badge: 'badge-success', label: 'Approved' },
  DENIED: { badge: 'badge-danger', label: 'Denied' },
  COMPLETED: { badge: 'badge-gray', label: 'Completed' },
}

export default function WarrantiesPage() {
  const [activeTab, setActiveTab] = useState<'warranties' | 'claims'>('warranties')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [selectedType, setSelectedType] = useState('')

  const filteredWarranties = warranties.filter(warranty => {
    const matchesSearch =
      `${warranty.customer.firstName} ${warranty.customer.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      warranty.order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      warranty.tire.name.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = !selectedStatus || warranty.status === selectedStatus
    const matchesType = !selectedType || warranty.type === selectedType

    return matchesSearch && matchesStatus && matchesType
  })

  // Stats
  const stats = {
    active: warranties.filter(w => w.status === 'ACTIVE').length,
    expiringSoon: warranties.filter(w => w.status === 'ACTIVE' && w.daysRemaining <= 90).length,
    expired: warranties.filter(w => w.status === 'EXPIRED').length,
    pendingClaims: claims.filter(c => c.status === 'SUBMITTED' || c.status === 'UNDER_REVIEW').length,
  }

  return (
    <div className="min-h-screen">
      <Header
        title="Warranty Tracker"
        subtitle="Manage product warranties and claims"
      />

      <div className="p-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success-50 rounded-lg">
                <Shield className="w-5 h-5 text-success-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-success-600">{stats.active}</p>
                <p className="text-sm text-gray-500">Active Warranties</p>
              </div>
            </div>
          </div>
          <div className="card p-4 border-l-4 border-l-warning-500">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-warning-50 rounded-lg">
                <Clock className="w-5 h-5 text-warning-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-warning-600">{stats.expiringSoon}</p>
                <p className="text-sm text-gray-500">Expiring in 90 Days</p>
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.expired}</p>
                <p className="text-sm text-gray-500">Expired</p>
              </div>
            </div>
          </div>
          <div className="card p-4 border-l-4 border-l-info-500">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-info-50 rounded-lg">
                <FileText className="w-5 h-5 text-info-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-info-600">{stats.pendingClaims}</p>
                <p className="text-sm text-gray-500">Pending Claims</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs mb-6">
          <button
            onClick={() => setActiveTab('warranties')}
            className={`tab ${activeTab === 'warranties' ? 'tab-active' : ''}`}
          >
            Warranties
          </button>
          <button
            onClick={() => setActiveTab('claims')}
            className={`tab ${activeTab === 'claims' ? 'tab-active' : ''}`}
          >
            Claims ({claims.length})
          </button>
        </div>

        {activeTab === 'warranties' && (
          <>
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by customer, order, or product..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input pl-10"
                />
              </div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="select w-36"
              >
                <option value="">All Status</option>
                <option value="ACTIVE">Active</option>
                <option value="EXPIRED">Expired</option>
                <option value="CLAIMED">Claimed</option>
              </select>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="select w-44"
              >
                <option value="">All Types</option>
                <option value="MILEAGE">Mileage Warranty</option>
                <option value="ROAD_HAZARD">Road Hazard</option>
              </select>
            </div>

            {/* Warranties Table */}
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Product</th>
                      <th>Vehicle</th>
                      <th>Type</th>
                      <th>Coverage</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredWarranties.map((warranty) => (
                      <tr key={warranty.id}>
                        <td>
                          <Link href={`/customers/${warranty.customer.id}`} className="font-medium text-gray-900 hover:text-primary-600">
                            {warranty.customer.firstName} {warranty.customer.lastName}
                          </Link>
                          <p className="text-xs text-gray-500">
                            <Link href={`/orders/${warranty.order.id}`} className="hover:text-primary-600">
                              {warranty.order.orderNumber}
                            </Link>
                          </p>
                        </td>
                        <td>
                          <p className="font-medium text-gray-900">{warranty.tire.name}</p>
                          <p className="text-xs text-gray-500">{warranty.tire.size}</p>
                        </td>
                        <td className="text-gray-600">
                          {warranty.vehicle.year} {warranty.vehicle.make} {warranty.vehicle.model}
                        </td>
                        <td>
                          <span className="badge badge-gray">{typeLabels[warranty.type]}</span>
                        </td>
                        <td>
                          <div className="text-sm">
                            <p className="text-gray-900">{formatDate(warranty.startDate)} - {formatDate(warranty.endDate)}</p>
                            {warranty.mileageLimit && (
                              <p className="text-xs text-gray-500">
                                {warranty.mileageStart?.toLocaleString()} - {warranty.mileageLimit.toLocaleString()} mi
                              </p>
                            )}
                            {warranty.status === 'ACTIVE' && (
                              <p className={`text-xs ${warranty.daysRemaining <= 90 ? 'text-warning-600' : 'text-gray-500'}`}>
                                {warranty.daysRemaining} days remaining
                              </p>
                            )}
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center gap-2">
                            <span className={statusConfig[warranty.status].badge}>
                              {statusConfig[warranty.status].label}
                            </span>
                            {warranty.claimCount > 0 && (
                              <span className="text-xs text-gray-500">
                                ({warranty.claimCount} claim{warranty.claimCount > 1 ? 's' : ''})
                              </span>
                            )}
                          </div>
                        </td>
                        <td>
                          <div className="flex gap-1">
                            <Link href={`/warranties/${warranty.id}`} className="btn-ghost btn-sm">
                              <Eye className="w-4 h-4" />
                            </Link>
                            {warranty.status === 'ACTIVE' && (
                              <Link href={`/warranties/${warranty.id}/claim`} className="btn-outline btn-sm">
                                File Claim
                              </Link>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {activeTab === 'claims' && (
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Claim #</th>
                    <th>Customer</th>
                    <th>Product</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th>Submitted</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {claims.map((claim) => (
                    <tr key={claim.id}>
                      <td className="font-medium">{claim.claimNumber}</td>
                      <td>
                        {claim.customer.firstName} {claim.customer.lastName}
                      </td>
                      <td>{claim.tire.name}</td>
                      <td>
                        <p className="max-w-xs truncate">{claim.reason}</p>
                        {claim.currentMileage && (
                          <p className="text-xs text-gray-500">
                            At {claim.currentMileage.toLocaleString()} miles
                          </p>
                        )}
                      </td>
                      <td>
                        <span className={claimStatusConfig[claim.status].badge}>
                          {claimStatusConfig[claim.status].label}
                        </span>
                        {claim.resolution && (
                          <p className="text-xs text-gray-500 mt-1">{claim.resolution}</p>
                        )}
                      </td>
                      <td className="text-gray-500">{formatDate(claim.submittedAt)}</td>
                      <td>
                        <Link href={`/warranties/claims/${claim.id}`} className="btn-primary btn-sm">
                          Review
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

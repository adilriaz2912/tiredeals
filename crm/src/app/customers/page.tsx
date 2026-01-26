'use client'

import { useState } from 'react'
import { Header } from '@/components/layout'
import Link from 'next/link'
import {
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Mail,
  Phone,
  MapPin,
  Car,
  ShoppingCart,
  Star,
  Download,
  Upload,
  Eye,
  Edit,
  Trash2,
  MessageSquare,
} from 'lucide-react'
import { formatCurrency, formatDate, formatPhone, getInitials } from '@/lib/utils'

// Mock data
const customers = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@email.com',
    phone: '5551234567',
    company: 'ABC Corp',
    loyaltyTier: 'GOLD',
    loyaltyPoints: 2450,
    totalSpent: 3567.89,
    orderCount: 8,
    vehicleCount: 2,
    tags: ['VIP', 'Fleet'],
    lastOrderDate: '2025-01-15',
    createdAt: '2024-03-10',
  },
  {
    id: '2',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.j@email.com',
    phone: '5559876543',
    company: null,
    loyaltyTier: 'SILVER',
    loyaltyPoints: 1250,
    totalSpent: 1890.50,
    orderCount: 4,
    vehicleCount: 1,
    tags: [],
    lastOrderDate: '2025-01-10',
    createdAt: '2024-06-22',
  },
  {
    id: '3',
    firstName: 'Mike',
    lastName: 'Wilson',
    email: 'mike.wilson@email.com',
    phone: '5555551234',
    company: 'Wilson Auto',
    loyaltyTier: 'PLATINUM',
    loyaltyPoints: 5600,
    totalSpent: 8920.00,
    orderCount: 15,
    vehicleCount: 5,
    tags: ['Fleet', 'Wholesale'],
    lastOrderDate: '2025-01-18',
    createdAt: '2023-11-05',
  },
  {
    id: '4',
    firstName: 'Emily',
    lastName: 'Brown',
    email: 'emily.brown@email.com',
    phone: '5552223333',
    company: null,
    loyaltyTier: 'BRONZE',
    loyaltyPoints: 340,
    totalSpent: 456.00,
    orderCount: 1,
    vehicleCount: 1,
    tags: ['New'],
    lastOrderDate: '2025-01-05',
    createdAt: '2025-01-01',
  },
  {
    id: '5',
    firstName: 'David',
    lastName: 'Lee',
    email: 'david.lee@company.com',
    phone: '5554445555',
    company: 'Lee Transportation',
    loyaltyTier: 'GOLD',
    loyaltyPoints: 3200,
    totalSpent: 4250.75,
    orderCount: 10,
    vehicleCount: 3,
    tags: ['Fleet'],
    lastOrderDate: '2025-01-12',
    createdAt: '2024-02-15',
  },
]

const loyaltyColors: Record<string, string> = {
  BRONZE: 'bg-amber-100 text-amber-700',
  SILVER: 'bg-gray-200 text-gray-700',
  GOLD: 'bg-yellow-100 text-yellow-700',
  PLATINUM: 'bg-purple-100 text-purple-700',
}

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTier, setSelectedTier] = useState<string>('')
  const [showFilters, setShowFilters] = useState(false)

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch =
      `${customer.firstName} ${customer.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery)

    const matchesTier = !selectedTier || customer.loyaltyTier === selectedTier

    return matchesSearch && matchesTier
  })

  return (
    <div className="min-h-screen">
      <Header
        title="Customers"
        subtitle={`${customers.length} total customers`}
      />

      <div className="p-6">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search customers by name, email, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-10"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`btn-outline btn-md ${showFilters ? 'bg-gray-100' : ''}`}
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
            <button className="btn-outline btn-md">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="btn-outline btn-md">
              <Upload className="w-4 h-4" />
              Import
            </button>
            <Link href="/customers/new" className="btn-primary btn-md">
              <Plus className="w-4 h-4" />
              Add Customer
            </Link>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="card p-4 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="label">Loyalty Tier</label>
                <select
                  value={selectedTier}
                  onChange={(e) => setSelectedTier(e.target.value)}
                  className="select"
                >
                  <option value="">All Tiers</option>
                  <option value="BRONZE">Bronze</option>
                  <option value="SILVER">Silver</option>
                  <option value="GOLD">Gold</option>
                  <option value="PLATINUM">Platinum</option>
                </select>
              </div>
              <div>
                <label className="label">Order Count</label>
                <select className="select">
                  <option value="">Any</option>
                  <option value="0">No orders</option>
                  <option value="1-5">1-5 orders</option>
                  <option value="6-10">6-10 orders</option>
                  <option value="10+">10+ orders</option>
                </select>
              </div>
              <div>
                <label className="label">Total Spent</label>
                <select className="select">
                  <option value="">Any</option>
                  <option value="0-500">$0 - $500</option>
                  <option value="500-1000">$500 - $1,000</option>
                  <option value="1000-5000">$1,000 - $5,000</option>
                  <option value="5000+">$5,000+</option>
                </select>
              </div>
              <div>
                <label className="label">Tags</label>
                <select className="select">
                  <option value="">All Tags</option>
                  <option value="VIP">VIP</option>
                  <option value="Fleet">Fleet</option>
                  <option value="Wholesale">Wholesale</option>
                  <option value="New">New</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Customer Table */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Contact</th>
                  <th>Loyalty</th>
                  <th>Orders</th>
                  <th>Total Spent</th>
                  <th>Last Order</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar avatar-md bg-primary-100 text-primary-600">
                          {getInitials(customer.firstName, customer.lastName)}
                        </div>
                        <div>
                          <Link
                            href={`/customers/${customer.id}`}
                            className="font-medium text-gray-900 hover:text-primary-600"
                          >
                            {customer.firstName} {customer.lastName}
                          </Link>
                          {customer.company && (
                            <p className="text-xs text-gray-500">{customer.company}</p>
                          )}
                          {customer.tags.length > 0 && (
                            <div className="flex gap-1 mt-1">
                              {customer.tags.map(tag => (
                                <span key={tag} className="badge badge-gray text-xs">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-sm text-gray-600">
                          <Mail className="w-3.5 h-3.5" />
                          {customer.email}
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-gray-600">
                          <Phone className="w-3.5 h-3.5" />
                          {formatPhone(customer.phone)}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="space-y-1">
                        <span className={`badge ${loyaltyColors[customer.loyaltyTier]}`}>
                          {customer.loyaltyTier}
                        </span>
                        <p className="text-xs text-gray-500">
                          {customer.loyaltyPoints.toLocaleString()} pts
                        </p>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 text-sm">
                          <ShoppingCart className="w-4 h-4 text-gray-400" />
                          {customer.orderCount}
                        </div>
                        <div className="flex items-center gap-1.5 text-sm">
                          <Car className="w-4 h-4 text-gray-400" />
                          {customer.vehicleCount}
                        </div>
                      </div>
                    </td>
                    <td className="font-medium">
                      {formatCurrency(customer.totalSpent)}
                    </td>
                    <td className="text-gray-500">
                      {formatDate(customer.lastOrderDate)}
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <Link
                          href={`/customers/${customer.id}`}
                          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/customers/${customer.id}/edit`}
                          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg"
                          title="Send SMS"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 text-gray-400 hover:text-danger-600 hover:bg-danger-50 rounded-lg"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing <span className="font-medium">{filteredCustomers.length}</span> of{' '}
              <span className="font-medium">{customers.length}</span> customers
            </p>
            <div className="flex gap-2">
              <button className="btn-outline btn-sm" disabled>
                Previous
              </button>
              <button className="btn-outline btn-sm">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

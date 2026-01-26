'use client'

import { useState, useMemo, useCallback } from 'react'
import { Header } from '@/components/layout'
import { Button, ConfirmDialog, Pagination, TableSkeleton } from '@/components/ui'
import Link from 'next/link'
import {
  Search,
  Filter,
  Plus,
  Mail,
  Phone,
  Car,
  ShoppingCart,
  Download,
  Upload,
  Eye,
  Edit,
  Trash2,
  MessageSquare,
  FileSpreadsheet,
  X,
} from 'lucide-react'
import { formatCurrency, formatDate, formatPhone, getInitials } from '@/lib/utils'
import { useDebounce } from '@/hooks/useDebounce'
import { exportToCSV, exportToExcel } from '@/lib/export'
import toast from 'react-hot-toast'

// Mock data - larger dataset for pagination demo
const allCustomers = [
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
  {
    id: '6',
    firstName: 'Jessica',
    lastName: 'Martinez',
    email: 'jessica.m@email.com',
    phone: '5556667777',
    company: null,
    loyaltyTier: 'SILVER',
    loyaltyPoints: 1800,
    totalSpent: 2340.00,
    orderCount: 6,
    vehicleCount: 2,
    tags: [],
    lastOrderDate: '2025-01-08',
    createdAt: '2024-04-20',
  },
  {
    id: '7',
    firstName: 'Robert',
    lastName: 'Taylor',
    email: 'robert.taylor@email.com',
    phone: '5558889999',
    company: 'Taylor Trucking',
    loyaltyTier: 'PLATINUM',
    loyaltyPoints: 7200,
    totalSpent: 12500.00,
    orderCount: 22,
    vehicleCount: 8,
    tags: ['Fleet', 'Wholesale', 'VIP'],
    lastOrderDate: '2025-01-16',
    createdAt: '2023-06-10',
  },
  {
    id: '8',
    firstName: 'Amanda',
    lastName: 'Garcia',
    email: 'amanda.g@email.com',
    phone: '5551112222',
    company: null,
    loyaltyTier: 'BRONZE',
    loyaltyPoints: 520,
    totalSpent: 678.00,
    orderCount: 2,
    vehicleCount: 1,
    tags: [],
    lastOrderDate: '2024-12-20',
    createdAt: '2024-10-15',
  },
  {
    id: '9',
    firstName: 'Christopher',
    lastName: 'Anderson',
    email: 'chris.a@company.com',
    phone: '5553334444',
    company: 'Anderson Motors',
    loyaltyTier: 'GOLD',
    loyaltyPoints: 2800,
    totalSpent: 3890.00,
    orderCount: 9,
    vehicleCount: 4,
    tags: ['B2B'],
    lastOrderDate: '2025-01-14',
    createdAt: '2024-01-25',
  },
  {
    id: '10',
    firstName: 'Jennifer',
    lastName: 'Thomas',
    email: 'jennifer.t@email.com',
    phone: '5557778888',
    company: null,
    loyaltyTier: 'SILVER',
    loyaltyPoints: 1450,
    totalSpent: 1980.00,
    orderCount: 5,
    vehicleCount: 1,
    tags: [],
    lastOrderDate: '2025-01-07',
    createdAt: '2024-05-12',
  },
  {
    id: '11',
    firstName: 'Daniel',
    lastName: 'Jackson',
    email: 'daniel.j@email.com',
    phone: '5559990000',
    company: 'Jackson Services',
    loyaltyTier: 'GOLD',
    loyaltyPoints: 3100,
    totalSpent: 4120.00,
    orderCount: 11,
    vehicleCount: 3,
    tags: ['Fleet'],
    lastOrderDate: '2025-01-11',
    createdAt: '2024-02-28',
  },
  {
    id: '12',
    firstName: 'Michelle',
    lastName: 'White',
    email: 'michelle.w@email.com',
    phone: '5551234500',
    company: null,
    loyaltyTier: 'BRONZE',
    loyaltyPoints: 280,
    totalSpent: 345.00,
    orderCount: 1,
    vehicleCount: 1,
    tags: ['New'],
    lastOrderDate: '2025-01-02',
    createdAt: '2025-01-01',
  },
]

const loyaltyColors: Record<string, string> = {
  BRONZE: 'bg-amber-100 text-amber-700',
  SILVER: 'bg-gray-200 text-gray-700',
  GOLD: 'bg-yellow-100 text-yellow-700',
  PLATINUM: 'bg-purple-100 text-purple-700',
}

const ITEMS_PER_PAGE = 5

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTier, setSelectedTier] = useState<string>('')
  const [selectedTag, setSelectedTag] = useState<string>('')
  const [orderCountFilter, setOrderCountFilter] = useState<string>('')
  const [spentFilter, setSpentFilter] = useState<string>('')
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [showExportMenu, setShowExportMenu] = useState(false)

  // Delete confirmation
  const [deleteTarget, setDeleteTarget] = useState<typeof allCustomers[0] | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  // Debounce search for better performance
  const debouncedSearch = useDebounce(searchQuery, 300)

  // Filter customers with all filters
  const filteredCustomers = useMemo(() => {
    return allCustomers.filter(customer => {
      // Search filter
      const matchesSearch =
        `${customer.firstName} ${customer.lastName}`.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        customer.email.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        customer.phone.includes(debouncedSearch) ||
        (customer.company && customer.company.toLowerCase().includes(debouncedSearch.toLowerCase()))

      // Tier filter
      const matchesTier = !selectedTier || customer.loyaltyTier === selectedTier

      // Tag filter
      const matchesTag = !selectedTag || customer.tags.includes(selectedTag)

      // Order count filter
      let matchesOrderCount = true
      if (orderCountFilter) {
        if (orderCountFilter === '0') matchesOrderCount = customer.orderCount === 0
        else if (orderCountFilter === '1-5') matchesOrderCount = customer.orderCount >= 1 && customer.orderCount <= 5
        else if (orderCountFilter === '6-10') matchesOrderCount = customer.orderCount >= 6 && customer.orderCount <= 10
        else if (orderCountFilter === '10+') matchesOrderCount = customer.orderCount > 10
      }

      // Spent filter
      let matchesSpent = true
      if (spentFilter) {
        if (spentFilter === '0-500') matchesSpent = customer.totalSpent <= 500
        else if (spentFilter === '500-1000') matchesSpent = customer.totalSpent > 500 && customer.totalSpent <= 1000
        else if (spentFilter === '1000-5000') matchesSpent = customer.totalSpent > 1000 && customer.totalSpent <= 5000
        else if (spentFilter === '5000+') matchesSpent = customer.totalSpent > 5000
      }

      return matchesSearch && matchesTier && matchesTag && matchesOrderCount && matchesSpent
    })
  }, [debouncedSearch, selectedTier, selectedTag, orderCountFilter, spentFilter])

  // Pagination
  const totalPages = Math.ceil(filteredCustomers.length / ITEMS_PER_PAGE)
  const showingFrom = filteredCustomers.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1
  const showingTo = Math.min(currentPage * ITEMS_PER_PAGE, filteredCustomers.length)
  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  // Reset to page 1 when filters change
  const handleFilterChange = useCallback((setter: (value: string) => void, value: string) => {
    setter(value)
    setCurrentPage(1)
  }, [])

  // Clear all filters
  const clearFilters = () => {
    setSelectedTier('')
    setSelectedTag('')
    setOrderCountFilter('')
    setSpentFilter('')
    setSearchQuery('')
    setCurrentPage(1)
  }

  const hasActiveFilters = selectedTier || selectedTag || orderCountFilter || spentFilter || searchQuery

  // Export functions
  const handleExportCSV = () => {
    exportToCSV(
      filteredCustomers.map(c => ({
        'First Name': c.firstName,
        'Last Name': c.lastName,
        'Email': c.email,
        'Phone': formatPhone(c.phone),
        'Company': c.company || '',
        'Loyalty Tier': c.loyaltyTier,
        'Loyalty Points': c.loyaltyPoints,
        'Total Spent': c.totalSpent,
        'Order Count': c.orderCount,
        'Tags': c.tags.join(', '),
        'Last Order': c.lastOrderDate,
        'Created': c.createdAt,
      })),
      `customers-export-${new Date().toISOString().split('T')[0]}`
    )
    toast.success('Exported to CSV successfully')
    setShowExportMenu(false)
  }

  const handleExportExcel = () => {
    exportToExcel(
      filteredCustomers.map(c => ({
        'First Name': c.firstName,
        'Last Name': c.lastName,
        'Email': c.email,
        'Phone': formatPhone(c.phone),
        'Company': c.company || '',
        'Loyalty Tier': c.loyaltyTier,
        'Loyalty Points': c.loyaltyPoints,
        'Total Spent': c.totalSpent,
        'Order Count': c.orderCount,
        'Tags': c.tags.join(', '),
        'Last Order': c.lastOrderDate,
        'Created': c.createdAt,
      })),
      `customers-export-${new Date().toISOString().split('T')[0]}`
    )
    toast.success('Exported to Excel successfully')
    setShowExportMenu(false)
  }

  // Delete handler
  const handleDelete = async () => {
    if (!deleteTarget) return
    setIsDeleting(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    toast.success(`Customer ${deleteTarget.firstName} ${deleteTarget.lastName} deleted successfully`)
    setIsDeleting(false)
    setDeleteTarget(null)
  }

  return (
    <div className="min-h-screen">
      <Header
        title="Customers"
        subtitle={`${filteredCustomers.length} total customers`}
      />

      <div className="p-6">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search customers by name, email, phone, or company..."
              value={searchQuery}
              onChange={(e) => handleFilterChange(setSearchQuery, e.target.value)}
              className="input pl-10"
            />
            {searchQuery && (
              <button
                onClick={() => handleFilterChange(setSearchQuery, '')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filters and Actions */}
          <div className="flex flex-wrap gap-3">
            <Button
              variant={showFilters ? 'primary' : 'outline'}
              onClick={() => setShowFilters(!showFilters)}
              leftIcon={<Filter className="w-4 h-4" />}
            >
              Filters
              {hasActiveFilters && (
                <span className="ml-1 w-2 h-2 bg-primary-500 rounded-full" />
              )}
            </Button>

            {/* Export Dropdown */}
            <div className="relative">
              <Button
                variant="outline"
                onClick={() => setShowExportMenu(!showExportMenu)}
                leftIcon={<Download className="w-4 h-4" />}
              >
                Export
              </Button>
              {showExportMenu && (
                <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <button
                    onClick={handleExportCSV}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <Download className="w-4 h-4" />
                    Export to CSV
                  </button>
                  <button
                    onClick={handleExportExcel}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    Export to Excel
                  </button>
                </div>
              )}
            </div>

            <Button variant="outline" leftIcon={<Upload className="w-4 h-4" />}>
              Import
            </Button>

            <Link href="/customers/new">
              <Button leftIcon={<Plus className="w-4 h-4" />}>
                Add Customer
              </Button>
            </Link>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="card p-4 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900">Filters</h3>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  Clear all filters
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="label">Loyalty Tier</label>
                <select
                  value={selectedTier}
                  onChange={(e) => handleFilterChange(setSelectedTier, e.target.value)}
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
                <select
                  value={orderCountFilter}
                  onChange={(e) => handleFilterChange(setOrderCountFilter, e.target.value)}
                  className="select"
                >
                  <option value="">Any</option>
                  <option value="0">No orders</option>
                  <option value="1-5">1-5 orders</option>
                  <option value="6-10">6-10 orders</option>
                  <option value="10+">10+ orders</option>
                </select>
              </div>
              <div>
                <label className="label">Total Spent</label>
                <select
                  value={spentFilter}
                  onChange={(e) => handleFilterChange(setSpentFilter, e.target.value)}
                  className="select"
                >
                  <option value="">Any</option>
                  <option value="0-500">$0 - $500</option>
                  <option value="500-1000">$500 - $1,000</option>
                  <option value="1000-5000">$1,000 - $5,000</option>
                  <option value="5000+">$5,000+</option>
                </select>
              </div>
              <div>
                <label className="label">Tags</label>
                <select
                  value={selectedTag}
                  onChange={(e) => handleFilterChange(setSelectedTag, e.target.value)}
                  className="select"
                >
                  <option value="">All Tags</option>
                  <option value="VIP">VIP</option>
                  <option value="Fleet">Fleet</option>
                  <option value="Wholesale">Wholesale</option>
                  <option value="New">New</option>
                  <option value="B2B">B2B</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Customer Table */}
        <div className="card overflow-hidden">
          {isLoading ? (
            <TableSkeleton rows={5} columns={7} />
          ) : (
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
                  {paginatedCustomers.length > 0 ? (
                    paginatedCustomers.map((customer) => (
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
                              onClick={() => setDeleteTarget(customer)}
                              className="p-2 text-gray-400 hover:text-danger-600 hover:bg-danger-50 rounded-lg"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="text-center py-12">
                        <div className="empty-state">
                          <Search className="empty-state-icon" />
                          <h3 className="empty-state-title">No customers found</h3>
                          <p className="empty-state-description">
                            {hasActiveFilters
                              ? 'Try adjusting your search or filter criteria'
                              : 'Get started by adding your first customer'}
                          </p>
                          {hasActiveFilters ? (
                            <Button variant="outline" onClick={clearFilters} className="mt-4">
                              Clear Filters
                            </Button>
                          ) : (
                            <Link href="/customers/new">
                              <Button className="mt-4" leftIcon={<Plus className="w-4 h-4" />}>
                                Add Customer
                              </Button>
                            </Link>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {filteredCustomers.length > ITEMS_PER_PAGE && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredCustomers.length}
              itemsPerPage={ITEMS_PER_PAGE}
              showingFrom={showingFrom}
              showingTo={showingTo}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Customer"
        message={`Are you sure you want to delete ${deleteTarget?.firstName} ${deleteTarget?.lastName}? This action cannot be undone and will remove all associated data including order history.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        isLoading={isDeleting}
      />
    </div>
  )
}

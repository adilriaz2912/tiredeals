'use client'

import { useState } from 'react'
import { Header } from '@/components/layout'
import Link from 'next/link'
import {
  Search,
  Filter,
  Plus,
  MessageSquare,
  Clock,
  User,
  AlertCircle,
  CheckCircle,
  MoreHorizontal,
  Eye,
  UserPlus,
} from 'lucide-react'
import { formatRelativeTime, getInitials } from '@/lib/utils'

// Mock data
const tickets = [
  {
    id: 'TKT-001',
    ticketNumber: 'TKT-001',
    subject: 'Wrong tire size delivered',
    description: 'I ordered 225/65R17 but received 215/55R17. Please help resolve this issue.',
    category: 'ORDER_ISSUE',
    priority: 'HIGH',
    status: 'OPEN',
    customer: { id: '1', firstName: 'John', lastName: 'Smith', email: 'john@email.com' },
    assignedTo: null,
    orderId: 'TD-A1B2C3',
    commentsCount: 2,
    createdAt: new Date(Date.now() - 3600000),
    updatedAt: new Date(Date.now() - 1800000),
  },
  {
    id: 'TKT-002',
    ticketNumber: 'TKT-002',
    subject: 'Installation appointment inquiry',
    description: 'How do I schedule an installation with a local installer?',
    category: 'INSTALLATION',
    priority: 'MEDIUM',
    status: 'IN_PROGRESS',
    customer: { id: '2', firstName: 'Sarah', lastName: 'Johnson', email: 'sarah@email.com' },
    assignedTo: { id: '1', firstName: 'Support', lastName: 'Agent' },
    orderId: 'TD-D4E5F6',
    commentsCount: 4,
    createdAt: new Date(Date.now() - 86400000),
    updatedAt: new Date(Date.now() - 7200000),
  },
  {
    id: 'TKT-003',
    ticketNumber: 'TKT-003',
    subject: 'Warranty claim request',
    description: 'One of my tires has a bubble on the sidewall. I believe this is a manufacturing defect.',
    category: 'WARRANTY',
    priority: 'MEDIUM',
    status: 'WAITING_CUSTOMER',
    customer: { id: '3', firstName: 'Mike', lastName: 'Wilson', email: 'mike@email.com' },
    assignedTo: { id: '1', firstName: 'Support', lastName: 'Agent' },
    orderId: 'TD-G7H8I9',
    commentsCount: 3,
    createdAt: new Date(Date.now() - 172800000),
    updatedAt: new Date(Date.now() - 43200000),
  },
  {
    id: 'TKT-004',
    ticketNumber: 'TKT-004',
    subject: 'Order tracking not updating',
    description: 'My tracking shows the same status for 3 days. Is there an issue with the shipment?',
    category: 'SHIPPING',
    priority: 'LOW',
    status: 'RESOLVED',
    customer: { id: '4', firstName: 'Emily', lastName: 'Brown', email: 'emily@email.com' },
    assignedTo: { id: '1', firstName: 'Support', lastName: 'Agent' },
    orderId: 'TD-J1K2L3',
    commentsCount: 5,
    createdAt: new Date(Date.now() - 259200000),
    updatedAt: new Date(Date.now() - 86400000),
  },
  {
    id: 'TKT-005',
    ticketNumber: 'TKT-005',
    subject: 'Request for invoice copy',
    description: 'I need a copy of my invoice for my records. Order was placed last month.',
    category: 'BILLING',
    priority: 'LOW',
    status: 'CLOSED',
    customer: { id: '5', firstName: 'David', lastName: 'Lee', email: 'david@email.com' },
    assignedTo: { id: '1', firstName: 'Support', lastName: 'Agent' },
    orderId: 'TD-M4N5O6',
    commentsCount: 2,
    createdAt: new Date(Date.now() - 432000000),
    updatedAt: new Date(Date.now() - 345600000),
  },
]

const categoryLabels: Record<string, string> = {
  ORDER_ISSUE: 'Order Issue',
  SHIPPING: 'Shipping',
  RETURNS: 'Returns',
  WARRANTY: 'Warranty',
  PRODUCT_QUESTION: 'Product Question',
  INSTALLATION: 'Installation',
  BILLING: 'Billing',
  TECHNICAL: 'Technical',
  OTHER: 'Other',
}

const priorityConfig: Record<string, { color: string; badge: string }> = {
  LOW: { color: 'text-gray-500', badge: 'badge-gray' },
  MEDIUM: { color: 'text-warning-500', badge: 'badge-warning' },
  HIGH: { color: 'text-danger-500', badge: 'badge-danger' },
  URGENT: { color: 'text-danger-600', badge: 'badge-danger' },
}

const statusConfig: Record<string, { color: string; badge: string; label: string }> = {
  OPEN: { color: 'text-warning-500', badge: 'badge-warning', label: 'Open' },
  IN_PROGRESS: { color: 'text-info-500', badge: 'badge-info', label: 'In Progress' },
  WAITING_CUSTOMER: { color: 'text-gray-500', badge: 'badge-gray', label: 'Waiting on Customer' },
  WAITING_INTERNAL: { color: 'text-gray-500', badge: 'badge-gray', label: 'Waiting Internal' },
  RESOLVED: { color: 'text-success-500', badge: 'badge-success', label: 'Resolved' },
  CLOSED: { color: 'text-gray-400', badge: 'badge-gray', label: 'Closed' },
}

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [selectedPriority, setSelectedPriority] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch =
      ticket.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `${ticket.customer.firstName} ${ticket.customer.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = !selectedStatus || ticket.status === selectedStatus
    const matchesPriority = !selectedPriority || ticket.priority === selectedPriority
    const matchesCategory = !selectedCategory || ticket.category === selectedCategory

    return matchesSearch && matchesStatus && matchesPriority && matchesCategory
  })

  // Stats
  const stats = {
    open: tickets.filter(t => t.status === 'OPEN').length,
    inProgress: tickets.filter(t => t.status === 'IN_PROGRESS').length,
    waitingCustomer: tickets.filter(t => t.status === 'WAITING_CUSTOMER').length,
    resolved: tickets.filter(t => t.status === 'RESOLVED' || t.status === 'CLOSED').length,
    highPriority: tickets.filter(t => t.priority === 'HIGH' || t.priority === 'URGENT').length,
  }

  return (
    <div className="min-h-screen">
      <Header
        title="Support Tickets"
        subtitle="Manage customer support requests"
      />

      <div className="p-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="card p-4 border-l-4 border-l-warning-500">
            <p className="text-2xl font-bold text-warning-600">{stats.open}</p>
            <p className="text-sm text-gray-500">Open</p>
          </div>
          <div className="card p-4 border-l-4 border-l-info-500">
            <p className="text-2xl font-bold text-info-600">{stats.inProgress}</p>
            <p className="text-sm text-gray-500">In Progress</p>
          </div>
          <div className="card p-4 border-l-4 border-l-gray-400">
            <p className="text-2xl font-bold text-gray-600">{stats.waitingCustomer}</p>
            <p className="text-sm text-gray-500">Waiting</p>
          </div>
          <div className="card p-4 border-l-4 border-l-success-500">
            <p className="text-2xl font-bold text-success-600">{stats.resolved}</p>
            <p className="text-sm text-gray-500">Resolved</p>
          </div>
          <div className="card p-4 border-l-4 border-l-danger-500">
            <p className="text-2xl font-bold text-danger-600">{stats.highPriority}</p>
            <p className="text-sm text-gray-500">High Priority</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search tickets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-10"
            />
          </div>

          <div className="flex gap-3 flex-wrap">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="select w-40"
            >
              <option value="">All Status</option>
              <option value="OPEN">Open</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="WAITING_CUSTOMER">Waiting Customer</option>
              <option value="RESOLVED">Resolved</option>
              <option value="CLOSED">Closed</option>
            </select>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="select w-36"
            >
              <option value="">All Priority</option>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="URGENT">Urgent</option>
            </select>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="select w-40"
            >
              <option value="">All Categories</option>
              {Object.entries(categoryLabels).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
            <Link href="/support/new" className="btn-primary btn-md">
              <Plus className="w-4 h-4" />
              New Ticket
            </Link>
          </div>
        </div>

        {/* Tickets List */}
        <div className="space-y-3">
          {filteredTickets.map((ticket) => (
            <div key={ticket.id} className="card p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  {/* Priority Indicator */}
                  <div className={`mt-1 ${priorityConfig[ticket.priority].color}`}>
                    <AlertCircle className="w-5 h-5" />
                  </div>

                  {/* Ticket Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <Link
                        href={`/support/${ticket.id}`}
                        className="font-semibold text-gray-900 hover:text-primary-600"
                      >
                        {ticket.subject}
                      </Link>
                      <span className={statusConfig[ticket.status].badge}>
                        {statusConfig[ticket.status].label}
                      </span>
                      <span className={priorityConfig[ticket.priority].badge}>
                        {ticket.priority}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 line-clamp-1 mb-2">
                      {ticket.description}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="font-medium text-gray-700">{ticket.ticketNumber}</span>
                      <span className="badge badge-gray">{categoryLabels[ticket.category]}</span>
                      <span>•</span>
                      <Link href={`/customers/${ticket.customer.id}`} className="hover:text-primary-600">
                        {ticket.customer.firstName} {ticket.customer.lastName}
                      </Link>
                      {ticket.orderId && (
                        <>
                          <span>•</span>
                          <Link href={`/orders/${ticket.orderId}`} className="text-primary-600 hover:underline">
                            {ticket.orderId}
                          </Link>
                        </>
                      )}
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-3.5 h-3.5" />
                        {ticket.commentsCount}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-4 ml-4">
                  {/* Assigned To */}
                  <div className="text-right">
                    {ticket.assignedTo ? (
                      <div className="flex items-center gap-2">
                        <div className="avatar avatar-sm bg-primary-100 text-primary-600">
                          {getInitials(ticket.assignedTo.firstName, ticket.assignedTo.lastName)}
                        </div>
                        <span className="text-sm text-gray-600">
                          {ticket.assignedTo.firstName}
                        </span>
                      </div>
                    ) : (
                      <button className="btn-ghost btn-sm text-gray-400">
                        <UserPlus className="w-4 h-4" />
                        Assign
                      </button>
                    )}
                  </div>

                  {/* Timestamp */}
                  <div className="text-right min-w-[100px]">
                    <p className="text-sm text-gray-900">{formatRelativeTime(ticket.updatedAt)}</p>
                    <p className="text-xs text-gray-500">Updated</p>
                  </div>

                  {/* Actions */}
                  <Link
                    href={`/support/${ticket.id}`}
                    className="btn-primary btn-sm"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTickets.length === 0 && (
          <div className="empty-state py-16">
            <MessageSquare className="empty-state-icon" />
            <h3 className="empty-state-title">No tickets found</h3>
            <p className="empty-state-description">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

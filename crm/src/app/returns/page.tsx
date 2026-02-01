'use client'

import { Header } from '@/components/layout'
import { useState } from 'react'
import {
  Search,
  Plus,
  RotateCcw,
  RefreshCw,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Truck,
  Eye,
  MoreHorizontal,
  Package,
} from 'lucide-react'
import Link from 'next/link'
import { cn, formatCurrency, formatDate } from '@/lib/utils'

type ReturnStatus = 'REQUESTED' | 'APPROVED' | 'LABEL_SENT' | 'IN_TRANSIT' | 'RECEIVED' | 'INSPECTING' | 'COMPLETED' | 'DENIED'

interface Return {
  id: string
  returnNumber: string
  orderId: string
  orderNumber: string
  customerName: string
  customerEmail: string
  status: ReturnStatus
  type: 'RETURN' | 'EXCHANGE' | 'WARRANTY_CLAIM'
  reason: string
  items: { name: string; qty: number; price: number }[]
  totalValue: number
  refundAmount: number | null
  createdAt: Date
  updatedAt: Date
}

// Mock data
const mockReturns: Return[] = [
  {
    id: '1',
    returnNumber: 'RET-001',
    orderId: 'ord-1',
    orderNumber: 'TD-A1B2C3',
    customerName: 'John Smith',
    customerEmail: 'john@email.com',
    status: 'REQUESTED',
    type: 'RETURN',
    reason: 'Wrong tire size ordered',
    items: [{ name: 'Michelin Defender T+H 225/65R17', qty: 4, price: 149.99 }],
    totalValue: 599.96,
    refundAmount: null,
    createdAt: new Date(Date.now() - 86400000),
    updatedAt: new Date(Date.now() - 86400000),
  },
  {
    id: '2',
    returnNumber: 'RET-002',
    orderId: 'ord-2',
    orderNumber: 'TD-D4E5F6',
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah@email.com',
    status: 'IN_TRANSIT',
    type: 'EXCHANGE',
    reason: 'Defective tire - sidewall bulge',
    items: [{ name: 'Goodyear Assurance 215/55R17', qty: 1, price: 119.99 }],
    totalValue: 119.99,
    refundAmount: null,
    createdAt: new Date(Date.now() - 172800000),
    updatedAt: new Date(Date.now() - 43200000),
  },
  {
    id: '3',
    returnNumber: 'RET-003',
    orderId: 'ord-3',
    orderNumber: 'TD-G7H8I9',
    customerName: 'Mike Wilson',
    customerEmail: 'mike@email.com',
    status: 'COMPLETED',
    type: 'RETURN',
    reason: 'Changed mind - no longer need',
    items: [{ name: 'Bridgestone Turanza 225/60R16', qty: 2, price: 159.99 }],
    totalValue: 319.98,
    refundAmount: 287.98,
    createdAt: new Date(Date.now() - 604800000),
    updatedAt: new Date(Date.now() - 259200000),
  },
  {
    id: '4',
    returnNumber: 'RET-004',
    orderId: 'ord-4',
    orderNumber: 'TD-J1K2L3',
    customerName: 'Emily Brown',
    customerEmail: 'emily@email.com',
    status: 'INSPECTING',
    type: 'WARRANTY_CLAIM',
    reason: 'Premature tread wear',
    items: [{ name: 'Continental TrueContact 205/55R16', qty: 4, price: 129.99 }],
    totalValue: 519.96,
    refundAmount: null,
    createdAt: new Date(Date.now() - 432000000),
    updatedAt: new Date(Date.now() - 86400000),
  },
  {
    id: '5',
    returnNumber: 'RET-005',
    orderId: 'ord-5',
    orderNumber: 'TD-M4N5O6',
    customerName: 'David Lee',
    customerEmail: 'david@email.com',
    status: 'DENIED',
    type: 'RETURN',
    reason: 'Tires already mounted and used',
    items: [{ name: 'Pirelli P4 Four Seasons 225/65R17', qty: 4, price: 139.99 }],
    totalValue: 559.96,
    refundAmount: 0,
    createdAt: new Date(Date.now() - 864000000),
    updatedAt: new Date(Date.now() - 691200000),
  },
]

const stats = {
  pending: 12,
  inProgress: 8,
  completed: 145,
  totalRefunded: 18650,
}

const statusConfig: Record<ReturnStatus, { label: string; color: string; icon: React.ReactNode }> = {
  REQUESTED: { label: 'Requested', color: 'bg-amber-500/20 text-amber-400 border border-amber-500/30', icon: <Clock className="w-3 h-3" /> },
  APPROVED: { label: 'Approved', color: 'bg-blue-500/20 text-blue-400 border border-blue-500/30', icon: <CheckCircle className="w-3 h-3" /> },
  LABEL_SENT: { label: 'Label Sent', color: 'bg-blue-500/20 text-blue-400 border border-blue-500/30', icon: <Package className="w-3 h-3" /> },
  IN_TRANSIT: { label: 'In Transit', color: 'bg-green-500/20 text-green-400 border border-green-500/30', icon: <Truck className="w-3 h-3" /> },
  RECEIVED: { label: 'Received', color: 'bg-blue-500/20 text-blue-400 border border-blue-500/30', icon: <Package className="w-3 h-3" /> },
  INSPECTING: { label: 'Inspecting', color: 'bg-amber-500/20 text-amber-400 border border-amber-500/30', icon: <AlertTriangle className="w-3 h-3" /> },
  COMPLETED: { label: 'Completed', color: 'bg-green-500/20 text-green-400 border border-green-500/30', icon: <CheckCircle className="w-3 h-3" /> },
  DENIED: { label: 'Denied', color: 'bg-red-500/20 text-red-400 border border-red-500/30', icon: <XCircle className="w-3 h-3" /> },
}

const typeLabels: Record<string, { label: string; color: string }> = {
  RETURN: { label: 'Return', color: 'bg-blue-500/20 text-blue-400 border border-blue-500/30' },
  EXCHANGE: { label: 'Exchange', color: 'bg-purple-500/20 text-purple-400 border border-purple-500/30' },
  WARRANTY_CLAIM: { label: 'Warranty', color: 'bg-amber-500/20 text-amber-400 border border-amber-500/30' },
}

export default function ReturnsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')

  const filteredReturns = mockReturns.filter(ret => {
    const matchesSearch = ret.returnNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ret.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ret.orderNumber.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || ret.status === statusFilter
    const matchesType = typeFilter === 'all' || ret.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  return (
    <div className="min-h-screen bg-black">
      <Header
        title="Returns & Refunds"
        subtitle="Manage product returns, exchanges, and refund requests"
        actions={
          <button className="flex items-center gap-2 px-4 py-2.5 bg-green-500 text-black font-semibold rounded-xl hover:bg-green-400 transition-colors">
            <Plus className="w-4 h-4" />
            Create Return
          </button>
        }
      />

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-neutral-900/80 backdrop-blur rounded-2xl border border-neutral-800 p-5">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-amber-500/20">
                <Clock className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.pending}</p>
                <p className="text-sm text-neutral-400">Pending Returns</p>
              </div>
            </div>
          </div>
          <div className="bg-neutral-900/80 backdrop-blur rounded-2xl border border-neutral-800 p-5">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-500/20">
                <RefreshCw className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.inProgress}</p>
                <p className="text-sm text-neutral-400">In Progress</p>
              </div>
            </div>
          </div>
          <div className="bg-neutral-900/80 backdrop-blur rounded-2xl border border-neutral-800 p-5">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-green-500/20">
                <CheckCircle className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.completed}</p>
                <p className="text-sm text-neutral-400">Completed (30d)</p>
              </div>
            </div>
          </div>
          <div className="bg-neutral-900/80 backdrop-blur rounded-2xl border border-neutral-800 p-5">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-green-500/20">
                <DollarSign className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-400">{formatCurrency(stats.totalRefunded)}</p>
                <p className="text-sm text-neutral-400">Total Refunded (30d)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-neutral-900/80 backdrop-blur rounded-2xl border border-neutral-800 p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
              <input
                type="text"
                placeholder="Search by return #, order #, or customer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-green-500/50"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500/50"
            >
              <option value="all">All Statuses</option>
              <option value="REQUESTED">Requested</option>
              <option value="APPROVED">Approved</option>
              <option value="LABEL_SENT">Label Sent</option>
              <option value="IN_TRANSIT">In Transit</option>
              <option value="RECEIVED">Received</option>
              <option value="INSPECTING">Inspecting</option>
              <option value="COMPLETED">Completed</option>
              <option value="DENIED">Denied</option>
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500/50"
            >
              <option value="all">All Types</option>
              <option value="RETURN">Return</option>
              <option value="EXCHANGE">Exchange</option>
              <option value="WARRANTY_CLAIM">Warranty</option>
            </select>
          </div>
        </div>

        {/* Returns Table */}
        <div className="bg-neutral-900/80 backdrop-blur rounded-2xl border border-neutral-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-neutral-800/50">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-400 uppercase">Return #</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-400 uppercase">Order</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-400 uppercase">Customer</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-400 uppercase">Type</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-400 uppercase">Reason</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-400 uppercase">Value</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-400 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-400 uppercase">Date</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {filteredReturns.map((ret) => (
                  <tr key={ret.id} className="hover:bg-neutral-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <Link href={`/returns/${ret.id}`} className="font-medium text-green-400 hover:text-green-300">
                        {ret.returnNumber}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/orders/${ret.orderId}`} className="text-neutral-300 hover:text-green-400">
                        {ret.orderNumber}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-white">{ret.customerName}</p>
                        <p className="text-sm text-neutral-500">{ret.customerEmail}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn('inline-flex px-2.5 py-1 text-xs font-semibold rounded-lg', typeLabels[ret.type].color)}>
                        {typeLabels[ret.type].label}
                      </span>
                    </td>
                    <td className="px-6 py-4 max-w-xs">
                      <p className="text-neutral-300 truncate" title={ret.reason}>{ret.reason}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-white">{formatCurrency(ret.totalValue)}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn('inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg', statusConfig[ret.status].color)}>
                        {statusConfig[ret.status].icon}
                        {statusConfig[ret.status].label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-neutral-400">{formatDate(ret.createdAt)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/returns/${ret.id}`}
                          className="p-2 text-neutral-400 hover:text-green-400 hover:bg-neutral-800 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Return Policy Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-neutral-900/80 backdrop-blur rounded-2xl border border-neutral-800 p-5">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-neutral-800 rounded-xl">
                <RotateCcw className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="font-medium text-white">30-Day Returns</p>
                <p className="text-sm text-neutral-400 mt-1">Unmounted tires can be returned within 30 days for a full refund.</p>
              </div>
            </div>
          </div>
          <div className="bg-neutral-900/80 backdrop-blur rounded-2xl border border-neutral-800 p-5">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-neutral-800 rounded-xl">
                <RefreshCw className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="font-medium text-white">Easy Exchanges</p>
                <p className="text-sm text-neutral-400 mt-1">Exchange for a different size or model at no additional shipping cost.</p>
              </div>
            </div>
          </div>
          <div className="bg-neutral-900/80 backdrop-blur rounded-2xl border border-neutral-800 p-5">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-neutral-800 rounded-xl">
                <DollarSign className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="font-medium text-white">Restocking Fee</p>
                <p className="text-sm text-neutral-400 mt-1">10% restocking fee for returns without defects after 14 days.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

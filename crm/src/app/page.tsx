'use client'

import { Header } from '@/components/layout'
import {
  DollarSign,
  ShoppingCart,
  Users,
  TrendingUp,
  TrendingDown,
  Package,
  Truck,
  Ticket,
  Shield,
  ShoppingBag,
  ArrowRight,
  Clock,
} from 'lucide-react'
import Link from 'next/link'
import { formatCurrency, formatRelativeTime } from '@/lib/utils'

// Mock data - in production this would come from API
const stats = {
  revenue: { value: 125750, change: 12.5 },
  orders: { value: 342, change: 8.2 },
  customers: { value: 1250, change: 15.3 },
  avgOrder: { value: 367.69, change: -2.1 },
}

const alerts = {
  openTickets: 12,
  abandonedCarts: 28,
  lowStock: 5,
  expiringWarranties: 8,
}

const recentOrders = [
  { id: 'TD-A1B2C3', customer: 'John Smith', total: 892.00, status: 'PROCESSING', date: new Date(Date.now() - 1800000) },
  { id: 'TD-D4E5F6', customer: 'Sarah Johnson', total: 1245.00, status: 'SHIPPED', date: new Date(Date.now() - 7200000) },
  { id: 'TD-G7H8I9', customer: 'Mike Wilson', total: 456.00, status: 'PENDING', date: new Date(Date.now() - 14400000) },
  { id: 'TD-J1K2L3', customer: 'Emily Brown', total: 678.00, status: 'DELIVERED', date: new Date(Date.now() - 28800000) },
  { id: 'TD-M4N5O6', customer: 'David Lee', total: 1567.00, status: 'PROCESSING', date: new Date(Date.now() - 43200000) },
]

const recentTickets = [
  { id: 'TKT-001', subject: 'Wrong tire size delivered', priority: 'HIGH', status: 'OPEN', customer: 'John Doe' },
  { id: 'TKT-002', subject: 'Installation appointment inquiry', priority: 'MEDIUM', status: 'IN_PROGRESS', customer: 'Jane Smith' },
  { id: 'TKT-003', subject: 'Warranty claim request', priority: 'MEDIUM', status: 'OPEN', customer: 'Bob Johnson' },
  { id: 'TKT-004', subject: 'Order tracking not updating', priority: 'LOW', status: 'WAITING_CUSTOMER', customer: 'Alice Brown' },
]

const topProducts = [
  { name: 'Michelin Defender T+H', sold: 145, revenue: 21750 },
  { name: 'Goodyear Assurance', sold: 128, revenue: 15360 },
  { name: 'Bridgestone Turanza', sold: 112, revenue: 17920 },
  { name: 'Continental TrueContact', sold: 98, revenue: 14700 },
  { name: 'Pirelli P4 Four Seasons', sold: 87, revenue: 13920 },
]

export default function Dashboard() {
  return (
    <div className="min-h-screen">
      <Header
        title="Dashboard"
        subtitle={`Welcome back! Here's what's happening with your store.`}
      />

      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Revenue"
            value={formatCurrency(stats.revenue.value)}
            change={stats.revenue.change}
            icon={<DollarSign className="w-6 h-6" />}
            color="green"
          />
          <StatCard
            title="Total Orders"
            value={stats.orders.value.toString()}
            change={stats.orders.change}
            icon={<ShoppingCart className="w-6 h-6" />}
            color="blue"
          />
          <StatCard
            title="Total Customers"
            value={stats.customers.value.toLocaleString()}
            change={stats.customers.change}
            icon={<Users className="w-6 h-6" />}
            color="purple"
          />
          <StatCard
            title="Avg. Order Value"
            value={formatCurrency(stats.avgOrder.value)}
            change={stats.avgOrder.change}
            icon={<TrendingUp className="w-6 h-6" />}
            color="amber"
          />
        </div>

        {/* Alerts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <AlertCard
            title="Open Tickets"
            value={alerts.openTickets}
            icon={<Ticket className="w-5 h-5" />}
            href="/support?status=OPEN"
            color="red"
          />
          <AlertCard
            title="Abandoned Carts"
            value={alerts.abandonedCarts}
            icon={<ShoppingBag className="w-5 h-5" />}
            href="/abandoned-carts"
            color="amber"
          />
          <AlertCard
            title="Low Stock Items"
            value={alerts.lowStock}
            icon={<Package className="w-5 h-5" />}
            href="/inventory?filter=low-stock"
            color="orange"
          />
          <AlertCard
            title="Expiring Warranties"
            value={alerts.expiringWarranties}
            icon={<Shield className="w-5 h-5" />}
            href="/warranties?filter=expiring"
            color="purple"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <div className="lg:col-span-2 card">
            <div className="card-header flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
              <Link href="/orders" className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Customer</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td>
                        <Link href={`/orders/${order.id}`} className="font-medium text-primary-600 hover:text-primary-700">
                          {order.id}
                        </Link>
                      </td>
                      <td>{order.customer}</td>
                      <td className="font-medium">{formatCurrency(order.total)}</td>
                      <td>
                        <OrderStatusBadge status={order.status} />
                      </td>
                      <td className="text-gray-500" suppressHydrationWarning>{formatRelativeTime(order.date)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Products */}
          <div className="card">
            <div className="card-header">
              <h2 className="text-lg font-semibold text-gray-900">Top Selling Tires</h2>
            </div>
            <div className="card-body space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center gap-4">
                  <span className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-sm font-medium text-gray-600">
                    {index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.sold} sold</p>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {formatCurrency(product.revenue)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Support Tickets */}
          <div className="card">
            <div className="card-header flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Support Tickets</h2>
              <Link href="/support" className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="card-body space-y-3">
              {recentTickets.map((ticket) => (
                <div key={ticket.id} className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Link href={`/support/${ticket.id}`} className="text-sm font-medium text-gray-900 hover:text-primary-600">
                        {ticket.subject}
                      </Link>
                      <PriorityBadge priority={ticket.priority} />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {ticket.id} • {ticket.customer}
                    </p>
                  </div>
                  <TicketStatusBadge status={ticket.status} />
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <div className="card-header">
              <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
            </div>
            <div className="card-body grid grid-cols-2 gap-4">
              <QuickActionButton
                label="New Order"
                description="Create manual order"
                icon={<ShoppingCart className="w-6 h-6" />}
                href="/orders/new"
              />
              <QuickActionButton
                label="Add Customer"
                description="Register new customer"
                icon={<Users className="w-6 h-6" />}
                href="/customers/new"
              />
              <QuickActionButton
                label="Update Inventory"
                description="Adjust stock levels"
                icon={<Package className="w-6 h-6" />}
                href="/inventory"
              />
              <QuickActionButton
                label="Send Email Blast"
                description="Contact installers"
                icon={<Truck className="w-6 h-6" />}
                href="/installers/email"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Component definitions

function StatCard({
  title,
  value,
  change,
  icon,
  color,
}: {
  title: string
  value: string
  change: number
  icon: React.ReactNode
  color: 'green' | 'blue' | 'purple' | 'amber'
}) {
  const colors = {
    green: 'bg-primary-50 text-primary-600',
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
    amber: 'bg-amber-50 text-amber-600',
  }

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between">
        <div className={`p-3 rounded-xl ${colors[color]}`}>
          {icon}
        </div>
        <div className={`flex items-center gap-1 text-sm font-medium ${change >= 0 ? 'text-success-600' : 'text-danger-600'}`}>
          {change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          {Math.abs(change)}%
        </div>
      </div>
      <div className="mt-4">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-500 mt-1">{title}</p>
      </div>
    </div>
  )
}

function AlertCard({
  title,
  value,
  icon,
  href,
  color,
}: {
  title: string
  value: number
  icon: React.ReactNode
  href: string
  color: 'red' | 'amber' | 'orange' | 'purple'
}) {
  const colors = {
    red: 'border-danger-200 bg-danger-50',
    amber: 'border-amber-200 bg-amber-50',
    orange: 'border-orange-200 bg-orange-50',
    purple: 'border-purple-200 bg-purple-50',
  }

  const iconColors = {
    red: 'text-danger-600',
    amber: 'text-amber-600',
    orange: 'text-orange-600',
    purple: 'text-purple-600',
  }

  return (
    <Link href={href} className={`flex items-center gap-4 p-4 rounded-xl border-2 ${colors[color]} hover:shadow-md transition-shadow`}>
      <div className={iconColors[color]}>{icon}</div>
      <div>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-600">{title}</p>
      </div>
    </Link>
  )
}

function OrderStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    PENDING: 'badge-warning',
    CONFIRMED: 'badge-info',
    PROCESSING: 'badge-info',
    SHIPPED: 'badge-primary',
    OUT_FOR_DELIVERY: 'badge-primary',
    DELIVERED: 'badge-success',
    INSTALLED: 'badge-success',
    COMPLETED: 'badge-success',
    CANCELLED: 'badge-danger',
    REFUNDED: 'badge-gray',
  }

  return (
    <span className={styles[status] || 'badge-gray'}>
      {status.replace(/_/g, ' ')}
    </span>
  )
}

function TicketStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    OPEN: 'badge-warning',
    IN_PROGRESS: 'badge-info',
    WAITING_CUSTOMER: 'badge-gray',
    WAITING_INTERNAL: 'badge-gray',
    RESOLVED: 'badge-success',
    CLOSED: 'badge-gray',
  }

  return (
    <span className={styles[status] || 'badge-gray'}>
      {status.replace(/_/g, ' ')}
    </span>
  )
}

function PriorityBadge({ priority }: { priority: string }) {
  const styles: Record<string, string> = {
    LOW: 'badge-gray',
    MEDIUM: 'badge-warning',
    HIGH: 'badge-danger',
    URGENT: 'badge-danger',
  }

  return (
    <span className={`${styles[priority] || 'badge-gray'} text-xs`}>
      {priority}
    </span>
  )
}

function QuickActionButton({
  label,
  description,
  icon,
  href,
}: {
  label: string
  description: string
  icon: React.ReactNode
  href: string
}) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-center"
    >
      <div className="p-3 bg-white rounded-xl shadow-sm text-gray-600 mb-3">
        {icon}
      </div>
      <p className="text-sm font-medium text-gray-900">{label}</p>
      <p className="text-xs text-gray-500 mt-0.5">{description}</p>
    </Link>
  )
}

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
  Zap,
  Sparkles,
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
            color="emerald"
          />
          <StatCard
            title="Total Orders"
            value={stats.orders.value.toString()}
            change={stats.orders.change}
            icon={<ShoppingCart className="w-6 h-6" />}
            color="cyan"
          />
          <StatCard
            title="Total Customers"
            value={stats.customers.value.toLocaleString()}
            change={stats.customers.change}
            icon={<Users className="w-6 h-6" />}
            color="violet"
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
            color="rose"
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
            <div className="px-6 py-4 border-b border-neutral-800/50 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Recent Orders</h2>
              <Link href="/orders" className="text-sm text-green-400 hover:text-green-300 font-medium flex items-center gap-1 transition-colors">
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
                        <Link href={`/orders/${order.id}`} className="font-medium text-green-400 hover:text-green-300 transition-colors">
                          {order.id}
                        </Link>
                      </td>
                      <td className="text-neutral-300">{order.customer}</td>
                      <td className="font-medium text-white">{formatCurrency(order.total)}</td>
                      <td>
                        <OrderStatusBadge status={order.status} />
                      </td>
                      <td className="text-neutral-400" suppressHydrationWarning>{formatRelativeTime(order.date)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Products */}
          <div className="card">
            <div className="px-6 py-4 border-b border-neutral-800/50">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                Top Selling Tires
              </h2>
            </div>
            <div className="p-6 space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center gap-4 group">
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                    index === 0 ? 'bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30' :
                    index === 1 ? 'bg-gradient-to-br from-neutral-400 to-neutral-500 text-white' :
                    index === 2 ? 'bg-gradient-to-br from-amber-700 to-amber-800 text-white' :
                    'bg-neutral-800 text-neutral-400'
                  }`}>
                    {index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate group-hover:text-green-400 transition-colors">{product.name}</p>
                    <p className="text-xs text-neutral-500">{product.sold} sold</p>
                  </div>
                  <span className="text-sm font-semibold text-green-400">
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
            <div className="px-6 py-4 border-b border-neutral-800/50 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Recent Support Tickets</h2>
              <Link href="/support" className="text-sm text-green-400 hover:text-green-300 font-medium flex items-center gap-1 transition-colors">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="p-6 space-y-3">
              {recentTickets.map((ticket) => (
                <div key={ticket.id} className="flex items-start gap-4 p-4 bg-neutral-800/40 rounded-xl border border-neutral-700/50 hover:border-neutral-600/50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Link href={`/support/${ticket.id}`} className="text-sm font-medium text-white hover:text-green-400 transition-colors">
                        {ticket.subject}
                      </Link>
                      <PriorityBadge priority={ticket.priority} />
                    </div>
                    <p className="text-xs text-neutral-500 mt-1">
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
            <div className="px-6 py-4 border-b border-neutral-800/50">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-green-300" />
                Quick Actions
              </h2>
            </div>
            <div className="p-6 grid grid-cols-2 gap-4">
              <QuickActionButton
                label="New Order"
                description="Create manual order"
                icon={<ShoppingCart className="w-6 h-6" />}
                href="/orders/new"
                color="emerald"
              />
              <QuickActionButton
                label="Add Customer"
                description="Register new customer"
                icon={<Users className="w-6 h-6" />}
                href="/customers/new"
                color="cyan"
              />
              <QuickActionButton
                label="Update Inventory"
                description="Adjust stock levels"
                icon={<Package className="w-6 h-6" />}
                href="/inventory"
                color="violet"
              />
              <QuickActionButton
                label="Send Email Blast"
                description="Contact installers"
                icon={<Truck className="w-6 h-6" />}
                href="/installers/email"
                color="amber"
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
  color: 'emerald' | 'cyan' | 'violet' | 'amber'
}) {
  const gradients = {
    emerald: 'bg-green-500',
    cyan: 'from-green-400 to-blue-500',
    violet: 'from-green-500 to-green-500',
    amber: 'from-amber-500 to-orange-500',
  }

  const glows = {
    emerald: 'shadow-green-500/20',
    cyan: 'shadow-green-400/20',
    violet: 'shadow-green-500/20',
    amber: 'shadow-amber-500/20',
  }

  const iconBg = {
    emerald: 'bg-green-500/20 text-green-400',
    cyan: 'bg-green-400/20 text-green-300',
    violet: 'bg-green-500/20 text-green-400',
    amber: 'bg-amber-500/20 text-amber-400',
  }

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-neutral-900/60 backdrop-blur-xl border border-neutral-800/60 p-6 shadow-2xl ${glows[color]}`}>
      {/* Gradient accent */}
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradients[color]} opacity-10 blur-2xl`} />

      <div className="relative">
        <div className="flex items-center justify-between">
          <div className={`p-3 rounded-xl ${iconBg[color]}`}>
            {icon}
          </div>
          <div className={`flex items-center gap-1 text-sm font-medium px-2.5 py-1 rounded-full ${
            change >= 0
              ? 'text-green-400 bg-green-500/10'
              : 'text-rose-400 bg-rose-500/10'
          }`}>
            {change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            {Math.abs(change)}%
          </div>
        </div>
        <div className="mt-4">
          <p className="text-3xl font-bold text-white">{value}</p>
          <p className="text-sm text-neutral-400 mt-1">{title}</p>
        </div>
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
  color: 'rose' | 'amber' | 'orange' | 'purple'
}) {
  const styles = {
    rose: {
      bg: 'bg-rose-500/10 hover:bg-rose-500/20',
      border: 'border-rose-500/20 hover:border-rose-500/40',
      icon: 'text-rose-400',
      glow: 'hover:shadow-rose-500/10',
    },
    amber: {
      bg: 'bg-amber-500/10 hover:bg-amber-500/20',
      border: 'border-amber-500/20 hover:border-amber-500/40',
      icon: 'text-amber-400',
      glow: 'hover:shadow-amber-500/10',
    },
    orange: {
      bg: 'bg-orange-500/10 hover:bg-orange-500/20',
      border: 'border-orange-500/20 hover:border-orange-500/40',
      icon: 'text-orange-400',
      glow: 'hover:shadow-orange-500/10',
    },
    purple: {
      bg: 'bg-green-500/10 hover:bg-green-500/20',
      border: 'border-green-500/20 hover:border-green-500/40',
      icon: 'text-green-400',
      glow: 'hover:shadow-green-500/10',
    },
  }

  const s = styles[color]

  return (
    <Link
      href={href}
      className={`flex items-center gap-4 p-4 rounded-xl border ${s.bg} ${s.border} transition-all duration-300 hover:shadow-xl ${s.glow}`}
    >
      <div className={`p-2.5 rounded-lg bg-neutral-800/50 ${s.icon}`}>{icon}</div>
      <div>
        <p className="text-2xl font-bold text-white">{value}</p>
        <p className="text-sm text-neutral-400">{title}</p>
      </div>
    </Link>
  )
}

function OrderStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    PENDING: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    CONFIRMED: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    PROCESSING: 'bg-green-400/20 text-green-300 border-green-400/30',
    SHIPPED: 'bg-green-500/20 text-green-400 border-green-500/30',
    OUT_FOR_DELIVERY: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
    DELIVERED: 'bg-green-500/20 text-green-400 border-green-500/30',
    INSTALLED: 'bg-green-500/20 text-green-400 border-green-500/30',
    COMPLETED: 'bg-green-500/20 text-green-400 border-green-500/30',
    CANCELLED: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
    REFUNDED: 'bg-neutral-500/20 text-neutral-400 border-neutral-500/30',
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status] || 'bg-neutral-500/20 text-neutral-400 border-neutral-500/30'}`}>
      {status.replace(/_/g, ' ')}
    </span>
  )
}

function TicketStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    OPEN: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    IN_PROGRESS: 'bg-green-400/20 text-green-300 border-green-400/30',
    WAITING_CUSTOMER: 'bg-neutral-500/20 text-neutral-400 border-neutral-500/30',
    WAITING_INTERNAL: 'bg-neutral-500/20 text-neutral-400 border-neutral-500/30',
    RESOLVED: 'bg-green-500/20 text-green-400 border-green-500/30',
    CLOSED: 'bg-neutral-600/20 text-neutral-500 border-neutral-600/30',
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status] || 'bg-neutral-500/20 text-neutral-400 border-neutral-500/30'}`}>
      {status.replace(/_/g, ' ')}
    </span>
  )
}

function PriorityBadge({ priority }: { priority: string }) {
  const styles: Record<string, string> = {
    LOW: 'bg-neutral-500/20 text-neutral-400 border-neutral-500/30',
    MEDIUM: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    HIGH: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    URGENT: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
  }

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${styles[priority] || 'bg-neutral-500/20 text-neutral-400 border-neutral-500/30'}`}>
      {priority}
    </span>
  )
}

function QuickActionButton({
  label,
  description,
  icon,
  href,
  color,
}: {
  label: string
  description: string
  icon: React.ReactNode
  href: string
  color: 'emerald' | 'cyan' | 'violet' | 'amber'
}) {
  const iconStyles = {
    emerald: 'bg-green-500/20 text-green-400 group-hover:bg-green-500/30',
    cyan: 'bg-green-400/20 text-green-300 group-hover:bg-green-400/30',
    violet: 'bg-green-500/20 text-green-400 group-hover:bg-green-500/30',
    amber: 'bg-amber-500/20 text-amber-400 group-hover:bg-amber-500/30',
  }

  return (
    <Link
      href={href}
      className="group flex flex-col items-center justify-center p-5 bg-neutral-800/40 rounded-xl border border-neutral-700/50 hover:border-neutral-600/50 hover:bg-neutral-800/60 transition-all duration-300 text-center"
    >
      <div className={`p-3.5 rounded-xl transition-colors ${iconStyles[color]} mb-3`}>
        {icon}
      </div>
      <p className="text-sm font-medium text-white group-hover:text-green-400 transition-colors">{label}</p>
      <p className="text-xs text-neutral-500 mt-0.5">{description}</p>
    </Link>
  )
}

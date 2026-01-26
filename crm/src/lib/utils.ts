import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Merge Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format currency
export function formatCurrency(amount: number | string, currency = 'USD'): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(num)
}

// Format date
export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options,
  }).format(d)
}

// Format date with time
export function formatDateTime(date: Date | string): string {
  return formatDate(date, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

// Format relative time (e.g., "2 hours ago")
export function formatRelativeTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000)

  if (diffInSeconds < 60) return 'Just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`
  return formatDate(d)
}

// Format phone number
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
  }
  if (cleaned.length === 11 && cleaned.startsWith('1')) {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`
  }
  return phone
}

// Format tire size
export function formatTireSize(width: number, aspectRatio: number, rimDiameter: number): string {
  return `${width}/${aspectRatio}R${rimDiameter}`
}

// Generate initials from name
export function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
}

// Generate order number
export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `TD-${timestamp}-${random}`
}

// Generate ticket number
export function generateTicketNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  return `TKT-${timestamp}`
}

// Generate warranty claim number
export function generateClaimNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  return `CLM-${timestamp}`
}

// Truncate text
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return `${text.substring(0, length)}...`
}

// Calculate loyalty points from purchase
export function calculateLoyaltyPoints(total: number, tier: string): number {
  const multipliers: Record<string, number> = {
    BRONZE: 1,
    SILVER: 1.25,
    GOLD: 1.5,
    PLATINUM: 2,
  }
  const basePoints = Math.floor(total) // 1 point per dollar
  return Math.floor(basePoints * (multipliers[tier] || 1))
}

// Get loyalty tier from points
export function getLoyaltyTier(totalSpent: number): string {
  if (totalSpent >= 5000) return 'PLATINUM'
  if (totalSpent >= 2500) return 'GOLD'
  if (totalSpent >= 1000) return 'SILVER'
  return 'BRONZE'
}

// Calculate distance between two coordinates (Haversine formula)
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 3959 // Earth's radius in miles
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180)
}

// Validate email
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validate phone
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\+?1?\d{10,14}$/
  return phoneRegex.test(phone.replace(/\D/g, ''))
}

// Validate ZIP code
export function isValidZipCode(zipCode: string): boolean {
  const zipRegex = /^\d{5}(-\d{4})?$/
  return zipRegex.test(zipCode)
}

// Debounce function
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Capitalize first letter
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

// Convert status to display text
export function formatStatus(status: string): string {
  return status.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())
}

// Get status color class
export function getStatusColor(status: string): string {
  const statusColors: Record<string, string> = {
    // Order statuses
    PENDING: 'badge-warning',
    CONFIRMED: 'badge-info',
    PROCESSING: 'badge-info',
    SHIPPED: 'badge-info',
    OUT_FOR_DELIVERY: 'badge-info',
    DELIVERED: 'badge-success',
    INSTALLED: 'badge-success',
    COMPLETED: 'badge-success',
    CANCELLED: 'badge-danger',
    REFUNDED: 'badge-gray',
    // Ticket statuses
    OPEN: 'badge-warning',
    IN_PROGRESS: 'badge-info',
    WAITING_CUSTOMER: 'badge-warning',
    WAITING_INTERNAL: 'badge-warning',
    RESOLVED: 'badge-success',
    CLOSED: 'badge-gray',
    // Warranty statuses
    ACTIVE: 'badge-success',
    EXPIRED: 'badge-gray',
    VOIDED: 'badge-danger',
    CLAIMED: 'badge-info',
    // Priority
    LOW: 'badge-gray',
    MEDIUM: 'badge-warning',
    HIGH: 'badge-danger',
    URGENT: 'badge-danger',
  }
  return statusColors[status] || 'badge-gray'
}

// Pluralize word
export function pluralize(count: number, singular: string, plural?: string): string {
  if (count === 1) return singular
  return plural || `${singular}s`
}

// Sleep function for async delays
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Generate random color for charts
export function generateChartColors(count: number): string[] {
  const colors = [
    '#10b981', // Green (primary)
    '#3b82f6', // Blue
    '#f59e0b', // Amber
    '#ef4444', // Red
    '#8b5cf6', // Purple
    '#06b6d4', // Cyan
    '#ec4899', // Pink
    '#84cc16', // Lime
  ]
  return Array.from({ length: count }, (_, i) => colors[i % colors.length])
}

// Calculate percentage change
export function percentChange(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0
  return ((current - previous) / previous) * 100
}

// Format percentage
export function formatPercent(value: number, decimals = 1): string {
  return `${value >= 0 ? '+' : ''}${value.toFixed(decimals)}%`
}

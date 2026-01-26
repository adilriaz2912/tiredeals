// ==================== ENUMS ====================

export type UserRole = 'ADMIN' | 'MANAGER' | 'STAFF' | 'SUPPORT'
export type LoyaltyTier = 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM'
export type AddressType = 'SHIPPING' | 'BILLING' | 'BOTH'

export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'INSTALLED'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'REFUNDED'

export type PaymentStatus =
  | 'PENDING'
  | 'AUTHORIZED'
  | 'PAID'
  | 'PARTIALLY_REFUNDED'
  | 'REFUNDED'
  | 'FAILED'

export type ShippingCarrier =
  | 'FEDEX'
  | 'UPS'
  | 'USPS'
  | 'DHL'
  | 'FREIGHT'
  | 'LOCAL_DELIVERY'
  | 'PICKUP'

export type ShipmentStatus =
  | 'PENDING'
  | 'LABEL_CREATED'
  | 'PICKED_UP'
  | 'IN_TRANSIT'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'EXCEPTION'
  | 'RETURNED'

export type InstallerType = 'INDEPENDENT' | 'CHAIN' | 'DEALERSHIP' | 'FRANCHISE'

export type WarrantyType = 'MILEAGE' | 'ROAD_HAZARD' | 'MANUFACTURER' | 'WORKMANSHIP'
export type WarrantyStatus = 'ACTIVE' | 'EXPIRED' | 'VOIDED' | 'CLAIMED'
export type ClaimStatus = 'SUBMITTED' | 'UNDER_REVIEW' | 'APPROVED' | 'DENIED' | 'COMPLETED'
export type ClaimResolution = 'REPLACEMENT' | 'PRO_RATED_CREDIT' | 'FULL_REFUND' | 'REPAIR' | 'DENIED'

export type TicketCategory =
  | 'ORDER_ISSUE'
  | 'SHIPPING'
  | 'RETURNS'
  | 'WARRANTY'
  | 'PRODUCT_QUESTION'
  | 'INSTALLATION'
  | 'BILLING'
  | 'TECHNICAL'
  | 'OTHER'

export type TicketPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
export type TicketStatus =
  | 'OPEN'
  | 'IN_PROGRESS'
  | 'WAITING_CUSTOMER'
  | 'WAITING_INTERNAL'
  | 'RESOLVED'
  | 'CLOSED'

export type AbandonedCartStatus = 'ABANDONED' | 'EMAIL_SENT' | 'RECOVERED' | 'EXPIRED' | 'UNSUBSCRIBED'

export type CommunicationType =
  | 'ORDER_CONFIRMATION'
  | 'SHIPPING_UPDATE'
  | 'DELIVERY_CONFIRMATION'
  | 'ABANDONED_CART'
  | 'WARRANTY_REMINDER'
  | 'LOYALTY_UPDATE'
  | 'PROMOTIONAL'
  | 'SUPPORT_RESPONSE'
  | 'INSTALLER_NOTIFICATION'
  | 'REVIEW_REQUEST'
  | 'GENERAL'

export type CommunicationChannel = 'EMAIL' | 'SMS' | 'PUSH' | 'IN_APP'
export type CommunicationStatus = 'PENDING' | 'SENT' | 'DELIVERED' | 'READ' | 'FAILED' | 'BOUNCED'

export type InventoryLogType =
  | 'PURCHASE'
  | 'SALE'
  | 'ADJUSTMENT'
  | 'RETURN'
  | 'DAMAGED'
  | 'TRANSFER'

export type LoyaltyTransactionType =
  | 'EARNED_PURCHASE'
  | 'EARNED_REVIEW'
  | 'EARNED_REFERRAL'
  | 'EARNED_BONUS'
  | 'SPENT_REDEMPTION'
  | 'EXPIRED'
  | 'ADJUSTMENT'

export type RewardType =
  | 'FLAT_DISCOUNT'
  | 'PERCENT_DISCOUNT'
  | 'FREE_SHIPPING'
  | 'FREE_INSTALLATION'
  | 'PRODUCT'

// ==================== INTERFACES ====================

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  avatar?: string
  phone?: string
  isActive: boolean
  lastLoginAt?: string
  createdAt: string
  updatedAt: string
}

export interface Customer {
  id: string
  email: string
  phone?: string
  firstName: string
  lastName: string
  company?: string
  loyaltyPoints: number
  loyaltyTier: LoyaltyTier
  totalSpent: number
  marketingOptIn: boolean
  smsOptIn: boolean
  source?: string
  notes?: string
  tags: string[]
  createdAt: string
  updatedAt: string
  // Relations
  addresses?: Address[]
  vehicles?: Vehicle[]
  orders?: Order[]
  supportTickets?: SupportTicket[]
}

export interface Address {
  id: string
  customerId: string
  type: AddressType
  isDefault: boolean
  firstName: string
  lastName: string
  company?: string
  street1: string
  street2?: string
  city: string
  state: string
  zipCode: string
  country: string
  phone?: string
  instructions?: string
  createdAt: string
  updatedAt: string
}

export interface Vehicle {
  id: string
  customerId: string
  year: number
  make: string
  model: string
  trim?: string
  tireSize?: string
  nickname?: string
  vin?: string
  licensePlate?: string
  mileage?: number
  isPrimary: boolean
  createdAt: string
  updatedAt: string
}

export interface TireBrand {
  id: string
  name: string
  slug: string
  logo?: string
  description?: string
  website?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface TireCategory {
  id: string
  name: string
  slug: string
  description?: string
  icon?: string
  createdAt: string
  updatedAt: string
}

export interface Tire {
  id: string
  sku: string
  brandId: string
  categoryId: string
  name: string
  description?: string
  width: number
  aspectRatio: number
  rimDiameter: number
  loadIndex?: number
  speedRating?: string
  tireSize: string
  treadDepth?: number
  treadwearRating?: number
  tractionRating?: string
  tempRating?: string
  sidewall?: string
  plyRating?: number
  isRunFlat: boolean
  mileageWarranty?: number
  roadHazardMonths?: number
  cost: number
  msrp: number
  price: number
  salePrice?: number
  quantity: number
  reorderPoint: number
  reorderQty: number
  warehouseLocation?: string
  images: string[]
  isActive: boolean
  isFeatured: boolean
  metaTitle?: string
  metaDescription?: string
  createdAt: string
  updatedAt: string
  // Relations
  brand?: TireBrand
  category?: TireCategory
}

export interface Order {
  id: string
  orderNumber: string
  customerId: string
  vehicleId?: string
  shippingAddressId: string
  billingAddressId: string
  status: OrderStatus
  paymentStatus: PaymentStatus
  subtotal: number
  shippingCost: number
  taxAmount: number
  discount: number
  total: number
  loyaltyPointsUsed: number
  loyaltyPointsEarned: number
  paymentMethod?: string
  paymentRef?: string
  installerId?: string
  installationDate?: string
  installationNotes?: string
  notes?: string
  customerNotes?: string
  source?: string
  createdAt: string
  updatedAt: string
  // Relations
  customer?: Customer
  vehicle?: Vehicle
  shippingAddress?: Address
  billingAddress?: Address
  installer?: Installer
  items?: OrderItem[]
  shipments?: Shipment[]
}

export interface OrderItem {
  id: string
  orderId: string
  tireId: string
  quantity: number
  unitPrice: number
  totalPrice: number
  discount: number
  tireName: string
  tireSku: string
  tireSize: string
  createdAt: string
  tire?: Tire
}

export interface Shipment {
  id: string
  orderId: string
  carrier: ShippingCarrier
  trackingNumber?: string
  trackingUrl?: string
  status: ShipmentStatus
  shippedAt?: string
  estimatedDelivery?: string
  deliveredAt?: string
  weight?: number
  length?: number
  width?: number
  height?: number
  shippingCost?: number
  signedBy?: string
  deliveryPhoto?: string
  notes?: string
  createdAt: string
  updatedAt: string
  // Relations
  trackingEvents?: TrackingEvent[]
}

export interface TrackingEvent {
  id: string
  shipmentId: string
  status: string
  description: string
  location?: string
  timestamp: string
  createdAt: string
}

export interface Installer {
  id: string
  name: string
  slug: string
  type: InstallerType
  email: string
  phone: string
  website?: string
  street1: string
  street2?: string
  city: string
  state: string
  zipCode: string
  country: string
  latitude?: number
  longitude?: number
  businessHours?: Record<string, string>
  services: string[]
  certifications: string[]
  isPartner: boolean
  commissionRate?: number
  installationFee?: number
  rating: number
  reviewCount: number
  isActive: boolean
  isVerified: boolean
  notes?: string
  contactPerson?: string
  createdAt: string
  updatedAt: string
  // Relations
  reviews?: InstallerReview[]
}

export interface InstallerReview {
  id: string
  installerId: string
  customerName: string
  rating: number
  title?: string
  comment?: string
  isVerified: boolean
  isPublished: boolean
  createdAt: string
}

export interface Warranty {
  id: string
  customerId: string
  orderId: string
  tireId: string
  vehicleId?: string
  type: WarrantyType
  status: WarrantyStatus
  startDate: string
  endDate?: string
  mileageStart?: number
  mileageLimit?: number
  roadHazardMonths?: number
  claimCount: number
  maxClaims?: number
  notes?: string
  createdAt: string
  updatedAt: string
  // Relations
  customer?: Customer
  order?: Order
  tire?: Tire
  vehicle?: Vehicle
  claims?: WarrantyClaim[]
}

export interface WarrantyClaim {
  id: string
  warrantyId: string
  claimNumber: string
  status: ClaimStatus
  reason: string
  description: string
  currentMileage?: number
  resolution?: string
  resolutionType?: ClaimResolution
  replacementSku?: string
  refundAmount?: number
  photos: string[]
  submittedAt: string
  resolvedAt?: string
  createdAt: string
  updatedAt: string
  // Relations
  warranty?: Warranty
}

export interface SupportTicket {
  id: string
  ticketNumber: string
  customerId: string
  assignedToId?: string
  subject: string
  description: string
  category: TicketCategory
  priority: TicketPriority
  status: TicketStatus
  orderId?: string
  dueAt?: string
  firstResponseAt?: string
  resolvedAt?: string
  satisfactionRating?: number
  satisfactionComment?: string
  createdAt: string
  updatedAt: string
  // Relations
  customer?: Customer
  assignedTo?: User
  comments?: TicketComment[]
  attachments?: TicketAttachment[]
}

export interface TicketComment {
  id: string
  ticketId: string
  userId?: string
  message: string
  isInternal: boolean
  isFromCustomer: boolean
  createdAt: string
  // Relations
  user?: User
}

export interface TicketAttachment {
  id: string
  ticketId: string
  fileName: string
  fileUrl: string
  fileType: string
  fileSize: number
  createdAt: string
}

export interface AbandonedCart {
  id: string
  customerId: string
  cartValue: number
  itemCount: number
  cartSnapshot: any
  emailsSent: number
  lastEmailAt?: string
  smsSent: number
  lastSmsAt?: string
  status: AbandonedCartStatus
  recoveredAt?: string
  recoveredOrderId?: string
  discountCode?: string
  discountAmount?: number
  abandonedAt: string
  createdAt: string
  updatedAt: string
  // Relations
  customer?: Customer
}

export interface LoyaltyTransaction {
  id: string
  customerId: string
  type: LoyaltyTransactionType
  points: number
  balance: number
  description: string
  referenceId?: string
  expiresAt?: string
  createdAt: string
}

export interface LoyaltyReward {
  id: string
  name: string
  description?: string
  pointsCost: number
  rewardType: RewardType
  discountValue?: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Communication {
  id: string
  customerId: string
  orderId?: string
  type: CommunicationType
  channel: CommunicationChannel
  subject?: string
  message: string
  status: CommunicationStatus
  sentAt: string
  deliveredAt?: string
  readAt?: string
  failedAt?: string
  failureReason?: string
  fromEmail?: string
  toEmail?: string
  fromPhone?: string
  toPhone?: string
  campaignId?: string
  templateId?: string
  createdAt: string
}

export interface InventoryLog {
  id: string
  tireId: string
  type: InventoryLogType
  quantity: number
  previousQty: number
  newQty: number
  reason?: string
  reference?: string
  cost?: number
  createdAt: string
}

export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: string
  isRead: boolean
  actionUrl?: string
  createdAt: string
}

// ==================== API & FORM TYPES ====================

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface ApiError {
  message: string
  code?: string
  details?: any
}

export interface DashboardStats {
  totalRevenue: number
  revenueChange: number
  totalOrders: number
  ordersChange: number
  totalCustomers: number
  customersChange: number
  avgOrderValue: number
  avgOrderValueChange: number
  openTickets: number
  abandonedCarts: number
  lowStockItems: number
  expiringWarranties: number
}

export interface ChartData {
  name: string
  value: number
  [key: string]: any
}

export interface SearchFilters {
  query?: string
  status?: string
  dateFrom?: string
  dateTo?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  page?: number
  pageSize?: number
}

// Form input types
export interface CustomerFormData {
  email: string
  phone?: string
  firstName: string
  lastName: string
  company?: string
  marketingOptIn?: boolean
  smsOptIn?: boolean
  source?: string
  notes?: string
  tags?: string[]
}

export interface OrderFormData {
  customerId: string
  vehicleId?: string
  shippingAddressId: string
  billingAddressId: string
  items: { tireId: string; quantity: number }[]
  installerId?: string
  installationDate?: string
  notes?: string
  customerNotes?: string
}

export interface TicketFormData {
  customerId: string
  subject: string
  description: string
  category: TicketCategory
  priority: TicketPriority
  orderId?: string
  assignedToId?: string
}

export interface InstallerFormData {
  name: string
  type: InstallerType
  email: string
  phone: string
  website?: string
  street1: string
  street2?: string
  city: string
  state: string
  zipCode: string
  country?: string
  businessHours?: Record<string, string>
  services?: string[]
  certifications?: string[]
  isPartner?: boolean
  commissionRate?: number
  installationFee?: number
  contactPerson?: string
  notes?: string
}

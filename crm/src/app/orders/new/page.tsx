'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout'
import { Button, Input, Select, Textarea } from '@/components/ui'
import {
  ArrowLeft,
  Save,
  User,
  Package,
  Truck,
  CreditCard,
  Search,
  Plus,
  Minus,
  Trash2,
  X,
} from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { formatCurrency } from '@/lib/utils'

interface OrderItem {
  id: string
  name: string
  sku: string
  price: number
  quantity: number
}

interface FormErrors {
  customer?: string
  items?: string
}

// Mock data for search
const mockCustomers = [
  { id: '1', name: 'John Smith', email: 'john.smith@email.com' },
  { id: '2', name: 'Sarah Johnson', email: 'sarah.j@email.com' },
  { id: '3', name: 'Mike Wilson', email: 'mike.wilson@email.com' },
]

const mockProducts = [
  { id: '1', name: 'Michelin Defender T+H 215/55R17', sku: 'MICH-DEF-215-55-17', price: 165.00 },
  { id: '2', name: 'Goodyear Assurance 225/60R16', sku: 'GOOD-ASS-225-60-16', price: 125.00 },
  { id: '3', name: 'Bridgestone Turanza 205/55R16', sku: 'BRID-TUR-205-55-16', price: 145.00 },
  { id: '4', name: 'Continental TrueContact 235/65R18', sku: 'CONT-TRU-235-65-18', price: 178.00 },
  { id: '5', name: 'Pirelli P4 Four Seasons 225/50R17', sku: 'PIRE-P4F-225-50-17', price: 155.00 },
]

export default function NewOrderPage() {
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})

  // Customer state
  const [customerSearch, setCustomerSearch] = useState('')
  const [selectedCustomer, setSelectedCustomer] = useState<typeof mockCustomers[0] | null>(null)
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false)

  // Product state
  const [productSearch, setProductSearch] = useState('')
  const [showProductDropdown, setShowProductDropdown] = useState(false)
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])

  // Order details
  const [shippingMethod, setShippingMethod] = useState('standard')
  const [paymentMethod, setPaymentMethod] = useState('credit_card')
  const [notes, setNotes] = useState('')

  // Shipping info
  const [shippingAddress, setShippingAddress] = useState({
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
  })

  // Filter customers based on search
  const filteredCustomers = mockCustomers.filter(
    (c) =>
      c.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
      c.email.toLowerCase().includes(customerSearch.toLowerCase())
  )

  // Filter products based on search
  const filteredProducts = mockProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.sku.toLowerCase().includes(productSearch.toLowerCase())
  )

  const addProduct = (product: typeof mockProducts[0]) => {
    const existingItem = orderItems.find((item) => item.id === product.id)
    if (existingItem) {
      setOrderItems(
        orderItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      )
    } else {
      setOrderItems([
        ...orderItems,
        {
          id: product.id,
          name: product.name,
          sku: product.sku,
          price: product.price,
          quantity: 1,
        },
      ])
    }
    setProductSearch('')
    setShowProductDropdown(false)
  }

  const updateQuantity = (id: string, change: number) => {
    setOrderItems(
      orderItems
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
        )
    )
  }

  const removeItem = (id: string) => {
    setOrderItems(orderItems.filter((item) => item.id !== id))
  }

  // Calculate totals
  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shippingCost = shippingMethod === 'express' ? 29.99 : shippingMethod === 'overnight' ? 49.99 : 9.99
  const tax = subtotal * 0.0825 // 8.25% tax
  const total = subtotal + shippingCost + tax

  const validate = (): boolean => {
    const newErrors: FormErrors = {}

    if (!selectedCustomer) {
      newErrors.customer = 'Please select a customer'
    }
    if (orderItems.length === 0) {
      newErrors.items = 'Please add at least one item'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) {
      toast.error('Please fix the errors in the form')
      return
    }

    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    toast.success('Order created successfully!')
    router.push('/orders')
  }

  return (
    <div className="min-h-screen">
      <Header title="New Order" subtitle="Create a manual order" />

      <div className="p-6">
        <div className="mb-6">
          <Link
            href="/orders"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Orders
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Customer Selection */}
              <div className="card">
                <div className="px-6 py-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary-50 rounded-lg">
                      <User className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">Customer</h2>
                      <p className="text-sm text-gray-500">Select or search for a customer</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  {selectedCustomer ? (
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-medium">
                          {selectedCustomer.name.split(' ').map((n) => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{selectedCustomer.name}</p>
                          <p className="text-sm text-gray-500">{selectedCustomer.email}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedCustomer(null)}
                        className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-200"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search customers by name or email..."
                        value={customerSearch}
                        onChange={(e) => {
                          setCustomerSearch(e.target.value)
                          setShowCustomerDropdown(true)
                        }}
                        onFocus={() => setShowCustomerDropdown(true)}
                        className="input pl-10"
                      />
                      {showCustomerDropdown && customerSearch && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                          {filteredCustomers.length > 0 ? (
                            filteredCustomers.map((customer) => (
                              <button
                                key={customer.id}
                                type="button"
                                onClick={() => {
                                  setSelectedCustomer(customer)
                                  setCustomerSearch('')
                                  setShowCustomerDropdown(false)
                                }}
                                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left"
                              >
                                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 text-sm font-medium">
                                  {customer.name.split(' ').map((n) => n[0]).join('')}
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-900">{customer.name}</p>
                                  <p className="text-xs text-gray-500">{customer.email}</p>
                                </div>
                              </button>
                            ))
                          ) : (
                            <div className="px-4 py-3 text-sm text-gray-500">No customers found</div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                  {errors.customer && <p className="mt-2 text-sm text-danger-600">{errors.customer}</p>}
                </div>
              </div>

              {/* Products */}
              <div className="card">
                <div className="px-6 py-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Package className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">Products</h2>
                      <p className="text-sm text-gray-500">Add tires to this order</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  {/* Product Search */}
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search products by name or SKU..."
                      value={productSearch}
                      onChange={(e) => {
                        setProductSearch(e.target.value)
                        setShowProductDropdown(true)
                      }}
                      onFocus={() => setShowProductDropdown(true)}
                      className="input pl-10"
                    />
                    {showProductDropdown && productSearch && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                        {filteredProducts.length > 0 ? (
                          filteredProducts.map((product) => (
                            <button
                              key={product.id}
                              type="button"
                              onClick={() => addProduct(product)}
                              className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 text-left"
                            >
                              <div>
                                <p className="text-sm font-medium text-gray-900">{product.name}</p>
                                <p className="text-xs text-gray-500">SKU: {product.sku}</p>
                              </div>
                              <p className="text-sm font-medium text-gray-900">{formatCurrency(product.price)}</p>
                            </button>
                          ))
                        ) : (
                          <div className="px-4 py-3 text-sm text-gray-500">No products found</div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Order Items */}
                  {orderItems.length > 0 ? (
                    <div className="space-y-3">
                      {orderItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                            <p className="text-xs text-gray-500">SKU: {item.sku}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, -1)}
                                className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, 1)}
                                className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                            <p className="w-24 text-right text-sm font-medium text-gray-900">
                              {formatCurrency(item.price * item.quantity)}
                            </p>
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              className="p-1 text-gray-400 hover:text-danger-600 hover:bg-danger-50 rounded"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Package className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                      <p className="text-sm">No items added yet</p>
                      <p className="text-xs">Search for products above to add them</p>
                    </div>
                  )}
                  {errors.items && <p className="mt-2 text-sm text-danger-600">{errors.items}</p>}
                </div>
              </div>

              {/* Shipping */}
              <div className="card">
                <div className="px-6 py-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-50 rounded-lg">
                      <Truck className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">Shipping</h2>
                      <p className="text-sm text-gray-500">Delivery address and method</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Input
                        label="Address Line 1"
                        value={shippingAddress.address1}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, address1: e.target.value })}
                        placeholder="Street address"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Input
                        label="Address Line 2"
                        value={shippingAddress.address2}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, address2: e.target.value })}
                        placeholder="Apartment, suite, etc. (optional)"
                      />
                    </div>
                    <Input
                      label="City"
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                    />
                    <Input
                      label="State"
                      value={shippingAddress.state}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                    />
                    <Input
                      label="ZIP Code"
                      value={shippingAddress.zipCode}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, zipCode: e.target.value })}
                    />
                    <Select
                      label="Shipping Method"
                      value={shippingMethod}
                      onChange={(e) => setShippingMethod(e.target.value)}
                      options={[
                        { value: 'standard', label: `Standard Shipping ($9.99) - 5-7 days` },
                        { value: 'express', label: `Express Shipping ($29.99) - 2-3 days` },
                        { value: 'overnight', label: `Overnight ($49.99) - Next day` },
                      ]}
                    />
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="card">
                <div className="p-6">
                  <Textarea
                    label="Order Notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add any special instructions or notes..."
                    rows={3}
                  />
                </div>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="space-y-6">
              {/* Payment Method */}
              <div className="card">
                <div className="px-6 py-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-50 rounded-lg">
                      <CreditCard className="w-5 h-5 text-purple-600" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900">Payment</h2>
                  </div>
                </div>
                <div className="p-6">
                  <Select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    options={[
                      { value: 'credit_card', label: 'Credit Card' },
                      { value: 'invoice', label: 'Invoice (Net 30)' },
                      { value: 'cash', label: 'Cash on Delivery' },
                    ]}
                  />
                </div>
              </div>

              {/* Order Summary */}
              <div className="card">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal ({orderItems.reduce((sum, i) => sum + i.quantity, 0)} items)</span>
                    <span className="text-gray-900">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Shipping</span>
                    <span className="text-gray-900">{formatCurrency(shippingCost)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Tax (8.25%)</span>
                    <span className="text-gray-900">{formatCurrency(tax)}</span>
                  </div>
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex justify-between">
                      <span className="text-base font-semibold text-gray-900">Total</span>
                      <span className="text-base font-semibold text-gray-900">{formatCurrency(total)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="card p-6">
                <div className="space-y-3">
                  <Button
                    type="submit"
                    className="w-full"
                    isLoading={isSaving}
                    leftIcon={<Save className="w-4 h-4" />}
                  >
                    Create Order
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => router.push('/orders')}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

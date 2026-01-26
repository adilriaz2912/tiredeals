'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout'
import { Button, Input, Select, Textarea } from '@/components/ui'
import { ArrowLeft, Save, Ticket, User, Search, X, FileText, Paperclip } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

interface FormErrors {
  customer?: string
  subject?: string
  description?: string
}

// Mock data
const mockCustomers = [
  { id: '1', name: 'John Smith', email: 'john.smith@email.com' },
  { id: '2', name: 'Sarah Johnson', email: 'sarah.j@email.com' },
  { id: '3', name: 'Mike Wilson', email: 'mike.wilson@email.com' },
]

const mockOrders = [
  { id: 'TD-A1B2C3', date: '2025-01-15', total: 892.00 },
  { id: 'TD-D4E5F6', date: '2025-01-10', total: 1245.00 },
  { id: 'TD-G7H8I9', date: '2025-01-05', total: 456.00 },
]

export default function NewTicketPage() {
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})

  // Customer state
  const [customerSearch, setCustomerSearch] = useState('')
  const [selectedCustomer, setSelectedCustomer] = useState<typeof mockCustomers[0] | null>(null)
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false)

  // Form state
  const [subject, setSubject] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('general')
  const [priority, setPriority] = useState('MEDIUM')
  const [relatedOrder, setRelatedOrder] = useState('')
  const [assignee, setAssignee] = useState('')

  const filteredCustomers = mockCustomers.filter(
    (c) =>
      c.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
      c.email.toLowerCase().includes(customerSearch.toLowerCase())
  )

  const validate = (): boolean => {
    const newErrors: FormErrors = {}

    if (!selectedCustomer) {
      newErrors.customer = 'Please select a customer'
    }
    if (!subject.trim()) {
      newErrors.subject = 'Subject is required'
    }
    if (!description.trim()) {
      newErrors.description = 'Description is required'
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
    toast.success('Support ticket created successfully!')
    router.push('/support')
  }

  return (
    <div className="min-h-screen">
      <Header title="New Ticket" subtitle="Create a new support ticket" />

      <div className="p-6">
        <div className="mb-6">
          <Link
            href="/support"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Support Tickets
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
                      <p className="text-sm text-gray-500">Who is this ticket for?</p>
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

              {/* Ticket Details */}
              <div className="card">
                <div className="px-6 py-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">Ticket Details</h2>
                      <p className="text-sm text-gray-500">Describe the issue</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 space-y-6">
                  <Input
                    label="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    error={errors.subject}
                    required
                    placeholder="Brief summary of the issue"
                  />

                  <Textarea
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    error={errors.description}
                    required
                    placeholder="Provide detailed information about the issue..."
                    rows={6}
                  />

                  {/* Attachments */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Attachments</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
                      <Paperclip className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PNG, JPG, PDF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Ticket Settings */}
              <div className="card">
                <div className="px-6 py-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-50 rounded-lg">
                      <Ticket className="w-5 h-5 text-purple-600" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900">Settings</h2>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <Select
                    label="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    options={[
                      { value: 'general', label: 'General Inquiry' },
                      { value: 'order', label: 'Order Issue' },
                      { value: 'shipping', label: 'Shipping Problem' },
                      { value: 'product', label: 'Product Question' },
                      { value: 'returns', label: 'Returns & Refunds' },
                      { value: 'warranty', label: 'Warranty Claim' },
                      { value: 'technical', label: 'Technical Support' },
                    ]}
                  />

                  <Select
                    label="Priority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    options={[
                      { value: 'LOW', label: 'Low' },
                      { value: 'MEDIUM', label: 'Medium' },
                      { value: 'HIGH', label: 'High' },
                      { value: 'URGENT', label: 'Urgent' },
                    ]}
                  />

                  <Select
                    label="Related Order"
                    value={relatedOrder}
                    onChange={(e) => setRelatedOrder(e.target.value)}
                    options={[
                      { value: '', label: 'No related order' },
                      ...mockOrders.map((order) => ({
                        value: order.id,
                        label: `${order.id} - ${order.date}`,
                      })),
                    ]}
                  />

                  <Select
                    label="Assign To"
                    value={assignee}
                    onChange={(e) => setAssignee(e.target.value)}
                    options={[
                      { value: '', label: 'Unassigned' },
                      { value: 'support-1', label: 'Support Team 1' },
                      { value: 'support-2', label: 'Support Team 2' },
                      { value: 'manager', label: 'Manager' },
                    ]}
                  />
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
                    Create Ticket
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => router.push('/support')}
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

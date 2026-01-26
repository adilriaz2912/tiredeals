'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout'
import { Button, Input, Select, Textarea } from '@/components/ui'
import { ArrowLeft, Save, User, Mail, Phone, Building, MapPin, Car, Tag } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

interface FormErrors {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
}

export default function NewCustomerPage() {
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    notes: '',
    tags: [] as string[],
    loyaltyTier: 'BRONZE',
    // Vehicle info
    vehicleYear: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleTrim: '',
  })

  const validate = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (formData.phone && !/^[\d\s\-\(\)\+]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
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

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    toast.success('Customer created successfully!')
    router.push('/customers')
  }

  const handleChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const availableTags = ['VIP', 'Fleet', 'Wholesale', 'Retail', 'B2B', 'Installer']

  const toggleTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }))
  }

  return (
    <div className="min-h-screen">
      <Header
        title="New Customer"
        subtitle="Add a new customer to your database"
      />

      <div className="p-6">
        <div className="mb-6">
          <Link
            href="/customers"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Customers
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <div className="card">
                <div className="px-6 py-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary-50 rounded-lg">
                      <User className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">Basic Information</h2>
                      <p className="text-sm text-gray-500">Customer's personal details</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="First Name"
                      value={formData.firstName}
                      onChange={(e) => handleChange('firstName', e.target.value)}
                      error={errors.firstName}
                      required
                      leftIcon={<User className="w-4 h-4" />}
                    />
                    <Input
                      label="Last Name"
                      value={formData.lastName}
                      onChange={(e) => handleChange('lastName', e.target.value)}
                      error={errors.lastName}
                      required
                    />
                    <Input
                      label="Email Address"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      error={errors.email}
                      required
                      leftIcon={<Mail className="w-4 h-4" />}
                    />
                    <Input
                      label="Phone Number"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      error={errors.phone}
                      leftIcon={<Phone className="w-4 h-4" />}
                    />
                    <div className="md:col-span-2">
                      <Input
                        label="Company"
                        value={formData.company}
                        onChange={(e) => handleChange('company', e.target.value)}
                        leftIcon={<Building className="w-4 h-4" />}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="card">
                <div className="px-6 py-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <MapPin className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">Address</h2>
                      <p className="text-sm text-gray-500">Shipping and billing address</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 space-y-6">
                  <Input
                    label="Address Line 1"
                    value={formData.address1}
                    onChange={(e) => handleChange('address1', e.target.value)}
                    placeholder="Street address"
                  />
                  <Input
                    label="Address Line 2"
                    value={formData.address2}
                    onChange={(e) => handleChange('address2', e.target.value)}
                    placeholder="Apartment, suite, unit, etc. (optional)"
                  />
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Input
                      label="City"
                      value={formData.city}
                      onChange={(e) => handleChange('city', e.target.value)}
                    />
                    <Input
                      label="State"
                      value={formData.state}
                      onChange={(e) => handleChange('state', e.target.value)}
                    />
                    <Input
                      label="ZIP Code"
                      value={formData.zipCode}
                      onChange={(e) => handleChange('zipCode', e.target.value)}
                    />
                    <Select
                      label="Country"
                      value={formData.country}
                      onChange={(e) => handleChange('country', e.target.value)}
                      options={[
                        { value: 'US', label: 'United States' },
                        { value: 'CA', label: 'Canada' },
                        { value: 'MX', label: 'Mexico' },
                      ]}
                    />
                  </div>
                </div>
              </div>

              {/* Vehicle Information */}
              <div className="card">
                <div className="px-6 py-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-50 rounded-lg">
                      <Car className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">Vehicle Information</h2>
                      <p className="text-sm text-gray-500">Primary vehicle details (optional)</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Input
                      label="Year"
                      value={formData.vehicleYear}
                      onChange={(e) => handleChange('vehicleYear', e.target.value)}
                      placeholder="2024"
                    />
                    <Input
                      label="Make"
                      value={formData.vehicleMake}
                      onChange={(e) => handleChange('vehicleMake', e.target.value)}
                      placeholder="Toyota"
                    />
                    <Input
                      label="Model"
                      value={formData.vehicleModel}
                      onChange={(e) => handleChange('vehicleModel', e.target.value)}
                      placeholder="Camry"
                    />
                    <Input
                      label="Trim"
                      value={formData.vehicleTrim}
                      onChange={(e) => handleChange('vehicleTrim', e.target.value)}
                      placeholder="SE"
                    />
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="card">
                <div className="p-6">
                  <Textarea
                    label="Notes"
                    value={formData.notes}
                    onChange={(e) => handleChange('notes', e.target.value)}
                    placeholder="Add any additional notes about this customer..."
                    rows={4}
                  />
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Tags */}
              <div className="card">
                <div className="px-6 py-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-50 rounded-lg">
                      <Tag className="w-5 h-5 text-purple-600" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900">Tags</h2>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2">
                    {availableTags.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                          formData.tags.includes(tag)
                            ? 'bg-primary-500 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Loyalty Tier */}
              <div className="card">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900">Loyalty Tier</h2>
                </div>
                <div className="p-6">
                  <Select
                    value={formData.loyaltyTier}
                    onChange={(e) => handleChange('loyaltyTier', e.target.value)}
                    options={[
                      { value: 'BRONZE', label: 'Bronze' },
                      { value: 'SILVER', label: 'Silver' },
                      { value: 'GOLD', label: 'Gold' },
                      { value: 'PLATINUM', label: 'Platinum' },
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
                    Create Customer
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => router.push('/customers')}
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

'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login - in production this would call NextAuth
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Demo credentials check
    if (formData.email === 'admin@tiredeals.com' && formData.password === 'admin123') {
      toast.success('Welcome back!')
      router.push('/')
    } else {
      toast.error('Invalid email or password')
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">TD</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">TireDeals</h1>
              <p className="text-sm text-gray-500">CRM Dashboard</p>
            </div>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
            <p className="text-gray-600 mt-1">Sign in to access your dashboard</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                Email address
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="input"
                placeholder="admin@tiredeals.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="input pr-10"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.remember}
                  onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <button type="button" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <p className="text-xs font-medium text-gray-700 mb-2">Demo Credentials:</p>
            <p className="text-xs text-gray-600">Email: admin@tiredeals.com</p>
            <p className="text-xs text-gray-600">Password: admin123</p>
          </div>

          {/* Role Info */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <RoleCard role="Admin" description="Full access to all features" color="purple" />
            <RoleCard role="Manager" description="Manage orders & staff" color="blue" />
            <RoleCard role="Staff" description="Day-to-day operations" color="green" />
            <RoleCard role="Support" description="Customer support only" color="amber" />
          </div>
        </div>
      </div>

      {/* Right Panel - Branding */}
      <div className="hidden lg:flex flex-1 bg-gray-900 items-center justify-center p-12">
        <div className="text-center max-w-lg">
          <div className="w-24 h-24 bg-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <span className="text-white font-bold text-4xl">TD</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            TireDeals CRM
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Manage your tire retail business with our comprehensive CRM solution.
            Track orders, customers, inventory, and more.
          </p>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-gray-800 rounded-xl">
              <p className="text-2xl font-bold text-white">10k+</p>
              <p className="text-sm text-gray-400">Orders</p>
            </div>
            <div className="p-4 bg-gray-800 rounded-xl">
              <p className="text-2xl font-bold text-white">5k+</p>
              <p className="text-sm text-gray-400">Customers</p>
            </div>
            <div className="p-4 bg-gray-800 rounded-xl">
              <p className="text-2xl font-bold text-white">500+</p>
              <p className="text-sm text-gray-400">Installers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function RoleCard({ role, description, color }: { role: string; description: string; color: string }) {
  const colors: Record<string, string> = {
    purple: 'bg-purple-50 border-purple-200',
    blue: 'bg-blue-50 border-blue-200',
    green: 'bg-green-50 border-green-200',
    amber: 'bg-amber-50 border-amber-200',
  }

  return (
    <div className={`p-3 rounded-lg border ${colors[color]}`}>
      <p className="text-sm font-medium text-gray-900">{role}</p>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { Header } from '@/components/layout'
import Link from 'next/link'
import {
  MessageSquare,
  Mail,
  Send,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  FileText,
  Settings,
  Smartphone,
} from 'lucide-react'
import { formatDate, formatRelativeTime } from '@/lib/utils'

// Mock data
const smsTemplates = [
  {
    id: '1',
    name: 'Order Confirmation',
    slug: 'order_confirmation',
    message: 'Hi {customer_name}! Your TireDeals order {order_number} has been confirmed. Track at: {tracking_url}',
    variables: ['customer_name', 'order_number', 'tracking_url'],
    isActive: true,
    usageCount: 342,
  },
  {
    id: '2',
    name: 'Shipping Update',
    slug: 'shipping_update',
    message: 'Good news {customer_name}! Your order {order_number} has shipped and is on the way. Track: {tracking_url}',
    variables: ['customer_name', 'order_number', 'tracking_url'],
    isActive: true,
    usageCount: 289,
  },
  {
    id: '3',
    name: 'Delivery Confirmation',
    slug: 'delivery_confirmation',
    message: 'Hi {customer_name}! Your TireDeals order has been delivered. Questions? Reply to this message!',
    variables: ['customer_name'],
    isActive: true,
    usageCount: 245,
  },
  {
    id: '4',
    name: 'Abandoned Cart Reminder',
    slug: 'abandoned_cart',
    message: 'Hi {customer_name}! You left items in your cart at TireDeals. Complete your order: {cart_url} Use code {discount_code} for {discount_amount} off!',
    variables: ['customer_name', 'cart_url', 'discount_code', 'discount_amount'],
    isActive: true,
    usageCount: 156,
  },
  {
    id: '5',
    name: 'Installation Reminder',
    slug: 'installation_reminder',
    message: 'Hi {customer_name}! Don\'t forget to schedule your tire installation. Find installers near you at: {installer_url}',
    variables: ['customer_name', 'installer_url'],
    isActive: false,
    usageCount: 45,
  },
]

const recentMessages = [
  {
    id: '1',
    type: 'SMS',
    to: 'John Smith',
    phone: '+1 555-123-4567',
    template: 'Shipping Update',
    status: 'DELIVERED',
    sentAt: new Date(Date.now() - 1800000),
  },
  {
    id: '2',
    type: 'SMS',
    to: 'Sarah Johnson',
    phone: '+1 555-987-6543',
    template: 'Order Confirmation',
    status: 'DELIVERED',
    sentAt: new Date(Date.now() - 3600000),
  },
  {
    id: '3',
    type: 'SMS',
    to: 'Mike Wilson',
    phone: '+1 555-555-1234',
    template: 'Abandoned Cart Reminder',
    status: 'SENT',
    sentAt: new Date(Date.now() - 7200000),
  },
  {
    id: '4',
    type: 'EMAIL',
    to: 'Emily Brown',
    email: 'emily@email.com',
    template: 'Delivery Confirmation',
    status: 'READ',
    sentAt: new Date(Date.now() - 14400000),
  },
  {
    id: '5',
    type: 'SMS',
    to: 'David Lee',
    phone: '+1 555-444-5555',
    template: 'Shipping Update',
    status: 'FAILED',
    failureReason: 'Invalid phone number',
    sentAt: new Date(Date.now() - 28800000),
  },
]

const stats = {
  smsSent: 1245,
  smsDelivered: 1198,
  smsDeliveryRate: 96.2,
  emailsSent: 3456,
  emailsOpened: 1890,
  emailOpenRate: 54.7,
}

const statusConfig: Record<string, { icon: React.ReactNode; color: string }> = {
  PENDING: { icon: <Clock className="w-4 h-4" />, color: 'text-gray-500' },
  SENT: { icon: <Send className="w-4 h-4" />, color: 'text-blue-500' },
  DELIVERED: { icon: <CheckCircle className="w-4 h-4" />, color: 'text-success-500' },
  READ: { icon: <CheckCircle className="w-4 h-4" />, color: 'text-primary-500' },
  FAILED: { icon: <XCircle className="w-4 h-4" />, color: 'text-danger-500' },
}

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState<'templates' | 'history' | 'compose'>('templates')
  const [showNewTemplateModal, setShowNewTemplateModal] = useState(false)

  return (
    <div className="min-h-screen">
      <Header
        title="SMS & Notifications"
        subtitle="Manage customer communications"
      />

      <div className="p-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
          <div className="card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <MessageSquare className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.smsSent.toLocaleString()}</p>
                <p className="text-sm text-gray-500">SMS Sent</p>
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-success-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.smsDeliveryRate}%</p>
                <p className="text-sm text-gray-500">SMS Delivered</p>
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.emailsSent.toLocaleString()}</p>
                <p className="text-sm text-gray-500">Emails Sent</p>
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Mail className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.emailOpenRate}%</p>
                <p className="text-sm text-gray-500">Email Open Rate</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Twilio Balance</p>
                <p className="text-2xl font-bold">$245.67</p>
              </div>
              <button className="btn-outline btn-sm">Top Up</button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs mb-6">
          <button
            onClick={() => setActiveTab('templates')}
            className={`tab ${activeTab === 'templates' ? 'tab-active' : ''}`}
          >
            SMS Templates
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`tab ${activeTab === 'history' ? 'tab-active' : ''}`}
          >
            Message History
          </button>
          <button
            onClick={() => setActiveTab('compose')}
            className={`tab ${activeTab === 'compose' ? 'tab-active' : ''}`}
          >
            Compose Message
          </button>
        </div>

        {activeTab === 'templates' && (
          <div className="space-y-6">
            <div className="flex justify-end">
              <button
                onClick={() => setShowNewTemplateModal(true)}
                className="btn-primary btn-md"
              >
                <Plus className="w-4 h-4" />
                New Template
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {smsTemplates.map((template) => (
                <div key={template.id} className="card p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{template.name}</h4>
                      <p className="text-xs text-gray-500">slug: {template.slug}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={template.isActive ? 'badge badge-success' : 'badge badge-gray'}>
                        {template.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3 mb-3">
                    <p className="text-sm text-gray-700 font-mono">{template.message}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {template.variables.map((v) => (
                        <span key={v} className="badge badge-primary text-xs">
                          {'{' + v + '}'}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">{template.usageCount} uses</span>
                      <button className="btn-ghost btn-sm">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="btn-ghost btn-sm text-danger-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Recipient</th>
                    <th>Template</th>
                    <th>Status</th>
                    <th>Sent</th>
                  </tr>
                </thead>
                <tbody>
                  {recentMessages.map((msg) => (
                    <tr key={msg.id}>
                      <td>
                        <div className={`flex items-center gap-2 ${msg.type === 'SMS' ? 'text-green-600' : 'text-blue-600'}`}>
                          {msg.type === 'SMS' ? <MessageSquare className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                          {msg.type}
                        </div>
                      </td>
                      <td>
                        <p className="font-medium text-gray-900">{msg.to}</p>
                        <p className="text-xs text-gray-500">{msg.phone || msg.email}</p>
                      </td>
                      <td>{msg.template}</td>
                      <td>
                        <div className="flex items-center gap-2">
                          <span className={statusConfig[msg.status].color}>
                            {statusConfig[msg.status].icon}
                          </span>
                          <span className={`text-sm ${statusConfig[msg.status].color}`}>
                            {msg.status}
                          </span>
                        </div>
                        {msg.failureReason && (
                          <p className="text-xs text-danger-500">{msg.failureReason}</p>
                        )}
                      </td>
                      <td className="text-gray-500">
                        {formatRelativeTime(msg.sentAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'compose' && (
          <ComposeMessage />
        )}
      </div>
    </div>
  )
}

function ComposeMessage() {
  const [messageType, setMessageType] = useState<'sms' | 'email'>('sms')
  const [recipientType, setRecipientType] = useState<'individual' | 'segment'>('individual')
  const [message, setMessage] = useState('')

  return (
    <div className="card">
      <div className="card-body space-y-6">
        {/* Message Type */}
        <div>
          <label className="label">Message Type</label>
          <div className="flex gap-4">
            <button
              onClick={() => setMessageType('sms')}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 transition-colors ${
                messageType === 'sms'
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              SMS
            </button>
            <button
              onClick={() => setMessageType('email')}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 transition-colors ${
                messageType === 'email'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <Mail className="w-5 h-5" />
              Email
            </button>
          </div>
        </div>

        {/* Recipient Type */}
        <div>
          <label className="label">Send To</label>
          <div className="flex gap-4">
            <button
              onClick={() => setRecipientType('individual')}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 transition-colors ${
                recipientType === 'individual'
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <Smartphone className="w-5 h-5" />
              Individual
            </button>
            <button
              onClick={() => setRecipientType('segment')}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 transition-colors ${
                recipientType === 'segment'
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <Users className="w-5 h-5" />
              Customer Segment
            </button>
          </div>
        </div>

        {/* Recipient Input */}
        {recipientType === 'individual' ? (
          <div>
            <label className="label">
              {messageType === 'sms' ? 'Phone Number' : 'Email Address'}
            </label>
            <input
              type={messageType === 'sms' ? 'tel' : 'email'}
              placeholder={messageType === 'sms' ? '+1 555-123-4567' : 'customer@email.com'}
              className="input"
            />
          </div>
        ) : (
          <div>
            <label className="label">Customer Segment</label>
            <select className="select">
              <option value="">Select a segment...</option>
              <option value="all">All Customers ({1250})</option>
              <option value="sms_opted_in">SMS Opted-In ({890})</option>
              <option value="recent_orders">Recent Orders (30 days) ({342})</option>
              <option value="loyalty_gold">Gold & Platinum Members ({225})</option>
              <option value="abandoned_cart">Abandoned Cart ({28})</option>
            </select>
          </div>
        )}

        {/* Template or Custom */}
        <div>
          <label className="label">Template (Optional)</label>
          <select className="select">
            <option value="">Custom Message</option>
            {smsTemplates.filter(t => t.isActive).map((t) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div>
          <label className="label">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            placeholder="Type your message here..."
            className="input"
          />
          {messageType === 'sms' && (
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-gray-500">
                Available: {'{customer_name}'}, {'{order_number}'}, {'{tracking_url}'}
              </p>
              <p className="text-xs text-gray-500">
                {message.length}/160 characters ({Math.ceil(message.length / 160)} SMS)
              </p>
            </div>
          )}
        </div>

        {/* Preview */}
        {message && (
          <div>
            <label className="label">Preview</label>
            <div className="bg-gray-900 text-white p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-500 rounded-full">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">TireDeals</p>
                  <p className="text-sm">{message}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Send Button */}
        <div className="flex justify-end gap-3">
          <button className="btn-outline btn-md">
            <Clock className="w-4 h-4" />
            Schedule
          </button>
          <button className="btn-primary btn-md">
            <Send className="w-4 h-4" />
            Send {messageType === 'sms' ? 'SMS' : 'Email'}
          </button>
        </div>
      </div>
    </div>
  )
}

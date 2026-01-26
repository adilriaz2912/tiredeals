'use client'

import { useState } from 'react'
import { Header } from '@/components/layout'
import {
  Zap,
  Bot,
  User,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Tag,
  TrendingUp,
  Users,
  Target,
  RefreshCw,
  ChevronRight,
  Sparkles,
} from 'lucide-react'
import Link from 'next/link'

// Tickets with AI analysis
const tickets = [
  {
    id: 'TKT-2891',
    subject: 'Wrong tire size delivered - need urgent replacement',
    customer: 'John Smith',
    email: 'john.smith@email.com',
    createdAt: '2025-01-26 14:32:05',
    aiAnalysis: {
      category: 'Shipping Error',
      priority: 'high',
      sentiment: 'frustrated',
      intent: 'replacement_request',
      suggestedAgent: 'Sarah K. (Shipping Specialist)',
      confidence: 94,
      keyEntities: ['215/55R17', 'Order #TD-X9Y8Z7', 'Toyota Camry'],
      suggestedResponse: 'Apologize for the error, offer expedited replacement at no cost, and provide return label.',
    },
    status: 'pending_assignment',
  },
  {
    id: 'TKT-2890',
    subject: 'Question about installation appointment',
    customer: 'Maria Garcia',
    email: 'maria.g@email.com',
    createdAt: '2025-01-26 13:15:22',
    aiAnalysis: {
      category: 'Installation',
      priority: 'medium',
      sentiment: 'neutral',
      intent: 'information_request',
      suggestedAgent: 'Mike T. (Scheduling)',
      confidence: 88,
      keyEntities: ['Quick Tire Pro', 'Saturday 10am', 'CR-V'],
      suggestedResponse: 'Confirm appointment details and provide installer contact information.',
    },
    status: 'auto_assigned',
    assignedTo: 'Mike T.',
  },
  {
    id: 'TKT-2889',
    subject: 'Warranty claim - tire sidewall damage after 2 months',
    customer: 'Robert Chen',
    email: 'rchen@email.com',
    createdAt: '2025-01-26 11:45:18',
    aiAnalysis: {
      category: 'Warranty',
      priority: 'high',
      sentiment: 'concerned',
      intent: 'warranty_claim',
      suggestedAgent: 'Jennifer L. (Warranty Specialist)',
      confidence: 92,
      keyEntities: ['Michelin Defender', 'Order #TD-A1B2C3', 'Pothole damage'],
      suggestedResponse: 'Request photos of damage, review warranty terms, check for road hazard coverage.',
    },
    status: 'pending_assignment',
  },
  {
    id: 'TKT-2888',
    subject: 'Can I get a price match?',
    customer: 'Emily Wilson',
    email: 'emily.w@email.com',
    createdAt: '2025-01-26 10:22:44',
    aiAnalysis: {
      category: 'Pricing',
      priority: 'low',
      sentiment: 'hopeful',
      intent: 'price_negotiation',
      suggestedAgent: 'AI Auto-Response',
      confidence: 96,
      keyEntities: ['Goodyear Assurance', 'TireRack $139', 'Our price $149'],
      suggestedResponse: 'Apply price match policy - competitor verified, approve $10 discount.',
    },
    status: 'auto_resolved',
    resolution: 'AI applied price match automatically',
  },
  {
    id: 'TKT-2887',
    subject: 'Fleet account billing inquiry',
    customer: 'Metro Logistics',
    email: 'fleet@metrologistics.com',
    createdAt: '2025-01-26 09:15:33',
    aiAnalysis: {
      category: 'Billing',
      priority: 'medium',
      sentiment: 'confused',
      intent: 'billing_inquiry',
      suggestedAgent: 'David M. (Fleet Account Manager)',
      confidence: 91,
      keyEntities: ['Invoice #INV-4521', '$12,450', 'Net-30 terms'],
      suggestedResponse: 'Review invoice details, explain line items, confirm payment terms.',
    },
    status: 'pending_assignment',
  },
]

// AI routing rules
const routingRules = [
  { category: 'Shipping Error', agent: 'Shipping Specialist', autoAssign: true, escalateAfter: '2h' },
  { category: 'Installation', agent: 'Scheduling Team', autoAssign: true, escalateAfter: '4h' },
  { category: 'Warranty', agent: 'Warranty Specialist', autoAssign: false, escalateAfter: '1h' },
  { category: 'Pricing', agent: 'AI Auto-Response', autoAssign: true, escalateAfter: 'N/A' },
  { category: 'Fleet/B2B', agent: 'Account Manager', autoAssign: false, escalateAfter: '30m' },
]

// Stats
const stats = {
  ticketsToday: 48,
  autoRouted: 32,
  autoResolved: 8,
  avgResponseTime: '4.2 min',
  aiAccuracy: 94.2,
}

export default function AIRouting() {
  const [filter, setFilter] = useState<'all' | 'pending' | 'assigned' | 'resolved'>('all')

  const filteredTickets = tickets.filter(t => {
    if (filter === 'pending') return t.status === 'pending_assignment'
    if (filter === 'assigned') return t.status === 'auto_assigned'
    if (filter === 'resolved') return t.status === 'auto_resolved'
    return true
  })

  return (
    <div className="min-h-screen">
      <Header
        title="AI Ticket Routing"
        subtitle="Intelligent ticket categorization, prioritization, and agent assignment"
      />

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="card p-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/20">
                <MessageSquare className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.ticketsToday}</p>
                <p className="text-xs text-slate-400">Tickets Today</p>
              </div>
            </div>
          </div>

          <div className="card p-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/20">
                <Bot className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.autoRouted}</p>
                <p className="text-xs text-slate-400">Auto-Routed</p>
              </div>
            </div>
          </div>

          <div className="card p-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-violet-500/20">
                <Zap className="w-5 h-5 text-violet-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.autoResolved}</p>
                <p className="text-xs text-slate-400">Auto-Resolved</p>
              </div>
            </div>
          </div>

          <div className="card p-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/20">
                <Clock className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.avgResponseTime}</p>
                <p className="text-xs text-slate-400">Avg Response</p>
              </div>
            </div>
          </div>

          <div className="card p-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-rose-500/20">
                <Target className="w-5 h-5 text-rose-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.aiAccuracy}%</p>
                <p className="text-xs text-slate-400">AI Accuracy</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Ticket Queue */}
          <div className="lg:col-span-2 card">
            <div className="px-6 py-4 border-b border-slate-800/50 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                AI-Analyzed Tickets
              </h2>
              <div className="flex gap-2">
                {(['all', 'pending', 'assigned', 'resolved'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      filter === f
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="divide-y divide-slate-800/30">
              {filteredTickets.map((ticket) => (
                <div key={ticket.id} className="p-6 hover:bg-slate-800/20 transition-colors">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-sm text-slate-400">{ticket.id}</span>
                        <StatusBadge status={ticket.status} />
                      </div>
                      <h3 className="font-medium text-white">{ticket.subject}</h3>
                      <p className="text-sm text-slate-400 mt-1">
                        {ticket.customer} • {ticket.email}
                      </p>
                    </div>
                    <Link
                      href={`/support/${ticket.id}`}
                      className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </Link>
                  </div>

                  {/* AI Analysis */}
                  <div className="p-4 bg-gradient-to-r from-cyan-500/5 to-violet-500/5 border border-cyan-500/20 rounded-xl">
                    <div className="flex items-center gap-2 mb-3">
                      <Bot className="w-4 h-4 text-cyan-400" />
                      <span className="text-sm font-medium text-cyan-400">AI Analysis</span>
                      <span className="text-xs text-slate-500">• {ticket.aiAnalysis.confidence}% confidence</span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-slate-500">Category</p>
                        <p className="text-sm text-white">{ticket.aiAnalysis.category}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Priority</p>
                        <PriorityBadge priority={ticket.aiAnalysis.priority} />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Sentiment</p>
                        <SentimentBadge sentiment={ticket.aiAnalysis.sentiment} />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Suggested Agent</p>
                        <p className="text-sm text-emerald-400">{ticket.aiAnalysis.suggestedAgent}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {ticket.aiAnalysis.keyEntities.map((entity, i) => (
                        <span key={i} className="text-xs px-2 py-1 bg-slate-800/60 text-slate-300 rounded">
                          {entity}
                        </span>
                      ))}
                    </div>

                    <div className="p-3 bg-slate-800/40 rounded-lg">
                      <p className="text-xs text-slate-500 mb-1">Suggested Response</p>
                      <p className="text-sm text-slate-300">{ticket.aiAnalysis.suggestedResponse}</p>
                    </div>

                    {ticket.status === 'pending_assignment' && (
                      <div className="flex gap-2 mt-4">
                        <button className="flex-1 py-2 bg-emerald-500/20 text-emerald-400 rounded-lg text-sm font-medium hover:bg-emerald-500/30 transition-colors">
                          Accept Suggestion
                        </button>
                        <button className="flex-1 py-2 bg-slate-700 text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-600 transition-colors">
                          Manual Assign
                        </button>
                      </div>
                    )}

                    {ticket.status === 'auto_resolved' && (
                      <div className="mt-3 flex items-center gap-2 text-emerald-400">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm">{ticket.resolution}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Routing Rules */}
            <div className="card">
              <div className="px-6 py-4 border-b border-slate-800/50 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">Routing Rules</h2>
                <button className="text-sm text-emerald-400 hover:text-emerald-300">Edit</button>
              </div>
              <div className="p-4 space-y-3">
                {routingRules.map((rule) => (
                  <div key={rule.category} className="p-3 bg-slate-800/40 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-white">{rule.category}</span>
                      {rule.autoAssign ? (
                        <span className="text-xs px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded">Auto</span>
                      ) : (
                        <span className="text-xs px-2 py-0.5 bg-amber-500/20 text-amber-400 rounded">Manual</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">{rule.agent}</span>
                      <span className="text-slate-500">Escalate: {rule.escalateAfter}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Performance */}
            <div className="card p-6">
              <h3 className="font-medium text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                AI Performance (7d)
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-400">Routing Accuracy</span>
                    <span className="text-emerald-400">94.2%</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500" style={{ width: '94.2%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-400">Priority Accuracy</span>
                    <span className="text-cyan-400">91.8%</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-500" style={{ width: '91.8%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-400">Auto-Resolution Rate</span>
                    <span className="text-violet-400">16.7%</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-violet-500" style={{ width: '16.7%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-400">Agent Satisfaction</span>
                    <span className="text-amber-400">4.6/5</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500" style={{ width: '92%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending_assignment: 'bg-amber-500/20 text-amber-400',
    auto_assigned: 'bg-cyan-500/20 text-cyan-400',
    auto_resolved: 'bg-emerald-500/20 text-emerald-400',
  }

  const labels: Record<string, string> = {
    pending_assignment: 'Pending',
    auto_assigned: 'Assigned',
    auto_resolved: 'Resolved',
  }

  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  )
}

function PriorityBadge({ priority }: { priority: string }) {
  const styles: Record<string, string> = {
    high: 'text-rose-400',
    medium: 'text-amber-400',
    low: 'text-slate-400',
  }

  return (
    <span className={`text-sm font-medium ${styles[priority]}`}>
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </span>
  )
}

function SentimentBadge({ sentiment }: { sentiment: string }) {
  const styles: Record<string, string> = {
    frustrated: 'text-rose-400',
    concerned: 'text-amber-400',
    neutral: 'text-slate-400',
    hopeful: 'text-cyan-400',
    satisfied: 'text-emerald-400',
  }

  return (
    <span className={`text-sm capitalize ${styles[sentiment]}`}>
      {sentiment}
    </span>
  )
}

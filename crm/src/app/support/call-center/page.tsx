'use client'

import { useState } from 'react'
import { Header } from '@/components/layout'
import {
  Phone,
  PhoneCall,
  PhoneOff,
  PhoneMissed,
  Clock,
  User,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Users,
  Timer,
  CheckCircle,
  AlertTriangle,
  Headphones,
  Activity,
  Calendar,
} from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

// Agent stats
const agents = [
  {
    id: 'AGT-001',
    name: 'Sarah Johnson',
    status: 'on_call',
    currentCall: '5:32',
    callsToday: 28,
    avgHandleTime: '4:15',
    avgWaitTime: '0:45',
    missedCalls: 1,
    satisfaction: 4.8,
    resolution: 94,
  },
  {
    id: 'AGT-002',
    name: 'Mike Chen',
    status: 'available',
    currentCall: null,
    callsToday: 32,
    avgHandleTime: '3:52',
    avgWaitTime: '0:38',
    missedCalls: 0,
    satisfaction: 4.9,
    resolution: 96,
  },
  {
    id: 'AGT-003',
    name: 'Emily Davis',
    status: 'on_call',
    currentCall: '2:18',
    callsToday: 24,
    avgHandleTime: '5:05',
    avgWaitTime: '0:52',
    missedCalls: 2,
    satisfaction: 4.6,
    resolution: 91,
  },
  {
    id: 'AGT-004',
    name: 'James Wilson',
    status: 'break',
    currentCall: null,
    callsToday: 26,
    avgHandleTime: '4:28',
    avgWaitTime: '0:42',
    missedCalls: 1,
    satisfaction: 4.7,
    resolution: 93,
  },
  {
    id: 'AGT-005',
    name: 'Lisa Thompson',
    status: 'after_call',
    currentCall: null,
    callsToday: 30,
    avgHandleTime: '3:45',
    avgWaitTime: '0:35',
    missedCalls: 0,
    satisfaction: 4.9,
    resolution: 97,
  },
]

// Recent calls
const recentCalls = [
  { id: 'CALL-892', customer: 'John Smith', phone: '(555) 123-4567', agent: 'Sarah Johnson', duration: '5:32', type: 'inbound', status: 'in_progress', topic: 'Order Status' },
  { id: 'CALL-891', customer: 'Maria Garcia', phone: '(555) 234-5678', agent: 'Mike Chen', duration: '4:15', type: 'inbound', status: 'completed', topic: 'Product Inquiry' },
  { id: 'CALL-890', customer: 'Robert Lee', phone: '(555) 345-6789', agent: 'Emily Davis', duration: '2:18', type: 'inbound', status: 'in_progress', topic: 'Warranty Claim' },
  { id: 'CALL-889', customer: 'Unknown', phone: '(555) 456-7890', agent: '-', duration: '-', type: 'inbound', status: 'missed', topic: '-' },
  { id: 'CALL-888', customer: 'Jennifer Brown', phone: '(555) 567-8901', agent: 'Lisa Thompson', duration: '3:45', type: 'outbound', status: 'completed', topic: 'Follow-up' },
  { id: 'CALL-887', customer: 'David Martinez', phone: '(555) 678-9012', agent: 'James Wilson', duration: '6:12', type: 'inbound', status: 'completed', topic: 'Return Request' },
]

// Hourly call volume
const hourlyVolume = [
  { hour: '8AM', calls: 12, avgWait: 45 },
  { hour: '9AM', calls: 28, avgWait: 62 },
  { hour: '10AM', calls: 35, avgWait: 85 },
  { hour: '11AM', calls: 42, avgWait: 95 },
  { hour: '12PM', calls: 38, avgWait: 78 },
  { hour: '1PM', calls: 45, avgWait: 110 },
  { hour: '2PM', calls: 40, avgWait: 88 },
  { hour: '3PM', calls: 32, avgWait: 55 },
  { hour: '4PM', calls: 25, avgWait: 42 },
]

// Stats
const stats = {
  totalCalls: 156,
  answeredCalls: 148,
  missedCalls: 8,
  avgWaitTime: '0:52',
  avgTalkTime: '4:22',
  serviceLevel: 92.3,
  queueSize: 3,
  activeAgents: 4,
}

export default function CallCenter() {
  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month'>('today')

  return (
    <div className="min-h-screen">
      <Header
        title="Call Center Dashboard"
        subtitle="Real-time call monitoring, agent performance, and analytics"
      />

      <div className="p-6 space-y-6">
        {/* Real-time Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          <div className="card p-4">
            <div className="flex items-center gap-2 mb-2">
              <Phone className="w-4 h-4 text-green-400" />
              <span className="text-xs text-neutral-400">Total Calls</span>
            </div>
            <p className="text-2xl font-bold text-white">{stats.totalCalls}</p>
          </div>

          <div className="card p-4">
            <div className="flex items-center gap-2 mb-2">
              <PhoneCall className="w-4 h-4 text-green-300" />
              <span className="text-xs text-neutral-400">Answered</span>
            </div>
            <p className="text-2xl font-bold text-white">{stats.answeredCalls}</p>
          </div>

          <div className="card p-4">
            <div className="flex items-center gap-2 mb-2">
              <PhoneMissed className="w-4 h-4 text-rose-400" />
              <span className="text-xs text-neutral-400">Missed</span>
            </div>
            <p className="text-2xl font-bold text-white">{stats.missedCalls}</p>
          </div>

          <div className="card p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span className="text-xs text-neutral-400">Avg Wait</span>
            </div>
            <p className="text-2xl font-bold text-white">{stats.avgWaitTime}</p>
          </div>

          <div className="card p-4">
            <div className="flex items-center gap-2 mb-2">
              <Timer className="w-4 h-4 text-green-400" />
              <span className="text-xs text-neutral-400">Avg Talk</span>
            </div>
            <p className="text-2xl font-bold text-white">{stats.avgTalkTime}</p>
          </div>

          <div className="card p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-xs text-neutral-400">SLA %</span>
            </div>
            <p className="text-2xl font-bold text-white">{stats.serviceLevel}%</p>
          </div>

          <div className="card p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-green-300" />
              <span className="text-xs text-neutral-400">In Queue</span>
            </div>
            <p className="text-2xl font-bold text-amber-400">{stats.queueSize}</p>
          </div>

          <div className="card p-4">
            <div className="flex items-center gap-2 mb-2">
              <Headphones className="w-4 h-4 text-green-400" />
              <span className="text-xs text-neutral-400">Active</span>
            </div>
            <p className="text-2xl font-bold text-white">{stats.activeAgents}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Agent Status */}
          <div className="lg:col-span-2 card">
            <div className="px-6 py-4 border-b border-neutral-800/50 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <Headphones className="w-5 h-5 text-green-400" />
                Agent Status
              </h2>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-neutral-400">On Call</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full" />
                  <span className="text-neutral-400">Available</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-amber-500 rounded-full" />
                  <span className="text-neutral-400">Break</span>
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-800/50">
                    <th className="text-left p-4 text-sm font-medium text-neutral-400">Agent</th>
                    <th className="text-left p-4 text-sm font-medium text-neutral-400">Status</th>
                    <th className="text-left p-4 text-sm font-medium text-neutral-400">Calls</th>
                    <th className="text-left p-4 text-sm font-medium text-neutral-400">Avg Handle</th>
                    <th className="text-left p-4 text-sm font-medium text-neutral-400">Missed</th>
                    <th className="text-left p-4 text-sm font-medium text-neutral-400">CSAT</th>
                    <th className="text-left p-4 text-sm font-medium text-neutral-400">Resolution</th>
                  </tr>
                </thead>
                <tbody>
                  {agents.map((agent) => (
                    <tr key={agent.id} className="border-b border-neutral-800/30 hover:bg-neutral-800/30">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br bg-green-500 flex items-center justify-center text-white text-sm font-medium">
                            {agent.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="font-medium text-white">{agent.name}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <AgentStatusBadge status={agent.status} currentCall={agent.currentCall} />
                      </td>
                      <td className="p-4 text-white">{agent.callsToday}</td>
                      <td className="p-4 text-neutral-300">{agent.avgHandleTime}</td>
                      <td className="p-4">
                        <span className={agent.missedCalls > 0 ? 'text-rose-400' : 'text-green-400'}>
                          {agent.missedCalls}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="text-amber-400">{agent.satisfaction}</span>
                      </td>
                      <td className="p-4">
                        <span className={`${
                          agent.resolution >= 95 ? 'text-green-400' :
                          agent.resolution >= 90 ? 'text-green-300' :
                          'text-amber-400'
                        }`}>
                          {agent.resolution}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Call Volume Chart */}
          <div className="card">
            <div className="px-6 py-4 border-b border-neutral-800/50">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-green-300" />
                Call Volume by Hour
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {hourlyVolume.map((hour) => (
                  <div key={hour.hour} className="flex items-center gap-3">
                    <span className="text-xs text-neutral-400 w-10">{hour.hour}</span>
                    <div className="flex-1 h-6 bg-neutral-800 rounded overflow-hidden relative">
                      <div
                        className="h-full bg-green-500"
                        style={{ width: `${(hour.calls / 50) * 100}%` }}
                      />
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-white">
                        {hour.calls}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-neutral-800/40 rounded-lg">
                <h4 className="text-sm font-medium text-white mb-3">Peak Hours</h4>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-400">Highest Volume</span>
                  <span className="text-green-400">1PM (45 calls)</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-neutral-400">Longest Wait</span>
                  <span className="text-amber-400">1PM (1:50 avg)</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-neutral-400">Best SLA</span>
                  <span className="text-green-300">4PM (98%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Calls */}
        <div className="card">
          <div className="px-6 py-4 border-b border-neutral-800/50 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-400" />
              Recent Calls
            </h2>
            <div className="flex gap-2">
              {(['today', 'week', 'month'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    timeRange === range
                      ? 'bg-green-500/20 text-green-400'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-800/50">
                  <th className="text-left p-4 text-sm font-medium text-neutral-400">Call ID</th>
                  <th className="text-left p-4 text-sm font-medium text-neutral-400">Customer</th>
                  <th className="text-left p-4 text-sm font-medium text-neutral-400">Phone</th>
                  <th className="text-left p-4 text-sm font-medium text-neutral-400">Agent</th>
                  <th className="text-left p-4 text-sm font-medium text-neutral-400">Duration</th>
                  <th className="text-left p-4 text-sm font-medium text-neutral-400">Type</th>
                  <th className="text-left p-4 text-sm font-medium text-neutral-400">Topic</th>
                  <th className="text-left p-4 text-sm font-medium text-neutral-400">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentCalls.map((call) => (
                  <tr key={call.id} className="border-b border-neutral-800/30 hover:bg-neutral-800/30">
                    <td className="p-4 font-mono text-sm text-neutral-400">{call.id}</td>
                    <td className="p-4 text-white">{call.customer}</td>
                    <td className="p-4 text-neutral-300">{call.phone}</td>
                    <td className="p-4 text-neutral-300">{call.agent}</td>
                    <td className="p-4 text-white">{call.duration}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs ${
                        call.type === 'inbound'
                          ? 'bg-green-400/20 text-green-300'
                          : 'bg-green-500/20 text-green-400'
                      }`}>
                        {call.type}
                      </span>
                    </td>
                    <td className="p-4 text-neutral-300">{call.topic}</td>
                    <td className="p-4">
                      <CallStatusBadge status={call.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

function AgentStatusBadge({ status, currentCall }: { status: string; currentCall: string | null }) {
  const styles: Record<string, { bg: string; dot: string; text: string }> = {
    on_call: { bg: 'bg-green-500/20', dot: 'bg-green-500 animate-pulse', text: 'text-green-400' },
    available: { bg: 'bg-green-400/20', dot: 'bg-green-400', text: 'text-green-300' },
    break: { bg: 'bg-amber-500/20', dot: 'bg-amber-500', text: 'text-amber-400' },
    after_call: { bg: 'bg-green-500/20', dot: 'bg-green-500', text: 'text-green-400' },
  }

  const labels: Record<string, string> = {
    on_call: 'On Call',
    available: 'Available',
    break: 'On Break',
    after_call: 'After Call',
  }

  const style = styles[status]

  return (
    <div className="flex items-center gap-2">
      <span className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium ${style.bg} ${style.text}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
        {labels[status]}
      </span>
      {currentCall && (
        <span className="text-xs text-neutral-500">{currentCall}</span>
      )}
    </div>
  )
}

function CallStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    in_progress: 'bg-green-500/20 text-green-400',
    completed: 'bg-neutral-500/20 text-neutral-400',
    missed: 'bg-rose-500/20 text-rose-400',
  }

  const labels: Record<string, string> = {
    in_progress: 'In Progress',
    completed: 'Completed',
    missed: 'Missed',
  }

  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  )
}

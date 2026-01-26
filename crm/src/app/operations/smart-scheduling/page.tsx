'use client'

import { useState } from 'react'
import { Header } from '@/components/layout'
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Truck,
  Wrench,
  CheckCircle,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Star,
  Navigation,
  Zap,
  TrendingUp,
  Users,
  Timer,
} from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

// Installers
const installers = [
  {
    id: 'INS-001',
    name: 'Quick Tire Pro - Downtown',
    address: '123 Main St, Chicago, IL',
    rating: 4.8,
    reviews: 342,
    distance: 2.4,
    availability: [
      { time: '9:00 AM', slots: 2, booked: 1 },
      { time: '10:00 AM', slots: 2, booked: 2 },
      { time: '11:00 AM', slots: 2, booked: 0 },
      { time: '1:00 PM', slots: 2, booked: 1 },
      { time: '2:00 PM', slots: 2, booked: 0 },
      { time: '3:00 PM', slots: 2, booked: 1 },
    ],
    specialties: ['Performance', 'SUV/Truck', 'Same Day'],
    avgInstallTime: 45,
    todayCapacity: 75,
  },
  {
    id: 'INS-002',
    name: 'AutoCare Express',
    address: '456 Oak Ave, Chicago, IL',
    rating: 4.6,
    reviews: 218,
    distance: 3.8,
    availability: [
      { time: '9:00 AM', slots: 3, booked: 3 },
      { time: '10:00 AM', slots: 3, booked: 2 },
      { time: '11:00 AM', slots: 3, booked: 1 },
      { time: '1:00 PM', slots: 3, booked: 0 },
      { time: '2:00 PM', slots: 3, booked: 0 },
      { time: '3:00 PM', slots: 3, booked: 2 },
    ],
    specialties: ['Economy', 'Fleet', 'Walk-in'],
    avgInstallTime: 55,
    todayCapacity: 60,
  },
  {
    id: 'INS-003',
    name: 'Premium Tire & Auto',
    address: '789 Elm Blvd, Chicago, IL',
    rating: 4.9,
    reviews: 456,
    distance: 5.2,
    availability: [
      { time: '9:00 AM', slots: 2, booked: 2 },
      { time: '10:00 AM', slots: 2, booked: 2 },
      { time: '11:00 AM', slots: 2, booked: 2 },
      { time: '1:00 PM', slots: 2, booked: 1 },
      { time: '2:00 PM', slots: 2, booked: 1 },
      { time: '3:00 PM', slots: 2, booked: 0 },
    ],
    specialties: ['Luxury', 'Performance', 'Alignment'],
    avgInstallTime: 40,
    todayCapacity: 85,
  },
]

// Today's appointments
const appointments = [
  {
    id: 'APT-001',
    customer: 'John Smith',
    vehicle: '2021 Toyota Camry',
    tires: '4x Michelin Defender T+H',
    installer: 'Quick Tire Pro - Downtown',
    time: '9:00 AM',
    status: 'completed',
    duration: 42,
  },
  {
    id: 'APT-002',
    customer: 'Sarah Johnson',
    vehicle: '2020 Honda CR-V',
    tires: '4x Goodyear Assurance',
    installer: 'Quick Tire Pro - Downtown',
    time: '10:00 AM',
    status: 'in_progress',
    duration: null,
  },
  {
    id: 'APT-003',
    customer: 'Mike Wilson',
    vehicle: '2022 Ford F-150',
    tires: '4x BFGoodrich All-Terrain',
    installer: 'AutoCare Express',
    time: '11:00 AM',
    status: 'upcoming',
    duration: null,
  },
  {
    id: 'APT-004',
    customer: 'Emily Brown',
    vehicle: '2023 Tesla Model 3',
    tires: '4x Michelin Pilot Sport 4S',
    installer: 'Premium Tire & Auto',
    time: '1:00 PM',
    status: 'upcoming',
    duration: null,
  },
]

// Optimization suggestions
const suggestions = [
  {
    type: 'route',
    title: 'Route Optimization Available',
    description: 'Reorder 3 appointments to save 45 min drive time',
    impact: '45 min saved',
    status: 'pending',
  },
  {
    type: 'capacity',
    title: 'Underutilized Installer',
    description: 'AutoCare Express has 40% unused capacity today',
    impact: '6 slots available',
    status: 'info',
  },
  {
    type: 'conflict',
    title: 'Schedule Conflict',
    description: 'Customer requested change conflicts with installer availability',
    impact: 'Needs resolution',
    status: 'warning',
  },
]

// Stats
const stats = {
  todayAppointments: 28,
  completedToday: 12,
  avgWaitTime: 8,
  utilizationRate: 76,
}

export default function SmartScheduling() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedInstaller, setSelectedInstaller] = useState<string | null>(null)

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  }

  return (
    <div className="min-h-screen">
      <Header
        title="Smart Installer Scheduling"
        subtitle="AI-optimized appointment scheduling and route planning"
      />

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-green-500/20">
                <Calendar className="w-6 h-6 text-green-400" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-white">{stats.todayAppointments}</p>
              <p className="text-sm text-neutral-400 mt-1">Today's Appointments</p>
              <p className="text-xs text-green-400">{stats.completedToday} completed</p>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-green-400/20">
                <Timer className="w-6 h-6 text-green-300" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-white">{stats.avgWaitTime} min</p>
              <p className="text-sm text-neutral-400 mt-1">Avg Wait Time</p>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-green-500/20">
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-white">{stats.utilizationRate}%</p>
              <p className="text-sm text-neutral-400 mt-1">Utilization Rate</p>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-amber-500/20">
                <Users className="w-6 h-6 text-amber-400" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-white">{installers.length}</p>
              <p className="text-sm text-neutral-400 mt-1">Active Installers</p>
            </div>
          </div>
        </div>

        {/* Optimization Suggestions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {suggestions.map((suggestion, i) => (
            <div
              key={i}
              className={`p-4 rounded-xl border ${
                suggestion.status === 'warning'
                  ? 'bg-amber-500/10 border-amber-500/30'
                  : suggestion.status === 'pending'
                  ? 'bg-green-500/10 border-green-500/30'
                  : 'bg-neutral-800/40 border-neutral-700/50'
              }`}
            >
              <div className="flex items-start gap-3">
                {suggestion.type === 'route' && <Navigation className="w-5 h-5 text-green-400 mt-0.5" />}
                {suggestion.type === 'capacity' && <TrendingUp className="w-5 h-5 text-green-300 mt-0.5" />}
                {suggestion.type === 'conflict' && <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5" />}
                <div className="flex-1">
                  <h3 className="font-medium text-white">{suggestion.title}</h3>
                  <p className="text-sm text-neutral-400 mt-1">{suggestion.description}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-green-400">{suggestion.impact}</span>
                    {suggestion.status === 'pending' && (
                      <button className="text-xs px-3 py-1 bg-green-500/20 text-green-400 rounded hover:bg-green-500/30 transition-colors">
                        Apply
                      </button>
                    )}
                    {suggestion.status === 'warning' && (
                      <button className="text-xs px-3 py-1 bg-amber-500/20 text-amber-400 rounded hover:bg-amber-500/30 transition-colors">
                        Resolve
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Schedule */}
          <div className="lg:col-span-2 card">
            <div className="px-6 py-4 border-b border-neutral-800/50 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-green-400" />
                Today's Schedule
              </h2>
              <div className="flex items-center gap-2">
                <button className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-sm text-white px-3">{formatDate(selectedDate)}</span>
                <button className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="divide-y divide-neutral-800/30">
              {appointments.map((apt) => (
                <div key={apt.id} className="p-4 hover:bg-neutral-800/20 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-center min-w-[60px]">
                        <p className="text-lg font-semibold text-white">{apt.time}</p>
                        {apt.duration && (
                          <p className="text-xs text-neutral-500">{apt.duration} min</p>
                        )}
                      </div>
                      <div className={`w-1 h-12 rounded-full ${
                        apt.status === 'completed' ? 'bg-green-500' :
                        apt.status === 'in_progress' ? 'bg-green-400' :
                        'bg-neutral-700'
                      }`} />
                      <div>
                        <p className="font-medium text-white">{apt.customer}</p>
                        <p className="text-sm text-neutral-400">{apt.vehicle}</p>
                        <p className="text-xs text-neutral-500">{apt.tires}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-neutral-400">{apt.installer}</p>
                      <StatusBadge status={apt.status} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-6 py-4 border-t border-neutral-800/50">
              <button className="w-full py-3 bg-green-500 text-white rounded-xl font-medium hover:opacity-90 transition-opacity">
                + Schedule New Appointment
              </button>
            </div>
          </div>

          {/* Installer Availability */}
          <div className="card">
            <div className="px-6 py-4 border-b border-neutral-800/50">
              <h2 className="text-lg font-semibold text-white">Installer Availability</h2>
            </div>
            <div className="p-4 space-y-4">
              {installers.map((installer) => {
                const availableSlots = installer.availability.reduce((sum, a) => sum + (a.slots - a.booked), 0)
                const totalSlots = installer.availability.reduce((sum, a) => sum + a.slots, 0)

                return (
                  <button
                    key={installer.id}
                    onClick={() => setSelectedInstaller(selectedInstaller === installer.id ? null : installer.id)}
                    className={`w-full p-4 rounded-xl border text-left transition-all ${
                      selectedInstaller === installer.id
                        ? 'bg-green-500/10 border-green-500/30'
                        : 'bg-neutral-800/40 border-neutral-700/50 hover:border-neutral-600'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-medium text-white">{installer.name}</h3>
                        <div className="flex items-center gap-2 text-xs text-neutral-400 mt-1">
                          <MapPin className="w-3 h-3" />
                          {installer.distance} mi
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-amber-400" />
                            {installer.rating}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-lg font-semibold ${
                          availableSlots > 4 ? 'text-green-400' :
                          availableSlots > 0 ? 'text-amber-400' :
                          'text-rose-400'
                        }`}>
                          {availableSlots}
                        </p>
                        <p className="text-xs text-neutral-500">slots left</p>
                      </div>
                    </div>

                    <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500"
                        style={{ width: `${installer.todayCapacity}%` }}
                      />
                    </div>

                    {selectedInstaller === installer.id && (
                      <div className="mt-4 pt-4 border-t border-neutral-700/50">
                        <p className="text-xs text-neutral-400 mb-2">Available Times:</p>
                        <div className="grid grid-cols-3 gap-2">
                          {installer.availability.map((slot) => (
                            <button
                              key={slot.time}
                              disabled={slot.booked >= slot.slots}
                              className={`py-1.5 text-xs rounded ${
                                slot.booked >= slot.slots
                                  ? 'bg-neutral-800 text-neutral-600 cursor-not-allowed'
                                  : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                              }`}
                            >
                              {slot.time}
                            </button>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-3">
                          {installer.specialties.map((spec) => (
                            <span key={spec} className="text-xs px-2 py-0.5 bg-neutral-800 text-neutral-400 rounded">
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    completed: 'bg-green-500/20 text-green-400',
    in_progress: 'bg-green-400/20 text-green-300',
    upcoming: 'bg-neutral-500/20 text-neutral-400',
  }

  const labels: Record<string, string> = {
    completed: 'Completed',
    in_progress: 'In Progress',
    upcoming: 'Upcoming',
  }

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium mt-1 ${styles[status]}`}>
      {labels[status]}
    </span>
  )
}

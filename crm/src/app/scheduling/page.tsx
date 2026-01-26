'use client'

import { Header } from '@/components/layout'
import { useState } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  User,
  Car,
  Phone,
  CheckCircle,
  XCircle,
  AlertCircle,
  Filter,
  List,
  Grid3X3,
} from 'lucide-react'
import { cn, formatDate, formatCurrency } from '@/lib/utils'

type AppointmentStatus = 'SCHEDULED' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW'

interface Appointment {
  id: string
  orderId: string
  orderNumber: string
  customerName: string
  customerPhone: string
  installerName: string
  installerLocation: string
  vehicleInfo: string
  tireInfo: string
  scheduledDate: Date
  scheduledTime: string
  duration: number
  status: AppointmentStatus
  notes?: string
}

// Mock data
const mockAppointments: Appointment[] = [
  {
    id: '1',
    orderId: 'ord-1',
    orderNumber: 'TD-A1B2C3',
    customerName: 'John Smith',
    customerPhone: '(555) 123-4567',
    installerName: 'Quick Tire Pro',
    installerLocation: 'New York, NY',
    vehicleInfo: '2022 Toyota Camry',
    tireInfo: '4x Michelin Defender T+H 225/65R17',
    scheduledDate: new Date(),
    scheduledTime: '10:00 AM',
    duration: 60,
    status: 'CONFIRMED',
    notes: 'Customer prefers to wait',
  },
  {
    id: '2',
    orderId: 'ord-2',
    orderNumber: 'TD-D4E5F6',
    customerName: 'Sarah Johnson',
    customerPhone: '(555) 234-5678',
    installerName: 'AutoCare Plus',
    installerLocation: 'Los Angeles, CA',
    vehicleInfo: '2021 Honda CR-V',
    tireInfo: '4x Goodyear Assurance 215/55R17',
    scheduledDate: new Date(),
    scheduledTime: '2:00 PM',
    duration: 90,
    status: 'SCHEDULED',
  },
  {
    id: '3',
    orderId: 'ord-3',
    orderNumber: 'TD-G7H8I9',
    customerName: 'Mike Wilson',
    customerPhone: '(555) 345-6789',
    installerName: 'Tire Express',
    installerLocation: 'Chicago, IL',
    vehicleInfo: '2020 Ford F-150',
    tireInfo: '4x Bridgestone Turanza 275/55R20',
    scheduledDate: new Date(Date.now() + 86400000),
    scheduledTime: '9:00 AM',
    duration: 60,
    status: 'SCHEDULED',
  },
  {
    id: '4',
    orderId: 'ord-4',
    orderNumber: 'TD-J1K2L3',
    customerName: 'Emily Brown',
    customerPhone: '(555) 456-7890',
    installerName: 'Quick Tire Pro',
    installerLocation: 'New York, NY',
    vehicleInfo: '2023 BMW X5',
    tireInfo: '4x Continental TrueContact 255/50R19',
    scheduledDate: new Date(Date.now() + 86400000),
    scheduledTime: '11:30 AM',
    duration: 75,
    status: 'CONFIRMED',
  },
  {
    id: '5',
    orderId: 'ord-5',
    orderNumber: 'TD-M4N5O6',
    customerName: 'David Lee',
    customerPhone: '(555) 567-8901',
    installerName: 'AutoCare Plus',
    installerLocation: 'Los Angeles, CA',
    vehicleInfo: '2019 Tesla Model 3',
    tireInfo: '4x Pirelli P4 Four Seasons 235/45R18',
    scheduledDate: new Date(Date.now() - 86400000),
    scheduledTime: '3:00 PM',
    duration: 60,
    status: 'COMPLETED',
  },
]

const stats = {
  todayCount: 8,
  thisWeek: 32,
  completed: 156,
  noShowRate: 3.2,
}

const statusConfig: Record<AppointmentStatus, { label: string; color: string; bgColor: string }> = {
  SCHEDULED: { label: 'Scheduled', color: 'text-blue-700', bgColor: 'bg-blue-100' },
  CONFIRMED: { label: 'Confirmed', color: 'text-green-700', bgColor: 'bg-green-100' },
  IN_PROGRESS: { label: 'In Progress', color: 'text-amber-700', bgColor: 'bg-amber-100' },
  COMPLETED: { label: 'Completed', color: 'text-gray-700', bgColor: 'bg-gray-100' },
  CANCELLED: { label: 'Cancelled', color: 'text-red-700', bgColor: 'bg-red-100' },
  NO_SHOW: { label: 'No Show', color: 'text-red-700', bgColor: 'bg-red-100' },
}

export default function SchedulingPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar')
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                      'July', 'August', 'September', 'October', 'November', 'December']

  const goToPrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  const getAppointmentsForDay = (day: number) => {
    return mockAppointments.filter(apt => {
      const aptDate = new Date(apt.scheduledDate)
      return aptDate.getDate() === day &&
             aptDate.getMonth() === currentDate.getMonth() &&
             aptDate.getFullYear() === currentDate.getFullYear()
    })
  }

  const isToday = (day: number) => {
    const today = new Date()
    return day === today.getDate() &&
           currentDate.getMonth() === today.getMonth() &&
           currentDate.getFullYear() === today.getFullYear()
  }

  return (
    <div className="min-h-screen">
      <Header
        title="Installation Scheduling"
        subtitle="Manage installer appointments and bookings"
        actions={
          <button className="btn btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            New Appointment
          </button>
        }
      />

      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Today's Appointments"
            value={stats.todayCount}
            icon={<CalendarIcon className="w-5 h-5" />}
            color="blue"
          />
          <StatCard
            title="This Week"
            value={stats.thisWeek}
            icon={<Clock className="w-5 h-5" />}
            color="green"
          />
          <StatCard
            title="Completed (30d)"
            value={stats.completed}
            icon={<CheckCircle className="w-5 h-5" />}
            color="purple"
          />
          <StatCard
            title="No-Show Rate"
            value={`${stats.noShowRate}%`}
            icon={<AlertCircle className="w-5 h-5" />}
            color="amber"
          />
        </div>

        {/* Calendar Controls */}
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={goToPrevMonth}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <h2 className="text-lg font-semibold text-gray-900 w-40 text-center">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <button
                  onClick={goToNextMonth}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              <button
                onClick={goToToday}
                className="btn btn-secondary text-sm"
              >
                Today
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button className="btn btn-secondary">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button>
              <div className="flex items-center border rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('calendar')}
                  className={cn(
                    'p-2 transition-colors',
                    viewMode === 'calendar' ? 'bg-primary-500 text-white' : 'hover:bg-gray-100'
                  )}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={cn(
                    'p-2 transition-colors',
                    viewMode === 'list' ? 'bg-primary-500 text-white' : 'hover:bg-gray-100'
                  )}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar / List View */}
          <div className="lg:col-span-2">
            {viewMode === 'calendar' ? (
              <div className="card">
                {/* Calendar Header */}
                <div className="grid grid-cols-7 border-b">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="p-3 text-center text-sm font-medium text-gray-500">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7">
                  {/* Empty cells for days before month start */}
                  {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                    <div key={`empty-${i}`} className="min-h-24 p-2 border-b border-r bg-gray-50" />
                  ))}

                  {/* Days of the month */}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1
                    const appointments = getAppointmentsForDay(day)
                    const today = isToday(day)

                    return (
                      <div
                        key={day}
                        className={cn(
                          'min-h-24 p-2 border-b border-r hover:bg-gray-50 cursor-pointer',
                          today && 'bg-primary-50'
                        )}
                      >
                        <div className={cn(
                          'text-sm font-medium mb-1',
                          today ? 'text-primary-600' : 'text-gray-900'
                        )}>
                          {day}
                        </div>
                        <div className="space-y-1">
                          {appointments.slice(0, 3).map((apt) => (
                            <button
                              key={apt.id}
                              onClick={() => setSelectedAppointment(apt)}
                              className={cn(
                                'w-full text-left text-xs p-1 rounded truncate',
                                statusConfig[apt.status].bgColor,
                                statusConfig[apt.status].color
                              )}
                            >
                              {apt.scheduledTime} - {apt.customerName}
                            </button>
                          ))}
                          {appointments.length > 3 && (
                            <div className="text-xs text-gray-500 pl-1">
                              +{appointments.length - 3} more
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ) : (
              <div className="card">
                <div className="card-header">
                  <h3 className="font-semibold text-gray-900">Upcoming Appointments</h3>
                </div>
                <div className="divide-y">
                  {mockAppointments
                    .filter(apt => apt.status !== 'COMPLETED' && apt.status !== 'CANCELLED')
                    .sort((a, b) => a.scheduledDate.getTime() - b.scheduledDate.getTime())
                    .map((apt) => (
                      <div
                        key={apt.id}
                        onClick={() => setSelectedAppointment(apt)}
                        className="p-4 hover:bg-gray-50 cursor-pointer"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-gray-900">
                                {apt.scheduledDate.getDate()}
                              </div>
                              <div className="text-xs text-gray-500">
                                {monthNames[apt.scheduledDate.getMonth()].slice(0, 3)}
                              </div>
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-gray-900">{apt.customerName}</span>
                                <span className={cn(
                                  'text-xs px-2 py-0.5 rounded-full',
                                  statusConfig[apt.status].bgColor,
                                  statusConfig[apt.status].color
                                )}>
                                  {statusConfig[apt.status].label}
                                </span>
                              </div>
                              <div className="text-sm text-gray-500 mt-1">
                                {apt.scheduledTime} • {apt.duration} min • {apt.installerName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {apt.vehicleInfo}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* Appointment Details Sidebar */}
          <div className="space-y-6">
            {selectedAppointment ? (
              <AppointmentDetails
                appointment={selectedAppointment}
                onClose={() => setSelectedAppointment(null)}
              />
            ) : (
              <div className="card p-6 text-center">
                <CalendarIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">Select an appointment to view details</p>
              </div>
            )}

            {/* Today's Schedule */}
            <div className="card">
              <div className="card-header">
                <h3 className="font-semibold text-gray-900">Today&apos;s Schedule</h3>
              </div>
              <div className="card-body space-y-3">
                {mockAppointments
                  .filter(apt => {
                    const today = new Date()
                    const aptDate = new Date(apt.scheduledDate)
                    return aptDate.toDateString() === today.toDateString()
                  })
                  .map((apt) => (
                    <button
                      key={apt.id}
                      onClick={() => setSelectedAppointment(apt)}
                      className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">{apt.scheduledTime}</span>
                        <span className={cn(
                          'text-xs px-2 py-0.5 rounded-full',
                          statusConfig[apt.status].bgColor,
                          statusConfig[apt.status].color
                        )}>
                          {statusConfig[apt.status].label}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">{apt.customerName}</div>
                      <div className="text-xs text-gray-500">{apt.installerName}</div>
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string
  value: string | number
  icon: React.ReactNode
  color: 'blue' | 'green' | 'purple' | 'amber'
}) {
  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    amber: 'bg-amber-50 text-amber-600',
  }

  return (
    <div className="card p-4">
      <div className="flex items-center gap-4">
        <div className={cn('p-3 rounded-xl', colors[color])}>
          {icon}
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className="text-sm text-gray-500">{title}</p>
        </div>
      </div>
    </div>
  )
}

function AppointmentDetails({
  appointment,
  onClose,
}: {
  appointment: Appointment
  onClose: () => void
}) {
  return (
    <div className="card">
      <div className="card-header flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Appointment Details</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <XCircle className="w-5 h-5" />
        </button>
      </div>
      <div className="card-body space-y-4">
        <div className="flex items-center justify-between">
          <span className={cn(
            'px-3 py-1 rounded-full text-sm font-medium',
            statusConfig[appointment.status].bgColor,
            statusConfig[appointment.status].color
          )}>
            {statusConfig[appointment.status].label}
          </span>
          <span className="text-sm text-gray-500">#{appointment.orderNumber}</span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <CalendarIcon className="w-4 h-4 text-gray-400" />
            <span className="text-sm">
              {formatDate(appointment.scheduledDate)} at {appointment.scheduledTime}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-sm">{appointment.duration} minutes</span>
          </div>
          <div className="flex items-center gap-3">
            <User className="w-4 h-4 text-gray-400" />
            <span className="text-sm">{appointment.customerName}</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-gray-400" />
            <span className="text-sm">{appointment.customerPhone}</span>
          </div>
          <div className="flex items-center gap-3">
            <Car className="w-4 h-4 text-gray-400" />
            <span className="text-sm">{appointment.vehicleInfo}</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 text-gray-400" />
            <div className="text-sm">
              <div className="font-medium">{appointment.installerName}</div>
              <div className="text-gray-500">{appointment.installerLocation}</div>
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Tires to Install</h4>
          <p className="text-sm text-gray-600">{appointment.tireInfo}</p>
        </div>

        {appointment.notes && (
          <div className="border-t pt-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Notes</h4>
            <p className="text-sm text-gray-600">{appointment.notes}</p>
          </div>
        )}

        <div className="border-t pt-4 flex gap-2">
          <button className="btn btn-primary flex-1">
            <CheckCircle className="w-4 h-4 mr-2" />
            Confirm
          </button>
          <button className="btn btn-secondary flex-1">
            Reschedule
          </button>
        </div>
      </div>
    </div>
  )
}

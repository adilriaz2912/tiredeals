'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, X, User, ShoppingCart, Package, Wrench, Ticket, FileText, Clock } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface SearchResult {
  id: string
  type: 'customer' | 'order' | 'tire' | 'installer' | 'ticket'
  title: string
  subtitle: string
  url: string
}

// Mock search data - in production this would be an API call
const mockSearch = (query: string): SearchResult[] => {
  if (!query) return []

  const allResults: SearchResult[] = [
    // Customers
    { id: '1', type: 'customer', title: 'John Smith', subtitle: 'john.smith@email.com', url: '/customers/cust-1' },
    { id: '2', type: 'customer', title: 'Sarah Johnson', subtitle: 'sarah.j@email.com', url: '/customers/cust-2' },
    { id: '3', type: 'customer', title: 'Mike Wilson', subtitle: 'mike.wilson@email.com', url: '/customers/cust-3' },
    { id: '4', type: 'customer', title: 'Emily Brown', subtitle: 'emily.b@email.com', url: '/customers/cust-4' },
    // Orders
    { id: '5', type: 'order', title: 'Order #TD-A1B2C3', subtitle: 'John Smith - $892.00', url: '/orders/TD-A1B2C3' },
    { id: '6', type: 'order', title: 'Order #TD-D4E5F6', subtitle: 'Sarah Johnson - $1,245.00', url: '/orders/TD-D4E5F6' },
    { id: '7', type: 'order', title: 'Order #TD-G7H8I9', subtitle: 'Mike Wilson - $456.00', url: '/orders/TD-G7H8I9' },
    // Tires
    { id: '8', type: 'tire', title: 'Michelin Defender T+H', subtitle: '225/65R17 - $149.99', url: '/inventory/tire-1' },
    { id: '9', type: 'tire', title: 'Goodyear Assurance', subtitle: '215/55R17 - $119.99', url: '/inventory/tire-2' },
    { id: '10', type: 'tire', title: 'Bridgestone Turanza', subtitle: '225/60R16 - $159.99', url: '/inventory/tire-3' },
    // Installers
    { id: '11', type: 'installer', title: 'Quick Tire Pro', subtitle: 'New York, NY - Partner', url: '/installers/inst-1' },
    { id: '12', type: 'installer', title: 'AutoCare Plus', subtitle: 'Los Angeles, CA - Partner', url: '/installers/inst-2' },
    // Tickets
    { id: '13', type: 'ticket', title: 'TKT-001: Wrong tire size', subtitle: 'John Doe - High Priority', url: '/support/TKT-001' },
    { id: '14', type: 'ticket', title: 'TKT-002: Installation inquiry', subtitle: 'Jane Smith - Medium Priority', url: '/support/TKT-002' },
  ]

  const q = query.toLowerCase()
  return allResults.filter(r =>
    r.title.toLowerCase().includes(q) ||
    r.subtitle.toLowerCase().includes(q)
  ).slice(0, 8)
}

const typeIcons: Record<string, React.ReactNode> = {
  customer: <User className="w-4 h-4" />,
  order: <ShoppingCart className="w-4 h-4" />,
  tire: <Package className="w-4 h-4" />,
  installer: <Wrench className="w-4 h-4" />,
  ticket: <Ticket className="w-4 h-4" />,
}

const typeColors: Record<string, string> = {
  customer: 'bg-blue-100 text-blue-600',
  order: 'bg-green-100 text-green-600',
  tire: 'bg-purple-100 text-purple-600',
  installer: 'bg-amber-100 text-amber-600',
  ticket: 'bg-red-100 text-red-600',
}

const typeLabels: Record<string, string> = {
  customer: 'Customer',
  order: 'Order',
  tire: 'Tire',
  installer: 'Installer',
  ticket: 'Ticket',
}

export function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Keyboard shortcut to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(true)
      }
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Search on query change
  useEffect(() => {
    const searchResults = mockSearch(query)
    setResults(searchResults)
    setSelectedIndex(0)
  }, [query])

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => Math.max(prev - 1, 0))
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      handleSelect(results[selectedIndex])
    }
  }

  const handleSelect = (result: SearchResult) => {
    // Add to recent searches
    setRecentSearches(prev => {
      const filtered = prev.filter(s => s !== query)
      return [query, ...filtered].slice(0, 5)
    })
    setIsOpen(false)
    setQuery('')
    // Navigation handled by Link
  }

  // Click outside to close
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClick)
    }
    return () => document.removeEventListener('mousedown', handleClick)
  }, [isOpen])

  return (
    <>
      {/* Search Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm text-gray-600"
      >
        <Search className="w-4 h-4" />
        <span className="hidden sm:inline">Search...</span>
        <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 bg-white rounded text-xs font-medium text-gray-500 border">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {/* Search Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />

          {/* Search Container */}
          <div
            ref={containerRef}
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 p-4 border-b">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search customers, orders, tires, installers..."
                className="flex-1 text-lg outline-none placeholder-gray-400"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              )}
              <kbd className="px-2 py-1 bg-gray-100 rounded text-xs font-medium text-gray-500">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-96 overflow-y-auto">
              {query ? (
                results.length > 0 ? (
                  <div className="p-2">
                    {results.map((result, index) => (
                      <Link
                        key={result.id}
                        href={result.url}
                        onClick={() => handleSelect(result)}
                        className={cn(
                          'flex items-center gap-3 p-3 rounded-xl transition-colors',
                          index === selectedIndex ? 'bg-gray-100' : 'hover:bg-gray-50'
                        )}
                      >
                        <div className={cn('p-2 rounded-lg', typeColors[result.type])}>
                          {typeIcons[result.type]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">{result.title}</p>
                          <p className="text-sm text-gray-500 truncate">{result.subtitle}</p>
                        </div>
                        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                          {typeLabels[result.type]}
                        </span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No results found for &quot;{query}&quot;</p>
                    <p className="text-sm text-gray-400 mt-1">Try searching for customers, orders, or tires</p>
                  </div>
                )
              ) : (
                <div className="p-4">
                  {/* Recent Searches */}
                  {recentSearches.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 px-2">
                        Recent Searches
                      </p>
                      <div className="space-y-1">
                        {recentSearches.map((search, index) => (
                          <button
                            key={index}
                            onClick={() => setQuery(search)}
                            className="flex items-center gap-2 w-full p-2 hover:bg-gray-50 rounded-lg text-left"
                          >
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{search}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quick Links */}
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 px-2">
                      Quick Links
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <QuickLink href="/customers" icon={<User className="w-4 h-4" />} label="All Customers" />
                      <QuickLink href="/orders" icon={<ShoppingCart className="w-4 h-4" />} label="All Orders" />
                      <QuickLink href="/inventory" icon={<Package className="w-4 h-4" />} label="Inventory" />
                      <QuickLink href="/support" icon={<Ticket className="w-4 h-4" />} label="Support Tickets" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center gap-4 p-3 bg-gray-50 border-t text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white rounded border">↑</kbd>
                <kbd className="px-1.5 py-0.5 bg-white rounded border">↓</kbd>
                to navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white rounded border">↵</kbd>
                to select
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white rounded border">esc</kbd>
                to close
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function QuickLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
    >
      <span className="text-gray-400">{icon}</span>
      <span className="text-sm text-gray-600">{label}</span>
    </Link>
  )
}

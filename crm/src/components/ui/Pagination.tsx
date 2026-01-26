'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from './Button'
import { cn } from '@/lib/utils'

interface PaginationProps {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  onPageChange: (page: number) => void
  showingFrom: number
  showingTo: number
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  onPageChange,
  showingFrom,
  showingTo,
}: PaginationProps) {
  const pages = generatePagination(currentPage, totalPages)

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-slate-800/50">
      <p className="text-sm text-slate-400">
        Showing <span className="font-medium text-slate-200">{showingFrom}</span> to{' '}
        <span className="font-medium text-slate-200">{showingTo}</span> of{' '}
        <span className="font-medium text-slate-200">{totalItems}</span> results
      </p>
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        {pages.map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${index}`} className="px-2 text-slate-500">
                ...
              </span>
            )
          }
          return (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              className={cn(
                'w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200',
                currentPage === page
                  ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/25'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              )}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </button>
          )
        })}

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}

function generatePagination(currentPage: number, totalPages: number): (number | string)[] {
  // If 7 pages or less, show all
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  // Show first, last, current, and neighbors
  const pages: (number | string)[] = []

  if (currentPage <= 3) {
    pages.push(1, 2, 3, 4, '...', totalPages)
  } else if (currentPage >= totalPages - 2) {
    pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
  } else {
    pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages)
  }

  return pages
}

// Hook to manage pagination state
export function usePagination<T>(items: T[], itemsPerPage: number = 10) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalItems = items.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const showingFrom = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1
  const showingTo = Math.min(currentPage * itemsPerPage, totalItems)

  const paginatedItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  // Reset to page 1 when items change
  useEffect(() => {
    setCurrentPage(1)
  }, [items.length])

  return {
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    showingFrom,
    showingTo,
    paginatedItems,
    goToPage,
  }
}

'use client'

import { Sidebar } from './Sidebar'
import { Toaster } from 'react-hot-toast'

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <Sidebar />
        <main className="ml-64">
          {children}
        </main>
      </div>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1f2937',
            color: '#fff',
            borderRadius: '12px',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </>
  )
}

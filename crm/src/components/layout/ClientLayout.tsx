'use client'

import { Sidebar } from './Sidebar'
import { Toaster } from 'react-hot-toast'

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="min-h-screen bg-black">
        <Sidebar />
        <main className="lg:ml-64 pt-16 lg:pt-0">
          {children}
        </main>
      </div>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#171717',
            color: '#fff',
            borderRadius: '12px',
            border: '1px solid #262626',
          },
          success: {
            iconTheme: {
              primary: '#22c55e',
              secondary: '#000',
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

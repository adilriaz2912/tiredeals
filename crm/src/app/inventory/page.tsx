'use client'

import { useState } from 'react'
import { Header } from '@/components/layout'
import Link from 'next/link'
import {
  Search,
  Filter,
  Plus,
  Package,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Edit,
  BarChart2,
  Download,
  Upload,
} from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

// Mock inventory data
const inventory = [
  {
    id: '1',
    sku: 'MICH-DEF-TH-215-55-17',
    name: 'Michelin Defender T+H',
    brand: 'Michelin',
    category: 'All-Season',
    tireSize: '215/55R17',
    cost: 89.99,
    price: 149.99,
    quantity: 45,
    reorderPoint: 20,
    reorderQty: 50,
    location: 'A-12-3',
    lastSold: new Date(Date.now() - 86400000),
    soldThisMonth: 28,
  },
  {
    id: '2',
    sku: 'GOOD-ASS-225-65-17',
    name: 'Goodyear Assurance',
    brand: 'Goodyear',
    category: 'All-Season',
    tireSize: '225/65R17',
    cost: 79.99,
    price: 129.99,
    quantity: 12,
    reorderPoint: 15,
    reorderQty: 40,
    location: 'A-14-2',
    lastSold: new Date(Date.now() - 172800000),
    soldThisMonth: 35,
  },
  {
    id: '3',
    sku: 'BRID-TUR-235-45-18',
    name: 'Bridgestone Turanza',
    brand: 'Bridgestone',
    category: 'Performance',
    tireSize: '235/45R18',
    cost: 109.99,
    price: 189.99,
    quantity: 8,
    reorderPoint: 10,
    reorderQty: 30,
    location: 'B-02-1',
    lastSold: new Date(Date.now() - 43200000),
    soldThisMonth: 22,
  },
  {
    id: '4',
    sku: 'CONT-TRUE-205-55-16',
    name: 'Continental TrueContact',
    brand: 'Continental',
    category: 'All-Season',
    tireSize: '205/55R16',
    cost: 74.99,
    price: 119.99,
    quantity: 62,
    reorderPoint: 25,
    reorderQty: 60,
    location: 'A-08-4',
    lastSold: new Date(Date.now() - 259200000),
    soldThisMonth: 18,
  },
  {
    id: '5',
    sku: 'PIRE-P4FS-215-60-16',
    name: 'Pirelli P4 Four Seasons',
    brand: 'Pirelli',
    category: 'All-Season',
    tireSize: '215/60R16',
    cost: 84.99,
    price: 139.99,
    quantity: 0,
    reorderPoint: 15,
    reorderQty: 40,
    location: 'B-06-2',
    lastSold: new Date(Date.now() - 604800000),
    soldThisMonth: 12,
  },
  {
    id: '6',
    sku: 'MICH-PILS4-245-40-18',
    name: 'Michelin Pilot Sport 4S',
    brand: 'Michelin',
    category: 'Performance',
    tireSize: '245/40R18',
    cost: 179.99,
    price: 299.99,
    quantity: 4,
    reorderPoint: 8,
    reorderQty: 20,
    location: 'C-01-1',
    lastSold: new Date(Date.now() - 129600000),
    soldThisMonth: 6,
  },
]

export default function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [stockFilter, setStockFilter] = useState('')
  const [showAdjustModal, setShowAdjustModal] = useState<string | null>(null)

  const filteredInventory = inventory.filter(item => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tireSize.includes(searchQuery)

    const matchesBrand = !selectedBrand || item.brand === selectedBrand
    const matchesCategory = !selectedCategory || item.category === selectedCategory

    let matchesStock = true
    if (stockFilter === 'low') {
      matchesStock = item.quantity > 0 && item.quantity <= item.reorderPoint
    } else if (stockFilter === 'out') {
      matchesStock = item.quantity === 0
    } else if (stockFilter === 'healthy') {
      matchesStock = item.quantity > item.reorderPoint
    }

    return matchesSearch && matchesBrand && matchesCategory && matchesStock
  })

  // Stats
  const stats = {
    totalProducts: inventory.length,
    totalValue: inventory.reduce((sum, i) => sum + (i.quantity * i.cost), 0),
    lowStock: inventory.filter(i => i.quantity > 0 && i.quantity <= i.reorderPoint).length,
    outOfStock: inventory.filter(i => i.quantity === 0).length,
  }

  const brands = [...new Set(inventory.map(i => i.brand))]
  const categories = [...new Set(inventory.map(i => i.category))]

  return (
    <div className="min-h-screen">
      <Header
        title="Inventory Management"
        subtitle="Track and manage tire inventory"
      />

      <div className="p-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Package className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.totalProducts}</p>
                <p className="text-sm text-gray-500">Total SKUs</p>
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{formatCurrency(stats.totalValue)}</p>
                <p className="text-sm text-gray-500">Inventory Value</p>
              </div>
            </div>
          </div>
          <div className="card p-4 border-l-4 border-l-warning-500">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-warning-50 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-warning-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-warning-600">{stats.lowStock}</p>
                <p className="text-sm text-gray-500">Low Stock</p>
              </div>
            </div>
          </div>
          <div className="card p-4 border-l-4 border-l-danger-500">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-danger-50 rounded-lg">
                <Package className="w-5 h-5 text-danger-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-danger-600">{stats.outOfStock}</p>
                <p className="text-sm text-gray-500">Out of Stock</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by SKU, name, or tire size..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-10"
            />
          </div>

          <div className="flex gap-3 flex-wrap">
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="select w-36"
            >
              <option value="">All Brands</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="select w-36"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              className="select w-36"
            >
              <option value="">All Stock</option>
              <option value="healthy">In Stock</option>
              <option value="low">Low Stock</option>
              <option value="out">Out of Stock</option>
            </select>
            <button className="btn-outline btn-md">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="btn-outline btn-md">
              <Upload className="w-4 h-4" />
              Import
            </button>
            <Link href="/inventory/new" className="btn-primary btn-md">
              <Plus className="w-4 h-4" />
              Add Product
            </Link>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Size</th>
                  <th>Cost</th>
                  <th>Price</th>
                  <th>Margin</th>
                  <th>Stock</th>
                  <th>Location</th>
                  <th>Sold/Month</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.map((item) => {
                  const margin = ((item.price - item.cost) / item.price * 100).toFixed(1)
                  const stockStatus = item.quantity === 0 ? 'out' : item.quantity <= item.reorderPoint ? 'low' : 'healthy'

                  return (
                    <tr key={item.id}>
                      <td>
                        <div>
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-xs text-gray-500">{item.sku}</p>
                          <div className="flex gap-1 mt-1">
                            <span className="badge badge-gray text-xs">{item.brand}</span>
                            <span className="badge badge-gray text-xs">{item.category}</span>
                          </div>
                        </div>
                      </td>
                      <td className="font-medium">{item.tireSize}</td>
                      <td className="text-gray-600">{formatCurrency(item.cost)}</td>
                      <td className="font-medium">{formatCurrency(item.price)}</td>
                      <td>
                        <span className={`font-medium ${parseFloat(margin) >= 30 ? 'text-success-600' : parseFloat(margin) >= 20 ? 'text-warning-600' : 'text-danger-600'}`}>
                          {margin}%
                        </span>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <span className={`font-bold ${
                            stockStatus === 'out' ? 'text-danger-600' :
                            stockStatus === 'low' ? 'text-warning-600' : 'text-gray-900'
                          }`}>
                            {item.quantity}
                          </span>
                          {stockStatus === 'out' && (
                            <span className="badge badge-danger">Out</span>
                          )}
                          {stockStatus === 'low' && (
                            <span className="badge badge-warning">Low</span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">Reorder at {item.reorderPoint}</p>
                      </td>
                      <td className="text-gray-600">{item.location}</td>
                      <td>
                        <div className="flex items-center gap-1">
                          <BarChart2 className="w-4 h-4 text-gray-400" />
                          <span className="font-medium">{item.soldThisMonth}</span>
                        </div>
                      </td>
                      <td>
                        <div className="flex gap-1">
                          <button
                            onClick={() => setShowAdjustModal(item.id)}
                            className="btn-outline btn-sm"
                          >
                            Adjust
                          </button>
                          <Link href={`/inventory/${item.id}`} className="btn-ghost btn-sm">
                            <Edit className="w-4 h-4" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Adjust Stock Modal */}
        {showAdjustModal && (
          <AdjustStockModal
            item={inventory.find(i => i.id === showAdjustModal)!}
            onClose={() => setShowAdjustModal(null)}
          />
        )}
      </div>
    </div>
  )
}

function AdjustStockModal({ item, onClose }: { item: typeof inventory[0]; onClose: () => void }) {
  const [adjustmentType, setAdjustmentType] = useState<'add' | 'remove' | 'set'>('add')
  const [quantity, setQuantity] = useState('')
  const [reason, setReason] = useState('')

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="text-lg font-semibold">Adjust Stock</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">×</button>
        </div>
        <div className="modal-body space-y-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="font-medium text-gray-900">{item.name}</p>
            <p className="text-sm text-gray-500">{item.sku}</p>
            <p className="text-sm mt-2">
              Current Stock: <span className="font-bold">{item.quantity}</span>
            </p>
          </div>

          <div>
            <label className="label">Adjustment Type</label>
            <div className="flex gap-2">
              <button
                onClick={() => setAdjustmentType('add')}
                className={`flex-1 py-2 px-3 rounded-lg border-2 text-sm font-medium transition-colors ${
                  adjustmentType === 'add'
                    ? 'border-success-500 bg-success-50 text-success-700'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                + Add Stock
              </button>
              <button
                onClick={() => setAdjustmentType('remove')}
                className={`flex-1 py-2 px-3 rounded-lg border-2 text-sm font-medium transition-colors ${
                  adjustmentType === 'remove'
                    ? 'border-danger-500 bg-danger-50 text-danger-700'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                - Remove Stock
              </button>
              <button
                onClick={() => setAdjustmentType('set')}
                className={`flex-1 py-2 px-3 rounded-lg border-2 text-sm font-medium transition-colors ${
                  adjustmentType === 'set'
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                = Set Count
              </button>
            </div>
          </div>

          <div>
            <label className="label">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="0"
              className="input"
              placeholder={adjustmentType === 'set' ? 'New stock count' : 'Quantity to adjust'}
            />
          </div>

          <div>
            <label className="label">Reason</label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="select"
            >
              <option value="">Select reason...</option>
              <option value="PURCHASE">Purchase/Restock</option>
              <option value="RETURN">Customer Return</option>
              <option value="DAMAGED">Damaged</option>
              <option value="COUNT">Physical Count Adjustment</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          {quantity && (
            <div className="bg-primary-50 p-3 rounded-lg text-sm">
              <p className="text-primary-700">
                New stock will be:{' '}
                <span className="font-bold">
                  {adjustmentType === 'set'
                    ? quantity
                    : adjustmentType === 'add'
                    ? item.quantity + parseInt(quantity || '0')
                    : Math.max(0, item.quantity - parseInt(quantity || '0'))}
                </span>
              </p>
            </div>
          )}
        </div>
        <div className="modal-footer">
          <button onClick={onClose} className="btn-outline btn-md">Cancel</button>
          <button
            disabled={!quantity || !reason}
            className="btn-primary btn-md"
          >
            Save Adjustment
          </button>
        </div>
      </div>
    </div>
  )
}

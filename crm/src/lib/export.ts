/**
 * Export utilities for CSV and Excel downloads
 */

export function exportToCSV<T extends Record<string, unknown>>(
  data: T[],
  filename: string,
  columns?: { key: keyof T; label: string }[]
) {
  if (data.length === 0) {
    console.warn('No data to export')
    return
  }

  // Determine columns from data if not provided
  const cols = columns || Object.keys(data[0]).map((key) => ({
    key: key as keyof T,
    label: key,
  }))

  // Build CSV content
  const header = cols.map((col) => escapeCSVValue(col.label)).join(',')
  const rows = data.map((row) =>
    cols
      .map((col) => {
        const value = row[col.key]
        return escapeCSVValue(formatValue(value))
      })
      .join(',')
  )

  const csvContent = [header, ...rows].join('\n')

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  downloadBlob(blob, `${filename}.csv`)
}

export function exportToExcel<T extends Record<string, unknown>>(
  data: T[],
  filename: string,
  columns?: { key: keyof T; label: string }[]
) {
  if (data.length === 0) {
    console.warn('No data to export')
    return
  }

  // Determine columns from data if not provided
  const cols = columns || Object.keys(data[0]).map((key) => ({
    key: key as keyof T,
    label: key,
  }))

  // Build HTML table for Excel
  const header = cols.map((col) => `<th>${escapeHTML(col.label)}</th>`).join('')
  const rows = data
    .map((row) =>
      `<tr>${cols
        .map((col) => {
          const value = row[col.key]
          return `<td>${escapeHTML(formatValue(value))}</td>`
        })
        .join('')}</tr>`
    )
    .join('')

  const htmlContent = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office"
          xmlns:x="urn:schemas-microsoft-com:office:excel">
      <head>
        <meta charset="UTF-8">
        <!--[if gte mso 9]>
        <xml>
          <x:ExcelWorkbook>
            <x:ExcelWorksheets>
              <x:ExcelWorksheet>
                <x:Name>Sheet1</x:Name>
                <x:WorksheetOptions>
                  <x:DisplayGridlines/>
                </x:WorksheetOptions>
              </x:ExcelWorksheet>
            </x:ExcelWorksheets>
          </x:ExcelWorkbook>
        </xml>
        <![endif]-->
        <style>
          table { border-collapse: collapse; }
          th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
          th { background-color: #f3f4f6; font-weight: bold; }
        </style>
      </head>
      <body>
        <table>
          <thead><tr>${header}</tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </body>
    </html>
  `

  const blob = new Blob([htmlContent], {
    type: 'application/vnd.ms-excel;charset=utf-8;',
  })
  downloadBlob(blob, `${filename}.xls`)
}

function escapeCSVValue(value: string): string {
  // If value contains comma, newline, or quote, wrap in quotes and escape quotes
  if (value.includes(',') || value.includes('\n') || value.includes('"')) {
    return `"${value.replace(/"/g, '""')}"`
  }
  return value
}

function escapeHTML(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function formatValue(value: unknown): string {
  if (value === null || value === undefined) {
    return ''
  }
  if (value instanceof Date) {
    return value.toISOString().split('T')[0]
  }
  if (typeof value === 'object') {
    return JSON.stringify(value)
  }
  return String(value)
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

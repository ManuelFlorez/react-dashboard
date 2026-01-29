function Pagination({ currentPage, totalPages, onPageChange }) {
  const getPageNumbers = () => {
    const delta = 2
    const range = []
    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i += 1) {
      range.push(i)
    }

    if (currentPage - delta > 2) range.unshift('...')
    if (currentPage + delta < totalPages - 1) range.push('...')

    range.unshift(1)
    if (totalPages > 1) range.push(totalPages)

    return range
  }

  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
      <div className="text-sm text-gray-600">
        Página <span className="font-semibold">{currentPage}</span> de{' '}
        <span className="font-semibold">{totalPages}</span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Anterior
        </button>

        <div className="flex gap-1">
          {getPageNumbers().map((page, idx) => (
            <button
              key={idx}
              onClick={() => page !== '...' && onPageChange(page)}
              disabled={page === '...'}
              className={`px-3 py-2 rounded-lg transition ${
                page === currentPage
                  ? 'bg-primary text-white'
                  : page === '...'
                    ? 'cursor-default text-gray-400'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Siguiente →
        </button>
      </div>
    </div>
  )
}

export default Pagination

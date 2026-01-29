import { useState } from 'react'

function BlockUserModal({ user, onConfirm, onClose }) {
  const [reason, setReason] = useState('')

  const blockReasons = [
    'Violación de términos de servicio',
    'Actividad sospechosa detectada',
    'Múltiples intentos fallidos de acceso',
    'Solicitud del usuario',
    'Cuenta comprometida',
    'Otro',
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (reason.trim()) {
      onConfirm(reason)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="border-b border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-800">Bloquear Usuario</h2>
          <p className="text-gray-600 mt-2">{user.email}</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Razón del bloqueo
            </label>
            <div className="space-y-2 mb-4">
              {blockReasons.map((r) => (
                <label key={r} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="reason"
                    value={r}
                    checked={reason === r}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-4 h-4 text-primary"
                  />
                  <span className="text-sm text-gray-700">{r}</span>
                </label>
              ))}
            </div>

            {reason === 'Otro' && (
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Describe la razón del bloqueo..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm"
                rows="4"
              />
            )}
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
            <p className="font-medium mb-1">⚠️ Advertencia</p>
            <p>
              Este usuario no podrá acceder al sistema una vez bloqueado. Esta acción se registrará
              en auditoría.
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!reason.trim()}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Bloquear Usuario
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default BlockUserModal

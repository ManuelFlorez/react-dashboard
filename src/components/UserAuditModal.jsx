import { format } from 'date-fns'
import { es } from 'date-fns/locale'

function UserAuditModal({ user, onClose }) {
  const auditLog = [
    {
      id: '1',
      action: 'Inicio de sesión',
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      ipAddress: '192.168.1.100',
      userAgent: 'Chrome/120 Windows 10',
      status: 'success',
    },
    {
      id: '2',
      action: 'Acceso a Dashboard',
      timestamp: new Date(Date.now() - 8 * 60 * 1000),
      ipAddress: '192.168.1.100',
      userAgent: 'Chrome/120 Windows 10',
      status: 'success',
    },
    {
      id: '3',
      action: 'Descarga de reporte',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      ipAddress: '192.168.1.100',
      userAgent: 'Chrome/120 Windows 10',
      status: 'success',
    },
    {
      id: '4',
      action: 'Cambio de contraseña',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      ipAddress: '192.168.1.105',
      userAgent: 'Safari/17 macOS',
      status: 'success',
    },
    {
      id: '5',
      action: 'Intento fallido de acceso',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      ipAddress: '203.0.113.45',
      userAgent: 'Firefox/121 Linux',
      status: 'failed',
    },
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Auditoría de Usuario</h2>
            <p className="text-gray-600 mt-1">{user.email}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Información del Usuario */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-6 border-b border-gray-200">
            <div>
              <p className="text-sm text-gray-600">Nombre</p>
              <p className="font-semibold text-gray-800">{user.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Rol</p>
              <p className="font-semibold text-gray-800">
                {user.role === 'admin' ? 'Administrador' : 'Usuario'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Estado</p>
              <p className="font-semibold text-gray-800">
                {user.status === 'active' ? '🟢 Activo' : '🔴 Bloqueado'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total de inicios</p>
              <p className="font-semibold text-gray-800">{user.loginCount}</p>
            </div>
          </div>

          {/* Registro de Auditoría */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Historial de Actividad</h3>
            <div className="space-y-3">
              {auditLog.map((log) => (
                <div
                  key={log.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`inline-block w-2 h-2 rounded-full ${log.status === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
                        ></span>
                        <span className="font-medium text-gray-800">{log.action}</span>
                        {log.status === 'failed' && (
                          <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                            Fallido
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>
                          <span className="font-medium">IP:</span> {log.ipAddress}
                        </p>
                        <p>
                          <span className="font-medium">Dispositivo:</span> {log.userAgent}
                        </p>
                        <p>
                          <span className="font-medium">Fecha:</span>{' '}
                          {format(new Date(log.timestamp), "dd 'de' MMMM 'de' yyyy 'a las' HH:mm", {
                            locale: es,
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserAuditModal

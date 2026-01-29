import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'

function UserTable({ users, onAudit, onBlock, onUnblock }) {
  const formatDate = (date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true, locale: es })
  }

  const getStatusBadge = (status) => {
    const styles = {
      active: 'bg-green-100 text-green-800',
      blocked: 'bg-red-100 text-red-800',
      inactive: 'bg-gray-100 text-gray-800',
    }
    return styles[status] || styles.inactive
  }

  const getRoleBadge = (role) => {
    const styles = {
      admin: 'bg-purple-100 text-purple-800',
      user: 'bg-blue-100 text-blue-800',
    }
    return styles[role] || styles.user
  }

  if (users.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No hay usuarios para mostrar</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Nombre</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Rol</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Último inicio sesión
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Inicios totales
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Estado</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-b border-gray-200 hover:bg-gray-50 transition"
            >
              <td className="px-6 py-4">
                <span className="text-sm text-gray-800 font-medium">{user.email}</span>
              </td>
              <td className="px-6 py-4">
                <span className="text-sm text-gray-600">{user.name}</span>
              </td>
              <td className="px-6 py-4">
                <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getRoleBadge(user.role)}`}>
                  {user.role === 'admin' ? 'Administrador' : 'Usuario'}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="text-sm text-gray-600">{formatDate(user.lastLogin)}</span>
              </td>
              <td className="px-6 py-4">
                <span className="text-sm text-gray-600">{user.loginCount}</span>
              </td>
              <td className="px-6 py-4">
                <span
                  className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getStatusBadge(user.status)}`}
                >
                  {user.status === 'active' ? 'Activo' : user.status === 'blocked' ? 'Bloqueado' : 'Inactivo'}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => onAudit(user)}
                    className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
                    title="Ver auditoría"
                  >
                    📋 Auditar
                  </button>
                  {user.status === 'active' ? (
                    <button
                      onClick={() => onBlock(user)}
                      className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
                      title="Bloquear usuario"
                    >
                      🚫 Bloquear
                    </button>
                  ) : (
                    <button
                      onClick={() => onUnblock(user.id)}
                      className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 transition"
                      title="Desbloquear usuario"
                    >
                      ✅ Desbloquear
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserTable

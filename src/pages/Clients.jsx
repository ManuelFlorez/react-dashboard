import { format, formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'
import { useState } from 'react'
import Card from '../components/Card'

function Clients() {
  const [allClients, setAllClients] = useState([
    {
      id: 1,
      name: 'Juan García',
      email: 'juan.garcia@email.com',
      type: 'user_app',
      status: 'active',
      joinDate: new Date(2025, 10, 15),
      lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000),
      totalPurchases: 12,
      totalSpent: 450.50,
    },
    {
      id: 2,
      name: 'María López',
      email: 'maria.lopez@email.com',
      type: 'user_voucher',
      status: 'active',
      joinDate: new Date(2025, 9, 20),
      lastActive: new Date(Date.now() - 24 * 60 * 60 * 1000),
      totalPurchases: 5,
      totalSpent: 120.00,
    },
    {
      id: 3,
      name: 'Carlos Mendoza',
      email: 'carlos.mendoza@email.com',
      type: 'user_app',
      status: 'active',
      joinDate: new Date(2025, 8, 10),
      lastActive: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      totalPurchases: 23,
      totalSpent: 890.75,
    },
    {
      id: 4,
      name: 'Laura Fernández',
      email: 'laura.fernandez@email.com',
      type: 'user_voucher',
      status: 'inactive',
      joinDate: new Date(2025, 7, 5),
      lastActive: new Date(2025, 7, 20),
      totalPurchases: 2,
      totalSpent: 45.00,
    },
    {
      id: 5,
      name: 'Roberto Ruiz',
      email: 'roberto.ruiz@email.com',
      type: 'user_app',
      status: 'active',
      joinDate: new Date(2025, 11, 1),
      lastActive: new Date(Date.now() - 1 * 60 * 60 * 1000),
      totalPurchases: 8,
      totalSpent: 320.25,
    },
    {
      id: 6,
      name: 'Sofía González',
      email: 'sofia.gonzalez@email.com',
      type: 'user_voucher',
      status: 'active',
      joinDate: new Date(2025, 6, 12),
      lastActive: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      totalPurchases: 15,
      totalSpent: 680.50,
    },
  ])

  const [currentPage, setCurrentPage] = useState(1)
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedClient, setSelectedClient] = useState(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)

  const CLIENTS_PER_PAGE = 5

  const filteredClients = allClients.filter((client) => {
    const typeMatch = filterType === 'all' || client.type === filterType
    const statusMatch = filterStatus === 'all' || client.status === filterStatus
    return typeMatch && statusMatch
  })

  const totalPages = Math.ceil(filteredClients.length / CLIENTS_PER_PAGE)
  const startIndex = (currentPage - 1) * CLIENTS_PER_PAGE
  const endIndex = startIndex + CLIENTS_PER_PAGE
  const paginatedClients = filteredClients.slice(startIndex, endIndex)

  const getTypeBadge = (type) => {
    const badges = {
      user_app: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Usuario App' },
      user_voucher: { bg: 'bg-purple-100', text: 'text-purple-800', label: 'Usuario Voucher' },
    }
    const badge = badges[type] || badges.user_app
    return <span className={`px-3 py-1 rounded-full text-sm font-medium ${badge.bg} ${badge.text}`}>{badge.label}</span>
  }

  const getStatusBadge = (status) => {
    const badges = {
      active: { bg: 'bg-green-100', text: 'text-green-800', label: 'Activo' },
      inactive: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Inactivo' },
    }
    const badge = badges[status] || badges.active
    return <span className={`px-3 py-1 rounded-full text-sm font-medium ${badge.bg} ${badge.text}`}>{badge.label}</span>
  }

  const handleViewDetails = (client) => {
    setSelectedClient(client)
    setShowDetailsModal(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-800">Clientes</h2>
        <div className="flex gap-3">
          <div className="text-sm text-gray-600">
            Total: <span className="font-semibold text-gray-800">{allClients.length}</span>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <Card title="🔍 Filtros">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Cliente
            </label>
            <select
              value={filterType}
              onChange={(e) => {
                setFilterType(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm"
            >
              <option value="all">Todos los tipos</option>
              <option value="user_app">Usuario App</option>
              <option value="user_voucher">Usuario Voucher</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estado
            </label>
            <select
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm"
            >
              <option value="all">Todos los estados</option>
              <option value="active">Activos</option>
              <option value="inactive">Inactivos</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Resultados
            </label>
            <div className="px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-700">
              {filteredClients.length} cliente{filteredClients.length !== 1 ? 's' : ''} encontrado{filteredClients.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
      </Card>

      {/* Tabla de Clientes */}
      <Card title="👥 Lista de Clientes">
        {paginatedClients.length > 0 ? (
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Nombre</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Tipo</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Estado</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Compras</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Gasto Total</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Último Acceso</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-700">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedClients.map((client) => (
                    <tr key={client.id} className="hover:bg-gray-50 transition">
                      <td className="py-3 px-4 text-sm text-gray-700">{client.email}</td>
                      <td className="py-3 px-4 text-sm font-medium text-gray-800">{client.name}</td>
                      <td className="py-3 px-4 text-sm">{getTypeBadge(client.type)}</td>
                      <td className="py-3 px-4 text-sm">{getStatusBadge(client.status)}</td>
                      <td className="py-3 px-4 text-sm text-gray-700 font-medium">{client.totalPurchases}</td>
                      <td className="py-3 px-4 text-sm text-gray-700 font-medium">${client.totalSpent.toFixed(2)}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {formatDistanceToNow(client.lastActive, { addSuffix: true, locale: es })}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => handleViewDetails(client)}
                          className="text-primary hover:text-blue-700 hover:underline transition text-sm font-medium"
                        >
                          Ver detalles
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Paginación */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  Página <span className="font-semibold">{currentPage}</span> de{' '}
                  <span className="font-semibold">{totalPages}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    ← Anterior
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-2 rounded-lg transition ${
                        currentPage === page
                          ? 'bg-primary text-white'
                          : 'border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    Siguiente →
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No hay clientes para mostrar</p>
          </div>
        )}
      </Card>

      {/* Modal de Detalles */}
      {showDetailsModal && selectedClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-800">Detalles del Cliente</h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Nombre</p>
                  <p className="text-lg font-semibold text-gray-800">{selectedClient.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Email</p>
                  <p className="text-lg font-semibold text-gray-800">{selectedClient.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Tipo de Cliente</p>
                  <div>{getTypeBadge(selectedClient.type)}</div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Estado</p>
                  <div>{getStatusBadge(selectedClient.status)}</div>
                </div>
              </div>

              <hr className="my-4" />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Fecha de Registro</p>
                  <p className="text-gray-800 font-medium">
                    {format(selectedClient.joinDate, 'dd de MMMM yyyy', { locale: es })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Último Acceso</p>
                  <p className="text-gray-800 font-medium">
                    {formatDistanceToNow(selectedClient.lastActive, { addSuffix: true, locale: es })}
                  </p>
                </div>
              </div>

              <hr className="my-4" />

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Total Compras</p>
                  <p className="text-2xl font-bold text-primary">{selectedClient.totalPurchases}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Gasto Total</p>
                  <p className="text-2xl font-bold text-green-600">${selectedClient.totalSpent.toFixed(2)}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Gasto Promedio</p>
                  <p className="text-2xl font-bold text-purple-600">
                    ${(selectedClient.totalSpent / selectedClient.totalPurchases).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 p-6 flex gap-3 justify-end">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Cerrar
              </button>
              <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition">
                📧 Enviar mensaje
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Información de Tipos */}
      <Card title="ℹ️ Tipos de Clientes">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-semibold text-gray-800 mb-2">📱 Usuario App</h4>
            <p className="text-sm text-gray-600">
              Clientes que acceden a través de la aplicación móvil o web. Tienen acceso completo a todas las
              funcionalidades y pueden realizar compras ilimitadas.
            </p>
          </div>
          <div className="border-l-4 border-purple-500 pl-4">
            <h4 className="font-semibold text-gray-800 mb-2">🎟️ Usuario Voucher</h4>
            <p className="text-sm text-gray-600">
              Clientes que utilizan códigos de descuento o vouchers. Tienen acceso limitado y requieren validación
              de vouchers para cada compra.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Clients

import { useEffect, useState } from 'react'
import BlockUserModal from '../components/BlockUserModal'
import Card from '../components/Card'
import CreateUserModal from '../components/CreateUserModal'
import Pagination from '../components/Pagination'
import UserAuditModal from '../components/UserAuditModal'
import UserTable from '../components/UserTable'

const USERS_PER_PAGE = 5

function Users() {
  const [allUsers, setAllUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)
  const [showAuditModal, setShowAuditModal] = useState(false)
  const [showBlockModal, setShowBlockModal] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      setLoading(true)
      // Simulación de datos - reemplazar con API real
      const mockUsers = [
        {
          id: '1',
          email: 'juan.perez@example.com',
          name: 'Juan Pérez',
          lastLogin: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          role: 'admin',
          status: 'active',
          loginCount: 45,
        },
        {
          id: '2',
          email: 'maria.garcia@example.com',
          name: 'María García',
          lastLogin: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          role: 'user',
          status: 'active',
          loginCount: 23,
        },
        {
          id: '3',
          email: 'carlos.lopez@example.com',
          name: 'Carlos López',
          lastLogin: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          role: 'user',
          status: 'blocked',
          loginCount: 5,
        },
        {
          id: '4',
          email: 'ana.martinez@example.com',
          name: 'Ana Martínez',
          lastLogin: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          role: 'user',
          status: 'active',
          loginCount: 67,
        },
        {
          id: '5',
          email: 'luis.sanchez@example.com',
          name: 'Luis Sánchez',
          lastLogin: new Date(Date.now() - 10 * 60 * 1000),
          role: 'user',
          status: 'active',
          loginCount: 156,
        },
        {
          id: '6',
          email: 'sofia.rodriguez@example.com',
          name: 'Sofía Rodríguez',
          lastLogin: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          role: 'user',
          status: 'active',
          loginCount: 34,
        },
        {
          id: '7',
          email: 'diego.torres@example.com',
          name: 'Diego Torres',
          lastLogin: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          role: 'user',
          status: 'active',
          loginCount: 12,
        },
        {
          id: '8',
          email: 'gabriela.mendez@example.com',
          name: 'Gabriela Méndez',
          lastLogin: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
          role: 'user',
          status: 'inactive',
          loginCount: 8,
        },
      ]
      setAllUsers(mockUsers)
      setError(null)
      setCurrentPage(1)
    } catch (err) {
      setError(err.message || 'Error al cargar usuarios')
    } finally {
      setLoading(false)
    }
  }

  const handleAudit = (user) => {
    setSelectedUser(user)
    setShowAuditModal(true)
  }

  const handleBlockClick = (user) => {
    setSelectedUser(user)
    setShowBlockModal(true)
  }

  const handleBlockConfirm = (reason) => {
    const updatedUsers = allUsers.map((u) =>
      u.id === selectedUser.id ? { ...u, status: 'blocked' } : u,
    )
    setAllUsers(updatedUsers)
    setShowBlockModal(false)
    setSelectedUser(null)
  }

  const handleUnblock = (userId) => {
    const updatedUsers = allUsers.map((u) =>
      u.id === userId ? { ...u, status: 'active' } : u,
    )
    setAllUsers(updatedUsers)
  }

  const handleCreateUser = (userData) => {
    const newUser = {
      id: String(Date.now()),
      ...userData,
      lastLogin: new Date(),
      loginCount: 0,
      status: 'active',
    }
    setAllUsers([newUser, ...allUsers])
    setShowCreateModal(false)
    setCurrentPage(1)
  }

  // Cálculo de paginación
  const totalPages = Math.ceil(allUsers.length / USERS_PER_PAGE)
  const startIndex = (currentPage - 1) * USERS_PER_PAGE
  const endIndex = startIndex + USERS_PER_PAGE
  const paginatedUsers = allUsers.slice(startIndex, endIndex)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando usuarios...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-800">Gestión de Usuarios</h2>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition"
        >
          + Nuevo Usuario
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-100 border border-red-300 rounded-lg text-red-700">
          {error}
        </div>
      )}

      <Card title={`Usuarios del Sistema (${allUsers.length} total)`}>
        <UserTable
          users={paginatedUsers}
          onAudit={handleAudit}
          onBlock={handleBlockClick}
          onUnblock={handleUnblock}
        />
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </Card>

      {showAuditModal && selectedUser && (
        <UserAuditModal
          user={selectedUser}
          onClose={() => setShowAuditModal(false)}
        />
      )}

      {showBlockModal && selectedUser && (
        <BlockUserModal
          user={selectedUser}
          onConfirm={handleBlockConfirm}
          onClose={() => setShowBlockModal(false)}
        />
      )}

      {showCreateModal && (
        <CreateUserModal
          onConfirm={handleCreateUser}
          onClose={() => setShowCreateModal(false)}
        />
      )}
    </div>
  )
}

export default Users

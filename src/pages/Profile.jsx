import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { useState } from 'react'
import Card from '../components/Card'
import { useAuth } from '../hooks/useAuth'

function Profile() {
  const { user, logout } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+1 (234) 567-8900',
    location: 'Ciudad de México, México',
    bio: 'Administrador de sistemas',
    company: 'Mi Empresa',
  })

  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: '',
  })

  const [messages, setMessages] = useState({
    success: '',
    error: '',
  })

  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSaveProfile = (e) => {
    e.preventDefault()
    if (!profileData.name || !profileData.email) {
      setMessages({ success: '', error: 'El nombre y email son requeridos' })
      return
    }
    setMessages({ success: 'Perfil actualizado exitosamente', error: '' })
    setIsEditing(false)
    setTimeout(() => setMessages({ success: '', error: '' }), 3000)
  }

  const handleChangePassword = (e) => {
    e.preventDefault()
    if (!passwordData.current || !passwordData.new || !passwordData.confirm) {
      setMessages({ success: '', error: 'Todos los campos son requeridos' })
      return
    }
    if (passwordData.new !== passwordData.confirm) {
      setMessages({ success: '', error: 'Las contraseñas no coinciden' })
      return
    }
    if (passwordData.new.length < 6) {
      setMessages({ success: '', error: 'La contraseña debe tener al menos 6 caracteres' })
      return
    }
    setMessages({ success: 'Contraseña cambiada exitosamente', error: '' })
    setPasswordData({ current: '', new: '', confirm: '' })
    setShowPasswordForm(false)
    setTimeout(() => setMessages({ success: '', error: '' }), 3000)
  }

  const handleLogout = () => {
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      logout()
    }
  }

  const getInitials = (name) => {
    return name
      ?.split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase() || 'U'
  }

  const memberSince = new Date(2025, 0, 15)

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Mi Perfil</h2>

      {/* Mensajes */}
      {messages.success && (
        <div className="p-4 bg-green-100 border border-green-400 text-green-800 rounded-lg flex items-center gap-3">
          <span>✓</span>
          <p>{messages.success}</p>
        </div>
      )}
      {messages.error && (
        <div className="p-4 bg-red-100 border border-red-400 text-red-800 rounded-lg flex items-center gap-3">
          <span>✕</span>
          <p>{messages.error}</p>
        </div>
      )}

      {/* Información Principal */}
      <Card>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 pb-6 border-b border-gray-200">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-24 h-24 bg-gradient-to-br from-primary to-blue-700 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              {getInitials(profileData.name)}
            </div>
          </div>

          {/* Información Básica */}
          <div className="flex-grow">
            <h3 className="text-2xl font-bold text-gray-800 mb-1">{profileData.name}</h3>
            <p className="text-gray-600 mb-3">{profileData.email}</p>
            <div className="flex gap-4 text-sm">
              <span className="flex items-center gap-1">
                <span className="text-lg">💼</span> {profileData.company}
              </span>
              <span className="flex items-center gap-1">
                <span className="text-lg">📍</span> {profileData.location}
              </span>
              <span className="flex items-center gap-1">
                <span className="text-lg">📅</span>{' '}
                {format(memberSince, 'dd MMMM yyyy', { locale: es })}
              </span>
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition font-medium"
            >
              {isEditing ? '❌ Cancelar' : '✏️ Editar'}
            </button>
            <button
              onClick={() => setShowPasswordForm(!showPasswordForm)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              🔒 Contraseña
            </button>
          </div>
        </div>

        {/* Formulario de Edición */}
        {isEditing && (
          <form onSubmit={handleSaveProfile} className="pt-6 space-y-4">
            <h4 className="font-semibold text-gray-800 mb-4">✏️ Editar Información</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleProfileChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleProfileChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleProfileChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Empresa
                </label>
                <input
                  type="text"
                  name="company"
                  value={profileData.company}
                  onChange={handleProfileChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ubicación
                </label>
                <input
                  type="text"
                  name="location"
                  value={profileData.location}
                  onChange={handleProfileChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Biografía
                </label>
                <input
                  type="text"
                  name="bio"
                  value={profileData.bio}
                  onChange={handleProfileChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                />
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                ✓ Guardar Cambios
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}

        {/* Formulario de Cambio de Contraseña */}
        {showPasswordForm && (
          <form onSubmit={handleChangePassword} className="pt-6 space-y-4 border-t border-gray-200">
            <h4 className="font-semibold text-gray-800 mb-4">🔒 Cambiar Contraseña</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contraseña Actual
                </label>
                <input
                  type="password"
                  name="current"
                  value={passwordData.current}
                  onChange={handlePasswordChange}
                  placeholder="Ingresa tu contraseña actual"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nueva Contraseña
                </label>
                <input
                  type="password"
                  name="new"
                  value={passwordData.new}
                  onChange={handlePasswordChange}
                  placeholder="Ingresa tu nueva contraseña"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirmar Contraseña
                </label>
                <input
                  type="password"
                  name="confirm"
                  value={passwordData.confirm}
                  onChange={handlePasswordChange}
                  placeholder="Confirma tu nueva contraseña"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                />
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                ✓ Cambiar Contraseña
              </button>
              <button
                type="button"
                onClick={() => setShowPasswordForm(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}
      </Card>

      {/* Información de Cuenta */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="📊 Rol de Usuario">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Tu Rol</p>
            <p className="text-2xl font-bold text-primary">
              {user?.role === 'admin' ? 'Administrador' : 'Usuario'}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              {user?.role === 'admin'
                ? 'Tienes acceso completo al sistema'
                : 'Acceso limitado al sistema'}
            </p>
          </div>
        </Card>

        <Card title="📅 Miembro Desde">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Fecha de Registro</p>
            <p className="text-lg font-semibold text-gray-800">
              {format(memberSince, 'dd MMM yyyy', { locale: es })}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Hace más de 1 año
            </p>
          </div>
        </Card>

        <Card title="🔐 Seguridad">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Autenticación</p>
            <p className="text-xl font-bold text-green-600">✓ Activa</p>
            <p className="text-xs text-gray-500 mt-2">
              Tu cuenta está protegida
            </p>
          </div>
        </Card>
      </div>

      {/* Preferencias y Privacidad */}
      <Card title="⚙️ Preferencias">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-800">Notificaciones por Email</p>
              <p className="text-sm text-gray-600">Recibe alertas importantes</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 accent-primary" />
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-800">Visibilidad de Perfil</p>
              <p className="text-sm text-gray-600">Mostrar perfil a otros usuarios</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 accent-primary" />
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-800">Temas Oscuro</p>
              <p className="text-sm text-gray-600">Usar tema oscuro en la interfaz</p>
            </div>
            <input type="checkbox" className="w-5 h-5 accent-primary" />
          </div>
        </div>
      </Card>

      {/* Zona de Peligro */}
      <Card title="⚠️ Zona de Peligro" className="border-l-4 border-red-500">
        <div className="space-y-3">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium flex items-center justify-center gap-2"
          >
            🚪 Cerrar Sesión
          </button>
          <button className="w-full px-4 py-3 border border-red-500 text-red-600 rounded-lg hover:bg-red-50 transition font-medium">
            🗑️ Descargar Datos
          </button>
          <button className="w-full px-4 py-3 border border-red-500 text-red-600 rounded-lg hover:bg-red-50 transition font-medium">
            ❌ Eliminar Cuenta
          </button>
        </div>
      </Card>

      {/* Información Adicional */}
      <Card title="ℹ️ Información">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">📱 Contacto</h4>
            <p className="text-sm text-gray-600">
              Para soporte, contacta con nuestro equipo en:
              <br />
              <strong>support@dashboard.com</strong>
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">📚 Recursos</h4>
            <p className="text-sm text-gray-600">
              Consulta nuestra documentación en:
              <br />
              <strong>docs.dashboard.com</strong>
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Profile

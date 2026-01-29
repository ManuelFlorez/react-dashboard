import { useState } from 'react'
import Card from '../components/Card'

function Settings() {
  const [formData, setFormData] = useState({
    appName: 'React Dashboard',
    company: 'Empresa XYZ',
    email: 'admin@empresa.com',
    theme: 'light',
    emailNotifications: true,
    twoFactor: false,
    loginAlerts: true,
  })

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSaveGeneral = (e) => {
    e.preventDefault()
    setSuccessMessage('Configuración general guardada correctamente')
    setTimeout(() => setSuccessMessage(''), 3000)
  }

  const handleSaveNotifications = (e) => {
    e.preventDefault()
    setSuccessMessage('Preferencias de notificación guardadas')
    setTimeout(() => setSuccessMessage(''), 3000)
  }

  const handleSaveSecurity = (e) => {
    e.preventDefault()
    
    if (!passwordForm.currentPassword) {
      setErrorMessage('Ingresa tu contraseña actual')
      return
    }
    if (passwordForm.newPassword.length < 6) {
      setErrorMessage('La nueva contraseña debe tener al menos 6 caracteres')
      return
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden')
      return
    }

    setSuccessMessage('Contraseña actualizada correctamente')
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
    setErrorMessage('')
    setTimeout(() => setSuccessMessage(''), 3000)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Configuración</h2>

      {successMessage && (
        <div className="p-4 bg-green-100 border border-green-300 rounded-lg text-green-700">
          ✅ {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="p-4 bg-red-100 border border-red-300 rounded-lg text-red-700">
          ❌ {errorMessage}
        </div>
      )}

      {/* Configuración General */}
      <Card title="📋 Configuración General">
        <form onSubmit={handleSaveGeneral} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre de la Aplicación
              </label>
              <input
                type="text"
                name="appName"
                value={formData.appName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre de la Empresa
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email de Contacto
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tema Visual
            </label>
            <select
              name="theme"
              value={formData.theme}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            >
              <option value="light">Claro</option>
              <option value="dark">Oscuro</option>
              <option value="auto">Automático</option>
            </select>
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition"
          >
            Guardar Cambios
          </button>
        </form>
      </Card>

      {/* Notificaciones */}
      <Card title="🔔 Notificaciones">
        <form onSubmit={handleSaveNotifications} className="space-y-4">
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="emailNotifications"
                checked={formData.emailNotifications}
                onChange={handleInputChange}
                className="w-4 h-4 text-primary rounded"
              />
              <span className="text-gray-700">
                Recibir notificaciones por email
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="loginAlerts"
                checked={formData.loginAlerts}
                onChange={handleInputChange}
                className="w-4 h-4 text-primary rounded"
              />
              <span className="text-gray-700">
                Alertas de nuevos inicios de sesión
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="twoFactor"
                checked={formData.twoFactor}
                onChange={handleInputChange}
                className="w-4 h-4 text-primary rounded"
              />
              <span className="text-gray-700">
                Autenticación de dos factores (2FA)
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition"
          >
            Guardar Preferencias
          </button>
        </form>
      </Card>

      {/* Seguridad */}
      <Card title="🔒 Seguridad">
        <form onSubmit={handleSaveSecurity} className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-blue-700">
              Cambiar contraseña regularmente ayuda a mantener tu cuenta segura.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña Actual
            </label>
            <input
              type="password"
              name="currentPassword"
              value={passwordForm.currentPassword}
              onChange={handlePasswordChange}
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nueva Contraseña
              </label>
              <input
                type="password"
                name="newPassword"
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
                placeholder="••••••••"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirmar Contraseña
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
                placeholder="••••••••"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition"
          >
            Actualizar Contraseña
          </button>
        </form>
      </Card>

      {/* Información de la Cuenta */}
      <Card title="👤 Información de la Cuenta">
        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-600">Usuario Actual</p>
            <p className="font-semibold text-gray-800">admin@empresa.com</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Rol</p>
            <p className="font-semibold text-gray-800">Administrador</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Última sesión</p>
            <p className="font-semibold text-gray-800">Hace 5 minutos</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Sesiones activas</p>
            <p className="font-semibold text-gray-800">1</p>
          </div>
        </div>
      </Card>

      {/* Respaldo y Recuperación */}
      <Card title="💾 Respaldo y Recuperación">
        <div className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800 mb-3">
              Crea respaldos regulares de tus datos para evitar pérdida de información.
            </p>
            <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition">
              📥 Descargar Respaldo
            </button>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-sm text-gray-700 mb-3">
              Último respaldo: 28 de enero de 2026 a las 14:30
            </p>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
              🔄 Restaurar desde Respaldo
            </button>
          </div>
        </div>
      </Card>

      {/* Zona de Peligro */}
      <Card title="⚠️ Zona de Peligro">
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-800 mb-3">
              <strong>Eliminar tu cuenta</strong> es una acción permanente que no se puede deshacer.
              Todos tus datos serán eliminados.
            </p>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
              🗑️ Eliminar mi Cuenta
            </button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Settings

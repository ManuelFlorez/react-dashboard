import { useState } from 'react'
import Card from '../components/Card'

function Reports() {
  const [selectedReport, setSelectedReport] = useState('users')
  const [dateRange, setDateRange] = useState('30days')
  const [exportFormat, setExportFormat] = useState('pdf')

  const reports = [
    {
      id: 'users',
      name: 'Reporte de Usuarios',
      icon: '👥',
      description: 'Análisis de usuarios activos, nuevos y bloqueados',
      data: {
        totalUsers: 127,
        activeUsers: 98,
        blockedUsers: 12,
        newUsers: 15,
        growth: '+12%',
      },
    },
    {
      id: 'logins',
      name: 'Reporte de Inicios de Sesión',
      icon: '🔐',
      description: 'Estadísticas de accesos y patrones de uso',
      data: {
        totalLogins: 2450,
        avgLoginTime: '2:30 PM',
        successRate: '99.2%',
        failedLogins: 19,
        uniqueUsers: 87,
      },
    },
    {
      id: 'security',
      name: 'Reporte de Seguridad',
      icon: '🛡️',
      description: 'Análisis de intentos fallidos y alertas de seguridad',
      data: {
        suspiciousAttempts: 8,
        blockedIps: 3,
        passwordChanges: 12,
        twoFactorEnabled: 45,
        securityScore: '92%',
      },
    },
    {
      id: 'activity',
      name: 'Reporte de Actividad',
      icon: '📊',
      description: 'Seguimiento de acciones y cambios en el sistema',
      data: {
        totalActions: 1523,
        userUpdates: 234,
        roleChanges: 12,
        deletions: 5,
        configChanges: 89,
      },
    },
  ]

  const selectedReportData = reports.find((r) => r.id === selectedReport)

  const dateRanges = {
    '7days': 'Últimos 7 días',
    '30days': 'Últimos 30 días',
    '90days': 'Últimos 90 días',
    'ytd': 'Año a la fecha',
    'custom': 'Rango personalizado',
  }

  const chartData = {
    users: [
      { label: 'Usuarios Activos', value: 98 },
      { label: 'Usuarios Nuevos', value: 15 },
      { label: 'Usuarios Bloqueados', value: 12 },
      { label: 'Usuarios Inactivos', value: 2 },
    ],
    logins: [
      { label: 'Inicios Exitosos', value: 2431 },
      { label: 'Inicios Fallidos', value: 19 },
    ],
    security: [
      { label: '2FA Habilitado', value: 45 },
      { label: 'Sin 2FA', value: 82 },
    ],
    activity: [
      { label: 'Actualizaciones', value: 234 },
      { label: 'Cambios de Rol', value: 12 },
      { label: 'Cambios de Config', value: 89 },
    ],
  }

  const handleExport = () => {
    alert(`Exportando reporte en formato ${exportFormat.toUpperCase()}...`)
  }

  const handleDownload = () => {
    alert('Descargando reporte...')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-800">Reportes</h2>
        <div className="flex gap-3">
          <select
            value={exportFormat}
            onChange={(e) => setExportFormat(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
          >
            <option value="pdf">PDF</option>
            <option value="csv">CSV</option>
            <option value="excel">Excel</option>
            <option value="json">JSON</option>
          </select>
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition"
          >
            📥 Exportar
          </button>
        </div>
      </div>

      {/* Filtros */}
      <Card title="🔍 Filtros">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rango de Fechas
            </label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm"
            >
              {Object.entries(dateRanges).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Desde
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hasta
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm"
            />
          </div>
        </div>
      </Card>

      {/* Selección de Reportes */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">Reportes Disponibles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {reports.map((report) => (
            <button
              key={report.id}
              onClick={() => setSelectedReport(report.id)}
              className={`p-4 rounded-lg border-2 transition text-left ${
                selectedReport === report.id
                  ? 'border-primary bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-3xl mb-2">{report.icon}</div>
              <h4 className="font-semibold text-gray-800">{report.name}</h4>
              <p className="text-sm text-gray-600 mt-1">{report.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Reporte Detallado */}
      {selectedReportData && (
        <Card title={`${selectedReportData.icon} ${selectedReportData.name}`}>
          <div className="space-y-6">
            {/* Métricas principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {Object.entries(selectedReportData.data).map(([key, value]) => (
                <div key={key} className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
                  <p className="text-sm text-gray-600 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                  <p className="text-2xl font-bold text-gray-800 mt-2">{value}</p>
                </div>
              ))}
            </div>

            {/* Gráfico simple */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-4">Distribución</h4>
              <div className="space-y-3">
                {chartData[selectedReport]?.map((item, idx) => {
                  const maxValue = Math.max(
                    ...chartData[selectedReport].map((d) => d.value),
                  )
                  const percentage = (item.value / maxValue) * 100
                  return (
                    <div key={idx}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700">
                          {item.label}
                        </span>
                        <span className="text-sm font-semibold text-gray-800">
                          {item.value}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-primary to-indigo-600 h-2 rounded-full transition-all"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Tabla de datos */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-4">Detalles</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-300">
                      <th className="text-left py-2 px-4 font-semibold text-gray-700">
                        Métrica
                      </th>
                      <th className="text-left py-2 px-4 font-semibold text-gray-700">
                        Valor
                      </th>
                      <th className="text-left py-2 px-4 font-semibold text-gray-700">
                        % del Total
                      </th>
                      <th className="text-left py-2 px-4 font-semibold text-gray-700">
                        Cambio
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {chartData[selectedReport]?.map((item, idx) => (
                      <tr key={idx} className="border-b border-gray-200 hover:bg-white transition">
                        <td className="py-3 px-4">{item.label}</td>
                        <td className="py-3 px-4 font-semibold text-gray-800">
                          {item.value}
                        </td>
                        <td className="py-3 px-4">
                          {(
                            (item.value /
                              chartData[selectedReport].reduce((sum, d) => sum + d.value, 0)) *
                            100
                          ).toFixed(1)}
                          %
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-green-600 font-semibold">+5.2%</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Acciones */}
            <div className="flex gap-3">
              <button
                onClick={handleDownload}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition"
              >
                📥 Descargar
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
                🖨️ Imprimir
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
                📧 Enviar por Email
              </button>
            </div>
          </div>
        </Card>
      )}

      {/* Información útil */}
      <Card title="ℹ️ Información sobre Reportes">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">🎯 Reportes Disponibles</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Reporte de Usuarios: Análisis de crecimiento y actividad</li>
              <li>• Reporte de Inicios: Patrones de acceso y seguridad</li>
              <li>• Reporte de Seguridad: Alertas y eventos de seguridad</li>
              <li>• Reporte de Actividad: Log de cambios en el sistema</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">📊 Opciones de Exportación</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• <strong>PDF</strong>: Reporte formateado para imprimir</li>
              <li>• <strong>CSV</strong>: Datos en formato de tabla</li>
              <li>• <strong>Excel</strong>: Hoja de cálculo editable</li>
              <li>• <strong>JSON</strong>: Formato estructurado para integración</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Reports

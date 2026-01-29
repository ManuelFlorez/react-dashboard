import { useEffect, useState } from 'react'
import Card from '../components/Card'

function Dashboard() {
  const [stats, setStats] = useState([
    { label: 'Total Usuarios', value: 1234, color: 'bg-blue-500' },
    { label: 'Ingresos', value: '$12,345', color: 'bg-green-500' },
    { label: 'Tareas', value: 45, color: 'bg-purple-500' },
    { label: 'Pendientes', value: 12, color: 'bg-orange-500' },
  ])

  useEffect(() => {
    // Simulación de carga de datos
    console.log('Dashboard cargado')
  }, [])

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Bienvenido al Dashboard</h2>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <Card key={idx}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-800 mt-2">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-lg ${stat.color} opacity-20`}></div>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Actividad Reciente" className="lg:col-span-2">
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between border-b pb-4 last:border-b-0">
                <span className="text-gray-600">Evento #{item}</span>
                <span className="text-sm text-gray-400">Hace 2 horas</span>
              </div>
            ))}
          </div>
        </Card>
        
        <Card title="Próximas Tareas">
          <ul className="space-y-3">
            {['Revisar reportes', 'Actualizar datos', 'Enviar notificaciones'].map((task, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 text-primary" />
                <span className="text-gray-700">{task}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard

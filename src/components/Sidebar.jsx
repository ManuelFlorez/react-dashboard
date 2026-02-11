import AssessmentIcon from '@mui/icons-material/Assessment'
import BusinessIcon from '@mui/icons-material/Business'
import DashboardIcon from '@mui/icons-material/Dashboard'
import DateRangeIcon from '@mui/icons-material/DateRange'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import PeopleIcon from '@mui/icons-material/People'
import SettingsIcon from '@mui/icons-material/Settings'
import { Link, useLocation } from 'react-router-dom'

function Sidebar() {
  const location = useLocation()
  const currentPath = location.pathname

  const menuItems = [
    { name: 'Dashboard', path: '/', icon: <DashboardIcon />},
    { name: 'Usuarios', path: '/users', icon: <PeopleIcon /> },
    { name: 'Clientes', path: '/clients', icon: <BusinessIcon /> },
    { name: 'Reportes', path: '/reports', icon: <AssessmentIcon /> },
    { name: 'Agenda', path: '/schedule', icon: <DateRangeIcon /> },
    { name: 'Configuración', path: '/settings', icon: <SettingsIcon /> },
    { name: 'Perfil', path: '/profile', icon: <ManageAccountsIcon /> },
  ]

  const isActive = (path) => {
    if (path === '/') {
      return currentPath === '/'
    }
    return currentPath.startsWith(path)
  }

  return (
    <aside className="w-64 bg-gray-900 text-white shadow-lg">
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-xl font-bold">Backoffice</h2>
      </div>
      <nav className="p-4">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition mb-2 ${
              isActive(item.path)
                ? 'bg-primary text-white font-semibold shadow-lg'
                : 'hover:bg-gray-800 text-gray-300'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar

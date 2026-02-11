import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import Clients from './pages/Clients'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Profile from './pages/Profile'
import Reports from './pages/Reports'
import Schedule from './pages/Schedule'
import Settings from './pages/Settings'
import Users from './pages/Users'

function App() {
  return (
    <Router basename="/react-dashboard">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="users" element={<Users />} />
                  <Route path="clients" element={<Clients />} />
                  <Route path="reports" element={<Reports />} />
                  <Route path="schedule" element={<Schedule />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App

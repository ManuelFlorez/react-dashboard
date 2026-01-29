import { createContext, useCallback, useEffect, useState } from 'react'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    const storedToken = localStorage.getItem('token')
    
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = useCallback((email, password) => {
    return new Promise((resolve, reject) => {
      // Simulación de login - reemplazar con API real
      if (email && password) {
        const userData = {
          id: '1',
          email,
          name: email.split('@')[0],
          role: 'user'
        }
        const fakeToken = 'fake_token_' + Math.random().toString(36).substr(2, 9)
        
        localStorage.setItem('user', JSON.stringify(userData))
        localStorage.setItem('token', fakeToken)
        setUser(userData)
        resolve(userData)
      } else {
        reject(new Error('Email y contraseña requeridos'))
      }
    })
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

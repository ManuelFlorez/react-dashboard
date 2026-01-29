# 👤 Reporte de Perfil - Feature Documentation

## Overview

La página de **Perfil** permite a los usuarios autenticados ver y editar su información personal, cambiar su contraseña, y gestionar preferencias de cuenta. Es el punto central para administración de identidad del usuario.

## Features Principales

### 1. **Vista de Información Personal**
- Avatar con iniciales del usuario
- Nombre completo y email
- Empresa, ubicación y biografía
- Fecha de registro
- Rol del usuario (Admin/Usuario)

### 2. **Edición de Perfil**
Formulario interactivo para editar:
- Nombre completo
- Email
- Teléfono
- Empresa
- Ubicación
- Biografía
- Validación de campos requeridos

### 3. **Cambio de Contraseña**
- Solicitar contraseña actual
- Ingresar nueva contraseña (mínimo 6 caracteres)
- Confirmación de contraseña
- Validación de coincidencia

### 4. **Información de Cuenta**
Tres tarjetas con datos importantes:
- **Rol de Usuario**: Admin/Usuario con descripción de permisos
- **Miembro Desde**: Fecha de registro del usuario
- **Seguridad**: Estado de autenticación

### 5. **Preferencias**
Toggles para configurar:
- Notificaciones por email
- Visibilidad de perfil
- Tema oscuro

### 6. **Zona de Peligro**
Acciones irreversibles:
- Cerrar sesión (con confirmación)
- Descargar datos personales
- Eliminar cuenta permanentemente

## Estructura de Componentes

### `src/pages/Profile.jsx` (350 líneas)

#### State Management
```javascript
const { user, logout } = useAuth()  // Obtiene datos del usuario autenticado
const [isEditing, setIsEditing] = useState(false)  // Mostrar/ocultar formulario
const [showPasswordForm, setShowPasswordForm] = useState(false)  // Formulario de contraseña
const [profileData, setProfileData] = useState({  // Datos del perfil
  name: '',
  email: '',
  phone: '',
  location: '',
  bio: '',
  company: ''
})
const [passwordData, setPasswordData] = useState({  // Datos de contraseña
  current: '',
  new: '',
  confirm: ''
})
const [messages, setMessages] = useState({  // Mensajes de éxito/error
  success: '',
  error: ''
})
```

#### Data Structure
```javascript
profileData: {
  name: string,          // Nombre del usuario
  email: string,         // Email del usuario
  phone: string,         // Teléfono
  location: string,      // Ubicación
  bio: string,           // Biografía corta
  company: string        // Empresa
}

passwordData: {
  current: string,       // Contraseña actual
  new: string,           // Nueva contraseña
  confirm: string        // Confirmación
}
```

## UI Layout

### 1. **Header**
- Título "Mi Perfil"
- Mensajes de éxito/error con auto-dismiss (3 segundos)

### 2. **Tarjeta Principal**
- **Avatar**: Círculo grande con iniciales del usuario
- **Información**: Nombre, email, empresa, ubicación, fecha de registro
- **Botones**: Editar, Cambiar Contraseña
- **Formulario Edición**: Grid de campos (condicional)
- **Formulario Contraseña**: Inputs de seguridad (condicional)

### 3. **Grid de Información**
Tres tarjetas en responsivo (3 cols desktop, 1 col mobile):
- Rol de Usuario (icono + descripción)
- Miembro Desde (fecha + tiempo)
- Seguridad (estado)

### 4. **Preferencias**
Lista de toggles con:
- Descripción
- Switch on/off
- Información adicional

### 5. **Zona de Peligro**
Tres botones rojos:
- Cerrar Sesión (con confirmación)
- Descargar Datos
- Eliminar Cuenta

### 6. **Información Útil**
Contacto y recursos de soporte

## Styling

### Colores
- **Primary**: Azul para botones de edición
- **Success**: Verde para guardar cambios
- **Danger**: Rojo para zona de peligro
- **Alert**: Amarillo para avisos

### Responsive Design
```
Mobile: Stack vertical todo
Tablet (md): 2 columnas en grid info
Desktop (lg): 3 columnas en grid info, flex row en header
```

### Componentes Visuales
- Avatar circular con gradiente azul
- Badges de información
- Cards para secciones
- Toggles para preferencias
- Inputs con focus state

## Handlers & Functions

### `handleProfileChange(e)`
```javascript
// Actualiza un campo del perfil en tiempo real
const { name, value } = e.target
setProfileData(prev => ({...prev, [name]: value}))
```

### `handlePasswordChange(e)`
```javascript
// Actualiza un campo de contraseña
const { name, value } = e.target
setPasswordData(prev => ({...prev, [name]: value}))
```

### `handleSaveProfile(e)`
```javascript
// Valida y guarda los cambios de perfil
// - Valida que nombre y email no estén vacíos
// - Muestra mensaje de éxito
// - Oculta el formulario
// - Auto-dismiss del mensaje en 3 segundos
```

### `handleChangePassword(e)`
```javascript
// Valida y procesa cambio de contraseña
// - Valida que todos los campos estén llenos
// - Valida que las contraseñas coincidan
// - Valida longitud mínima (6 caracteres)
// - Limpia los campos
// - Muestra mensaje de éxito
```

### `handleLogout()`
```javascript
// Con confirmación, cierra la sesión del usuario
// y redirige a la página de login
```

### `getInitials(name)`
```javascript
// Extrae iniciales del nombre para mostrar en avatar
// Ejemplo: "Juan García" → "JG"
```

## Data Integration Points

### Mock Data (Current)
- Usuario obtenido de `useAuth()` hook
- Datos de perfil inicializados con información del usuario
- Fecha de registro simulada (15 enero 2025)

### API Integration (Future)
```javascript
// Endpoints esperados:
GET /api/profile         // Obtener perfil del usuario
PUT /api/profile         // Actualizar perfil
POST /api/profile/password // Cambiar contraseña
DELETE /api/profile      // Eliminar cuenta
GET /api/profile/data    // Descargar datos personales
```

### Service Integration
```javascript
// Agregar a src/services/api.js:
export const profileService = {
  getProfile: () => api.get('/profile'),
  updateProfile: (data) => api.put('/profile', data),
  changePassword: (current, newPassword) => 
    api.post('/profile/password', { current, newPassword }),
  downloadData: () => api.get('/profile/data'),
  deleteAccount: (password) => 
    api.delete('/profile', { data: { password } }),
}
```

## State Management Pattern

### Component-Level State
```javascript
// Datos del usuario y formularios
const [profileData, setProfileData] = useState({...})
const [passwordData, setPasswordData] = useState({...})

// UI State
const [isEditing, setIsEditing] = useState(false)
const [showPasswordForm, setShowPasswordForm] = useState(false)

// Mensajes
const [messages, setMessages] = useState({success: '', error: ''})

// TODO: Para API integration
// const [loading, setLoading] = useState(false)
```

## Validations

### Perfil
- ✅ Nombre requerido
- ✅ Email requerido y válido
- ✅ Teléfono (formato opcional)
- ✅ Ubicación (opcional)

### Contraseña
- ✅ Contraseña actual requerida
- ✅ Nueva contraseña requerida
- ✅ Confirmación requerida
- ✅ Mínimo 6 caracteres
- ✅ Coincidencia de contraseñas

### Zona de Peligro
- ✅ Confirmación en modal para cerrar sesión
- ✅ Confirmación para eliminar cuenta

## Accesibilidad

- ✅ Labels asociados a inputs
- ✅ Placeholders descriptivos
- ✅ Botones con aria-labels
- ✅ Contraste de colores suficiente
- ✅ Focus states visibles
- ✅ Confirmaciones para acciones destructivas

## Performance Considerations

### Optimizations
- Validaciones antes de hacer cambios
- Auto-dismiss de mensajes (3s)
- Condicionales para mostrar/ocultar formularios
- Estado local para ediciones (sin persistir hasta guardar)

### Future Optimizations
- Debounce en cambios de formulario
- Caché de datos de perfil
- Optimistic updates
- Lazy load de imagen de avatar

## Testing Strategy

### Unit Tests
```javascript
// Test: Editar perfil actualiza estado
test('profile editing updates profile data', () => {
  render(<Profile />)
  fireEvent.click(screen.getByText('✏️ Editar'))
  fireEvent.change(nameInput, { target: { value: 'Juan' } })
  expect(profileData.name).toBe('Juan')
})

// Test: Validación de contraseña
test('password validation works correctly', () => {
  // Valida longitud mínima
  // Valida coincidencia
  // Valida no vacío
})

// Test: Cerrar sesión con confirmación
test('logout requires confirmation', () => {
  fireEvent.click(logoutButton)
  expect(confirmDialog).toBeVisible()
})
```

## Future Enhancements

### Short Term
- [ ] Subida de foto de perfil
- [ ] Tema oscuro funcional
- [ ] Descarga real de datos (JSON, CSV)
- [ ] Eliminación real de cuenta con confirmación por email

### Medium Term
- [ ] API integration con backend
- [ ] Autenticación de dos factores (2FA)
- [ ] Historial de inicios de sesión
- [ ] Dispositivos conectados
- [ ] Log de auditoría de cambios

### Long Term
- [ ] Perfil público con información compartida
- [ ] Social login (Google, GitHub, etc.)
- [ ] Conexión con redes sociales
- [ ] Integración con servicios de almacenamiento (Google Drive, OneDrive)

## Known Limitations

### Current Version
- Datos simulados (no persisten)
- Avatar solo con iniciales (no soporta fotos)
- Tema oscuro es solo toggle visual (no funciona)
- Descargar datos/eliminar cuenta simulan con alert
- No hay verificación de email

### Production Readiness
- ⚠️ Requiere hash de contraseña (nunca guardar en plaintext)
- ⚠️ Requiere verificación de correo para cambios de email
- ⚠️ Requiere confirmación por email para eliminar cuenta
- ⚠️ Requiere logs de auditoría para cambios sensibles
- ⚠️ Requiere rate limiting para intentos de cambio de contraseña

## Code Examples

### Validar y actualizar perfil
```javascript
const handleSaveProfile = (e) => {
  e.preventDefault()
  
  // Validar campos
  if (!profileData.name || !profileData.email) {
    setMessages({ success: '', error: 'Campos requeridos' })
    return
  }
  
  // API call (futuro)
  // await profileService.updateProfile(profileData)
  
  // Mostrar éxito
  setMessages({ success: 'Perfil actualizado', error: '' })
  setIsEditing(false)
  
  // Auto-dismiss
  setTimeout(() => setMessages({ success: '', error: '' }), 3000)
}
```

### Cambiar contraseña
```javascript
const handleChangePassword = (e) => {
  e.preventDefault()
  
  // Validaciones
  if (passwordData.new !== passwordData.confirm) {
    setMessages({ success: '', error: 'Las contraseñas no coinciden' })
    return
  }
  
  if (passwordData.new.length < 6) {
    setMessages({ success: '', error: 'Mínimo 6 caracteres' })
    return
  }
  
  // API call (futuro)
  // await profileService.changePassword(...)
  
  // Limpiar y mostrar éxito
  setPasswordData({ current: '', new: '', confirm: '' })
  setMessages({ success: 'Contraseña cambiada', error: '' })
}
```

## Routing

```javascript
// En App.jsx:
<Route path="profile" element={<Profile />} />

// Navegación desde Sidebar:
<Link to="profile" className="...">Perfil</Link>

// URL: http://localhost:5173/profile
```

## Related Files

- `src/pages/Profile.jsx` - Página principal de perfil
- `src/components/Card.jsx` - Componente de tarjetas
- `src/hooks/useAuth.js` - Hook para acceder a datos del usuario
- `src/context/AuthContext.jsx` - Contexto de autenticación
- `src/services/api.js` - Servicios (futuro)
- `src/App.jsx` - Configuración de rutas
- `src/components/Sidebar.jsx` - Navegación

## Notes for Developers

1. **Avatar**: Actualmente solo muestra iniciales. Para agregar fotos, necesitarás FormData y upload.
2. **Tema Oscuro**: El toggle funciona pero no cambia realmente los estilos. Requiere Tailwind dark mode.
3. **Contraseña**: En producción, usar hash (bcrypt) y HTTPS obligatorio.
4. **Confirmaciones**: Las alertas son simples. Considerar componentes Modal custom.
5. **Datos**: Todos simulados. Integrar con API real para persistencia.

## Changelog

### v1.0.0 (Current)
- ✅ Vista de perfil con información del usuario
- ✅ Edición de datos personales
- ✅ Cambio de contraseña
- ✅ Información de cuenta (rol, fecha, seguridad)
- ✅ Preferencias de usuario
- ✅ Zona de peligro con logout
- ✅ Validación de formularios
- ✅ Mensajes de éxito/error con auto-dismiss
- ✅ Responsive design
- ⏳ Foto de perfil (próxima)
- ⏳ API integration (próxima)
- ⏳ 2FA (próxima)

---

**Last Updated**: 2026-01-28
**Status**: ✅ Feature Complete (Mock Data)
**Next Step**: API Integration y Foto de Perfil

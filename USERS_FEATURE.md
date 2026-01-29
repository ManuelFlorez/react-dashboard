# Gestión de Usuarios - Documentación

## Descripción General

La vista de usuarios permite administrar todos los usuarios del sistema, incluyendo:
- 📋 Listar usuarios con información básica
- 🔍 Auditar actividad de usuarios (historial de inicio de sesión)
- 🚫 Bloquear/desbloquear usuarios
- 📊 Ver estadísticas de acceso

## Estructura de Componentes

### `src/pages/Users.jsx`
Página principal que gestiona el estado global de usuarios:
- Carga de lista de usuarios
- Manejo de modales (auditoría, bloqueo, crear usuario)
- Control de paginación (5 usuarios por página)
- Actualización optimista de estado

### `src/components/UserTable.jsx`
Tabla responsiva que muestra:
- Email y nombre del usuario
- Rol (Administrador, Usuario)
- Último inicio de sesión (tiempo relativo)
- Total de inicios de sesión
- Estado (Activo, Bloqueado, Inactivo)
- Botones de acción (Auditar, Bloquear/Desbloquear)
- Manejo de tabla vacía

### `src/components/Pagination.jsx`
Componente de paginación inteligente:
- Botones Anterior/Siguiente
- Números de página con elipsis
- Indicador de página actual
- Deshabilita botones en límites

### `src/components/CreateUserModal.jsx`
Modal para crear nuevos usuarios:
- Campos: Nombre, Email, Rol, Contraseña
- Validaciones: Email válido, contraseña mínimo 6 caracteres
- Confirmación de contraseña
- Asignación automática de rol (Usuario/Administrador)

### `src/components/UserAuditModal.jsx`
Modal que muestra:
- Información del usuario
- Historial completo de actividad
- IP address
- Dispositivo/User Agent
- Fechas y horas exactas

### `src/components/BlockUserModal.jsx`
Modal para bloquear usuarios con:
- Selección de razón del bloqueo
- Campo de texto para razón personalizada
- Advertencia sobre las consecuencias

## Integración con API

### Endpoints Requeridos

```javascript
// En src/services/api.js
export const usersService = {
  getAll: () => api.get('/users'),          // GET /users
  getById: (id) => api.get(`/users/${id}`), // GET /users/:id
  block: (id, reason) => api.post(`/users/${id}/block`, { reason }),
  unblock: (id) => api.post(`/users/${id}/unblock`),
  getAuditLog: (id) => api.get(`/users/${id}/audit`),
}
```

### Estructura de Datos Esperada

```javascript
{
  id: string,
  email: string,
  name: string,
  role: 'admin' | 'user',
  status: 'active' | 'blocked' | 'inactive',
  lastLogin: Date,
  loginCount: number
}
```

### Estructura del Log de Auditoría

```javascript
{
  id: string,
  action: string,
  timestamp: Date,
  ipAddress: string,
  userAgent: string,
  status: 'success' | 'failed'
}
```

## Cómo Usar

### 1. Listar Usuarios
```javascript
import { usersService } from '../services/api'

// En un useEffect o función
const response = await usersService.getAll()
const users = response.data
```

### 2. Ver Auditoría de Usuario
```javascript
const auditLog = await usersService.getAuditLog(userId)
// Muestra historial en UserAuditModal
```

### 3. Bloquear Usuario
```javascript
await usersService.block(userId, 'Razón del bloqueo')
```

### 4. Desbloquear Usuario
```javascript
await usersService.unblock(userId)
```

## Características Actuales

✅ **Paginación Inteligente**: 5 usuarios por página con navegación fluida
✅ **Crear Usuarios**: Modal con validaciones de datos
✅ **Demo Mode**: Datos simulados para prueba sin API (8 usuarios)
✅ **Formateo de Fechas**: Muestra tiempos relativos ("hace 2 horas")
✅ **Badges Visuales**: Estados y roles con colores distintivos
✅ **Modales Modales**: Auditoría, bloqueo y crear en componentes separados
✅ **Responsive Design**: Tabla adaptable a dispositivos móviles
✅ **Contador Total**: Muestra cantidad total de usuarios
 por email/nombre
- [ ] Filtros por rol, estado, última actividad
- [ ] Ordenamiento de columnas (email, nombre, fecha login)
- [ ] Exportación a CSV
- [ ] Edición de información de usuario existente
- [ ] Eliminación de usuarios
- [ ] Historial de cambios (quién bloqueó, cuándo, por qué)
- [ ] Bulk actions (bloquear múltiples usuarios)
- [ ] Envío de invitación por email al crear usuario
- [ ] Edición de información de usuario
- [ ] Eliminación de usuarios
- [ ] Historial de cambios (quién bloqueó, cuándo, por qué)

## Configuración de Fechas

El componente usa `date-fns` para formatear fechas en español:

```javascript
import { formatDistanceToNow, format } from 'date-fns'
import { es } from 'date-fns/locale'

// Tiempo relativo: "hace 2 horas"
formatDistanceToNow(date, { addSuffix: true, locale: es })

// Fecha completa: "28 de enero de 2026 a las 14:30"
format(date, "dd 'de' MMMM 'de' yyyy 'a las' HH:mm", { locale: es })
```

## Notas de Desarrollo

- Actualmente los datos son simulados; reemplaza `loadUsers()` con llamada a `usersService.getAll()`
- Los cambios de estado (bloquear/desbloquear) son optimistas; integra con API para persistencia
- El modal de auditoría también usa datos simulados; integra con `usersService.getAuditLog(id)`

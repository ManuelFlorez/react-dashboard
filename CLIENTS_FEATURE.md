# 🏢 Reporte de Clientes - Feature Documentation

## Overview

La página de **Clientes** proporciona una interfaz completa para gestionar clientes de dos tipos diferentes: **Usuario App** y **Usuario Voucher**. Permite filtrar, visualizar detalles y analizar el comportamiento de compra de cada cliente.

## Features Principales

### 1. **Tipos de Cliente**

#### Usuario App (📱)
- Clientes que acceden mediante la aplicación móvil o web
- Acceso completo a todas las funcionalidades
- Pueden realizar compras ilimitadas
- Sin restricciones de código/voucher

#### Usuario Voucher (🎟️)
- Clientes que utilizan códigos de descuento o vouchers
- Acceso limitado por validación de vouchers
- Requieren voucher válido para cada compra
- Generalmente clientes puntuales o promocionales

### 2. **Filtros Avanzados**
```javascript
filterType: 'all' | 'user_app' | 'user_voucher'
filterStatus: 'all' | 'active' | 'inactive'
// Permite combinar filtros para búsqueda específica
```

### 3. **Información de Clientes**
- Email y nombre
- Tipo de cliente con badge de color
- Estado (activo/inactivo)
- Número total de compras
- Gasto total acumulado
- Último acceso (tiempo relativo)

### 4. **Detalles Extendidos**
Modal con información completa del cliente:
- Datos básicos (nombre, email)
- Tipo y estado
- Fecha de registro
- Último acceso
- Estadísticas: total compras, gasto total, gasto promedio
- Botón para enviar mensaje

### 5. **Paginación**
- 5 clientes por página
- Navegación con botones Anterior/Siguiente
- Números de página directos
- Información de página actual/total

## Estructura de Componentes

### `src/pages/Clients.jsx` (280 líneas)

#### State Management
```javascript
const [allClients, setAllClients] = useState([...]) // Array de clientes
const [currentPage, setCurrentPage] = useState(1)   // Página actual
const [filterType, setFilterType] = useState('all') // Filtro por tipo
const [filterStatus, setFilterStatus] = useState('all') // Filtro por estado
const [selectedClient, setSelectedClient] = useState(null) // Cliente en modal
const [showDetailsModal, setShowDetailsModal] = useState(false) // Visibilidad modal
```

#### Data Structure
```javascript
{
  id: 1,
  name: 'Juan García',
  email: 'juan.garcia@email.com',
  type: 'user_app' | 'user_voucher',
  status: 'active' | 'inactive',
  joinDate: Date,
  lastActive: Date,
  totalPurchases: number,
  totalSpent: number
}
```

#### Mock Data
```javascript
// 6 clientes predefinidos con:
// - 4 clientes tipo "user_app"
// - 2 clientes tipo "user_voucher"
// - Mix de estados activos e inactivos
// - Diferentes niveles de compra y gasto
```

## UI Layout

### 1. **Header**
- Título "Clientes"
- Contador total de clientes
- Área para acciones futuras (crear cliente, exportar, etc.)

### 2. **Sección de Filtros**
- Selector de "Tipo de Cliente" (Todos, Usuario App, Usuario Voucher)
- Selector de "Estado" (Todos, Activos, Inactivos)
- Contador de resultados encontrados

### 3. **Tabla de Clientes**
Columnas:
- Email
- Nombre
- Tipo (badge con color: azul para App, púrpura para Voucher)
- Estado (badge con color: verde para activo, gris para inactivo)
- Compras (número total)
- Gasto Total (formato moneda)
- Último Acceso (tiempo relativo: "hace 2 horas", "hace 3 días", etc.)
- Acciones (botón "Ver detalles")

### 4. **Modal de Detalles**
- Información básica (nombre, email, tipo, estado)
- Fechas importantes (registro, último acceso)
- 3 tarjetas con estadísticas:
  - Total Compras (azul)
  - Gasto Total (verde)
  - Gasto Promedio (púrpura)
- Botones: Cerrar, Enviar mensaje

### 5. **Información Útil**
- Explicación de tipos de clientes
- Características y diferencias entre tipos

## Styling

### Colores por Tipo
- **Usuario App**: Azul (`bg-blue-100`, `text-blue-800`)
- **Usuario Voucher**: Púrpura (`bg-purple-100`, `text-purple-800`)

### Colores por Estado
- **Activo**: Verde (`bg-green-100`, `text-green-800`)
- **Inactivo**: Gris (`bg-gray-100`, `text-gray-800`)

### Tarjetas de Estadísticas
- Compras: Fondo azul claro
- Gasto Total: Fondo verde claro
- Gasto Promedio: Fondo púrpura claro

### Responsive Design
```
Mobile: 1 columna en filtros
Tablet (md): 2-3 columnas en filtros
Desktop (lg): 3 columnas en filtros
Tabla: Scroll horizontal si es necesario
```

## Handlers & Functions

### `filterClients()`
```javascript
const filteredClients = allClients.filter((client) => {
  const typeMatch = filterType === 'all' || client.type === filterType
  const statusMatch = filterStatus === 'all' || client.status === filterStatus
  return typeMatch && statusMatch
})
```

### `handleViewDetails(client)`
```javascript
const handleViewDetails = (client) => {
  setSelectedClient(client)
  setShowDetailsModal(true)
}
```

### `getTypeBadge(type)` / `getStatusBadge(status)`
```javascript
// Retorna componente badge con color y texto apropiado
const badge = badges[type] // Objeto con bg, text, label
return <span className={...}>{badge.label}</span>
```

### `calculateAverageSpent()`
```javascript
// En el modal de detalles
const average = selectedClient.totalSpent / selectedClient.totalPurchases
// Resultado: $23.50
```

## Data Integration Points

### Mock Data (Current)
- Array `allClients` con 6 clientes
- Fechas simuladas con diferentes patrones
- Todos los datos incrustados en el componente

### API Integration (Future)
```javascript
// Endpoints esperados:
GET /api/clients?type=user_app&status=active&page=1&limit=5
GET /api/clients/:id
POST /api/clients/search?query=email
POST /api/clients/:id/message
POST /api/clients/:id/block
POST /api/clients/:id/unblock
```

### Service Integration
```javascript
// Agregar a src/services/api.js:
export const clientsService = {
  getAll: (type, status, page) => 
    api.get('/clients', { params: { type, status, page } }),
  getById: (id) => 
    api.get(`/clients/${id}`),
  sendMessage: (id, message) => 
    api.post(`/clients/${id}/message`, { message }),
  getStatistics: () => 
    api.get('/clients/statistics'),
}
```

## State Management Pattern

### Component-Level State
```javascript
// Datos
const [allClients, setAllClients] = useState([...])

// Paginación
const [currentPage, setCurrentPage] = useState(1)

// Filtros
const [filterType, setFilterType] = useState('all')
const [filterStatus, setFilterStatus] = useState('all')

// Modal
const [selectedClient, setSelectedClient] = useState(null)
const [showDetailsModal, setShowDetailsModal] = useState(false)

// TODO: Para API integration
// const [loading, setLoading] = useState(false)
// const [error, setError] = useState(null)
```

### Derived Data
```javascript
// Clientes después de aplicar filtros
const filteredClients = allClients.filter(...)

// Total de páginas
const totalPages = Math.ceil(filteredClients.length / CLIENTS_PER_PAGE)

// Clientes para la página actual
const paginatedClients = filteredClients.slice(startIndex, endIndex)
```

## Validations

### Current
- Validación de tipo de cliente (user_app, user_voucher)
- Validación de estado (active, inactive)
- Validación de navegación entre páginas
- Verificación de existencia de cliente antes de mostrar modal

### Future (API Integration)
- Validar email cuando se crea nuevo cliente
- Validar que el voucher sea válido para usuario_voucher
- Manejar errores de API con mensajes descriptivos
- Validar permisos para ver información sensible de cliente

## Accesibilidad

- Labels asociados a selects
- Botones con texto descriptivo
- Contraste de colores suficiente
- Estructura semántica (table, thead, tbody, button)
- Aria-labels en botones de acción

## Performance Considerations

### Optimizations
- Safe navigation: `paginatedClients?.map()` previene errores
- Cálculo de paginación solo cuando cambian filtros/página
- Filtrado local en lugar de API calls (mientras sea mock data)
- CSS transitions en lugar de animaciones complejas

### Future Optimizations
- Lazy load de datos de clientes grandes
- Virtualization para tablas con muchos registros
- Caché de clientes frecuentemente visitados
- Debounce en cambios de filtros
- Infinite scroll en lugar de paginación tradicional

## Testing Strategy

### Unit Tests
```javascript
// Test: Filtrado por tipo funciona correctamente
test('filtering by client type works correctly', () => {
  render(<Clients />)
  fireEvent.change(filterType, { target: { value: 'user_app' } })
  const userAppClients = filteredClients.filter(c => c.type === 'user_app')
  expect(paginatedClients).toEqual(userAppClients.slice(0, 5))
})

// Test: Modal se abre con datos correctos
test('client details modal shows correct data', () => {
  render(<Clients />)
  fireEvent.click(screen.getByText('Ver detalles'))
  expect(screen.getByText('Juan García')).toBeInTheDocument()
})

// Test: Paginación navega correctamente
test('pagination navigates between pages', () => {
  render(<Clients />)
  fireEvent.click(screen.getByText('2'))
  expect(currentPage).toBe(2)
})
```

### Integration Tests
```javascript
// Test: Cambio de filtro actualiza tabla
// Test: Combinación de filtros funciona correctamente
// Test: Modal muestra estadísticas correctas
```

## Future Enhancements

### Short Term
- [ ] Agregar búsqueda por email/nombre
- [ ] Envío real de mensajes a clientes
- [ ] Exportación a CSV con datos de clientes
- [ ] Gráficos de distribución de clientes por tipo

### Medium Term
- [ ] API integration con backend
- [ ] Crear nuevos clientes desde la interfaz
- [ ] Editar información de clientes
- [ ] Historial de compras por cliente

### Long Term
- [ ] Dashboard de análisis de clientes
- [ ] Predicción de churn (clientes que se irán)
- [ ] Segmentación automática de clientes
- [ ] Recomendaciones personalizadas por cliente
- [ ] Sistema de loyalty points

## Known Limitations

### Current Version
- Datos completamente simulados (6 clientes)
- No hay búsqueda por nombre/email
- Los filtros solo funcionan con datos locales
- Envío de mensaje simula con alert
- No hay historial de compras detallado

### Production Readiness
- ⚠️ Requiere autenticación y autorización
- ⚠️ Requiere validación de vouchers en API
- ⚠️ Requiere caché para clientes con muchos registros
- ⚠️ Requiere logs de auditoría para accesos sensibles

## Code Examples

### Agregar nuevo cliente al estado
```javascript
const handleAddClient = (newClient) => {
  setAllClients([...allClients, {
    ...newClient,
    id: Date.now(),
    joinDate: new Date(),
    lastActive: new Date(),
  }])
}
```

### Actualizar estado de cliente
```javascript
const handleStatusChange = (clientId, newStatus) => {
  setAllClients(allClients.map(client =>
    client.id === clientId ? { ...client, status: newStatus } : client
  ))
}
```

### Combinar filtros
```javascript
const filteredClients = allClients.filter(client => {
  const typeMatch = filterType === 'all' || client.type === filterType
  const statusMatch = filterStatus === 'all' || client.status === filterStatus
  const searchMatch = searchTerm === '' || 
    client.name.toLowerCase().includes(searchTerm) ||
    client.email.toLowerCase().includes(searchTerm)
  return typeMatch && statusMatch && searchMatch
})
```

## Routing

```javascript
// En App.jsx:
<Route path="clients" element={<Clients />} />

// Navegación desde Sidebar:
<Link to="clients" className="...">Clientes</Link>

// URL: http://localhost:5173/clients
```

## Related Files

- `src/pages/Clients.jsx` - Página principal de clientes
- `src/components/Card.jsx` - Componente reutilizable para tarjetas
- `src/components/Sidebar.jsx` - Navegación (incluye "Clientes")
- `src/services/api.js` - Servicios para llamadas API (futuro)
- `src/App.jsx` - Configuración de rutas
- `src/hooks/useApi.js` - Hook para fetching de datos (futuro)

## Notes for Developers

1. **Mock Data**: Los datos son simulados. Para integración real, reemplazar con llamadas API.
2. **Búsqueda**: Actualmente no hay búsqueda. Considerar agregar búsqueda en tiempo real.
3. **Mensajes**: El botón "Enviar mensaje" simula con alert. Integrar con sistema de notificaciones.
4. **Vouchers**: Para usuario_voucher, considerar mostrar vouchers usados y disponibles.
5. **Compras**: Considerar expandir modal para mostrar historial de compras detallado.

## Changelog

### v1.0.0 (Current)
- ✅ Página de clientes con dos tipos (User App, User Voucher)
- ✅ Filtros por tipo y estado
- ✅ Tabla con información detallada de clientes
- ✅ Modal con detalles y estadísticas de cliente
- ✅ Paginación (5 clientes por página)
- ✅ Badges de color para tipos y estados
- ✅ Integración con menú Sidebar
- ✅ Responsive design (mobile, tablet, desktop)
- ⏳ Búsqueda por email/nombre (próxima)
- ⏳ API integration (próxima)
- ⏳ Creación/edición de clientes (próxima)

---

**Last Updated**: 2026-01-28
**Status**: ✅ Feature Complete (Mock Data)
**Next Step**: Búsqueda y API Integration

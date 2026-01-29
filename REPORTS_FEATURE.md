# 📊 Reporte de Reportes - Feature Documentation

## Overview

La página de **Reportes** proporciona un panel integral de análisis y visualización de datos del sistema. Permite a los administradores generar, filtrar, visualizar y exportar reportes en múltiples formatos.

## Features Principales

### 1. **Selección de Reportes**
- **Reporte de Usuarios**: Análisis de usuarios activos, nuevos y bloqueados
- **Reporte de Inicios de Sesión**: Estadísticas de accesos y patrones de uso
- **Reporte de Seguridad**: Análisis de intentos fallidos y alertas
- **Reporte de Actividad**: Seguimiento de cambios en el sistema

### 2. **Filtros Avanzados**
```javascript
dateRange: '7days' | '30days' | '90days' | 'ytd' | 'custom'
// Permite filtrar por períodos predefinidos o rangos personalizados
startDate: Date
endDate: Date
```

### 3. **Visualización de Datos**
- **Métricas Principales**: Cards con KPIs principales del reporte seleccionado
- **Gráfico de Distribución**: Barras de progreso que muestran la proporción de datos
- **Tabla de Detalles**: Tabla con métricas, valores, porcentajes y cambios

### 4. **Exportación**
Formatos soportados:
- **PDF**: Reporte formateado para imprimir
- **CSV**: Datos en formato de tabla
- **Excel**: Hoja de cálculo editable
- **JSON**: Formato estructurado para integración

### 5. **Acciones de Descarga**
- 📥 Descargar reporte
- 🖨️ Imprimir
- 📧 Enviar por email

## Estructura de Componentes

### `src/pages/Reports.jsx` (180 líneas)

#### State Management
```javascript
const [selectedReport, setSelectedReport] = useState('users')
const [dateRange, setDateRange] = useState('30days')
const [exportFormat, setExportFormat] = useState('pdf')
```

#### Data Structure
```javascript
const reports = [
  {
    id: 'users',
    name: 'Reporte de Usuarios',
    icon: '👥',
    description: '...',
    data: {
      totalUsers: 127,
      activeUsers: 98,
      blockedUsers: 12,
      newUsers: 15,
      growth: '+12%'
    }
  },
  // ... more reports
]
```

#### Chart Data
```javascript
const chartData = {
  users: [
    { label: 'Usuarios Activos', value: 98 },
    { label: 'Usuarios Nuevos', value: 15 },
    // ...
  ],
  // ... more chart data for other reports
}
```

## UI Layout

### 1. **Header**
- Título "Reportes"
- Selector de formato de exportación (PDF, CSV, Excel, JSON)
- Botón "Exportar"

### 2. **Sección de Filtros**
- Selector de rango de fechas (7 días, 30 días, 90 días, año a la fecha, personalizado)
- Input "Desde" (date picker)
- Input "Hasta" (date picker)

### 3. **Selección de Reportes**
- Grid de 4 columnas en desktop, 2 en tablet, 1 en mobile
- Cada tarjeta muestra: ícono, nombre, descripción
- Tarjeta seleccionada destaca con borde y fondo azul

### 4. **Reporte Detallado**
- **Métricas**: Grid responsive que muestra KPIs principales
- **Distribución**: Barras de progreso con colores gradientes
- **Tabla**: Detalles con comparativas y cambios porcentuales
- **Acciones**: Botones para descargar, imprimir, enviar por email

### 5. **Información Útil**
- Cards con información sobre reportes disponibles
- Opciones de exportación y sus descripciones

## Styling

### Colores
- **Primary**: Azul (#3b82f6) para botones y selecciones
- **Gradients**: `from-blue-50 to-indigo-50` para tarjetas de métricas
- **Progress Bars**: Gradiente `from-primary to-indigo-600`
- **Hover States**: `hover:bg-white`, `hover:bg-blue-600`, `hover:border-gray-300`

### Responsive Design
```
Mobile: 1 columna
Tablet (md): 2 columnas
Desktop (lg): 4 columnas
```

### Spacing
- Padding: `p-4`, `p-6`
- Gaps: `gap-3`, `gap-4`, `gap-6`
- Margins: Tailwind spacing scale

## Handlers & Functions

### `handleExport()`
```javascript
const handleExport = () => {
  alert(`Exportando reporte en formato ${exportFormat.toUpperCase()}...`)
  // TODO: Implementar API call para generar y descargar reporte
}
```

### `handleDownload()`
```javascript
const handleDownload = () => {
  alert('Descargando reporte...')
  // TODO: Implementar descarga del reporte en formato seleccionado
}
```

### Dynamic Chart Rendering
```javascript
chartData[selectedReport]?.map((item, idx) => {
  const maxValue = Math.max(...)
  const percentage = (item.value / maxValue) * 100
  // Renderiza barra de progreso con altura dinámica
})
```

## Data Integration Points

### Mock Data (Current)
- `reports` array con 4 reportes predefinidos
- `chartData` objeto con datos para gráficos
- Valores hardcodeados para métricas

### API Integration (Future)
```javascript
// Endpoints esperados:
GET /api/reports/users?dateRange=30days
GET /api/reports/logins?dateRange=30days
GET /api/reports/security?dateRange=30days
GET /api/reports/activity?dateRange=30days

POST /api/reports/export?format=pdf&type=users&dateRange=30days
```

### Service Integration
```javascript
// Agregar a src/services/api.js:
export const reportsService = {
  getReport: (type, dateRange) => 
    api.get(`/reports/${type}`, { params: { dateRange } }),
  exportReport: (type, format, dateRange) => 
    api.post('/reports/export', { type, format, dateRange }),
  emailReport: (type, email, dateRange) =>
    api.post('/reports/email', { type, email, dateRange }),
}
```

## State Management Pattern

### Component-Level State
```javascript
// Current selection
const [selectedReport, setSelectedReport] = useState('users')

// Filters
const [dateRange, setDateRange] = useState('30days')

// Export options
const [exportFormat, setExportFormat] = useState('pdf')

// TODO: For API integration
// const [loading, setLoading] = useState(false)
// const [error, setError] = useState(null)
// const [reportData, setReportData] = useState(null)
```

### Derived Data
```javascript
// Selected report details
const selectedReportData = reports.find(r => r.id === selectedReport)

// Chart data for selected report
const chartData[selectedReport]
```

## Validations

### Current
- Validación de reporte seleccionado (existe en array)
- Validación de rango de fechas (valores predefinidos)
- Validación de formato de exportación (pdf, csv, excel, json)

### Future (API Integration)
- Validar rangos de fechas personalizados (fecha inicio < fecha fin)
- Validar que el usuario tenga permisos para ver reportes específicos
- Manejar errores de API con mensajes descriptivos

## Accesibilidad

- Labels asociados a inputs
- Botones con aria-labels descriptivos
- Contraste de colores suficiente
- Estructura semántica (h2, h3, h4, button, table)

## Performance Considerations

### Optimizations
- `chart Data[selectedReport]?.map()` - Safe navigation para prevenir errores
- Cálculo de porcentajes solo cuando se necesita renderizar
- CSS transitions en lugar de animaciones complejas

### Future Optimizations
- Lazy load de datos de reportes grandes
- Caché de reportes generados recientemente
- Pagination en tabla de detalles si hay muchos registros
- Debounce en cambios de filtros

## Testing Strategy

### Unit Tests
```javascript
// Test: Selección de reporte actualiza datos mostrados
test('changing selected report updates displayed metrics', () => {
  render(<Reports />)
  fireEvent.click(screen.getByText('Reporte de Seguridad'))
  expect(screen.getByText('8')).toBeInTheDocument() // suspiciousAttempts
})

// Test: Exportación con formato correcto
test('export button sends correct format', () => {
  render(<Reports />)
  fireEvent.change(exportFormat, { target: { value: 'excel' } })
  fireEvent.click(screen.getByText('Exportar'))
  expect(handleExport).toHaveBeenCalledWith('excel')
})

// Test: Cálculo de porcentajes correcto
test('percentage calculation is correct', () => {
  const total = 100
  const value = 25
  const percentage = (value / total) * 100
  expect(percentage).toBe(25)
})
```

### Integration Tests
```javascript
// Test: Filtro de fechas y reporte se combinan correctamente
// Test: Exportación genera archivo en formato correcto
// Test: Tabla de detalles muestra datos del reporte seleccionado
```

## Future Enhancements

### Short Term
- [ ] Agregar gráficos reales (Chart.js o Recharts)
- [ ] Implementar filtros avanzados (usuario específico, tipo de evento)
- [ ] Agregar búsqueda en tabla de detalles
- [ ] Exportación real a PDF/CSV/Excel

### Medium Term
- [ ] API integration con backend
- [ ] Guardado de reportes personalizados
- [ ] Programa automático de reportes (envío por email)
- [ ] Comparación de períodos (este mes vs mes anterior)

### Long Term
- [ ] Dashboard en tiempo real con WebSockets
- [ ] Predicciones basadas en datos históricos
- [ ] Análisis de tendencias avanzado
- [ ] Integración con sistemas de BI externos

## Known Limitations

### Current Version
- Datos completamente simulados
- Gráficos básicos (barras de progreso en lugar de Charts)
- Exportación simula con alert (no genera archivos reales)
- Filtros de fecha no afectan datos (siempre muestra los mismos)
- Email no se envía realmente

### Production Readiness
- ⚠️ Requiere autenticación y autorización de usuario
- ⚠️ Requiere validación de permisos por tipo de reporte
- ⚠️ Requiere caché para reportes pesados
- ⚠️ Requiere logs de auditoría para accesos

## Code Examples

### Agregar nuevo tipo de reporte
```javascript
const reports = [
  // ... existing reports
  {
    id: 'payments',
    name: 'Reporte de Pagos',
    icon: '💳',
    description: 'Análisis de pagos y transacciones',
    data: {
      totalPayments: 5234,
      successRate: '98.5%',
      totalAmount: '$125,450',
      avgTransaction: '$23.50',
      failedPayments: 79,
    },
  },
]

const chartData = {
  // ... existing chart data
  payments: [
    { label: 'Pagos Exitosos', value: 5155 },
    { label: 'Pagos Fallidos', value: 79 },
  ],
}
```

### Cambiar formato de exportación
```javascript
// El select con id="exportFormat" actualiza el state:
<select
  value={exportFormat}
  onChange={(e) => setExportFormat(e.target.value)}
>
  <option value="pdf">PDF</option>
  <option value="csv">CSV</option>
  <option value="excel">Excel</option>
  <option value="json">JSON</option>
</select>

// El botón usa el valor:
<button onClick={() => handleExport()}>
  Exportar en {exportFormat.toUpperCase()}
</button>
```

## Routing

```javascript
// En App.jsx:
<Route path="reports" element={<Reports />} />

// Navegación desde Sidebar:
<Link to="reports" className="...">Reportes</Link>

// URL: http://localhost:5173/reports
```

## Related Files

- `src/pages/Reports.jsx` - Página principal de reportes
- `src/components/Card.jsx` - Componente reutilizable para tarjetas
- `src/services/api.js` - Servicios para llamadas API (futuro)
- `src/App.jsx` - Configuración de rutas
- `src/components/Sidebar.jsx` - Navegación incluye "Reportes"

## Notes for Developers

1. **Mock Data**: Todos los datos son simulados. Para integración real, reemplazar con llamadas API.
2. **Charts**: Actualmente se usan barras de progreso simples. Considerar Chart.js o Recharts para gráficos más complejos.
3. **Exportación**: Los botones muestran alertas. Implementar generación real de archivos.
4. **Filtros**: Los selectores de rango de fechas no afectan los datos mostrados actualmente.
5. **Performance**: Para reportes con muchos datos, considerar pagination o virtualization.

## Changelog

### v1.0.0 (Current)
- ✅ Página de reportes con 4 tipos predefinidos
- ✅ Filtros por rango de fechas
- ✅ Visualización de métricas, distribución y detalles
- ✅ Opciones de exportación (PDF, CSV, Excel, JSON)
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Información útil sobre reportes
- ⏳ API integration (próxima)
- ⏳ Gráficos avanzados (próxima)
- ⏳ Exportación real (próxima)

---

**Last Updated**: 2026-01-28
**Status**: ✅ Feature Complete (Mock Data)
**Next Step**: API Integration

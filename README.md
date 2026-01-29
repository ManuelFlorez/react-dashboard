# React Dashboard

Dashboard moderno construido con React 18, Vite y Tailwind CSS.

## 🚀 Características

- ⚡ Vite para desarrollo rápido
- ⚛️ React 18 con hooks
- 🎨 Tailwind CSS para estilos
- 🔀 React Router v6 con rutas protegidas
- 🔐 Sistema de autenticación con Context API
- 👥 Gestión completa de usuarios (auditoría, bloqueo, paginación)
- ⚙️ Panel de configuración completo
- 🧪 Vitest para pruebas
- 📋 ESLint + Prettier

## 📦 Instalación

```bash
npm install
```

## 🛠️ Desarrollo

```bash
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

## 🏗️ Estructura del Proyecto

```
src/
├── components/        # Componentes reutilizables
├── pages/            # Páginas principales
├── services/         # Lógica de API y servicios
├── hooks/            # Custom hooks
├── utils/            # Funciones auxiliares
├── context/          # Context API
├── App.jsx
└── main.jsx
```

## 📚 Scripts Disponibles

| Script | Descripción |
|--------|------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Compila para producción |
| `npm run preview` | Previsualiza la compilación |
| `npm run lint` | Valida el código con ESLint |
| `npm run format` | Formatea el código con Prettier |
| `npm test` | Ejecuta los tests |

## � Sistema de Autenticación

El proyecto incluye un sistema de autenticación completo basado en Context API:

- **Página de Login** (`src/pages/Login.jsx`): Formulario de inicio de sesión
- **AuthContext** (`src/context/AuthContext.jsx`): Gestiona el estado global de autenticación
- **useAuth Hook** (`src/hooks/useAuth.js`): Accede al estado de autenticación
- **ProtectedRoute** (`src/components/ProtectedRoute.jsx`): Protege rutas privadas

### Flujo de Autenticación

1. Usuario accede a `/login`
2. Introduce credenciales y hace clic en "Iniciar sesión"
3. Los datos se guardan en localStorage
4. Se redirige al dashboard
5. Las rutas protegidas verifican si hay usuario activo
6. Click en "Cerrar sesión" limpia los datos y redirige a login

**Nota de desarrollo**: Actualmente acepta cualquier email/contraseña. Reemplaza la función `login` en `AuthContext.jsx` con tu API real.

## �🔗 Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```
VITE_API_URL=http://localhost:3001/api
```

## 📖 Documentación

Ver [.github/copilot-instructions.md](./.github/copilot-instructions.md) para convenciones del proyecto y guías para agentes IA.

### Características por Módulo

#### Gestión de Usuarios
Para información detallada sobre la vista de usuarios, auditoría y bloqueo de usuarios, consulta [USERS_FEATURE.md](./USERS_FEATURE.md).
- 📋 Tabla de usuarios con información detallada
- 🔍 Modal de auditoría con historial de actividad
- 🚫 Bloqueo/desbloqueo de usuarios con razones
- 📊 Estadísticas de acceso por usuario
- ➕ Crear nuevos usuarios
- 📄 Paginación (5 usuarios por página)

#### Gestión de Clientes
Para información detallada sobre la vista de clientes, consulta [CLIENTS_FEATURE.md](./CLIENTS_FEATURE.md).
- 🏢 Tabla de clientes con dos tipos: Usuario App y Usuario Voucher
- 🔍 Filtros por tipo de cliente y estado
- 📊 Estadísticas de compras y gastos por cliente
- 👁️ Modal de detalles con información completa
- 💾 Gasto total y promedio por cliente
- 📄 Paginación (5 clientes por página)

#### Configuración
Para información sobre el panel de configuración, consulta [SETTINGS_FEATURE.md](./SETTINGS_FEATURE.md).
- 📋 Configuración general (aplicación, empresa, tema)
- 🔔 Preferencias de notificación
- 🔒 Cambio de contraseña
- 👤 Información de cuenta
- 💾 Respaldo y recuperación de datos
- ⚠️ Zona de peligro (eliminar cuenta)

#### Reportes
Para información detallada sobre reportes y análisis, consulta [REPORTS_FEATURE.md](./REPORTS_FEATURE.md).
- 📊 4 tipos de reportes (usuarios, inicios, seguridad, actividad)
- 🔍 Filtros avanzados por fecha
- 📈 Visualización de datos con métricas y gráficos
- 💾 Múltiples opciones de exportación (PDF, CSV, Excel, JSON)
- 📧 Descarga, impresión y envío por email

## 📄 Licencia

MIT

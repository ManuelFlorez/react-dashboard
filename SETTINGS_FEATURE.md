# Página de Configuración - Documentación

## Descripción

La página de Configuración permite a los administradores y usuarios gestionar:
- Información general de la aplicación
- Preferencias de notificación
- Seguridad y cambio de contraseña
- Información de cuenta
- Respaldo y recuperación de datos
- Opciones avanzadas (zona de peligro)

## Estructura

La página se compone de varias tarjetas (Cards) con diferentes secciones:

### 1. Configuración General (📋)
- **Nombre de la Aplicación**: Personalizar el nombre mostrado
- **Nombre de la Empresa**: Información de la organización
- **Email de Contacto**: Email principal del administrador
- **Tema Visual**: Seleccionar entre claro, oscuro o automático

### 2. Notificaciones (🔔)
- **Notificaciones por Email**: Activar/desactivar alertas por email
- **Alertas de Login**: Notificar de nuevos inicios de sesión
- **Autenticación de Dos Factores (2FA)**: Habilitar seguridad adicional

### 3. Seguridad (🔒)
- **Cambio de Contraseña**: 
  - Contraseña actual (validación)
  - Nueva contraseña (mínimo 6 caracteres)
  - Confirmación de contraseña
- Validaciones:
  - Contraseña actual requerida
  - Nueva contraseña mínimo 6 caracteres
  - Coincidencia entre contraseñas

### 4. Información de la Cuenta (👤)
- Usuario actual
- Rol asignado
- Última sesión
- Sesiones activas

### 5. Respaldo y Recuperación (💾)
- **Descargar Respaldo**: Exportar datos
- **Restaurar desde Respaldo**: Recuperar datos anteriores
- Información de último respaldo

### 6. Zona de Peligro (⚠️)
- **Eliminar Cuenta**: Acción irreversible
- Advertencia clara sobre consecuencias

## Componentes Utilizados

- **Card**: Componente reutilizable para agrupar secciones
- **Formularios**: Inputs, checkboxes, selects
- **Mensajes**: Éxito y error con auto-desaparición

## Estado

El componente utiliza `useState` para:
- `formData`: Datos generales, notificaciones y preferencias
- `passwordForm`: Datos del formulario de contraseña
- `successMessage`: Mensajes de éxito (se limpian en 3 segundos)
- `errorMessage`: Mensajes de error

## Manejo de Errores

### Validaciones de Contraseña:
```javascript
- Contraseña actual: Requerida
- Nueva contraseña: Mínimo 6 caracteres
- Confirmación: Debe coincidir con nueva contraseña
```

## Funcionalidades Actuales

✅ **Formularios funcionales**: Todos los campos se actualizan en tiempo real
✅ **Validaciones**: Contraseña y datos requeridos
✅ **Mensajes visuales**: Éxito y error con auto-cierre
✅ **Diseño responsivo**: Se adapta a dispositivos móviles
✅ **Secciones organizadas**: Múltiples tarjetas para diferentes propósitos

## Próximas Mejoras

- [ ] Integración con API para guardar configuraciones
- [ ] Confirmación por email para cambios sensibles
- [ ] Historial de cambios de configuración
- [ ] Exportación de datos en múltiples formatos (JSON, CSV)
- [ ] Recuperación de cuenta con código de seguridad
- [ ] Gestión de sesiones activas
- [ ] Validación de email
- [ ] Preferencias de idioma
- [ ] Ajustes de privacidad
- [ ] Integración SSO (Single Sign-On)

## Rutas

- `/settings` - Página de configuración (requiere autenticación)

## Variables de Entorno

Actualmente no requiere variables específicas, pero en futuro podría usar:
- `VITE_API_SETTINGS_URL` - Endpoint para guardar configuraciones
- `VITE_BACKUP_URL` - Endpoint para respaldos

## Notas de Desarrollo

- Los cambios se guardan localmente (en estado del componente)
- Los mensajes de éxito/error se auto-limpian después de 3 segundos
- Los formularios se resetean después de operaciones exitosas
- La contraseña actual es validada en cliente (integrar con API real en producción)

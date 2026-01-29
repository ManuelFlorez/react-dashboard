# 🚀 GitHub Pages & GitHub Actions Setup

## ✅ Configuración Completada

Tu repositorio ya tiene:
- ✅ **Workflow de GitHub Actions** (`.github/workflows/deploy.yml`)
- ✅ **Vite configurado** para GitHub Pages (base: `/react-dashboard/`)
- ✅ **Despliegue automático** en cada push a `main`

## 🔧 Paso Final: Activar GitHub Pages

### 1. Ve a Settings del Repositorio
- URL: https://github.com/ManuelFlorez/react-dashboard/settings
- O: Click en **Settings** en tu repositorio

### 2. Busca "Pages" en el menú izquierdo
- Haz clic en **"Pages"**

### 3. Configura el Source
- **Source**: Selecciona `GitHub Actions`
- (En versiones antiguas podría ser `Deploy from a branch`)

### 4. Espera a que se complete
GitHub Actions ejecutará automáticamente:
1. Instalar dependencias (`npm ci`)
2. Construir el proyecto (`npm run build`)
3. Desplegar a GitHub Pages

### 5. Verifica el Deployment
Una vez completado, tu sitio estará en:
```
https://manuelflores.github.io/react-dashboard/
```

## 📋 Cómo Funciona

Cada vez que hagas:
```bash
git push origin main
```

GitHub Actions automáticamente:
1. ✅ Ejecuta el workflow `.github/workflows/deploy.yml`
2. ✅ Instala las dependencias
3. ✅ Construye el proyecto con `npm run build`
4. ✅ Despliega la carpeta `dist/` a GitHub Pages
5. ✅ Actualiza tu sitio en vivo

## 🔍 Monitorear el Deployment

### Ver el estado del workflow:
1. Ve a tu repositorio
2. Haz clic en **"Actions"** (tab superior)
3. Verás el historial de workflows
4. Haz clic en el workflow para ver detalles

### Colores del estado:
- 🟢 **Green** = Éxito (sitio desplegado)
- 🟠 **Orange** = En progreso
- 🔴 **Red** = Error (revisa los logs)

## ⚙️ Configuración del Workflow

El archivo `.github/workflows/deploy.yml` incluye:

```yaml
on:
  push:
    branches: [main]  # Se ejecuta en push a main
```

### Si quieres cambiar el trigger:
Edita `.github/workflows/deploy.yml` para ejecutarse en:
- **Pull Requests**: Agrega `pull_request`
- **Schedule**: Agrega `schedule`
- **Manual**: Agrega `workflow_dispatch`

### Ejemplo para agregar trigger manual:
```yaml
on:
  push:
    branches: [main]
  workflow_dispatch:  # Permite desplegar manualmente desde Actions
```

## 🔐 Permisos Automáticos

El workflow tiene permisos para:
- ✅ Leer el código (`contents: read`)
- ✅ Escribir en Pages (`pages: write`)
- ✅ Generar token de ID (`id-token: write`)

Estos permisos se activan automáticamente en GitHub.

## 📍 URLs Importantes

- **Repositorio**: https://github.com/ManuelFlorez/react-dashboard
- **Actions**: https://github.com/ManuelFlorez/react-dashboard/actions
- **Settings Pages**: https://github.com/ManuelFlorez/react-dashboard/settings/pages
- **Sitio Desplegado**: https://manuelflores.github.io/react-dashboard/

## ❓ Preguntas Frecuentes

**P: ¿Cuánto tarda el despliegue?**
A: Usualmente 1-2 minutos desde el push.

**P: ¿Cómo sé si funcionó?**
A: Ve a la URL `https://manuelflores.github.io/react-dashboard/` o revisa el tab "Actions".

**P: ¿Qué pasa si hay error?**
A: Ve a Actions → Click en el workflow fallido → Revisa los logs para ver el error.

**P: ¿Necesito hacer algo más?**
A: No, todo es automático. Solo haz push a main y se despliega solo.

**P: ¿Puedo desplegar una rama diferente?**
A: Sí, edita `.github/workflows/deploy.yml` y cambia `branches: [main]` a la rama que quieras.

## 🎯 Flujo de Trabajo

```
git add .
    ↓
git commit -m "Changes"
    ↓
git push origin main
    ↓
GitHub Actions se ejecuta automáticamente
    ↓
Tu sitio se despliega en GitHub Pages
    ↓
Accesible en https://manuelflores.github.io/react-dashboard/
```

---

¡Tu dashboard estará en vivo en pocos minutos! 🎉

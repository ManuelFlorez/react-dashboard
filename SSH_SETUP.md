# 🔐 SSH Setup para GitHub

## ✅ Clave SSH Generada

Tu clave SSH ha sido creada exitosamente en:
- **Privada**: `~/.ssh/github_key` (NO COMPARTAS)
- **Pública**: `~/.ssh/github_key.pub` (Para GitHub)

## 📋 Tu Clave Pública SSH

Copia la siguiente clave y agrégala a GitHub:

```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIPtqOrdfC/SaHBZoQ829j0yQwmsX/BUe1RFbTKGUM3Wl manuelflorezw@gmail.com
```

## 🚀 Pasos para agregar a GitHub

### 1. Ve a GitHub Settings
- Haz clic en tu foto de perfil → Settings
- O ve a: https://github.com/settings/keys

### 2. SSH and GPG keys
- Click en "New SSH key"
- Title: `React Dashboard SSH Key`
- Key type: Authentication Key
- Key: Pega la clave pública completa (arriba)
- Click en "Add SSH key"

### 3. Verifica la conexión
```bash
ssh -T git@github.com
```

Deberías ver:
```
Hi manuelflorezw! You've successfully authenticated, but GitHub does not provide shell access.
```

## 📤 Push el repositorio con SSH

```bash
cd c:\Users\ASUS\Documents\github\projects-react\dashboard

# Cambiar a rama main si es necesario
git branch -M main

# Agregar remote SSH (si no existe)
git remote add origin git@github.com:manuelflorezw/react-dashboard.git

# O si ya tiene remote HTTPS, cambiar:
git remote set-url origin git@github.com:manuelflorezw/react-dashboard.git

# Hacer push
git push -u origin main
```

## 🔑 Configuración Global (Opcional)

Si quieres usar SSH por defecto para todos los repositorios:

```bash
git config --global core.sshCommand "ssh -i $env:USERPROFILE\.ssh\github_key"
```

## ❓ Preguntas Frecuentes

**P: ¿Necesito hacer algo más?**
A: No, la clave ya está agregada al ssh-agent automáticamente.

**P: ¿Y si no funciona el push?**
A: Verifica que:
1. La clave pública está en GitHub (Settings > SSH and GPG keys)
2. Ejecuta: `ssh -T git@github.com` para probar la conexión
3. Usa la URL SSH: `git@github.com:usuario/repo.git` (no HTTPS)

**P: ¿Dónde guardé mi clave privada?**
A: En `C:\Users\ASUS\.ssh\github_key` (no la compartas con nadie)

---

¡Listo para hacer push al repositorio! 🎉

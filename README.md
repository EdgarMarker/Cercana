# 🚀 Proyecto Cercana - Guía de Instalación

## 📋 Requisitos previos
- Node.js v20+ (recomendado LTS)
- npm v9+
- Git instalado

## 🛠 Instalación

### 1. Abrir terminal y clonar el repositorio
```bash
git clone https://github.com/EdgarMarker/Amada.git
cd Amada
```
### 2. Configurar variables de entorno (Frontend)
```bash
cd frontend
git clone [SECRET_GIST_URL] .env_secrets && touch .env && cp .env_secrets/Amada.txt .env && rm -rf .env_secrets
```
### 3. Instalar dependencias
#### Frontend
```bash
npm install
```
#### Backend
```bash
cd ../backend
npm install
```

## ▶️ Ejecución del proyecto

### 1. Iniciar backend (desde /backend):
```bash
npm run dev
```
### 2. Iniciar frontend (desde /frontend):
```bash
cd ../frontend
npm run dev
```

## ⚠️ Notas importantes

#### No usar --force o --legacy-peer-deps para resolver conflictos de dependencias
#### Para problemas con Sanity/Astro, actualiza las dependencias dentro de (Frontend):
```bash
npm update astro @sanity/astro
```
#### Asegúrate que el archivo .env esté en .gitignore

## 🆘 Soporte
#### Para problemas técnicos, contactar a:
·Edgar Mendez - emendez.marker@gmail.com | Equipo de desarrollo Marker branding
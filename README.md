# 🚀 First Node API

Mi primera API REST con **Express.js** y **TypeScript** para aprender desarrollo backend con **JavaScript**

## 📋 Tabla de Contenidos

- [🛠️ Tecnologías](#️-tecnologías)
- [🚀 Instalación](#-instalación)
- [🏃‍♂️ Uso](#️-uso)
- [📡 Endpoints](#-endpoints)
- [🧪 Ejemplos de Uso](#-ejemplos-de-uso)
- [📝 Scripts Disponibles](#-scripts-disponibles)

## 🛠️ Tecnologías

- **Node.js** - Runtime de JavaScript
- **TypeScript** - Superset tipado de JavaScript
- **Express.js** - Framework web minimalista
- **ESLint** - Linter para mantener la calidad del código
- **Prettier** - Formateador de código
- **tsx** - TypeScript runner para desarrollo

## 🚀 Instalación

```bash
# Clona el repositorio
git clone <url-del-repositorio>
cd first-node-api

# Instala las dependencias
npm install
# o usando pnpm
pnpm install
```

## 🏃‍♂️ Uso

### Desarrollo

```bash
npm run serve
# o
pnpm serve
```

### Producción

```bash
# Construir el proyecto
npm run build

# Ejecutar en producción
npm start
```

El servidor se ejecutará en `http://localhost:3000`

## 📡 Endpoints

### Base URL: `http://localhost:3000/api`

| Método   | Endpoint     | Descripción                    | Código de Estado |
| -------- | ------------ | ------------------------------ | ---------------- |
| `GET`    | `/users`     | Obtiene todos los usuarios     | 200              |
| `GET`    | `/users/:id` | Obtiene un usuario por ID      | 200, 404         |
| `POST`   | `/users`     | Crea un nuevo usuario          | 200, 400         |
| `PUT`    | `/users/:id` | Actualiza un usuario existente | 200, 400, 404    |
| `DELETE` | `/users/:id` | Elimina un usuario             | 204, 404         |

### 📝 Estructura del Usuario

```json
{
  "id": 1,
  "name": "Juan Pérez",
  "email": "juan.perez@email.com"
}
```

## 🧪 Ejemplos de Uso

### 📖 Obtener todos los usuarios

```bash
curl -X GET http://localhost:3000/api/users
```

**Respuesta:**

```json
[
  {
    "id": 1,
    "name": "Juan Pérez",
    "email": "juan.perez@email.com"
  },
  {
    "id": 2,
    "name": "María García",
    "email": "maria.garcia@email.com"
  }
]
```

### 🔍 Obtener un usuario específico

```bash
curl -X GET http://localhost:3000/api/users/1
```

**Respuesta:**

```json
{
  "id": 1,
  "name": "Juan Pérez",
  "email": "juan.perez@email.com"
}
```

### ➕ Crear un nuevo usuario

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Nuevo Usuario",
    "email": "nuevo@email.com"
  }'
```

**Respuesta:**

```json
{
  "id": 6,
  "name": "Nuevo Usuario",
  "email": "nuevo@email.com"
}
```

### ✏️ Actualizar un usuario

```bash
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "id": 1,
    "name": "Juan Pérez Actualizado",
    "email": "juan.actualizado@email.com"
  }'
```

### 🗑️ Eliminar un usuario

```bash
curl -X DELETE http://localhost:3000/api/users/1
```

## 🚨 Códigos de Error

| Código | Descripción                                |
| ------ | ------------------------------------------ |
| `400`  | Bad Request - Datos faltantes o inválidos  |
| `404`  | Not Found - Usuario no encontrado          |
| `500`  | Internal Server Error - Error del servidor |

### Ejemplos de Errores

**Usuario no encontrado (404):**

```json
{
  "error": "No se ha encontrado el usuario"
}
```

**Datos faltantes (400):**

```json
{
  "error": "Falta el nombre o el email"
}
```

## 📝 Scripts Disponibles

| Script                      | Descripción                                           |
| --------------------------- | ----------------------------------------------------- |
| `npm run serve`             | Ejecuta el servidor en modo desarrollo con hot reload |
| `npm run build`             | Construye el proyecto para producción                 |
| `npm start`                 | Ejecuta el servidor en modo producción                |
| `npm run eslint-check-only` | Verifica el código con ESLint                         |
| `npm run eslint-fix`        | Corrige automáticamente los errores de ESLint         |
| `npm run prettier`          | Formatea el código con Prettier                       |

## 🌟 Características

- ✅ **TypeScript** - Tipado estático para mayor robustez
- ✅ **Validación de datos** - Validación de entrada en todos los endpoints
- ✅ **Logs de peticiones** - Logging automático de todas las peticiones a la API
- ✅ **Gestión de errores** - Manejo consistente de errores HTTP
- ✅ **Hot reload** - Recarga automática durante el desarrollo
- ✅ **Linting y formateo** - Código limpio y consistente

## 🤝 Contribución

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. Commitea tus cambios (`git commit -am 'Añade nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

---

💻 **Desarrollado con ❤️ usando Node.js y TypeScript**

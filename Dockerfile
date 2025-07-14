# Usar Node.js 20 Alpine como imagen base
FROM node:22-alpine

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de configuración de dependencias
COPY package.json pnpm-lock.yaml ./

# Instalar pnpm globalmente
RUN npm install -g pnpm

# Instalar dependencias
RUN pnpm install --frozen-lockfile

# Copiar código fuente
COPY . .

# Construir la aplicación
RUN pnpm run build

# Exponer puerto
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["pnpm", "start"]
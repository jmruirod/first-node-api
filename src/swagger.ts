import { PORT } from "./config";
import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Usuarios",
      version: "1.0.0",
      description: "Una API simple para gestionar usuarios",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: "Servidor de desarrollo",
      },
    ],
    components: {
      schemas: {
        User: {
          type: "object",
          required: ["id", "name", "email"],
          properties: {
            id: {
              type: "integer",
              description: "ID único del usuario",
            },
            name: {
              type: "string",
              description: "Nombre del usuario",
            },
            email: {
              type: "string",
              format: "email",
              description: "Email del usuario",
            },
          },
        },
        UserInput: {
          type: "object",
          required: ["name", "email"],
          properties: {
            name: {
              type: "string",
              description: "Nombre del usuario",
            },
            email: {
              type: "string",
              format: "email",
              description: "Email del usuario",
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            error: {
              type: "string",
              description: "Mensaje de error",
            },
          },
        },
      },
    },
  },
  apis: ["./src/index.ts"], // rutas a los archivos que contienen anotaciones OpenAPI
};

export const specs = swaggerJSDoc(swaggerOptions);

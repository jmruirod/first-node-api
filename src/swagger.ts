import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Usuarios",
      version: "1.0.0",
      description: "Una API simple para gestionar usuarios",
    },
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
  apis: process.env.NODE_ENV === "production" ? ["./dist/index.js"] : ["./src/index.ts"],
};

export const specs = swaggerJSDoc(swaggerOptions);

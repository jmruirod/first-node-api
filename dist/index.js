// src/index.ts
import express from "express";

// src/db/users.ts
var users = [
  { id: 1, name: "Juan P\xE9rez", email: "juan.perez@email.com" },
  { id: 2, name: "Mar\xEDa Garc\xEDa", email: "maria.garcia@email.com" },
  { id: 3, name: "Carlos L\xF3pez", email: "carlos.lopez@email.com" },
  { id: 4, name: "Ana Mart\xEDnez", email: "ana.martinez@email.com" },
  { id: 5, name: "Luis Rodr\xEDguez", email: "luis.rodriguez@email.com" }
];
var generateId = () => {
  const maxId = users.length > 0 ? Math.max(...users.map((user) => user.id)) : 0;
  return maxId + 1;
};

// src/config.ts
var PORT = 3e3;

// src/swagger.ts
import swaggerJSDoc from "swagger-jsdoc";
var swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Usuarios",
      version: "1.0.0",
      description: "Una API simple para gestionar usuarios"
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: "Servidor de desarrollo"
      }
    ],
    components: {
      schemas: {
        User: {
          type: "object",
          required: ["id", "name", "email"],
          properties: {
            id: {
              type: "integer",
              description: "ID \xFAnico del usuario"
            },
            name: {
              type: "string",
              description: "Nombre del usuario"
            },
            email: {
              type: "string",
              format: "email",
              description: "Email del usuario"
            }
          }
        },
        UserInput: {
          type: "object",
          required: ["name", "email"],
          properties: {
            name: {
              type: "string",
              description: "Nombre del usuario"
            },
            email: {
              type: "string",
              format: "email",
              description: "Email del usuario"
            }
          }
        },
        Error: {
          type: "object",
          properties: {
            error: {
              type: "string",
              description: "Mensaje de error"
            }
          }
        }
      }
    }
  },
  apis: ["./src/index.ts"]
  // rutas a los archivos que contienen anotaciones OpenAPI
};
var specs = swaggerJSDoc(swaggerOptions);

// src/index.ts
import swaggerUi from "swagger-ui-express";
var app = express();
app.use(express.json());
app.use((request, _response, next) => {
  if (request.path.startsWith("/api/")) {
    console.log(`${(/* @__PURE__ */ new Date()).toISOString()} - ${request.method} ${request.path}`);
  }
  next();
});
app.use("/", swaggerUi.serve, swaggerUi.setup(specs));
app.get("/api/users", (_request, response) => {
  response.json(users);
});
app.get("/api/users/:id", (request, response) => {
  const id = Number(request.params.id);
  const user = users.find((user2) => user2.id === id);
  if (!user) {
    response.statusMessage = "No se ha encontrado el usuario";
    response.status(404).end();
    return;
  }
  response.json(user);
});
app.post("/api/users", (request, response) => {
  const body = request.body;
  if (!body.name || !body.email) {
    response.statusMessage = "Falta el nombre o el email";
    response.status(400).end();
    return;
  }
  const id = generateId();
  const user = { id, name: body.name, email: body.email };
  users.push(user);
  response.json(user);
  console.log(user);
});
app.put("/api/users/:id", (request, response) => {
  const id = Number(request.params.id);
  const body = request.body;
  if (!body.name) {
    response.statusMessage = "name obligatorio";
    response.status(400).end();
    return;
  }
  if (!body.email) {
    response.statusMessage = "email obligatorio";
    response.status(400).end();
    return;
  }
  const user = users.find((user2) => user2.id === body.id);
  if (!user) {
    response.statusMessage = "No se ha encontrado el usuario";
    response.status(404).end();
    return;
  }
  users[id] = { id, name: body.name, email: body.email };
  response.json(users[id]);
  console.log(users[id]);
});
app.delete("/api/users/:id", (request, response) => {
  const id = Number(request.params.id);
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex === -1) {
    response.statusMessage = "No se ha encontrado el usuario";
    response.status(404).end();
    return;
  }
  users.splice(userIndex, 1);
  response.status(204).end();
});
var unknownEndpoint = (_request, response) => {
  response.status(404).send({ error: "No se ha encontrado la ruta solicitada" });
};
app.use(unknownEndpoint);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

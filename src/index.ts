import express from "express";
import { generateId, users } from "./db/users";
import { specs } from "./swagger";
import swaggerUi from "swagger-ui-express";
import { PORT } from "./config";

const app = express();
app.use(express.json());

app.use((request, _response, next) => {
  if (request.path.startsWith("/api/")) {
    console.log(`${new Date().toISOString()} - ${request.method} ${request.path}`);
  }
  next();
});

app.use("/", swaggerUi.serve, swaggerUi.setup(specs));

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
app.get("/api/users", (_request, response) => {
  response.json(users);
});

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Obtiene un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 */
app.get("/api/users/:id", (request, response) => {
  const id = Number(request.params.id);
  const user = users.find((user) => user.id === id);
  if (!user) {
    response.statusMessage = "No se ha encontrado el usuario";
    response.status(404).end();
    return;
  }
  response.json(user);
});

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       200:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Datos inválidos
 */
app.post("/api/users", (request, response) => {
  const body: { name: string; email: string } = request.body;

  if (!body.name || !body.email) {
    response.statusMessage = "Falta el nombre o el email";
    response.status(400).end();
    return;
  }

  const id = generateId();
  const user = { id: id, name: body.name, email: body.email };
  users.push(user);
  response.json(user);
  console.log(user);
});

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Actualiza un usuario existente
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Usuario no encontrado
 */
app.put("/api/users/:id", (request, response) => {
  const id = Number(request.params.id);
  const body: { id: number; name: string; email: string } = request.body;

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

  const user = users.find((user) => user.id === body.id);

  if (!user) {
    response.statusMessage = "No se ha encontrado el usuario";
    response.status(404).end();
    return;
  }

  users[id] = { id: id, name: body.name, email: body.email };
  response.json(users[id]);
  console.log(users[id]);
});

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Elimina un usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       204:
 *         description: Usuario eliminado exitosamente
 *       404:
 *         description: Usuario no encontrado
 */
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

const unknownEndpoint = (_request: express.Request, response: express.Response) => {
  response.status(404).send({ error: "No se ha encontrado la ruta solicitada" });
};

app.use(unknownEndpoint);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

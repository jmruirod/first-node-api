import express from "express";
import { generateId, users } from "./db/users";

const PORT = 3000;

const app = express();
app.use(express.json());

app.use((request, _response, next) => {
  if (request.path.startsWith("/api/")) {
    console.log(`${new Date().toISOString()} - ${request.method} ${request.path}`);
  }
  next();
});

app.get("/api/users", (_request, response) => {
  response.json(users);
});

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

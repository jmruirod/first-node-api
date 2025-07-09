import { Request, Response } from "express";
import { UserRequest } from "~/models/user";
import { userService as service } from "~/services/user";

export const userController = {
  getAll: (_request: Request, response: Response) => {
    const users = service.getAll();
    response.json(users);
  },

  getById: (request: Request, response: Response) => {
    const id = Number(request.params.id);
    const user = service.getById(id);

    if (!user) {
      response.statusMessage = "No se ha encontrado el usuario";
      response.status(404).end();
      return;
    }

    response.json(user);
  },

  create: (request: Request, response: Response) => {
    const userRequest: UserRequest = request.body;

    if (!userRequest.name || !userRequest.email) {
      response.statusMessage = "Falta el nombre o el email";
      response.status(400).end();
      return;
    }

    const user = service.create(userRequest);

    response.json(user);
    console.log(user);
  },

  update: (request: Request, response: Response) => {
    const id = Number(request.params.id);
    const userRequest: UserRequest = request.body;

    if (!userRequest.name) {
      response.statusMessage = "name obligatorio";
      response.status(400).end();
      return;
    }

    if (!userRequest.email) {
      response.statusMessage = "email obligatorio";
      response.status(400).end();
      return;
    }

    const user = service.getById(id);

    if (!user) {
      response.statusMessage = "No se ha encontrado el usuario";
      response.status(404).end();
      return;
    }

    const newUser = service.update(userRequest, id);
    response.json(newUser);
    console.log(newUser);
  },

  delete: (request: Request, response: Response) => {
    const id = Number(request.params.id);
    const user = service.getById(id);

    if (!user) {
      response.statusMessage = "No se ha encontrado el usuario";
      response.status(404).end();
      return;
    }

    service.remove(id);

    response.status(204).end();
  },
};

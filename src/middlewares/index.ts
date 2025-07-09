import { Request, Response, NextFunction } from "express";

export const logger = (request: Request, _response: Response, next: NextFunction) => {
  if (request.path.startsWith("/api/")) {
    console.log(`${new Date().toISOString()} - ${request.method} ${request.path}`);
  }
  next();
};

export const unknownEndpoint = (_request: Request, response: Response) => {
  response.status(404).send({ error: "No se ha encontrado la ruta solicitada" });
};

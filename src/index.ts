// Importa el framework Express para crear el servidor web
import express from "express";

// Crea una instancia de la aplicación Express
const app = express();

// Middleware para parsear automáticamente el JSON en las peticiones
app.use(express.json());

// Define el puerto donde correrá el servidor
const PORT = 3000;

// Define una ruta GET en "/ping" que responde con un JSON
app.get("/ping", (_req, res) => {
  // Imprime un mensaje en la consola cuando alguien hace ping
  console.log("someone pinged here!!");
  // Responde con un objeto JSON que contiene "pong"
  res.json({ response: "pong" });
});

// Inicia el servidor en el puerto especificado
app.listen(PORT, () => {
  // Callback que se ejecuta cuando el servidor está listo
  console.log(`Server running on port ${PORT}`);
});

import express from "express";
import { specs } from "./docs/swagger";
import swaggerUi from "swagger-ui-express";
import { PORT } from "./config";
import { userRoute } from "./routes/user";
import { logger, unknownEndpoint } from "./middlewares";

const app = express();
app.use(express.json());
app.use(logger);
app.use("/api", userRoute);
app.use("/", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/", unknownEndpoint);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

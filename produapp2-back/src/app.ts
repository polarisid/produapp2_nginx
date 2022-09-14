import cors from "cors";
import "reflect-metadata";
import "express-async-errors"; // dor de cabeça
import dotenv from "dotenv";
import express, { json } from "express";
import router from "./routes/index.js";
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware.js";
dotenv.config();

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(json());
app.use(router);
app.use(errorHandlerMiddleware);

export default app;

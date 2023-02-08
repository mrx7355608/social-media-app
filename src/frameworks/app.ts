import express, { Application } from "express";
import helmet from "helmet";
import hpp from "hpp";
import cors from "cors";
import morgan from "morgan";

export const app: Application = express();
app.use(morgan("dev"));
app.use(helmet());
app.use(hpp());
app.use(cors());

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: false }));

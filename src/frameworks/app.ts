import express, { Application } from "express";
import helmet from "helmet";
import hpp from "hpp";
import cors from "cors";
import morgan from "morgan";

// Routers
import { userRouter } from "./routes/user.routes";
import { authRouter } from "./routes/auth.routes";

export const app: Application = express();
app.use(morgan("dev"));
app.use(helmet());
app.use(hpp());
app.use(cors());

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);

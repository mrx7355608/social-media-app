import express, { Application } from "express";
import helmet from "helmet";
import hpp from "hpp";
import cors from "cors";
import morgan from "morgan";
import session from "express-session";
import passport from "passport";
import appConfig from "@/config/index";
import connectMongo from "connect-mongodb-session";

// Routers
import { userRouter } from "./routes/user.routes";
import { authRouter } from "./routes/auth.routes";
import passportSetup from "./passport-setup";

export const app: Application = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(hpp());
app.use(cors());

// Express session
const Store = connectMongo(session);
const mongoStore = new Store({
    collection: "sessions",
    uri: appConfig.databaseUrl,
});
app.use(
    session({
        secret: appConfig.sessionSecret,
        resave: false,
        saveUninitialized: false,
        store: mongoStore,
        cookie: {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
        },
    })
);
app.use(passport.initialize());
app.use(passport.session());
passportSetup(passport);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);

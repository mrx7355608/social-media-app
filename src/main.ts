import "dotenv/config"; // for using .env file
import "module-alias/register"; // for path aliases

import { app } from "./frameworks/app";
import appConfig from "@/config/index";
import { connectToDatabase } from "./utils/databaseConnection";

const port = appConfig.port;
async function startServer() {
    await connectToDatabase(appConfig.databaseUrl);
    app.listen(port, () => console.log("Express server started on port", port));
}

startServer();

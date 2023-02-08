import "dotenv/config"; // for using .env file
import "module-alias/register"; // for path aliases

import { app } from "./frameworks/app";
import appConfig from "@/config/index";

const port = appConfig.port;
app.listen(port, () => console.log("Express server started on port", port));

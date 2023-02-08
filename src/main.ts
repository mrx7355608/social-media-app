import "dotenv/config"; // for using .env file
import "module-alias/register"; // for path aliases

import { app } from "./frameworks/app";
const port = 5000;
app.listen(port, () => console.log("Express server started on port", port));

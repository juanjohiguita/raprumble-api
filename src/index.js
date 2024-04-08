// Arranque de la aplicación

import app from "./app.js";
import { PORT } from "./config.js";

try {
    app.listen(PORT);
    console.log("Server is running on port ", PORT);
} catch (error) {
    console.error("Error:", error);

}

console.log("Server is running on port ", PORT);
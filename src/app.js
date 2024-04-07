import express from "express";
import usersRoutes from "./routes/users.routes.js";
import indexRoutes from "./routes/index.routes.js";
import roundsRoutes from "./routes/rounds.routes.js";
import formatsRoutes from "./routes/formats.routes.js";

// Crear la aplicación de express, este tiene todas las configuraciones de express
// Se llaman las rutas


const app = express();
app.use(express.json());

app.use('/api', usersRoutes, indexRoutes, roundsRoutes, formatsRoutes);
app.use((req, res, next) => {
    res.status(404).json({message: "Endpoint not found"});
});

export default app;                  
import express from "express";
import apicache from 'apicache';
import usersRoutes from "./v1/routes/users.routes.js";
import indexRoutes from "./v1/routes/index.routes.js";
import roundsRoutes from "./v1/routes/rounds.routes.js";
import formatsRoutes from "./v1/routes/formats.routes.js";
import competitionsRoutes from "./v1/routes/competitions.routes.js";
import rolesRoutes from "./v1/routes/roles.routes.js";
import daysRoutes from "./v1/routes/days.routes.js";
import formatsRoundsRoutes from "./v1/routes/formatsRounds.routes.js";
import membersRoutes from "./v1/routes/members.routes.js";
import votesRoutes from "./v1/routes/votes.routes.js";


// Crear la aplicación de express, este tiene todas las configuraciones de express
// Se llaman las rutas
const cache = apicache.middleware;
const app = express();

app.use(express.json());
app.use(cache("2 minutes"));

app.use('/api/v1', usersRoutes, indexRoutes, roundsRoutes, formatsRoutes, competitionsRoutes, rolesRoutes, daysRoutes, 
formatsRoundsRoutes, membersRoutes, votesRoutes);

app.use((req, res, next) => {
    res.status(404).json({message: "Endpoint not found"});
});

export default app;                  
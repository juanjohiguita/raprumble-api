import express from "express";
import apicache from 'apicache';
import cors from "cors";

import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './v1/swagger/swagger.js';

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

const cache = apicache.middleware;
const app = express();
const versionApi = "v1";

app.use(express.json());
app.use(cors());
app.use(cache("2 minutes"));

app.use(`/api/${versionApi}`, usersRoutes, indexRoutes, roundsRoutes, formatsRoutes, competitionsRoutes, rolesRoutes, daysRoutes, 
formatsRoundsRoutes, membersRoutes, votesRoutes);

app.use(`/api/${versionApi}/swagger`, swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use((req, res, next) => {
    res.status(404).json({message: "Endpoint not found"});
});

export default app;                  
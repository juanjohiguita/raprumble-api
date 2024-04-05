import express from "express";
import usersRoutes from "./routes/users.routes.js";
import indexRoutes from "./routes/index.routes.js";

const app = express();
app.use(express.json());

app.use('/api', usersRoutes, indexRoutes);
app.listen(5000);

console.log("Server is running on port 5000");
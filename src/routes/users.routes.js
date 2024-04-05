import {Router} from 'express';
import {getUser, getUsers, createUser, deleteUser, updateUser} from '../controllers/users.controller.js'; // Importar con llaves significa que se importa una función específica, mientras que sin llaves se importa todo el archivo


const router = Router();

router.get("/users", getUsers);

router.get("/users/:id", getUser);

router.post("/users", createUser);

router.put("/users/:id", updateUser);

router.delete("/users/:id", deleteUser);

export default router;
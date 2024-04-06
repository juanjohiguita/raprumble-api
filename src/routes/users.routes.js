import {Router} from 'express';
import {getUser, getUsers, createUser, deleteUser, updateUserAka} from '../controllers/users.controller.js'; // Importar con llaves significa que se importa una función específica, mientras que sin llaves se importa todo el archivo
import {ping} from '../controllers/index.controller.js';

const router = Router();

router.get("/ping", ping)

router.get("/users", getUsers);

router.get("/users/:id", getUser);

router.post("/users", createUser);

// El metodo put permite actualizar todos los datos pero no solo una parte de llos
// router.put("/users/:id", updateUserAka);

// El metodo patch permite actualizar solo una parte de los datos
router.patch("/users/:id", updateUserAka);


router.delete("/users/:id", deleteUser);

export default router;
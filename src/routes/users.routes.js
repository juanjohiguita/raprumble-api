import {Router} from 'express';
import {getUser, getUsers, createUser, deleteUser, updateUserAka, updateUserAllInformation} from '../controllers/users.controller.js'; // Importar con llaves significa que se importa una función específica, mientras que sin llaves se importa todo el archivo
import {ping} from '../controllers/index.controller.js';
const path = 'users';
const router = Router();

router.get(`/${path}/ping`, ping)

router.get(`/${path}`, getUsers);

router.get(`/${path}/:id`, getUser);

router.post(`/${path}`, createUser);

// El metodo put permite actualizar todos los datos pero no solo una parte de llos
router.put(`/${path}/:id`, updateUserAllInformation);

// El metodo patch permite actualizar solo una parte de los datos
router.patch(`/${path}/:id`, updateUserAka);


router.delete(`/${path}/:id`, deleteUser);

export default router;
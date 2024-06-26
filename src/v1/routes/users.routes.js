import {Router} from 'express';
import {getUser, getUsers, createUser, deleteUser, updateUserAka, updateUserAllInformation, getUserByUsername, getUserByEmail, updateUserProfilePicture} from '../../controllers/usersController.js'; // Importar con llaves significa que se importa una función específica, mientras que sin llaves se importa todo el archivo
import {ping} from '../../controllers/indexController.js';
import UsersMiddleware from '../../middleware/usersMiddleware.js';
const path = 'users';
const router = Router();


router.get(`/${path}`, getUsers);

router.get(`/${path}/:id`, 
UsersMiddleware.userExists,
getUser);

router.get(`/${path}/searchBy/username/:username`, 
getUserByUsername);


router.get(`/${path}/searchBy/email/:email`, 
getUserByEmail);


router.post(`/${path}`, createUser);

// El metodo put permite actualizar todos los datos pero no solo una parte de llos
router.put(`/${path}/:id`, 
UsersMiddleware.userExists ,
UsersMiddleware.validateUserAllUpdateFields,
updateUserAllInformation);

// El metodo patch permite actualizar solo una parte de los datos
router.patch(`/${path}/:id`, 
UsersMiddleware.userExists,
UsersMiddleware.validateUserUpdateFields,
updateUserAka);

router.patch(`/${path}/:id/profilePicture`, 
UsersMiddleware.userExists,
UsersMiddleware.validateUserUpdateFields,
updateUserProfilePicture);


router.delete(`/${path}/:id`, 
UsersMiddleware.userExists,
deleteUser);

export default router;
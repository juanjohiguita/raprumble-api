
import {Router} from 'express';
import {getRole, getRoles, createRole, deleteRole, updateRoleName, updateRoleAllInformation} from '../controllers/roles.controller.js'; // Importar con llaves significa que se importa una función específica, mientras que sin llaves se importa todo el archivo
import {ping} from '../controllers/index.controller.js';

const path = 'roles';
const router = Router();

router.get(`/ping`, ping)

router.get(`/${path}`, getRoles);

router.get(`/${path}/:id`, getRole);

router.post(`/${path}`, createRole);

// El metodo put permite actualizar todos los datos pero no solo una parte de llos
router.put(`/${path}/:id`, updateRoleAllInformation);
    
// El metodo patch permite actualizar solo una parte de los datos
router.patch(`/${path}/:id`, updateRoleName);


router.delete(`/${path}/:id`, deleteRole);

export default router;
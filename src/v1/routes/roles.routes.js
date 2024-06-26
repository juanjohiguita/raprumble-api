
import {Router} from 'express';
import {getRole, getRoles, createRole, deleteRole, updateRoleName, updateRoleAllInformation} from '../../controllers/rolesController.js'; // Importar con llaves significa que se importa una función específica, mientras que sin llaves se importa todo el archivo
import RolesMiddleware from '../../middleware/rolesMiddleware.js';

const path = 'roles';
const router = Router();

router.get(`/${path}`, getRoles);

router.get(`/${path}/:id`, 
getRole);

router.post(`/${path}`, createRole);

// El metodo put permite actualizar todos los datos pero no solo una parte de llos
router.put(`/${path}/:id`, 
RolesMiddleware.roleExists ,
RolesMiddleware.validateRoleAllUpdateFields,
updateRoleAllInformation);
    
// El metodo patch permite actualizar solo una parte de los datos
router.patch(`/${path}/:id`, 
RolesMiddleware.validateRoleUpdateFields,
updateRoleName);


router.delete(`/${path}/:id`, 
RolesMiddleware.roleExists,
deleteRole);

export default router;
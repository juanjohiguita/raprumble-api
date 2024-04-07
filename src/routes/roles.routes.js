import {Router} from 'express';
import {getRole, getRoles, createRole, deleteRole, updateRoleName} from '../controllers/roles.controller.js'; // Importar con llaves significa que se importa una función específica, mientras que sin llaves se importa todo el archivo
import {ping} from '../controllers/index.controller.js';

const router = Router();

router.get("/ping", ping)

router.get("/rols", getRoles);

router.get("/rols/:id", getRole);

router.post("/rols", createRole);

// El metodo put permite actualizar todos los datos pero no solo una parte de llos
// router.put("/rols/:id", updateRolName);

// El metodo patch permite actualizar solo una parte de los datos
router.patch("/rols/:id", updateRoleName);


router.delete("/rols/:id", deleteRole);

export default router;
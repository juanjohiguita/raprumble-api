import {Router} from 'express';
import {getMember, getMembers, createMember, deleteMember, updateMemberPtb, updateMemberAllInformation} from '../controllers/members.controller.js'; // Importar con llaves significa que se importa una función específica, mientras que sin llaves se importa todo el archivo
import {ping} from '../controllers/index.controller.js';

const path = 'members'  
const router = Router();

router.get(`/ping`, ping)

router.get(`/${path}`, getMembers);

router.get(`/${path}/:id`, getMember);

router.post(`/${path}`, createMember);

// El metodo put permite actualizar todos los datos pero no solo una parte de llos
router.put(`/${path}/:id`, updateMemberAllInformation);

// El metodo patch permite actualizar solo una parte de los datos
router.patch(`/${path}/:id`, updateMemberPtb);


router.delete(`/${path}/:id`, deleteMember);

export default router;
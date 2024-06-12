import {Router} from 'express';
import {getMember, getMembers, createMember, deleteMember, updateMemberPtbAndScore, updateMemberAllInformation, updateMemberIdRole, getUserMembers} from '../../controllers/membersController.js'; // Importar con llaves significa que se importa una función específica, mientras que sin llaves se importa todo el archivo
import {ping} from '../../controllers/indexController.js';
import MembersMiddleware from '../../middleware/membersMiddleware.js';

const path = 'members'  
const router = Router();


router.get(`/${path}`, getMembers);

router.get(`/${path}/:idUser`, getUserMembers);

router.get(`/${path}/:id`, 
MembersMiddleware.memberExists,
getMember);

router.post(`/${path}`, createMember);

// El metodo put permite actualizar todos los datos pero no solo una parte de llos
router.put(`/${path}/:id`, 
MembersMiddleware.memberExists,
MembersMiddleware.validateMemberAllUpdateFields,
updateMemberAllInformation);

// El metodo patch permite actualizar solo una parte de los datos
router.patch(`/${path}/:id/ptb/score`, 
MembersMiddleware.memberExists,
updateMemberPtbAndScore);

router.patch(`/${path}/:id/idRole`, 
MembersMiddleware.memberExists,
updateMemberIdRole);


router.delete(`/${path}/:id`, 
MembersMiddleware.memberExists,
deleteMember);

export default router;
import {Router} from 'express';
import {getCompetition, getCompetitions, getCompetitionMembersAkaAndScore, createCompetition, deleteCompetition, updateCompetitionName, updateCompetitionAllInformation} from '../controllers/competitionsController.js'; // Importar con llaves significa que se importa una función específica, mientras que sin llaves se importa todo el archivo
import {ping} from '../controllers/indexController.js';
import CompetitionsMiddleware from '../middleware/competitionsMiddleware.js';
const path = 'competitions';
const router = Router();

router.get(`/ping`, ping)

router.get(`/${path}`, getCompetitions);

router.get(`/${path}/:id`, getCompetition);

router.get(`/${path}/:id/members`, getCompetitionMembersAkaAndScore);

router.post(`/${path}`, createCompetition);

// El metodo put permite actualizar todos los datos pero no solo una parte de llos
router.put(`/${path}/:id`, 
CompetitionsMiddleware.competitionExists, 
CompetitionsMiddleware.validateCompetitionAllUpdateFields, 
updateCompetitionAllInformation);

// El metodo patch permite actualizar solo una parte de los datos
router.patch(`/${path}/:id`,
CompetitionsMiddleware.competitionExists,
CompetitionsMiddleware.validateCompetitionUpdateFields,
updateCompetitionName);


router.delete(`/${path}/:id`, deleteCompetition);

export default router;
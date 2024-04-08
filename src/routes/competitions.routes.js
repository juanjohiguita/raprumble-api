import {Router} from 'express';
import {getCompetition, getCompetitions, createCompetition, deleteCompetition, updateCompetitionName, updateCompetitionAllInformation} from '../controllers/competitionsController.js'; // Importar con llaves significa que se importa una función específica, mientras que sin llaves se importa todo el archivo
import {ping} from '../controllers/indexController.js';

const path = 'competitions';
const router = Router();

router.get(`/ping`, ping)

router.get(`/${path}`, getCompetitions);

router.get(`/${path}/:id`, getCompetition);

router.post(`/${path}`, createCompetition);

// El metodo put permite actualizar todos los datos pero no solo una parte de llos
router.put(`/${path}/:id`, updateCompetitionAllInformation);

// El metodo patch permite actualizar solo una parte de los datos
router.patch(`/${path}/:id`, updateCompetitionName);


router.delete(`/${path}/:id`, deleteCompetition);

export default router;
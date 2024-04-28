import {Router} from 'express';
import {getRound, getRounds, createRound, deleteRound, updateRoundNumberPatterns, updateRoundAllInformation} from '../controllers/roundsController.js'; // Importar con llaves significa que se importa una función específica, mientras que sin llaves se importa todo el archivo
import {ping} from '../controllers/indexController.js';
import RoundsMiddleware from '../middleware/roundsMiddleware.js';

const path = 'rounds'; 
const router = Router();

router.get("/ping", ping)

router.get(`/${path}`, getRounds);

router.get(`/${path}/:id`, 
RoundsMiddleware.roundExists,
getRound);

router.post(`/${path}`, createRound);

// El metodo put permite actualizar todos los datos pero no solo una parte de llos
router.put(`/${path}/:id`, 
RoundsMiddleware.roundExists ,
RoundsMiddleware.validateRoundAllUpdateFields,
updateRoundAllInformation);

// El metodo patch permite actualizar solo una parte de los datos
router.patch(`/${path}/:id`, 
RoundsMiddleware.roundExists,
RoundsMiddleware.validateRoundUpdateFields,
updateRoundNumberPatterns);

router.delete(`/${path}/:id`, 
RoundsMiddleware.roundExists,
deleteRound);

export default router;
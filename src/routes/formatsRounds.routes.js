import {Router} from 'express';
import {getFormatsRounds, getFormatRound, createFormatRound, deleteFormatRound, updateFormatRoundIdRound, updateFormatRoundAllInformation} from '../controllers/formatsRounds.controller.js'; // Importar con llaves significa que se importa una función específica, mientras que sin llaves se importa todo el archivo
import {ping} from '../controllers/index.controller.js';

const path = 'formatsRounds'
const router = Router();

router.get(`/ping`, ping)

router.get(`/${path}`, getFormatsRounds);

router.get(`/${path}/:id`, getFormatRound);   

router.post(`/${path}`, createFormatRound);

// El metodo put permite actualizar todos los datos pero no solo una parte de llos
router.put(`/${path}/:id`, updateFormatRoundAllInformation);

// El metodo patch permite actualizar solo una parte de los datos
router.patch(`/${path}/:id`, updateFormatRoundIdRound);


router.delete(`/${path}/:id`, deleteFormatRound);

export default router;
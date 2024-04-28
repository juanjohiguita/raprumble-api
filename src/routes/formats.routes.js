import {Router} from 'express';
import {getFormat, getFormats, createFormat, deleteFormat, updateFormatDescription, updateFormatAllInformation} from '../controllers/formatsController.js'; // Importar con llaves significa que se importa una función específica, mientras que sin llaves se importa todo el archivo
import {ping} from '../controllers/indexController.js';
import FormatsMiddleware from '../middleware/formatsMiddleware.js';

const path = 'formats'
const router = Router();

router.get(`/ping`, ping)

router.get(`/${path}`, getFormats);

router.get(`/${path}/:id`, getFormat);

router.post(`/${path}`, createFormat);

// El metodo put permite actualizar todos los datos pero no solo una parte de llos
router.put(`/${path}/:id`, 
FormatsMiddleware.validateFormatUpdateFields , 
FormatsMiddleware.formatExists, updateFormatAllInformation);

// El metodo patch permite actualizar solo una parte de los datos
router.patch(`/${path}/:id`, updateFormatDescription);


router.delete(`/${path}/:id`, deleteFormat);

export default router;
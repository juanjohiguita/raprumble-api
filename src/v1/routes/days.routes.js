import {Router} from 'express';
import { getDay, getDays, createDay, updateDayFinish, deleteDay, updateDayAllInformation, getCountDaysByCompetition } from '../../controllers/daysController.js'; 
import {ping} from '../../controllers/indexController.js';
import DaysMiddleware from '../../middleware/daysMiddleware.js';
const path = 'days';

const router = Router();

router.get(`/ping`, ping)

router.get(`/${path}`, getDays);

router.get(`/${path}/:id`, 
DaysMiddleware.dayExists,
getDay);

router.get(`/${path}/searchBy/:idCompetition/count`, 
getCountDaysByCompetition);

router.post(`/${path}`, createDay);

// El metodo put permite actualizar todos los datos pero no solo una parte de llos
router.put(`/${path}/:id`, 
DaysMiddleware.dayExists , 
DaysMiddleware.validateDayAllUpdateFields, 
updateDayAllInformation);

// El metodo patch permite actualizar solo una parte de los datos
router.patch(`/${path}/:id`, 
DaysMiddleware.dayExists,
DaysMiddleware.validateDayUpdateFields,
updateDayFinish);


router.delete(`/${path}/:id`, 
DaysMiddleware.dayExists,
deleteDay);

export default router;
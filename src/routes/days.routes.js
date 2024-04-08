import {Router} from 'express';
import { getDay, getDays, createDay, updateDayFinish, deleteDay, updateDayAllInformation } from '../controllers/daysController.js'; 
import {ping} from '../controllers/indexController.js';
const path = 'days';

const router = Router();

router.get(`/ping`, ping)

router.get(`/${path}`, getDays);

router.get(`/${path}/:id`, getDay);

router.post(`/${path}`, createDay);

// El metodo put permite actualizar todos los datos pero no solo una parte de llos
router.put(`/${path}/:id`, updateDayAllInformation);

// El metodo patch permite actualizar solo una parte de los datos
router.patch(`/${path}/:id`, updateDayFinish);


router.delete(`/${path}/:id`, deleteDay);

export default router;
import {Router} from 'express';
import { getDay, getDays, createDay, updateDayFinish, deleteDay, updateDayAllInformation } from '../controllers/days.controller.js'; 
import {ping} from '../controllers/index.controller.js';

const router = Router();

router.get("/ping", ping)

router.get("/days", getDays);

router.get("/days/:id", getDay);

router.post("/days", createDay);

// El metodo put permite actualizar todos los datos pero no solo una parte de llos
router.put("/days/:id", updateDayAllInformation);

// El metodo patch permite actualizar solo una parte de los datos
router.patch("/days/:id", updateDayFinish);


router.delete("/days/:id", deleteDay);

export default router;
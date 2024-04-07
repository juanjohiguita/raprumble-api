import {Router} from 'express';
import {getRound, getRounds, createRound, deleteRound, updateRoundNumberPatterns, updateRoundAllInformation} from '../controllers/rounds.controller.js'; // Importar con llaves significa que se importa una función específica, mientras que sin llaves se importa todo el archivo
import {ping} from '../controllers/index.controller.js';

const router = Router();

router.get("/ping", ping)

router.get("/rounds", getRounds);

router.get("/rounds/:id", getRound);

router.post("/rounds", createRound);

// El metodo put permite actualizar todos los datos pero no solo una parte de llos
router.put("/users/:id", updateRoundAllInformation);

// El metodo patch permite actualizar solo una parte de los datos
router.patch("/rounds/:id", updateRoundNumberPatterns);

router.delete("/rounds/:id", deleteRound);

export default router;
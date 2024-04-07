import {Router} from 'express';
import {getCompetition, getCompetitions, createCompetition, deleteCompetition, updateCompetitionName} from '../controllers/competitions.controller.js'; // Importar con llaves significa que se importa una función específica, mientras que sin llaves se importa todo el archivo
import {ping} from '../controllers/index.controller.js';

const router = Router();

router.get("/ping", ping)

router.get("/competitions", getCompetitions);

router.get("/competitions/:id", getCompetition);

router.post("/competitions", createCompetition);

// El metodo put permite actualizar todos los datos pero no solo una parte de llos
// router.put("/Competitions/:id", updateCompetitionName);

// El metodo patch permite actualizar solo una parte de los datos
router.patch("/competitions/:id", updateCompetitionName);


router.delete("/competitions/:id", deleteCompetition);

export default router;
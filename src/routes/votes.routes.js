import {Router} from 'express';
import {getVote, getVotes, createVote, deleteVote, updateVoteScoreMC1, updateVoteAllInformation} from '../controllers/votes.controller.js'; // Importar con llaves significa que se importa una función específica, mientras que sin llaves se importa todo el archivo
import {ping} from '../controllers/index.controller.js';

const router = Router();

router.get("/ping", ping)

router.get("/votes", getVotes);

router.get("/votes/:id", getVote);

router.post("/votes", createVote);

// El metodo put permite actualizar todos los datos pero no solo una parte de llos
router.put("/votes/:id", updateVoteAllInformation);
//);

// El metodo patch permite actualizar solo una parte de los datos
router.patch("/votes/:id", updateVoteScoreMC1);


router.delete("/votes/:id", deleteVote);

export default router;
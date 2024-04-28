import {Router} from 'express';
import {getVote, getVotes, createVote, deleteVote, updateVoteScoreMC1, updateVoteAllInformation} from '../controllers/votesController.js'; // Importar con llaves significa que se importa una función específica, mientras que sin llaves se importa todo el archivo
import {ping} from '../controllers/indexController.js';
import VotesMiddleware from '../middleware/votesMiddleware.js'; 
const path = 'votes'
const router = Router();

router.get("/ping", ping)

router.get(`/${path}`, getVotes);

router.get(`/${path}/:id`, getVote);

router.post(`/${path}`, createVote);

// El metodo put permite actualizar todos los datos pero no solo una parte de llos
router.put(`/${path}/:id`, 
VotesMiddleware.validateVoteUpdateFields ,
VotesMiddleware.voteExists,
updateVoteAllInformation);
//);

// El metodo patch permite actualizar solo una parte de los datos
router.patch(`/${path}/:id`, updateVoteScoreMC1);


router.delete(`/${path}/:id`, deleteVote);

export default router;
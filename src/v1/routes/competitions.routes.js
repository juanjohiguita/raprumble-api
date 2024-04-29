import {Router} from 'express';
import {getCompetition, getCompetitions, getCompetitionMembersAkaAndScore, createCompetition, deleteCompetition, updateCompetitionName, updateCompetitionAllInformation} from '../../controllers/competitionsController.js'; // Importar con llaves significa que se importa una función específica, mientras que sin llaves se importa todo el archivo
import {ping} from '../../controllers/indexController.js';
import CompetitionsMiddleware from '../../middleware/competitionsMiddleware.js';
const path = 'competitions';
const router = Router();



router.get(`/ping`, ping)

/**
 * @swagger
 * tags:
 *   name: Competitions
 *   description: Endpoints para operaciones relacionadas con competiciones
 */


/**
 * @swagger
 * /api/v1/competitions:
 *   get:
 *     summary: Obtener todas las competiciones
 *     tags: [Competitions]
 *     responses:
 *       '200':
 *         description: Competiciones obtenidas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: './src/models/competitionModel'
 */
router.get(`/${path}`, getCompetitions);

/**
 * @swagger
 * /api/v1/competitions/{id}:
 *   get:
 *     summary: Obtener una competición por su ID
 *     tags: [Competitions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la competición a obtener
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Competición obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: './src/models/competitionModel.js'
 *       '404':
 *         description: No se encontró la competición con el ID proporcionado
 */
router.get(`/${path}/:id`, 
CompetitionsMiddleware.competitionExists,
getCompetition);

/**
 * @swagger
 * /api/v1/competitions/{id}/members:
 *   get:
 *     summary: Obtener los miembros de una competición con su aka y puntuación
 *     tags:
 *       - Competitions
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la competición
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: './src/models/memberModel.js'
 *       404:    
 *          description: No se encontró la competición con el ID proporcionado 
 */
router.get(`/${path}/:id/members`, 
CompetitionsMiddleware.competitionExists,   
getCompetitionMembersAkaAndScore);

router.post(`/${path}`, createCompetition);

// El metodo put permite actualizar todos los datos pero no solo una parte de llos
router.put(`/${path}/:id`, 
CompetitionsMiddleware.competitionExists, 
CompetitionsMiddleware.validateCompetitionAllUpdateFields, 
updateCompetitionAllInformation);

// El metodo patch permite actualizar solo una parte de los datos
router.patch(`/${path}/:id`,
CompetitionsMiddleware.competitionExists,
CompetitionsMiddleware.validateCompetitionUpdateFields,
updateCompetitionName);


router.delete(`/${path}/:id`, 
CompetitionsMiddleware.competitionExists,
deleteCompetition);

export default router;
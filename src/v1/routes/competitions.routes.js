import {Router} from 'express';
import {getCompetition, getCompetitions, getCompetitionMembersAkaScoreAndPtb,getCompetitionMembersAkaRoleNameRoleIdUserIdAndMemberId,  
createCompetition, deleteCompetition, updateCompetitionName, updateCompetitionAllInformation} from '../../controllers/competitionsController.js'; // Importar con llaves significa que se importa una función específica, mientras que sin llaves se importa todo el archivo
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
 *                     $ref: '../swagger/swagger.json#/components/schemas/Competition'
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
 *               $ref: '../swagger/swagger.json#/components/schemas/Competition'
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
 *                     $ref: '../swagger/swagger.json#/components/schemas/Competition'
 *       404:    
 *          description: No se encontró la competición con el ID proporcionado 
 */
router.get(`/${path}/:id/members/akaScoreAndPtb`, 
CompetitionsMiddleware.competitionExists,   
getCompetitionMembersAkaScoreAndPtb);

router.get(`/${path}/:id/members/akaRoleNameRoleIdUserIdAndMemberId`, 
CompetitionsMiddleware.competitionExists,   
getCompetitionMembersAkaRoleNameRoleIdUserIdAndMemberId);

/**
 * @swagger
 * /api/v1/competitions:
 *   post:
 *     tags:
 *       - Competitions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '../swagger/swagger.json#/components/schemas/Competition'
 *     responses:
 *       201:
 *         description: Created
 *       404: 
 *        description: No se ha podido crear la competicion 
 */
router.post(`/${path}`, createCompetition);

/**
 * @swagger
 * /api/v1/competitions/{id}:
 *   put:
 *     summary: Actualizar todos los datos de una competición
 *     tags: [Competitions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la competición a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '../swagger/swagger.json#/components/schemas/Competition'
 *     responses:
 *       '200':
 *         description: Competición actualizada exitosamente
 *       '404':
 *         description: No se encontró la competición con el ID proporcionado
 */
router.put(`/${path}/:id`, 
CompetitionsMiddleware.competitionExists, 
CompetitionsMiddleware.validateCompetitionAllUpdateFields, 
updateCompetitionAllInformation);

/**
 * @swagger
 * /api/v1/competitions/{id}:
 *   patch:
 *     summary: Actualizar parte de los datos de una competición
 *     tags: [Competitions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la competición a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: './src/swagger/swagger-outputjson#/components/schemas/Competition'
 *     responses:
 *       '200':
 *         description: Competición actualizada exitosamente
 *       '404':
 *         description: No se encontró la competición con el ID proporcionado
 */
router.patch(`/${path}/:id`,
CompetitionsMiddleware.competitionExists,
CompetitionsMiddleware.validateCompetitionUpdateFields,
updateCompetitionName);

/**
 * @swagger
 * /api/v1/competitions/{id}:
 *   delete:
 *     summary: Eliminar una competición por su ID
 *     tags: [Competitions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la competición a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       '204':
 *         description: Competición eliminada exitosamente
 *       '404':
 *         description: No se encontró la competición con el ID proporcionado
 */
router.delete(`/${path}/:id`, 
CompetitionsMiddleware.competitionExists,
deleteCompetition);

export default router;
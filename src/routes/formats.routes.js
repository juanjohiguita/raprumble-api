import {Router} from 'express';
import {getFormat, getFormats, createFormat, deleteFormat, updateFormatDescription} from '../controllers/formats.controller.js'; // Importar con llaves significa que se importa una función específica, mientras que sin llaves se importa todo el archivo
import {ping} from '../controllers/index.controller.js';

const router = Router();

router.get("/ping", ping)

router.get("/formats", getFormats);

router.get("/formats/:id", getFormat);

router.post("/formats", createFormat);

// El metodo put permite actualizar todos los datos pero no solo una parte de llos
// router.put("/users/:id", updateUserAka);

// El metodo patch permite actualizar solo una parte de los datos
router.patch("/formats/:id", deleteFormat);


router.delete("formats/:id", updateFormatDescription);

export default router;
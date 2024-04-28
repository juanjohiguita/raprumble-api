import roundService from "../services/roundService.js";

class RoundsMiddleware {
    async roundExists(req, res, next) {
        const id = req.params.id;
        try {
            const round = await roundService.getRound(id);
            if (!round) {
                return res.status(404).json({ message: "La ronda que intentas consultar no existe" });
            }
            req.round = round;
            next();
        } catch (error) {
            next(error);
        }
    }

    validateRoundAllUpdateFields(req, res, next) {
        const { name, numberPatterns } = req.body;
        if (!name || !numberPatterns) {
            return res.status(400).json({ message: "Se debe proporcionar todos los campos para actualizar" });
        }
        next();
    }

    validateRoundUpdateFields(req, res, next) {
        const { name, numberPatterns } = req.body;
        if (!name && !numberPatterns) {
            return res.status(400).json({ message: "Se debe proporcionar al menos un campo para actualizar" });
        }
        next();
    }

}

export default new RoundsMiddleware();

import formatRoundService from "../services/formatRoundService.js";

class FormatsRoundsMiddleware {
    async formatRoundExists(req, res, next) {
        const id = req.params.id;
        try {
            const formatRound = await formatRoundService.getFormatRound(id);
            if (!formatRound) {
                return res.status(404).json({ message: "El formato de ronda que intentas consultar no existe" });
            }
            req.formatRound = formatRound;
            next();
        } catch (error) {
            next(error);
        }
    }

    validateFormatRoundAllUpdateFields(req, res, next) {
        const { idFormat, idRound } = req.body;
        if (!idFormat || !idRound) {
            return res.status(400).json({ message: "Se debe proporcionar todos los campos para actualizar" });
        }
        next();
    }

    validateFormatRoundUpdateFields(req, res, next) {
        const { idFormat, idRound } = req.body;
        if (!idFormat && !idRound) {
            return res.status(400).json({ message: "Se debe proporcionar al menos un campo para actualizar" });
        }
        next();
    }
}

export default new FormatsRoundsMiddleware();

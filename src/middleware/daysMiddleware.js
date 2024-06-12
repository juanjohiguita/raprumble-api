import dayService from "../services/dayService.js";

class DaysMiddleware {

    // ESTOS DOS MIDDLEWARES SOLO SON PARA PUT PERO NO SON DAN EN PATCH
    async dayExists(req, res, next) {
        const id = req.params.id;
        try {
            const day = await dayService.getDay(id);
            if (!day) {
                return res.status(404).json({ message: "La fecha que intentas consultar no existe" });
            }
            req.day = day;
            next();
        } catch (error) {
            next(error);
        }
    }

    validateDayUpdateFields(req, res, next) {
        const { idCompetition, numberDay, finish, enable } = req.body;
        if (!idCompetition && !numberDay && !finish && !enable) {
            return res.status(400).json({ message: "Se debe proporcionar al menos un campo para actualizar" });
        }
        next();
    }

    validateDayAllUpdateFields(req, res, next) {
        const { idCompetition, numberDay, finish, enable, location } = req.body;
        if (idCompetition == undefined|| numberDay == undefined|| finish == undefined || enable == undefined || location == undefined) {
            return res.status(400).json({ message: "Se debe proporcionar todos los campos para actualizar" });
        }
        next();
    }
}

export default new DaysMiddleware();

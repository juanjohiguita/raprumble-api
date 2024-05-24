import competitionService from "../services/competitionService.js";

class CompetitionsMiddleware {
    async competitionExists(req, res, next) {
        const id = req.params.id;
        try {
            const competition = await competitionService.getCompetition(id);
            if (!competition) {
                return res.status(404).json({ message: "La competicion que intentas consultar no existe" });
            }
            req.competition = competition;
            next();
        } catch (error) {
            next(error);
        }
    }

    validateCompetitionUpdateFields(req, res, next) {
        const { idFormat, name, numberJudges, numberCompetitors, numberDays } = req.body;
        if (!idFormat && !name && !numberJudges && !numberCompetitors && !numberDays) {
            return res.status(400).json({ message: "Se debe proporcionar al menos un campo para actualizar" });
        }
        next();
    }

    validateCompetitionAllUpdateFields(req, res, next) {
        const { idFormat, name, numberJudges, numberCompetitors, numberDays } = req.body;
        if (idFormat == undefined || name == undefined || numberJudges == undefined || numberCompetitors == undefined || numberDays == undefined) {
            return res.status(400).json({ message: "Se debe proporcionar todos los campos para actualizar" });
        }
        next();
    }
}

export default new CompetitionsMiddleware();




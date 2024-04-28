import voteService from "../services/voteService.js";

class VotesMiddleware {
    async voteExists(req, res, next) {
        const id = req.params.id;
        try {
            const vote = await voteService.getVote(id);
            if (!vote) {
                return res.status(404).json({ message: "La votación que intentas consultar no existe" });
            }
            req.vote = vote;
            next();
        } catch (error) {
            next(error);
        }
    }

    validateVoteAllUpdateFields(req, res, next) {
        const { idCompetition, idMC1, idMC2, idJudge, idDay, scoreMC1, scoreMC2 } = req.body;
        if (!idCompetition || !idMC1 || !idMC2 || !idJudge || !idDay || !scoreMC1 || !scoreMC2) {
            return res.status(400).json({ message: "Se debe proporcionar todos los campos para actualizar la votación" });
        }
        next();
    }

    validateVoteUpdateFields(req, res, next) {
        const { idCompetition, idMC1, idMC2, idJudge, idDay, scoreMC1, scoreMC2 } = req.body;
        if (!idCompetition && !idMC1 && !idMC2 && !idJudge && !idDay && !scoreMC1 && !scoreMC2) {
            return res.status(400).json({ message: "Se debe proporcionar al menos un campo para actualizar la votación" });
        }
        next();
    }
}

export default new VotesMiddleware();


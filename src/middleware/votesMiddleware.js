export const validateVoteData = (req, res, next) => {
    const { idCompetition, idMC1, idMC2, idJudge, idDay, scoreMC1, scoreMC2 } = req.body;
    if (!idCompetition || !idMC1 || !idMC2 || !idJudge || !idDay || !scoreMC1 || !scoreMC2) {
        return res.status(400).json({ message: "All fields are required" });
    }
    next();
};

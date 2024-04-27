export const validateUpdateFields = (req, res, next) => {
    const { idFormat, name, numberJudges, numberCompetitors, numberDays } = req.body;

    // Verificar que al menos un campo esté presente en la solicitud
    if (!idFormat && !name && !numberJudges && !numberCompetitors && !numberDays) {
        return res.status(400).json({ message: "Se debe proporcionar al menos un campo para actualizar" });
    }

    // Si al menos un campo está presente, continúa con la siguiente función de middleware
    next();
};

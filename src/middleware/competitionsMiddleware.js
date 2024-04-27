import competitionService from "../services/competitionService.js";

export const competitionExists = async (req, res, next) => {
    const id = req.params.id;
    try {
        const competition = await competitionService.getCompetition(id);
        if (!competition) {
            return res.status(404).json({ message: "La competicion que intentas consultar no existe" });
        }
        req.competition = competition; // Attach the competition to the request object for later use
        next(); // Continue with the next middleware
    } catch (error) {
        next(error); // Pass the error to the next middleware
    }
};

// Metodo para validar los campos requeridos para actualizar una competencia
export const validateUpdateCompetitionFields = (req, res, next) => {
    const { idFormat, name, numberJudges, numberCompetitors, numberDays } = req.body;

    // Verificar que al menos un campo esté presente en la solicitud
    if (!idFormat && !name && !numberJudges && !numberCompetitors && !numberDays) {
        return res.status(400).json({ message: "Se debe proporcionar al menos un campo para actualizar" });
    }

    // Si al menos un campo está presente, continuar con el siguiente middleware
    next();
};




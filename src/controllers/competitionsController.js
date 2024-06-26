import competitionService from "../services/competitionService.js";

export const getCompetitions = async (req, res) => {
    try {
        const competitions = await competitionService.getCompetitions();
        if (competitions.length <= 0) {
            return res.status(404).json({ message: "Competiciones no encontradas" });
        }
        res.json(competitions);
    } catch (error) {
        res.status(500).json({ message: error.message || "Error en el servidor" });
    }
};

export const getCompetition = async (req, res) => {
    const id = req.params.id;
    try {
        const competition = await competitionService.getCompetition(id);
        if (!competition) {
            return res.status(404).json({ message: "Competición no encontrado" });
        }
        res.json(competition);
    } catch (error) {
        res.status(500).json({ message: error.message || "Error en el servidor" });
    }
};

export const getCompetitionMembersAkaScoreAndPtb = async (req, res) => {
    const id = req.params.id;
    try {
        const members = await competitionService.getCompetitionMembersAkaScoreAndPtb(id);
        if (!members) {
            return res.status(404).json({ message: "Competición no encontrado" });
        }
        res.json(members);
    } catch (error) {
        res.status(500).json({ message: error.message || "Error en el servidor" });
    }
};

export const getCompetitionCompetitorsAkaScoreAndPtb = async (req, res) => {
    const id = req.params.id;
    try {
        const members = await competitionService.getCompetitionCompetitorsAkaScoreAndPtb(id);
        if (!members) {
            return res.status(404).json({ message: "Competición no encontrado" });
        }
        res.json(members);
    } catch (error) {
        res.status(500).json({ message: error.message || "Error en el servidor" });
    }
};


export const getCompetitionMembersAkaRoleNameRoleIdUserIdAndMemberId = async (req, res) => {
    const idCompetition = req.params.id;
    try {
        const members = await competitionService.getCompetitionMembersAkaRoleNameRoleIdUserIdAndMemberId(idCompetition);
        if (!members) {
            return res.status(404).json({ message: "Competición no encontrado" });
        }
        res.json(members);
    } catch (error) {
        res.status(500).json({ message: error.message || "Error en el servidor" });
    }
};

export const createCompetition = async (req, res) => {
    const { idFormat, name, numberJudges, numberCompetitors, numberDays } = req.body;
    try {
        const competitionId = await competitionService.createCompetition(idFormat, name, numberJudges, numberCompetitors, numberDays);
        res.status(201).json({ message: "Competición creada", competitionId });
    } catch (error) {
        res.status(500).json({ message: error.message || "Error en el servidor" });
    }
};

export const updateCompetitionName = async (req, res) => {
    const id = req.params.id;
    const  {name}  = req.body;
    try {
        // Llamada al servicio para actualizar el nombre de la competicion
        const success = await competitionService.updateCompetitionName(id, name);
        // Si no se ha podido actualizar la competicion, se devuelve un error
        if (!success) {
            return res.status(404).json({ message: "Competición no encontrado" });
        }
        // Si se ha podido actualizar la competicion, se devuelve un mensaje de exito y la competicion actualizada
        const updatedcompetition = await competitionService.getCompetition(id);
        return res.status(200).json({ message: `Competición modificada con ID: ${id}`, updatedcompetition });
    } catch (error) {
        res.status(500).json({ message: error.message || "Error en el servidor" });
    }
};


export const updateCompetitionAllInformation = async (req, res) => {
    const { id } = req.params;
    const { idFormat, name, numberJudges, numberCompetitors, numberDays } = req.body;

    try {
        const success = await competitionService.updateCompetitionAllInformation(id, idFormat, name, numberJudges, numberCompetitors, numberDays);
        if (!success) {
            return res.status(404).json({ message: "Competición no encontrada" });
        }
        const updatedcompetition = await competitionService.getCompetition(id);
        return res.status(200).json({ message: `Competición modificada con ID: ${id}`, updatedcompetition });
    } catch (error) {
        res.status(500).json({ message: error.message || "Error en el servidor" });
    }
};


export const deleteCompetition = async (req, res) => {
    const id = req.params.id;
    try {
        const success = await competitionService.deleteCompetition(id);
        if (!success) {
            return res.status(404).json({ message: "Competición no encontrado" });
        }
        res.json({ message: "Competición eliminada" });
    } catch (error) {
        res.status(500).json({ message: error.message || "Error en el servidor" });
    }
};
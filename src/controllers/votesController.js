import voteService from "../services/voteService.js";

export const getVotes = async (req, res) => {
    try {
        const votes = await voteService.getVotes();
        if (votes.length <= 0) return res.status(404).json({ message: "Vote not found" });
        res.json(votes);
    } catch (error) {
        res.status(500).json({ message: error.message || "Error in the server" });
    }
};


export const getAllVotesBattle = async (req, res) => {
    const idCompetition = req.params.idCompetition;  
    const idMC1 = req.params.idMC1;
    const idMC2 = req.params.idMC2;
    try {
        const votes = await voteService.getAllVotesBattle(idCompetition, idMC1, idMC2);
        if (votes.length <= 0) return res.status(404).json({ message: "Vote not found" });
        res.json(votes);
    } catch (error) {
        res.status(500).json({ message: error.message || "Error in the server" });
    }
}


export const getAllVotesDay = async (req, res) => {
    const idCompetition = req.params.idCompetition;  
    const idDay = req.params.idDay;
    try {
        const votes = await voteService.getAllVotesDay(idCompetition, idDay);
        if (votes.length <= 0) return res.status(404).json({ message: "Vote not found" });
        res.status(200).json(votes);
    } catch (error) {
        res.status(500).json({ message: error.message || "Error in the server" });
    }

}

export const getVote = async (req, res) => {
    const id = req.params.id;   
    try {
        const vote = await voteService.getVote(id);
        if (!vote) return res.status(404).json({ message: "Vote not found" });
        res.json(vote);
    } catch (error) {
        res.status(500).json({ message: error.message || "Error in the server" });
    }
};

export const getVotesByIdCompetitionAndIdDay = async (req, res) => {
    const idCompetition = req.params.idCompetition;  
    const idDay = req.params.idDay; 
    try {
        const votes = await voteService.getVotesByIdCompetitionAndIdDay(idCompetition, idDay);
        if (votes.length <= 0) return res.status(404).json({ message: "Vote not found" });
        res.json(votes);
    } catch (error) {
        res.status(500).json({ message: error.message || "Error in the server" });
    }
};


export const getVoteIdCompetitionIdjudgeIdMC1IdMC2 = async (req, res) => {
    const idCompetition = req.params.idCompetition;  
    const idJudge = req.params.idJudge; 
    const idMC1 = req.params.idMC1;
    const idMC2 = req.params.idMC2;
    try {
        const vote = await voteService.getVoteIdCompetitionIdjudgeIdMC1IdMC2(idCompetition, idJudge, idMC1, idMC2);
        if (!vote) return res.status(404).json({ message: "Vote not found" });
        res.json(vote);
    } catch (error) {
        res.status(500).json({ message: error.message || "Error in the server" });
    }
};




export const createVote = async (req, res) => {
    const { idCompetition, idMC1, idMC2, idJudge, idDay, scoreMC1, scoreMC2 } = req.body;
    try {
        const voteId = await voteService.createVote(idCompetition, idMC1, idMC2, idJudge, idDay, scoreMC1, scoreMC2 );
        res.status(201).json({ message: "Vote created", voteId });
    } catch (error) {
        res.status(500).json({ message: error.message || "Error in the server" });
    }
};

export const updateVoteAllInformation = async (req, res) => {
    // Obtencion del id de la votacion a modificar
    const id = req.params.id;
    const { idCompetition, idMC1, idMC2, idJudge, idDay, scoreMC1, scoreMC2 } = req.body;

    try {
        // Llamada al servicio para actualizar la votacion  con toda la informacion
        const success = await voteService.updateVoteAllInformation(id, idCompetition, idMC1, idMC2, idJudge, idDay, scoreMC1, scoreMC2);
        if (!success) {
            return res.status(404).json({ message: "Voto no encontrado" });
        }
        // Si se ha podido actualizar la votacion, se devuelve un mensaje de exito y la votacion actualizada
        const updatedVote = await voteService.getVote(id);
        return res.status(200).json({ message: `Voto modificado con ID: ${id}`, updatedVote });
    } catch (error) {
        res.status(500).json({ message: error.message || "Error in the server" });
    }
};

export const updateVoteScoreMC1 = async (req, res) => {
    const id = req.params.id;
    const { scoreMC1 } = req.body;
    try {
        // Llamada al servicio para actualizar el scoreMC1 de la votacion
        const success = await voteService.updateVoteScoreMC1(id,  scoreMC1 );
        // Si no se ha podido actualizar la votacion, se devuelve un error
        if(!success){
            return res.status(404).json({ message: "Votacion no encontrada" });
        }
        // Si se ha podido actualizar la votacion, se devuelve un mensaje de exito y la votacion actualizada
        const updatedVote = await voteService.getVote(id);
        return res.status(200).json({ message: `Votacion modificada con ID: ${id}`, updatedVote });
    } catch (error) {
        res.status(500).json({ message: error.message || "Error in the server" });
    }
};

export const deleteVote = async (req, res) => {
    const id = req.params.id;
    try {
        const success = await voteService.deleteVote(id);
        if (!success) return res.status(404).json({ message: "Vote not found" });
        res.json({ message: "Vote deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message || "Error in the server" });
    }
};

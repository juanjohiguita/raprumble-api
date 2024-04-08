import votesServices from "../services/votesServices.js";

export const getVotes = async (req, res) => {
    try {
        const votes = await votesServices.getVotes();
        if (votes.length <= 0) return res.status(404).json({ message: "Vote not found" });
        res.json(votes);
    } catch (error) {
        res.status(500).json({ message: error.message || "Error in the server" });
    }
};

export const getVote = async (req, res) => {
    const id = req.params.id;   
    try {
        const vote = await votesServices.getVote(id);
        if (!vote) return res.status(404).json({ message: "Vote not found" });
        res.json(vote);
    } catch (error) {
        res.status(500).json({ message: error.message || "Error in the server" });
    }
};

export const createVote = async (req, res) => {
    const { idCompetition, idMC1, idMC2, idJudge, idDay, scoreMC1, scoreMC2 } = req.body;
    try {
        const voteId = await votesServices.createVote({ idCompetition, idMC1, idMC2, idJudge, idDay, scoreMC1, scoreMC2 });
        res.status(201).json({ message: "Vote created", voteId });
    } catch (error) {
        res.status(500).json({ message: error.message || "Error in the server" });
    }
};

export const updateVoteAllInformation = async (req, res) => {
    const id = req.params.id;
    const voteData = req.body;
    try {
        const success = await votesServices.updateVoteAllInformation(id, voteData);
        if (!success) return res.status(404).json({ message: "Vote not found" });
        res.json({ message: "Vote updated" });
    } catch (error) {
        res.status(500).json({ message: error.message || "Error in the server" });
    }
};

export const updateVoteScoreMC1 = async (req, res) => {
    const id = req.params.id;
    const { scoreMC1 } = req.body;
    try {
        const updatedVote = await votesServices.updateVoteScoreMC1(id, { scoreMC1 });
        res.json({ message: `Vote modified with ID: ${id}`, vote: updatedVote });
    } catch (error) {
        res.status(500).json({ message: error.message || "Error in the server" });
    }
};

export const deleteVote = async (req, res) => {
    const id = req.params.id;
    try {
        const success = await votesServices.deleteVote(id);
        if (!success) return res.status(404).json({ message: "Vote not found" });
        res.json({ message: "Vote deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message || "Error in the server" });
    }
};

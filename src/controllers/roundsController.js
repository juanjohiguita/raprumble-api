import roundService from "../services/roundService.js";

export const getRounds = async (req, res) => {
    try {
        const rounds = await roundService.getRounds();
        if (rounds.length <= 0) {
            return res.status(404).json({ message: "Round not found" });
        }
        res.json(rounds);
    } catch (error) {
        res.status(500).json({ message: error.message || "Error in the server" });
    }
};

export const getRound = async (req, res) => {
    const id = req.params.id;
    try {
        const round = await roundService.getRound(id);
        if (!round) {
            return res.status(404).json({ message: "Round not found" });
        }
        res.json(round);
    } catch (error) {
        res.status(500).json({ message: error.message || "Error in the server" });
    }
};

export const createRound = async (req, res) => {
    const { name, numberPatterns } = req.body;
    try {
        const roundId = await roundService.createRound(name, numberPatterns);
        res.status(201).json({ message: "Round created", roundId });
    } catch (error) {
        res.status(500).json({ message: error.message || "Error in the server" });
    }
};

export const updateRoundNumberPatterns = async (req, res) => {
    const id = req.params.id;
    const { numberPatterns } = req.body;
    try {
        const success = await roundService.updateRoundNumberPatterns(id, numberPatterns);
        if (!success) {
            return res.status(404).json({ message: "Round not found" });
        }
        const updatedRound = await roundService.getRound(id);
        return res.status(200).json({ message: `Round modified with ID: ${id}`, updatedRound });
    } catch (error) {
        res.status(500).json({ message: error.message || "Error in the server" });
    }
};

export const updateRoundAllInformation = async (req, res) => {
    const id = req.params.id;
    const { name, numberPatterns } = req.body;
    try {
        const success = await roundService.updateRoundAllInformation(id, name, numberPatterns);
        if (!success) {
            return res.status(404).json({ message: "Round not found" });
        }
        res.status(200).json({ message: "Round updated" });
    } catch (error) {
        res.status(500).json({ message: error.message || "Error in the server" });
    }
};

export const deleteRound = async (req, res) => {
    const id = req.params.id;
    try {
        const success = await roundService.deleteRound(id);
        if (!success) {
            return res.status(404).json({ message: "Round not found" });
        }
        res.json({ message: "Round deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message || "Error in the server" });
    }
};

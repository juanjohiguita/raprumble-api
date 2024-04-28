import formatRoundService from "../services/formatRoundService.js";

export const getFormatsRounds = async (req, res) => {
    try {
        const formatsRounds = await formatRoundService.getFormatsRounds();
        if (formatsRounds.length <= 0) {
            return res.status(404).json({ message: "FormatRounds not found" });
        }
        res.json(formatsRounds);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Error in the server" });
    }
};

export const getFormatRound = async (req, res) => {
    const id = req.params.id;
    try {
        const formatRound = await formatRoundService.getFormatRound(id);
        if (!formatRound) {
            return res.status(404).json({ message: "FormatRound not found" });
        }
        res.json(formatRound);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Error in the server" });
    }
};

export const createFormatRound = async (req, res) => {
    const { idFormat, idRound } = req.body;
    try {
        const formatRoundId = await formatRoundService.createFormatRound(idFormat, idRound);
        res.status(201).json({ message: "FormatRound created", formatRoundId });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Error in the server" });
    }
};

export const updateFormatRoundIdRound = async (req, res) => {
    const id = req.params.id;
    const { idRound } = req.body;
    try {
        const success = await formatRoundService.updateFormatRoundIdRound(id, idRound);
        if (!success) {
            return res.status(404).json({ message: "FormatRound not found" });
        }
        const updatedFormatRound = await formatRoundService.getFormatRound(id);
        res.status(200).json({ message: `FormatRound modified with ID: ${id}`, updatedFormatRound });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Error in the server" });
    }
};

export const updateFormatRoundAllInformation = async (req, res) => {
    const { id } = req.params;
    const { idFormat, idRound } = req.body;

    // Verificar que al menos uno de los campos esté presente en la solicitud
    if (!idFormat && !idRound) {
        return res.status(400).json({ message: "At least one field must be provided for updating" });
    }

    try {
        const success = await formatRoundService.updateFormatRoundAllInformation(id, idFormat, idRound);
        if (!success) {
            return res.status(404).json({ message: "FormatRound not found" });
        }
        const updatedFormatRound = await formatRoundService.getFormatRound(id);
        res.status(200).json({ message: `FormatRound updated with ID: ${id}`, updatedFormatRound });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Error in the server" });
    }
};

export const deleteFormatRound = async (req, res) => {
    const id = req.params.id;
    try {
        const success = await formatRoundService.deleteFormatRound(id);
        if (!success) {
            return res.status(404).json({ message: "FormatRound not found" });
        }
        res.json({ message: "FormatRound deleted" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Error in the server" });
    }
};

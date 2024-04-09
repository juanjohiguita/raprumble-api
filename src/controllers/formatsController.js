import formatService from "../services/formatService.js";

export const getFormats = async (req, res) => {
    try {
        const format = await formatService.getFormats();
        if (format.length <= 0) {
            return res.status(404).json({ message: "format not found" });
        }
        res.json(format);
    } catch (error) {
        res.status(500).json({ message: error.message || "Error in the server" });
    }
};

export const getFormat = async (req, res) => {
    const id = req.params.id;
    try {
        const format = await formatService.getFormat(id);
        if (!format) {
            return res.status(404).json({ message: "format not found" });
        }
        res.json(format);
    } catch (error) {
        res.status(500).json({ message: error.message || "Error in the server" });
    }
};

export const createFormat = async (req, res) => {
    const { name, description } = req.body;
    try {
        const formatId = await formatService.createFormat(name, description);
        res.status(201).json({ message: "format created", formatId });
    } catch (error) {
        res.status(500).json({ message: error.message || "Error in the server" });
    }
};

export const updateFormatDescription = async (req, res) => {
    const id = req.params.id;
    const { description } = req.body;
    try {
        const success = await formatService.updateFormatDescription(id, description);
        if (!success) {
            return res.status(404).json({ message: "format not found" });
        }
        const updatedFormat = await formatService.getFormat(id);
        return res.status(200).json({ message: `format modified with ID: ${id}`, updatedFormat });
    } catch (error) {
        res.status(500).json({ message: error.message || "Error in the server" });
    }
};

export const updateFormatAllInformation = async (req, res) => {
    const id = req.params.id;
    const { name, description } = req.body;
    try {
        const success = await formatService.updateFormatAllInformation(id, name, description);
        if (!success) {
            return res.status(404).json({ message: "format not found" });
        }
        res.status(200).json({ message: "format updated" });
    } catch (error) {
        res.status(500).json({ message: error.message || "Error in the server" });
    }
};

export const deleteFormat = async (req, res) => {
    const id = req.params.id;
    try {
        const success = await formatService.deleteFormat(id);
        if (!success) {
            return res.status(404).json({ message: "format not found" });
        }
        res.json({ message: "format deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message || "Error in the server" });
    }
};

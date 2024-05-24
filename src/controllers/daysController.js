import dayService from "../services/dayService.js";

export const getDays = async (req, res) => {
    try {
        const days = await dayService.getDays();
        if (days.length <= 0) {
            return res.status(404).json({ message: "Días no encontrados" });
        }
        res.json(days);
    } catch (error) {
        res.status(500).json({ message: error.message || "Error en el servidor" });
    }
};

export const getDay = async (req, res) => {
    const id = req.params.id;
    try {
        const day = await dayService.getDay(id);
        if (!day) {
            return res.status(404).json({ message: "Día no encontrado" });
        }
        res.json(day);
    } catch (error) {
        res.status(500).json({ message: error.message || "Error en el servidor" });
    }
};



export const getCountDaysByCompetition = async (req, res) => {
    const idCompetition = req.params.idCompetition;
    try {
        const day = await dayService.getCountDaysByCompetition(idCompetition);
        if (!day) {
            return res.status(404).json({ message: "Día no encontrado" });
        }
        res.json(day);
    } catch (error) {
        res.status(500).json({ message: error.message || "Error en el servidor" });
    }
};

export const createDay = async (req, res) => {
    const { idCompetition, numberDay, finish, enable } = req.body;
    try {
        const dayId = await dayService.createDay(idCompetition, numberDay, finish, enable);
        res.status(201).json({ message: "Día creado", dayId });
    } catch (error) {
        res.status(500).json({ message: error.message || "Error en el servidor" });
    }
};

export const updateDayFinish = async (req, res) => {
    const id = req.params.id;
    const { finish } = req.body;
    try {
        const success = await dayService.updateDayFinish(id, finish);
        if (!success) {
            return res.status(404).json({ message: "Día no encontrado" });
        }
        const updatedDay = await dayService.getDay(id);
        return res.status(200).json({ message: `Día modificado con ID: ${id}`, updatedDay });
    } catch (error) {
        res.status(500).json({ message: error.message || "Error en el servidor" });
    }
};

export const updateDayAllInformation = async (req, res) => {
    const { id } = req.params;
    const { idCompetition, numberDay, finish, enable } = req.body;

    // Verificar que al menos un campo esté presente en la solicitud
    // Esto debe ir en el middleware
    if (!idCompetition && !numberDay && !finish && !enable) {
        return res.status(400).json({ message: "Se debe proporcionar al menos un campo para actualizar" });
    }

    try {
        const success = await dayService.updateDayAllInformation(id, idCompetition, numberDay, finish, enable);
        if (!success) {
            return res.status(404).json({ message: "Día no encontrado" });
        }
        const updatedDay = await dayService.getDay(id);
        return res.status(200).json({ message: `Día modificado con ID: ${id}`, updatedDay });
    } catch (error) {
        res.status(500).json({ message: error.message || "Error en el servidor" });
    }
};

export const deleteDay = async (req, res) => {
    const id = req.params.id;
    try {
        const success = await dayService.deleteDay(id);
        if (!success) {
            return res.status(404).json({ message: "Día no encontrado" });
        }
        res.json({ message: "Día eliminado" });
    } catch (error) {
        res.status(500).json({ message: error.message || "Error en el servidor" });
    }
};

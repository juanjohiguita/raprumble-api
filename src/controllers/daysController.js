import dayService from "../services/dayService.js";

export const getDays = async (req, res) => {
    try {
        const days = await dayService.getDays();
        if (days.length <= 0) {
            return res.status(404).json({ message: "Fechas no encontrados" });
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
            return res.status(404).json({ message: "Fecha no encontrada" });
        }
        res.json(day);
    } catch (error) {
        res.status(500).json({ message: error.message || "Error en el servidor" });
    }
};

export const getDayByCompetitionAndNumberDay = async (req, res) => {
    const idCompetition = req.params.idCompetition;
    const numberDay = req.params.numberDay;
    try {
        const day = await dayService.getDayByCompetitionAndNumberDay(idCompetition, numberDay);
        if (!day) {
            return res.status(404).json({ message: "Fecha no encontrada" });
        }
        res.json(day);
    } catch (error) {
        res.status(500).json({ message: error.message || "Error en el servidor" });
    }

}


export const getCountDaysByCompetition = async (req, res) => {
    const idCompetition = req.params.idCompetition;
    try {
        const day = await dayService.getCountDaysByCompetition(idCompetition);
        if (!day) {
            return res.status(404).json({ message: "Fecha no encontrada" });
        }
        res.json(day);
    } catch (error) {
        res.status(500).json({ message: error.message || "Error en el servidor" });
    }
};

export const createDay = async (req, res) => {
    const { idCompetition, numberDay, finish, enable, location } = req.body;
    try {
        const dayId = await dayService.createDay(idCompetition, numberDay, finish, enable, location);
        res.status(201).json({ message: "Fecha creado", dayId });
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
            return res.status(404).json({ message: "Fecha no encontrada" });
        }
        const updatedDay = await dayService.getDay(id);
        return res.status(200).json({ message: `Fecha modificado con ID: ${id}`, updatedDay });
    } catch (error) {
        res.status(500).json({ message: error.message || "Error en el servidor" });
    }
};


export const updateDayLocation = async (req, res) => {
    const id = req.params.id;
    const { location } = req.body;
    try {
        const success = await dayService.updateDayLocation(id, location);
        if (!success) {
            return res.status(404).json({ message: "Fecha no encontrada" });
        }
        const updatedDay = await dayService.getDay(id);
        return res.status(200).json({ message: `Fecha modificado con ID: ${id}`, updatedDay });
    } catch (error) {
        res.status(500).json({ message: error.message || "Error en el servidor" });
    }

}

export const updateDayEnable = async (req, res) => {
    const id = req.params.id;
    const { enable } = req.body;
    try {
        const success = await dayService.updateDayEnable(id, enable);
        if (!success) {
            return res.status(404).json({ message: "Fecha no encontrada" });
        }
        const updatedDay = await dayService.getDay(id);
        return res.status(200).json({ message: `Fecha modificado con ID: ${id}`, updatedDay });
    } catch (error) {
        res.status(500).json({ message: error.message || "Error en el servidor" });
    }

}

export const updateDayAllInformation = async (req, res) => {
    const { id } = req.params;
    const { idCompetition, numberDay, finish, enable, location } = req.body;

    try {
        const success = await dayService.updateDayAllInformation(id, idCompetition, numberDay, finish, enable, location);
        if (!success) {
            return res.status(404).json({ message: "Fecha no encontrada" });
        }
        const updatedDay = await dayService.getDay(id);
        return res.status(200).json({ message: `Fecha modificado con ID: ${id}`, updatedDay });
    } catch (error) {
        res.status(500).json({ message: error.message || "Error en el servidor" });
    }
};

export const deleteDay = async (req, res) => {
    const id = req.params.id;
    try {
        const success = await dayService.deleteDay(id);
        if (!success) {
            return res.status(404).json({ message: "Fecha no encontrada" });
        }
        res.json({ message: "Fecha eliminado" });
    } catch (error) {
        res.status(500).json({ message: error.message || "Error en el servidor" });
    }
};

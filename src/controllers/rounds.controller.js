import { pool } from "../config/db.js";

export const getRounds = async (req, res) => {
    try{
        const [rows] = await pool.query("SELECT id, name, numberPatterns FROM rounds; ")
        if(rows.length <= 0) return res.status(404).json({message: "Round not found"});
        res.json(rows);
    } catch (error) {
        res.status(500).json({message: "Error in the server"});
    } 
};

export const getRound = async (req, res) => {
    const id  = req.params.id;
    try {
        const [rows] = await pool.query("SELECT id, name, numberPatterns FROM rounds WHERE id = ?", [id], (error, rows) => {
        res.send(rows);
        });
        if(rows.length <= 0) return res.status(404).json({message: "Round not found"});
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({message: "Error in the server"});
    }
};

export const createRound = async (req, res) => {
    const {name, numberPatterns} = req.body;
    try {
        // Validaciones a los datos

        // Consulta a la base de datos
        const [rows] = await pool.query(
        "INSERT INTO rounds (name, numberPatterns) VALUES (?, ?)",
        [name, numberPatterns],
            (error, results) => {
                if (error) {
                    throw error;
                }
                res.status(204).send(`Round added with ID: ${results.insertId}`);
            }
        );
        res.send({
            id: rows.insertId,
            name,
            numberPatterns
        })
    } catch (error) {
            res.status(500).json({message: "Error in the server"});
    }
    
    
};
export const updateRoundNumberPatterns = async (req, res) => {
    const id  = req.params.id;
    const {name, numberPatterns} = req.body;
    try {
        const [result] = await pool. query(
            "UPDATE rounds SET numberPatterns = IFNULL(?, numberPatterns) WHERE id = ?",
            [numberPatterns,  id],
            (error, results) => {
                if(result.length <= 0) return res.status(404).json({message: "Round not found"});
                if (error) {
                    throw error;
                }
                res.status(204).send(`Round modified with ID: ${id}`);
            }
        );

        const [rows] = await pool.query("SELECT id, name, numberPatterns FROM rounds WHERE id = ?", [id]);
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({message: "Error in the server"});
    }

};

export const updateRoundAllInformation = async (req, res) => {
    const { id } = req.params;
    const { name, numberPatterns } = req.body;

    // Verificar que al menos uno de los campos esté presente en la solicitud
    if (!name && !numberPatterns) {
        return res.status(400).json({ message: "Al menos un campo debe ser proporcionado para actualizar" });
    }

    try {
        // Verificar si la ronda existe
        const [existingRound] = await pool.query("SELECT * FROM rounds WHERE id = ?", [id]);

        if (existingRound.length === 0) {
            return res.status(404).json({ message: "Ronda no encontrada" });
        }

        // Actualizar los campos de la ronda con los valores proporcionados en la solicitud
        const updateQuery = "UPDATE rounds SET name = ?, numberPatterns = ? WHERE id = ?";
        await pool.query(updateQuery, [name || existingRound[0].name, numberPatterns || existingRound[0].numberPatterns, id]);

        // Obtener los datos actualizados de la ronda después de la actualización
        const [updatedRound] = await pool.query("SELECT * FROM rounds WHERE id = ?", [id]);

        // Respuesta exitosa
        res.status(200).json({ message: "Ronda actualizada", round: updatedRound[0] });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Error al actualizar la ronda" });
    }
};


export const deleteRound = async (req, res) => {
    const id  = req.params.id;
    try {
        const [rows] = await pool.query("DELETE FROM rounds WHERE id = ?", [id]);
        if(rows.affectedRows <= 0) return res.status(404).json({message: "Round not found"});
        res.json({message: "Round deleted"});
    } catch (error) {
        res.status(500).json({message: "Error in the server"});
    }
};
import { pool } from "../config/db.js";

export const getVotes = async (req, res) => {
    try{
        const [rows] = await pool.query("SELECT id, idCompetition, idMC1, idMC2, idJudge, idDay, scoreMC1, scoreMC2 FROM votes")
        if(rows.length <= 0) return res.status(404).json({message: "Vote not found"});
        res.json(rows);
    } catch (error) {
        res.status(500).json({message: "Error in the server"});
    } 
};

export const getVote = async (req, res) => {
    const id  = req.params.id;
    try {
        const [rows] = await pool.query("SELECT id, idCompetition, idMC1, idMC2, idJudge, idDay, scoreMC1, scoreMC2 FROM votes WHERE id = ?", [id], (error, rows) => {
        res.send(rows);
        });
        if(rows.length <= 0) return res.status(404).json({message: "Vote not found"});
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({message: "Error in the server"});
    }
};

export const createVote = async (req, res) => {
    const {idCompetition, idMC1, idMC2, idJudge, idDay, scoreMC1, scoreMC2} = req.body;
    try {
        // Validaciones a los datos

        // Consulta a la base de datos
        const [rows] = await pool.query(
        "INSERT INTO votes (idCompetition, idMC1, idMC2, idJudge, idDay, scoreMC1, scoreMC2) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [idCompetition, idMC1, idMC2, idJudge, idDay, scoreMC1, scoreMC2],
            (error, results) => {
                if (error) {
                    throw error;
                }
                res.status(204).send(`vote added with ID: ${results.insertId}`);
            }
        );
        res.send({
            id: rows.insertId,
            idCompetition,
            idMC1,
            idMC2,
            idJudge,
            idDay,
            scoreMC1,
            scoreMC2
        })
    } catch (error) {
            res.status(500).json({message: "Error in the server"});
    }
    
    
};

export const updateVoteAllInformation = async (req, res) => {
    const { id } = req.params;
    const { idCompetition, idMC1, idMC2, idJudge, idDay, scoreMC1, scoreMC2 } = req.body;

    // Verificar que al menos uno de los campos esté presente en la solicitud
    if (!idCompetition && !idMC1 && !idMC2 && !idJudge && !idDay && !scoreMC1 && !scoreMC2) {
        return res.status(400).json({ message: "Al menos un campo debe ser proporcionado para actualizar" });
    }

    try {
        // Verificar si el voto existe
        const [existingVote] = await pool.query("SELECT * FROM votes WHERE id = ?", [id]);

        if (existingVote.length === 0) {
            return res.status(404).json({ message: "Voto no encontrado" });
        }

        // Actualizar los campos del voto con los valores proporcionados en la solicitud
        const updateQuery = "UPDATE votes SET idCompetition = ?, idMC1 = ?, idMC2 = ?, idJudge = ?, idDay = ?, scoreMC1 = ?, scoreMC2 = ? WHERE id = ?";
        await pool.query(updateQuery, [idCompetition || existingVote[0].idCompetition, idMC1 || existingVote[0].idMC1, idMC2 || existingVote[0].idMC2, idJudge || existingVote[0].idJudge, idDay || existingVote[0].idDay, scoreMC1 || existingVote[0].scoreMC1, scoreMC2 || existingVote[0].scoreMC2, id]);

        // Obtener los datos actualizados del voto después de la actualización
        const [updatedVote] = await pool.query("SELECT * FROM votes WHERE id = ?", [id]);

        // Respuesta exitosa
        res.status(200).json({ message: "Voto actualizado", vote: updatedVote[0] });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Error al actualizar el voto" });
    }
};


export const updateVoteScoreMC1 = async (req, res) => {
    const id  = req.params.id;
    const {idCompetition, idMC1, idMC2, idJudge, idDay, scoreMC1, scoreMC2} = req.body;
    try {
        const [result] = await pool. query(
            "UPDATE votes SET scoreMC1 = IFNULL(?, scoreMC1) WHERE id = ?",
            [scoreMC1,  id],
            (error, results) => {
                if(result.length <= 0) return res.status(404).json({message: "Vote not found"});
                if (error) {
                    throw error;
                }
                res.status(204).send(`Vote modified with ID: ${id}`);
            }
        );

        const [rows] = await pool.query("SELECT id, idCompetition, idMC1, idMC2, idJudge, idDay, scoreMC1, scoreMC2  FROM votes WHERE id = ?", [id]);
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({message: "Error in the server"});
    }

};

export const deleteVote = async (req, res) => {
    const id  = req.params.id;
    try {
        const [rows] = await pool.query("DELETE FROM votes WHERE id = ?", [id]);
        if(rows.affectedRows <= 0) return res.status(404).json({message: "Vote not found"});
        res.json({message: "Vote deleted"});
    } catch (error) {
        res.status(500).json({message: "Error in the server"});
    }
};

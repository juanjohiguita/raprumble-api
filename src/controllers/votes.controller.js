import { pool } from "../db.js";

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
    // Extraer los datos del cuerpo de la solicitud
    const { idCompetition, idMC1, idMC2, idJudge, idDay, scoreMC1, scoreMC2 } = req.body;
    const id = req.params.id; 

    try {
        // Consultar la base de datos para verificar si el usuario existe        
        const [rows] = await pool.query("SELECT id, idCompetition, idMC1, idMC2, idJudge, idDay, scoreMC1, scoreMC2 FROM votes WHERE id = ?", [id], 
        (error, results) => {
            if(rows.length <= 0) return res.status(404).json({message: "vote not found"});
            if (error) {
                throw error;
            }
            res.status(204).send(`vote found with ID: ${id}`);
        });
        const vote = rows[0];
        // Si el usuario no existe, responder con un mensaje de error
        if (!vote) {
            return res.status(404).json({ message: 'vote not found' });
        }
        // Actualizar los campos del usuario si se proporcionan en la solicitud
        if (idCompetition) {
            vote.idCompetition = idCompetition;
        } 
        if (idMC2) {
            vote.idMC2 = idMC2;
        }
        if (idMC1) {
            vote.idMC1 = idMC1;
        }
        if (idJudge) {
            vote.idJudge = idJudge;
        }
        if (idDay) {
            vote.idDay = idDay;
        }
        if(scoreMC1){
            vote.scoreMC1 = scoreMC1;
        }
        if(scoreMC2){
            vote.scoreMC2 = scoreMC2;
        }
        // Guardar los cambios en la base de datos
        const update = await pool.query("UPDATE votes SET idCompetition = ?, idMC2 = ?, idMC1 = ?, idJudge = ?, idDay = ?, scoreMC1 = ?, scoreMC2 = ? WHERE id = ?", [vote.idCompetition, vote.idMC2, vote.idMC1, vote.idJudge, vote.idDay, vote.scoreMC1, vote.scoreMC2, id]);
        console.log(rows);
        const [result] = await pool.query("SELECT id, idCompetition, idMC1, idMC2, idJudge, idDay, scoreMC1, scoreMC2 FROM votes WHERE id = ?", [id], 
        (error, results) => {
            if(update.length <= 0) return res.status(404).json({message: "vote not found"});
            if (error) {
                throw error;
            }
            res.status(204).send(`vote found with ID: ${id}`);
        });
        // Respuesta exitosa
        res.status(200).json({message:"vote updated", result});
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error updating vote' });
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

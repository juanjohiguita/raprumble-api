import { pool } from "../db.js";

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
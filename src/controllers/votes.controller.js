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

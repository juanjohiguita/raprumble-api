import { pool } from "../db.js";

export const getFormatsRounds = async (req, res) => {
    try{
        const [rows] = await pool.query("SELECT id, idFormat, idRound FROM formats_rounds; ")
        if(rows.length <= 0) return res.status(404).json({message: "FormatRound not found"});
        res.json(rows);
    } catch (error) {
        res.status(500).json({message: "Error in the server"});
    } 
};

export const getFormatRound = async (req, res) => {
    const id  = req.params.id;
    try {
        const [rows] = await pool.query("SELECT id, idFormat, idRound FROM formats_rounds WHERE id = ?", [id], (error, rows) => {
        res.send(rows);
        });
        if(rows.length <= 0) return res.status(404).json({message: "FormatRound not found"});
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({message: "Error in the server"});
    }
};

export const createFormatRound = async (req, res) => {
    const {idFormat, idRound} = req.body;
    try {
        // Validaciones a los datos

        // Consulta a la base de datos
        const [rows] = await pool.query(
        "INSERT INTO formats_rounds (idFormat, idRound) VALUES (?, ?)",
        [idFormat, idRound],
            (error, results) => {
                if (error) {
                    throw error;
                }
                res.status(204).send(`FormatRound added with ID: ${results.insertId}`);
            }
        );
        res.send({
            id: rows.insertId,
            idFormat,
            idRound
        })
    } catch (error) {
            res.status(500).json({message: "Error in the server"});
    }
    
    
};
export const updateFormatRoundIdRound = async (req, res) => {
    const id  = req.params.id;
    const {idFormat, idRound} = req.body;
    try {
        const [result] = await pool. query(
            "UPDATE formats_rounds SET name = IFNULL(?, name) WHERE id = ?",
            [idFormat, idRound,  id],
            (error, results) => {
                if(result.length <= 0) return res.status(404).json({message: "FormatRound not found"});
                if (error) {
                    throw error;
                }
                res.status(204).send(`FormatRound modified with ID: ${id}`);
            }
        );

        const [rows] = await pool.query("SELECT id, idFormat, idRound FROM rols WHERE id = ?", [id]);
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({message: "Error in the server"});
    }

};

export const deleteFormatRound = async (req, res) => {
    const id  = req.params.id;
    try {
        const [rows] = await pool.query("DELETE FROM formats_rounds WHERE id = ?", [id]);
        if(rows.affectedRows <= 0) return res.status(404).json({message: "FormatRound not found"});
        res.json({message: "FormatRound deleted"});
    } catch (error) {
        res.status(500).json({message: "Error in the server"});
    }
};
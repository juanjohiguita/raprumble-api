import { pool } from "../db.js";

export const getCompetitions = async (req, res) => {
    try{
        const [rows] = await pool.query("SELECT id, idFormat, name, numberJudges, numberCompetitors, numberDays FROM Competitions")
        if(rows.length <= 0) return res.status(404).json({message: "Competition not found"});
        res.json(rows);
    } catch (error) {
        res.status(500).json({message: "Error in the server"});
    } 
};

export const getCompetition = async (req, res) => {
    const id  = req.params.id;
    try {
        const [rows] = await pool.query("SELECT id, idFormat, name, numberJudges, numberCompetitors, numberDays FROM competitions WHERE id = ?", [id], (error, rows) => {
        res.send(rows);
        });
        if(rows.length <= 0) return res.status(404).json({message: "Competition not found"});
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({message: "Error in the server"});
    }
};

export const createCompetition = async (req, res) => {
    const {idFormat, name, numberJudges, numberCompetitors, numberDays} = req.body;
    try {
        // Validaciones a los datos

        // Consulta a la base de datos
        const [rows] = await pool.query(
        "INSERT INTO competitions (idFormat, name, numberJudges, numberCompetitors, numberDays) VALUES (?, ?, ?, ?, ?)",
        [idFormat, name, numberJudges, numberCompetitors, numberDays],
            (error, results) => {
                if (error) {
                    throw error;
                }
                res.status(204).send(`Competition added with ID: ${results.insertId}`);
            }
        );
        res.send({
            id: rows.insertId,
            idFormat,
            numberJudges,
            numberCompetitors,
            numberDays
        })
    } catch (error) {
            res.status(500).json({message: "Error in the server"});
    }
    
    
};

export const updateCompetitionName = async (req, res) => {
    const id  = req.params.id;
    const {idFormat, name, numberJudges, numberCompetitors, numberDays} = req.body;
    try {
        const [result] = await pool. query(
            "UPDATE competitions SET name = IFNULL(?, name) WHERE id = ?",
            [name,  id],
            (error, results) => {
                if(result.length <= 0) return res.status(404).json({message: "Competition not found"});
                if (error) {
                    throw error;
                }
                res.status(204).send(`Competition modified with ID: ${id}`);
            }
        );

        const [rows] = await pool.query("SELECT id, idFormat, name, numberJudges, numberCompetitors, numberDays  FROM competitions WHERE id = ?", [id]);
        res.json(rows[0]);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Error in the server" });
    }
};


export const deleteCompetition = async (req, res) => {
    const id  = req.params.id;
    try {
        const [rows] = await pool.query("DELETE FROM competitions WHERE id = ?", [id]);
        if(rows.affectedRows <= 0) return res.status(404).json({message: "Competition not found"});
        res.json({message: "Competition deleted"});
    } catch (error) {
        res.status(500).json({message: "Error in the server"});
    }
};

import { pool } from "../db.js";

export const getDays = async (req, res) => {
    try{
        const [rows] = await pool.query("SELECT id, idCompetition, numberDay, finish, enable FROM days; ")
        if(rows.length <= 0) return res.status(404).json({message: "Days not found"});
        res.json(rows);
    } catch (error) {
        res.status(500).json({message: "Error in the server"});
    } 
};

export const getDay = async (req, res) => {
    const id  = req.params.id;
    try {
        const [rows] = await pool.query("SELECT id, idCompetition, numberDay, finish, enable FROM days WHERE id = ?", [id], (error, rows) => {
        res.send(rows);
        });
        if(rows.length <= 0) return res.status(404).json({message: "Days not found"});
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({message: "Error in the server"});
    }
};

export const createDay = async (req, res) => {
    const {id, idCompetition, numberDay, finish, enable} = req.body;
    try {
        // Validaciones a los datos

        // Consulta a la base de datos
        const [rows] = await pool.query(
        "INSERT INTO days (id, idCompetition, numberDay, finish, enable) VALUES (?, ?,?, ?, ?)",
        [id, idCompetition, numberDay, finish, enable],
            (error, results) => {
                if (error) {
                    throw error;
                }
                res.status(204).send(`Days added with ID: ${results.insertId}`);
            }
        );
        res.send({
            id: rows.insertId,
            idCompetition,
            numberDay,
            finish,
            enable  
        })
    } catch (error) {
            res.status(500).json({message: "Error in the server"});
    }
    
    
};
export const updateDayFinish = async (req, res) => {
    const id  = req.params.id;
    const {finish} = req.body;
    try {
        const [result] = await pool. query(
            "UPDATE days SET finish = IFNULL(?, finish) WHERE id = ?",
            [finish, id],
            (error, results) => {
                if(result.length <= 0) return res.status(404).json({message: "Days not found"});
                if (error) {
                    throw error;
                }
                res.status(204).send(`Days modified with ID: ${id}`);
            }
        );

        const [rows] = await pool.query("SELECT id, idCompetition, numberDay, finish, enable FROM days WHERE id = ?", [id]);
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({message: "Error in the server"});
    }

};

export const deleteDay = async (req, res) => {
    const id  = req.params.id;
    try {
        const [rows] = await pool.query("DELETE FROM days WHERE id = ?", [id]);
        if(rows.affectedRows <= 0) return res.status(404).json({message: "Days not found"});
        res.json({message: "Days deleted"});
    } catch (error) {
        res.status(500).json({message: "Error in the server"});
    }
};
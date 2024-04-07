import { pool } from "../db.js";

export const getRoles = async (req, res) => {
    try{
        const [rows] = await pool.query("SELECT id, name, type FROM roles; ")
        if(rows.length <= 0) return res.status(404).json({message: "roles not found"});
        res.json(rows);
    } catch (error) {
        res.status(500).json({message: "Error in the server"});
    } 
};

export const getRole = async (req, res) => {
    const id  = req.params.id;
    try {
        const [rows] = await pool.query("SELECT id, name, type FROM roles WHERE id = ?", [id], (error, rows) => {
        res.send(rows);
        });
        if(rows.length <= 0) return res.status(404).json({message: "roles not found"});
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({message: "Error in the server"});
    }
};

export const createRole = async (req, res) => {
    const {name, type} = req.body;
    try {
        // Validaciones a los datos

        // Consulta a la base de datos
        const [rows] = await pool.query(
        "INSERT INTO roles (name, type) VALUES (?, ?)",
        [name, type],
            (error, results) => {
                if (error) {
                    throw error;
                }
                res.status(204).send(`Roles added with ID: ${results.insertId}`);
            }
        );
        res.send({
            id: rows.insertId,
            name,
            type
        })
    } catch (error) {
            res.status(500).json({message: "Error in the server"});
    }
    
    
};
export const updateRoleName = async (req, res) => {
    const id  = req.params.id;
    const {name, type} = req.body;
    try {
        const [result] = await pool. query(
            "UPDATE roles SET name = IFNULL(?, name) WHERE id = ?",
            [name,  id],
            (error, results) => {
                if(result.length <= 0) return res.status(404).json({message: "Roles not found"});
                if (error) {
                    throw error;
                }
                res.status(204).send(`Roles modified with ID: ${id}`);
            }
        );

        const [rows] = await pool.query("SELECT id, name, type FROM roles WHERE id = ?", [id]);
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({message: "Error in the server"});
    }

};

export const deleteRole = async (req, res) => {
    const id  = req.params.id;
    try {
        const [rows] = await pool.query("DELETE FROM roles WHERE id = ?", [id]);
        if(rows.affectedRows <= 0) return res.status(404).json({message: "Roles not found"});
        res.json({message: "roles deleted"});
    } catch (error) {
        res.status(500).json({message: "Error in the server"});
    }
};
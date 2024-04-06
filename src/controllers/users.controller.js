import { pool } from "../db.js";

export const getUsers = async (req, res) => {
    try{
        const [rows] = await pool.query("SELECT id, username, email, aka, profilePicture FROM users")
        if(rows.length <= 0) return res.status(404).json({message: "User not found"});
        res.json(rows);
    } catch (error) {
        res.status(500).json({message: "Error in the server"});
    } 
};

export const getUser = async (req, res) => {
    const id  = req.params.id;
    try {
        const [rows] = await pool.query("SELECT id, username, email, aka, profilePicture FROM users WHERE id = ?", [id], (error, rows) => {
        res.send(rows);
        });
        if(rows.length <= 0) return res.status(404).json({message: "User not found"});
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({message: "Error in the server"});
    }
};

export const createUser = async (req, res) => {
    const {username, email, password, aka, profilePicture} = req.body;
    try {
        // Validaciones a los datos

        // Consulta a la base de datos
        const [rows] = await pool.query(
        "INSERT INTO users (username, email, password, aka, profilePicture) VALUES (?, ?, ?, ?, ?)",
        [username, email, password, aka, profilePicture],
            (error, results) => {
                if (error) {
                    throw error;
                }
                res.status(204).send(`User added with ID: ${results.insertId}`);
            }
        );
        res.send({
            id: rows.insertId,
            username,
            email,
            password,
            aka,
            profilePicture
        })
    } catch (error) {
            res.status(500).json({message: "Error in the server"});
    }
    
    
};
export const updateUserAka = async (req, res) => {
    const id  = req.params.id;
    const {username, email, password, aka, profilePicture} = req.body;
    try {
        const [result] = await pool. query(
            "UPDATE users SET aka = IFNULL(?, aka) WHERE id = ?",
            [aka,  id],
            (error, results) => {
                if(result.length <= 0) return res.status(404).json({message: "User not found"});
                if (error) {
                    throw error;
                }
                res.status(204).send(`User modified with ID: ${id}`);
            }
        );

        const [rows] = await pool.query("SELECT id, username, email,aka, profilePicture  FROM users WHERE id = ?", [id]);
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({message: "Error in the server"});
    }

};

export const deleteUser = async (req, res) => {
    const id  = req.params.id;
    try {
        const [rows] = await pool.query("DELETE FROM users WHERE id = ?", [id]);
        if(rows.affectedRows <= 0) return res.status(404).json({message: "User not found"});
        res.json({message: "User deleted"});
    } catch (error) {
        res.status(500).json({message: "Error in the server"});
    }
};

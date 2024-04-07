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

export const getUserAllInformation = async (req, res) => {
    const id  = req.params.id;
    try {
        const [rows] = await pool.query("SELECT id, username, email, password, aka, profilePicture FROM users WHERE id = ?", [id], (error, rows) => {
        res.send(rows);
        });
        if(rows.length <= 0) return res.status(404).json({message: "User not found"});
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({message: "Error in the server"});
    }
};

export const createUser = async (req, res) => {
    const {username, password, email, aka, profilePicture} = req.body;
    try {
        // Validaciones a los datos

        // Consulta a la base de datos
        const [rows] = await pool.query(
        "INSERT INTO users (username, password, email, aka, profilePicture) VALUES (?, ?, ?, ?, ?)",
        [username, password, email, aka, profilePicture],
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
            password,
            email,
            aka,
            profilePicture
        })
    } catch (error) {
            res.status(500).json({message: "Error in the server"});
    }  
};

export const updateUserAllInformation = async (req, res) => {
    const { id } = req.params;
    const { username, email, password, aka, profilePicture } = req.body;

    // Verificar que al menos uno de los campos esté presente en la solicitud
    if (!username && !email && !password && !aka && !profilePicture) {
        return res.status(400).json({ message: "Al menos un campo debe ser proporcionado para actualizar" });
    }

    try {
        // Verificar si el usuario existe
        const [existingUser] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);

        if (existingUser.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Actualizar los campos del usuario con los valores proporcionados en la solicitud
        const updateQuery = "UPDATE users SET username = ?, email = ?, password = ?, aka = ?, profilePicture = ? WHERE id = ?";
        await pool.query(updateQuery, [username || existingUser[0].username, email || existingUser[0].email, password || existingUser[0].password, aka || existingUser[0].aka, profilePicture || existingUser[0].profilePicture, id]);

        // Obtener los datos actualizados del usuario después de la actualización
        const [updatedUser] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);

        // Respuesta exitosa
        res.status(200).json({ message: "Usuario actualizado", user: updatedUser[0] });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Error al actualizar el usuario" });
    }
};


export const updateUserAka = async (req, res) => {
    const id  = req.params.id;
    const {aka} = req.body;
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

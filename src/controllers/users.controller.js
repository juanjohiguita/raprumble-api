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
    // Extraer los datos del cuerpo de la solicitud
    const { username, email, password, aka, profilePicture } = req.body;
    const id = req.params.id; 

    try {
        // Verificar si el usuario existe
        const [rows] = await pool.query("SELECT id, username, password, email, aka, profilePicture FROM users WHERE id = ?", [id]);
        if(rows.length <= 0) return res.status(404).json({message: "User not found"});
        const user = rows[0];
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Actualizar los campos del usuario si se proporcionan en la solicitud
        if (username) {
            user.username = username;
        }
        if (email) {
            user.email = email;
        }
        if (password) {
            // Hash de la nueva contraseña antes de guardarla
            // const hashedPassword = await bcrypt.hash(password, 10);
            // user.password = hashedPassword;

            user.password = password;

        }
        if (aka) {
            user.aka = aka;
        }
        if (profilePicture) {
            user.profilePicture = profilePicture;
        }
        // Guardar los cambios en la base de datos
        const [result] = await pool.query("UPDATE users SET username = ?, email = ?, password = ?, aka = ?, profilePicture = ? WHERE id = ?", [user.username, user.email, user.password, user.aka, user.profilePicture, id]);
        // Respuesta exitosa
        res.status(200).json({ message: 'User updated successfully', user});
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error updating user' });
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

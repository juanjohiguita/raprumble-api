import { pool } from "../config/db.js";

class userService {
    async getUsers() {
        try {
            const [rows] = await pool.query("SELECT id, username, password, email, aka, profilePicture FROM users");
            return rows;
        } catch (error) {
            throw new Error(error.message || "Error fetching users");
        }
    }

    async getUser (id) {
        try {
            const [rows] = await pool.query("SELECT id, username, email, aka, profilePicture FROM users WHERE id = ?", [id]);
            return rows[0];
        } catch (error) {
            throw new Error(error.message || "Error fetching user");
        }
    }

    async getUserByUsername (username) {
        try {
            const [rows] = await pool.query("SELECT id, username, email, aka, profilePicture FROM users WHERE username = ?", [username]);
            return rows[0];
        } catch (error) {
            throw new Error(error.message || "Error fetching user");
        }
    }
    
    async getUserByEmail (email) {
        try {
            const [rows] = await pool.query("SELECT id, password, username, email, aka, profilePicture FROM users WHERE email = ?", [email]);
            return rows[0];
        } catch (error) {
            throw new Error(error.message || "Error fetching user");
        }
    }

    

    async createUser(username, password, email, aka, profilePicture) {
        try {
            const [result] = await pool.query("INSERT INTO users (username, password, email, aka, profilePicture) VALUES (?, ?, ?, ?, ?)", [username, password, email, aka, profilePicture]);
            return result.insertId;
        } catch (error) {
            throw new Error(error.message || "Error creating user");
        }
    }

    async updateUserAka(id, aka) {
        try {
            // Actualizacion del atributo aka mediante un update
            const [result] = await pool.query("UPDATE users SET aka = IFNULL(?, aka) WHERE id = ?", [aka, id]);
            return result.affectedRows > 0;

        } catch (error) {
            throw new Error(error.message || "Error updating user");
        }
    }

    async updateUserProfilePicture(id, profilePicture) {
        try {
            // Actualizacion del atributo profilePicture mediante un update
            const [result] = await pool.query("UPDATE users SET profilePicture = ? WHERE id = ?", [profilePicture, id]);
            return result.affectedRows > 0;

        } catch (error) {
            throw new Error(error.message || "Error updating user");
        }
    }

    async updateUserAllInformation(id, username, password, email, aka, profilePicture) {
        try {
            // Actualización de los atributos mediante un update
            const [result] = await pool.query(
                "UPDATE users SET username = ?, email = ?, password = ?, aka = ?, profilePicture = ? WHERE id = ?",
                [username, email, password, aka, profilePicture, id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(error.message || "Error updating user");
        }
    }
    

    async deleteUser(id) {
        try {
            // Eliminacion de la fila mediante un delete
            const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error("Error deleting user");
        }
    }
}

export default new userService;

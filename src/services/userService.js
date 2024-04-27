import { pool } from "../config/db.js";

class userService {
    async getUsers() {
        try {
            const [rows] = await pool.query("SELECT id, username, email, aka, profilePicture FROM users");
            return rows;
        } catch (error) {
            throw new Error("Error fetching users");
        }
    }

    async getUser (id) {
        try {
            const [rows] = await pool.query("SELECT id, username, email, aka, profilePicture FROM users WHERE id = ?", [id]);
            return rows[0];
        } catch (error) {
            throw new Error("Error fetching user");
        }
    }

    async createUser(username, password, email, aka, profilePicture) {
        try {
            const [result] = await pool.query("INSERT INTO users (username, password, email, aka, profilePicture) VALUES (?, ?, ?, ?, ?)", [username, password, email, aka, profilePicture]);
            return result.insertId;
        } catch (error) {
            throw new Error("Error creating user");
        }
    }

    async updateUserAka(id, aka) {
        try {
            // Comprobacion existencia de la fecha (Esto deberia ir en el middleware)
            const [existingUser] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
            if (existingUser.length === 0) {
                throw new Error("user not found");
            }
            // Actualizacion del atributo aka mediante un update
            const [result] = await pool.query("UPDATE users SET aka = IFNULL(?, aka) WHERE id = ?", [aka, id]);
            return result.affectedRows > 0;

        } catch (error) {
            throw new Error("Error updating user");
        }
    }

    async updateUserAllInformation(id, username, email, password, aka, profilePicture ) {
        try {
            // Actualizacion de los atributos mediante un update
            const [result] = await pool.query("UPDATE users SET username = ?, email = ?, password= ?, aka = ?, profilePicture = ? WHERE id = ?", [username, email, password, aka, profilePicture, id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error("Error updating user");
        }
    }

    async deleteUser(id) {
        try {
            // Esto va en el middleware ya que es una comprobacion de existencia
            const [existingUser] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
            if (existingUser.length === 0) {
                throw new Error("user not found");
            }
            // Eliminacion de la fila mediante un delete
            const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error("Error deleting user");
        }
    }
}

export default new userService;

import { pool } from "../config/db.js";

export const userServices = {
    getUsers: async () => {
        try {
            const [rows] = await pool.query("SELECT id, username, email, aka, profilePicture FROM users");
            return rows;
        } catch (error) {
            throw new Error("Error retrieving users from the database");
        }
    },

    getUser: async (id) => {
        try {
            const [rows] = await pool.query("SELECT id, username, email, aka, profilePicture FROM users WHERE id = ?", [id]);
            return rows[0];
        } catch (error) {
            throw new Error("Error retrieving user from the database");
        }
    },

    createUser: async ({ username, password, email, aka, profilePicture }) => {
        try {
            const [rows] = await pool.query(
                "INSERT INTO users (username, password, email, aka, profilePicture) VALUES (?, ?, ?, ?, ?)",
                [username, password, email, aka, profilePicture]
            );
            return rows.insertId;
        } catch (error) {
            throw new Error("Error creating user");
        }
    },

    updateUser: async (id, { username, email, password, aka, profilePicture }) => {
        try {
            await pool.query(
                "UPDATE users SET username = ?, email = ?, password = ?, aka = ?, profilePicture = ? WHERE id = ?",
                [username, email, password, aka, profilePicture, id]
            );
            return true; // Opcional: Puedes devolver algún indicador de éxito si lo deseas
        } catch (error) {
            throw new Error("Error updating user");
        }
    },

    deleteUser: async (id) => {
        try {
            const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);
            return result.affectedRows > 0; // Devuelve true si se eliminó al menos un usuario, de lo contrario, false
        } catch (error) {
            throw new Error("Error deleting user");
        }
    },

    getUserAllInformation: async (id) => {
        try {
            const [rows] = await pool.query("SELECT id, username, email, password, aka, profilePicture FROM users WHERE id = ?", [id]);
            if (rows.length <= 0) {
                throw new Error("User not found");
            }
            return rows[0];
        } catch (error) {
            throw new Error("Error retrieving user information");
        }
    },

    updateUserAllInformation: async (id, { username, email, password, aka, profilePicture }) => {
        try {
            const [existingUser] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
            if (existingUser.length === 0) {
                throw new Error("User not found");
            }

            const updateQuery = "UPDATE users SET username = ?, email = ?, password = ?, aka = ?, profilePicture = ? WHERE id = ?";
            await pool.query(updateQuery, [username || existingUser[0].username, email || existingUser[0].email, password || existingUser[0].password, aka || existingUser[0].aka, profilePicture || existingUser[0].profilePicture, id]);

            const [updatedUser] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
            return updatedUser[0];
        } catch (error) {
            throw new Error("Error updating user information");
        }
    },

    updateUserAkaById: async (id, { aka }) => {
        try {
            const [result] = await pool.query("UPDATE users SET aka = IFNULL(?, aka) WHERE id = ?", [aka, id]);
            if (result.affectedRows <= 0) {
                throw new Error("User not found");
            }

            const [rows] = await pool.query("SELECT id, username, email, aka, profilePicture FROM users WHERE id = ?", [id]);
            return rows[0];
        } catch (error) {
            throw new Error("Error updating user aka");
        }
    }
};

export default userServices;

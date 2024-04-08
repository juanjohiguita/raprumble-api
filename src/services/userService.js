import { pool } from "../config/db.js";
import userModel from "../models/userModel.js";

export const userService = {
    getUsers: async () => {
        try {
            const [rows] = await pool.query("SELECT id, username, email, aka, profilePicture FROM users");
            return rows.map(row => new userModel(row.id, row.username, row.email, row.aka, row.profilePicture));

        } catch (error) {
            throw new Error("Error retrieving users from the database");
        }
    },
    getUser: async (id) => {
        try {
            const [rows] = await pool.query("SELECT id, username, email, aka, profilePicture FROM users WHERE id = ?", [id]);
            if (rows.length === 0) {
                throw new Error("User not found");
            }
            const user = new userModel(rows[0].id, rows[0].username, rows[0].email, rows[0].aka, rows[0].profilePicture);
            return user; 
        } catch (error)     {
            throw new Error("Error retrieving user from the database");
        }
    },

    createUser: async ({ username, password, email, aka, profilePicture }) => {
        try {
            const [result] = await pool.query(
                "INSERT INTO users (username, password, email, aka, profilePicture) VALUES (?, ?, ?, ?, ?)",
                [username, password, email, aka, profilePicture]
            );
            return result.insertId;
        } catch (error) {
            throw new Error("Error creating user");
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
            return new userModel(updatedUser[0].id, updatedUser[0].username, updatedUser[0].email, updatedUser[0].aka, updatedUser[0].profilePicture);
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
            const user = new userModel(rows[0].id, rows[0].username, rows[0].email, rows[0].aka, rows[0].profilePicture);
            return user; 
        } catch (error)     {
            throw new Error("Error updating user aka");
        }
    },

    deleteUser: async (id) => {
        try {
            const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error("Error deleting user");
        }
    },
};

export default userService;

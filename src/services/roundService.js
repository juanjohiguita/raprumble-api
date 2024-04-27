import { pool } from "../config/db.js";

class roundService {
    async getRounds() {
        try {
            const [rows] = await pool.query("SELECT id, name, numberPatterns FROM rounds;");
            return rows;
        } catch (error) {
            throw new Error("Error fetching rounds");
        }
    }

    async getRound(id) {
        try {
            const [rows] = await pool.query("SELECT id, name, numberPatterns FROM rounds WHERE id = ?", [id]);
            return rows[0];
        } catch (error) {
            throw new Error("Error fetching round");
        }
    }

    async createRound(name, numberPatterns) {
        try {
            const [result] = await pool.query("INSERT INTO rounds (name, numberPatterns) VALUES (?, ?)", [name, numberPatterns]);
            return result.insertId;
        } catch (error) {
            throw new Error("Error creating round");
        }
    }

    async updateRoundNumberPatterns(id, numberPatterns) {
        try {
            const [result] = await pool.query("UPDATE rounds SET numberPatterns = ? WHERE id = ?", [numberPatterns, id]);
            console.log(result);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error("Error updating round");
        }
    }

    async updateRoundAllInformation(id, name, numberPatterns) {
        try {
            const [result] = await pool.query("UPDATE rounds SET name = ?, numberPatterns = ? WHERE id = ?", [name, numberPatterns, id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error("Error updating round");
        }
    }

    async deleteRound(id) {
        try {
            const [result] = await pool.query("DELETE FROM rounds WHERE id = ?", [id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error("Error deleting round");
        }
    }
}

export default new roundService;

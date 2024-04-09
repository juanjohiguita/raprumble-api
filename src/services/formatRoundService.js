import { pool } from "../config/db.js";

class formatRoundService {
    async getFormatsRounds() {
        try {
            const [rows] = await pool.query("SELECT id, idFormat, idRound FROM formatsRounds");
            return rows;
        } catch (error) {
            throw new Error("Error fetching formatsRounds");
        }
    }

    async getFormatRound (id) {
        try {
            const [rows] = await pool.query("SELECT id, idFormat, idRound FROM formatsRounds WHERE id = ?", [id]);
            return rows[0];
        } catch (error) {
            throw new Error("Error fetching round");
        }
    }

    async createFormatRound(idFormat, idRound) {
        try {
            const [result] = await pool.query("INSERT INTO formatsRounds(idFormat, idRound) VALUES (?, ?)", [idFormat, idRound]);
            return result.insertId;
        } catch (error) {
            throw new Error("Error creating round");
        }
    }

    async updateFormatRoundIdRound(id, idRound) {
        try {
            const [result] = await pool.query("UPDATE formatsRounds SET idRound = IFNULL(?, idRound) WHERE id = ?", [idRound, id]);
            console.log(result);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error("Error updating round");
        }
    }

    async updateFormatRoundAllInformation(id, idFormat, idRound) {
        try {
            const [result] = await pool.query("UPDATE formatsRounds SET idFormat = ?, idRound = ? WHERE id = ?", [idFormat, idRound, id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error("Error updating round");
        }
    }

    async deleteFormatRound(id) {
        try {
            const [result] = await pool.query("DELETE FROM formatsRounds WHERE id = ?", [id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error("Error deleting round");
        }
    }
}

export default formatRoundService;
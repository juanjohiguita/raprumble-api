import { pool } from "../config/db.js";

class formatsRoundsService {
    async getFormatsRounds() {
        try {
            const [rows] = await pool.query("SELECT id, idFormat, idRound FROM formats_rounds");
            return rows;
        } catch (error) {
            throw new Error("Error fetching formats_rounds");
        }
    }

    async getFormatRound (id) {
        try {
            const [rows] = await pool.query("SELECT id, idFormat, idRound FROM formats_rounds WHERE id = ?", [id]);
            console.log(rows);
            return rows[0];
        } catch (error) {
            throw new Error("Error fetching formatsRounds");
        }
    }

    async createFormatRound(idFormat, idRound) {
        try {
            const [result] = await pool.query("INSERT INTO formats_rounds(idFormat, idRound) VALUES (?, ?)", [idFormat, idRound]);
            return result.insertId;
        } catch (error) {
            throw new Error("Error creating formatsRounds");
        }
    }

    async updateFormatRoundIdRound(id, idRound) {
        try {
            const [result] = await pool.query("UPDATE formats_rounds SET idRound = ? WHERE id = ?", [idRound, id]);
            console.log(result);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error("Error updating formatsRounds");
        }
    }

    async updateFormatRoundAllInformation(id, idFormat, idRound) {
        try {
            const [result] = await pool.query("UPDATE formats_rounds SET idFormat = ?, idRound = ? WHERE id = ?", [idFormat, idRound, id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error("Error updating formatsRounds");
        }
    }

    async deleteFormatRound(id) {
        try {
            const [result] = await pool.query("DELETE FROM formats_rounds WHERE id = ?", [id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error("Error deleting formatsRounds");
        }
    }
}

export default new formatsRoundsService;
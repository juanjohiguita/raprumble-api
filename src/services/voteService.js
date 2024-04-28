import { pool } from "../config/db.js";

class voteservice {
    async getVotes() {
        try {
            const [rows] = await pool.query("SELECT id, idCompetition, idMC1, idMC2, idJudge, idDay, scoreMC1, scoreMC2 FROM votes");
            return rows;
        } catch (error) {
            throw new Error("Error fetching votes");
        }
    }

    async getVote (id) {
        try {
            const [rows] = await pool.query("SELECT id, idCompetition, idMC1, idMC2, idJudge, idDay, scoreMC1, scoreMC2 FROM votes WHERE id = ?", [id]);
            return rows[0];
        } catch (error) {
            throw new Error("Error fetching vote");
        }
    }

    async createVote(idCompetition, idMC1, idMC2, idJudge, idDay, scoreMC1, scoreMC2) {
        try {
            const [result] = await pool.query("INSERT INTO votes (idCompetition, idMC1, idMC2, idJudge, idDay, scoreMC1, scoreMC2) VALUES (?, ?, ?, ?, ?, ?, ?)", [idCompetition, idMC1, idMC2, idJudge, idDay, scoreMC1, scoreMC2]);
            return result.insertId;
        } catch (error) {
            throw new Error("Error creating vote");
        }
    }

    async updateVoteScoreMC1(id, scoreMC1) {
        try {
            // Actualizacion del atributo scoreMC1 mediante un update
            const [result] = await pool.query("UPDATE votes SET scoreMC1 = ? WHERE id = ?", [scoreMC1, id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error("Error updating vote");
        }
    }

    async updateVoteAllInformation(id, idCompetition, idMC1, idMC2, idJudge, idDay, scoreMC1, scoreMC2 ) {
        try {
            // Actualizacion de los atributos mediante un update
            const [result] = await pool.query("UPDATE votes SET idCompetition = ?, idMC1 = ?, idMC2 = ?, idJudge = ?, idDay = ?, scoreMC1 = ?, scoreMC2 = ? WHERE id = ?", [idCompetition, idMC1, idMC2, idJudge, idDay, scoreMC1, scoreMC2, id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error("Error updating vote");
        }
    }

    async deleteVote(id) {
        try {
            // Esto va en el middleware ya que es una comprobacion de existencia
            const [existingVote] = await pool.query("SELECT * FROM votes WHERE id = ?", [id]);
            if (existingVote.length === 0) {
                throw new Error("day not found");
            }
            // Eliminacion de la votacion mediante un delete
            const [result] = await pool.query("DELETE FROM votes WHERE id = ?", [id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error("Error deleting vote");
        }
    }
}

export default new voteservice;
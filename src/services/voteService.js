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
            const [rows] = await pool.query("SELECT id, idCompetition, idMC1, idMC2, idJudge, idDay, scoreMC1, scoreMC2, winner FROM votes WHERE id = ?", [id]);
            return rows[0];
        } catch (error) {
            throw new Error("Error fetching vote");
        }
    }
    
    async getAllVotesBattle (idCompetition, idMC1, idMC2) {
        try {
            const [rows] = await pool.query("SELECT id, idCompetition, idMC1, idMC2, idJudge, idDay, scoreMC1, scoreMC2, winner FROM votes WHERE idCompetition = ? AND ((idMC1 = ? AND idMC2 = ?) OR (idMC1 = ? AND idMC2 = ?))", 
            [idCompetition, idMC1, idMC2, idMC2, idMC1]);
            return rows;
        } catch (error) {
            throw new Error("Error fetching vote");
        }    
    }

    async getAllVotesDay (idCompetition, idDay) {
        try {
            const [rows] = await pool.query("SELECT LEAST(idMC1, idMC2) as mc1, GREATEST(idMC1, idMC2) as mc2, SUM(scoreMC1) as totalScoreMC1, SUM(scoreMC2) as totalScoreMC2 FROM votes WHERE idCompetition = ? AND idDay = ? GROUP BY mc1, mc2",
            [idCompetition, idDay]);
            return rows;
        } catch (error) {
            throw new Error("Error fetching vote");
        }
    }
    async getVotesByIdCompetitionAndIdDay (idCompetition, idDay) {
        try {
            const [rows] = await pool.query("SELECT id, idCompetition, idMC1, idMC2, idJudge, idDay, scoreMC1, scoreMC2, winner FROM votes WHERE idCompetition = ? AND idDay = ?", [idCompetition, idDay]);
            return rows;
        } catch (error) {
            throw new Error("Error fetching vote");
        }
    }

    async getVoteIdCompetitionIdjudgeIdMC1IdMC2 (idCompetition, idJudge, idMC1, idMC2) {
        try {
            const [rows] = await pool.query("SELECT id, idCompetition, idMC1, idMC2, idJudge, idDay, scoreMC1, scoreMC2, winner FROM votes WHERE idCompetition = ? AND idJudge = ? AND idMC1 = ? AND idMC2 = ?", [idCompetition, idJudge, idMC1, idMC2]);   
            return rows;
        } catch (error) {
            throw new Error("Error fetching vote");
        }
    }


    

    async createVote(idCompetition, idMC1, idMC2, idJudge, idDay, scoreMC1, scoreMC2, winner) {
        try {
            const [result] = await pool.query("INSERT INTO votes (idCompetition, idMC1, idMC2, idJudge, idDay, scoreMC1, scoreMC2, winner) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [idCompetition, idMC1, idMC2, idJudge, idDay, scoreMC1, scoreMC2, winner]);
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

    async updateVoteAllInformation(id, idCompetition, idMC1, idMC2, idJudge, idDay, scoreMC1, scoreMC2, winner ) {
        try {
            // Actualizacion de los atributos mediante un update
            const [result] = await pool.query("UPDATE votes SET idCompetition = ?, idMC1 = ?, idMC2 = ?, idJudge = ?, idDay = ?, scoreMC1 = ?, scoreMC2 = ?, winner = ? WHERE id = ?", [idCompetition, idMC1, idMC2, idJudge, idDay, scoreMC1, scoreMC2, id, winner]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error("Error updating vote");
        }
    }

    async deleteVote(id) {
        try {
            // Eliminacion de la votacion mediante un delete
            const [result] = await pool.query("DELETE FROM votes WHERE id = ?", [id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error("Error deleting vote");
        }
    }
}

export default new voteservice;
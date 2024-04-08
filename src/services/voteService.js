import { pool } from "../config/db.js"
import voteModel from "../models/voteModel.js"

export const voteService = {
    getVotes: async () => {
        try {
            const [rows] = await pool.query("SELECT id, idCompetition, idMC1, idMC2, idJudge, idDay, scoreMC1, scoreMC2 FROM votes");
            return rows.map(row => new voteModel(row.id, row.idCompetition, row.idMC1, row.idMC2, row.idJudge, row.idDay, row.scoreMC1,row.scoreMC2));
        } catch (error) {
            throw new Error("Error retrieving votes from the database");
        }
    },

    getVote: async (id) => {
        try {
            const [rows] = await pool.query("SELECT id, idCompetition, idMC1, idMC2, idJudge, idDay, scoreMC1, scoreMC2 FROM votes WHERE id = ?", [id]);
            const vote = new voteModel(rows[0].id, rows[0].idCompetition, rows[0].idMC1, rows[0].idMC2, rows[0].idJudge, rows[0].idDay, rows[0].scoreMC1,rows[0].scoreMC2);
            return vote; 
        } catch (error) {
            throw new Error("Error retrieving vote from the database");
        }
    },

    createVote: async ({ idCompetition, idMC1, idMC2, idJudge, idDay, scoreMC1, scoreMC2 }) => {
        try {
            const [result] = await pool.query(
                "INSERT INTO votes (idCompetition, idMC1, idMC2, idJudge, idDay, scoreMC1, scoreMC2) VALUES (?, ?, ?, ?, ?,?, ?)",
                [idCompetition, idMC1, idMC2, idJudge, idDay, scoreMC1, scoreMC2]
            );
            return result.insertId;
        } catch (error) {
            throw new Error("Error creating vote");
        }
    },

    updateVoteAllInformation: async (id, { idCompetition, idMC1, idMC2, idJudge, idDay, scoreMC1, scoreMC2 }) => {
        try {
            const [existingvote] = await pool.query("SELECT * FROM votes WHERE id = ?", [id]);
            if (existingvote.length === 0) {
                throw new Error("vote not found");
            }

            const updateQuery = "UPDATE votes SET idCompetition = ?, idMC1 = ?, idMC2 = ?, idJudge = ?, idDay = ?, scoreMC1 = ?, scoreMC2 = ? WHERE id = ?";
            await pool.query(updateQuery, [idCompetition || existingvote[0].idCompetition, idMC1 || existingvote[0].idMC1, idMC2 || existingvote[0].idMC2, idJudge || existingvote[0].idJudge, idDay || existingvote[0].idDay,scoreMC1 || existingvote[0].scoreMC1,scoreMC2 || existingvote[0].scoreMC2, id]);

            const [updatedVote] = await pool.query("SELECT * FROM votes WHERE id = ?", [id]);
            return new voteModel(updatedVote[0].idCompetition, updatedVote[0].idMC1, updatedVote[0].idMC2, updatedVote[0].idJudge, updatedVote[0].idDay, updatedVote[0].scoreMC1, updatedVote[0].scoreMC2);
        } catch (error) {
            throw new Error("Error updating vote information");
        }
    },

    updateVoteScoreMC1: async (id, { scoreMC1 }) => {
        try {
            const [result] = await pool.query("UPDATE votes SET scoreMC1 = IFNULL(?, scoreMC1) WHERE id = ?", [scoreMC1, id]);
            if (result.affectedRows <= 0) {
                throw new Error("vote not found");
            }

            const [rows] = await pool.query("SELECT id, idCompetition, idMC1, idMC2, idJudge, idDay, scoreMC1, scoreMC2 FROM votes WHERE id = ?", [id]);
            const vote = new voteModel(rows[0].idCompetition, rows[0].idMC1, rows[0].idMC2, rows[0].idJudge, rows[0].idDay, rows[0].scoreMC1, rows[0].scoreMC2);
            return vote; 
        } catch (error) {
            throw new Error("Error updating vote idJudge");
        }
    },


    deleteVote: async (id) => {
        try {
            const [result] = await pool.query("DELETE FROM votes WHERE id = ?", [id]);
            return result.affectedRows > 0; // Devuelve true si se eliminó al menos un usuario, de lo contrario, false
        } catch (error) {
            throw new Error("Error deleting vote");
        }
    },


};

export default voteService;
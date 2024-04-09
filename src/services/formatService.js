import { pool } from "../config/db.js";

class formatService {
    async getFormats() {
        try {
            const [rows] = await pool.query("SELECT id, idUserMember, idCompetitionMember, idRole, score, ptb FROM members");
            return rows;
        } catch (error) {
            throw new Error("Error fetching members");
        }
    }

    async getFormat (id) {
        try {
            const [rows] = await pool.query("SELECT id, idUserMember, idCompetitionMember, idRole, score, ptb FROM members WHERE id = ?", [id]);
            return rows[0];
        } catch (error) {
            throw new Error("Error fetching round");
        }
    }

    async createFormat(idUserMember, idCompetitionMember, idRole, score, ptb) {
        try {
            const [result] = await pool.query("INSERT INTO members(idUserMember, idCompetitionMember, idRole, score, ptb) VALUES (?, ?,?,?,?)", [idUserMember, idCompetitionMember, idRole, score, ptb]);
            return result.insertId;
        } catch (error) {
            throw new Error("Error creating round");
        }
    }

    async updateMemberPtb(id, ptb) {
        try {
            const [result] = await pool.query("UPDATE members SET ptb = IFNULL(?, ptb) WHERE id = ?", [ptb, id]);
            console.log(result);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error("Error updating round");
        }
    }

    async updateMemberAllInformation(id, idUserMember, idCompetitionMember, idRole, score, ptb) {
        try {
            const [result] = await pool.query("UPDATE members SET idUserMember = ?, idCompetitionMember = ?, idRole = ?, score = ?, ptb = ? WHERE id = ?", [idUserMember, idCompetitionMember, idRole, score, ptb, id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error("Error updating round");
        }
    }

    async deleteMember(id) {
        try {
            const [result] = await pool.query("DELETE FROM members WHERE id = ?", [id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error("Error deleting round");
        }
    }
}

export default formatService;
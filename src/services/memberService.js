import { pool } from "../config/db.js";

class memberService {
    async getMembers() {
        try {
            const [rows] = await pool.query("SELECT id, idUserMember, idCompetitionMember, idRole, score, ptb FROM members");
            return rows;
        } catch (error) {
            throw new Error("Error fetching members");
        }
    }

    async getUserMembers(idUser) {
        try {
            const [rows] = await pool.query("SELECT id, idUserMember, idCompetitionMember, idRole, score, ptb FROM members WHERE idUserMember = ?", [idUser]);
            return rows;
        } catch (error) {
            throw new Error("Error fetching members");
        }
    }
    

    async getMember (id) {
        try {
            const [rows] = await pool.query("SELECT id, idUserMember, idCompetitionMember, idRole, score, ptb FROM members WHERE id = ?", [id]);
            return rows[0];
        } catch (error) {
            throw new Error("Error fetching member");
        }
    }

    async createMember(idUserMember, idCompetitionMember, idRole, score, ptb) {
        try {
            const [result] = await pool.query("INSERT INTO members(idUserMember, idCompetitionMember, idRole, score, ptb) VALUES (?, ?,?,?,?)", [idUserMember, idCompetitionMember, idRole, score, ptb]);
            return result.insertId;
        } catch (error) {
            throw new Error("Error creating member");
        }
    }

    async updateMemberPtbAndScore(id, ptb, score) {
        try {
            const [result] = await pool.query("UPDATE members SET ptb = ?, score = ? WHERE id = ?", [ptb, score, id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error("Error updating member");
        }
    }

    async updateMemberIdRole(id, idRole) {
        try {
            const [result] = await pool.query("UPDATE members SET idRole = ? WHERE id = ?", [idRole, id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error("Error updating member");
        }
    }

    

    async updateMemberAllInformation(id, idUserMember, idCompetitionMember, idRole, score, ptb) {
        try {
            const [result] = await pool.query("UPDATE members SET idUserMember = ?, idCompetitionMember = ?, idRole = ?, score = ?, ptb = ? WHERE id = ?", [idUserMember, idCompetitionMember, idRole, score, ptb, id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error("Error updating member");
        }
    }

    async deleteMember(id) {
        try {
            const [result] = await pool.query("DELETE FROM members WHERE id = ?", [id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error("Error deleting member");
        }
    }
}

export default new memberService;
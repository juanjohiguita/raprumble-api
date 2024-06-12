import { pool } from "../config/db.js";

class memberService {
    async getMembers() {
        try {
            const [rows] = await pool.query("SELECT id, idUserMember, idCompetitionMember, idRole, score, ptb FROM members");
            return rows;
        } catch (error) {
            throw new Error(error.message || "Error fetching members");
        }
    }

    async getUserMembers(idUser) {
        try {
            const [rows] = await pool.query("SELECT id, idUserMember, idCompetitionMember, idRole, score, ptb FROM members WHERE idUserMember = ?", [idUser]);
            return rows;
        } catch (error) {
            throw new Error(error.message || "Error fetching members");
        }
    }
    

    async getMember (id) {
        try {
            const [rows] = await pool.query("SELECT id, idUserMember, idCompetitionMember, idRole, score, ptb FROM members WHERE id = ?", [id]);
            return rows[0];
        } catch (error) {
            throw new Error(error.message || "Error fetching member");
        }
    }

    async createMember(idUserMember, idCompetitionMember, idRole, score, ptb) {
        try {
            const listMembers = await this.getUserMembers(idUserMember);
            let roleCount = 0;
            let hasJudgeRole = false;
    
            // Check the existing roles for this user in the same competition
            for (const member of listMembers) {
                if (member.idCompetitionMember === idCompetitionMember) {
                    roleCount++;
                    if (member.idRole === 2) {
                        hasJudgeRole = true;
                    }
                }
            }
            // Validation only max 2 roles
            if (roleCount >= 2) {
                throw new Error("User cannot have more than two roles in the same competition");
            }
            // Validation if a user is member like judge cant create a member like competitor
            if (hasJudgeRole && idRole === 3) {
                throw new Error("User cannot be a competitor if they are already a judge in the same competition");
            }
    
            // Insert the new member if validations pass
            const [result] = await pool.query("INSERT INTO members(idUserMember, idCompetitionMember, idRole, score, ptb) VALUES (?, ?, ?, ?, ?)", [idUserMember, idCompetitionMember, idRole, score, ptb]);
            return result.insertId;
        } catch (error) {
            throw new Error(error.message || "Error creating member");
        }
    }

    async updateMemberPtbAndScore(id, ptb, score) {
        try {
            const [result] = await pool.query("UPDATE members SET ptb = ?, score = ? WHERE id = ?", [ptb, score, id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(error.message || "Error updating member");
        }
    }

    async updateMemberIdRole(id, idRole) {
        try {
            const [result] = await pool.query("UPDATE members SET idRole = ? WHERE id = ?", [idRole, id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(error.message || "Error updating member");
        }
    }

    

    async updateMemberAllInformation(id, idUserMember, idCompetitionMember, idRole, score, ptb) {
        try {
            const [result] = await pool.query("UPDATE members SET idUserMember = ?, idCompetitionMember = ?, idRole = ?, score = ?, ptb = ? WHERE id = ?", [idUserMember, idCompetitionMember, idRole, score, ptb, id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(error.message || "Error updating member");
        }
    }

    async deleteMember(id) {
        try {
            const [result] = await pool.query("DELETE FROM members WHERE id = ?", [id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(error.message || "Error deleting member");
        }
    }
}

export default new memberService;
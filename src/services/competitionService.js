import { pool } from "../config/db.js";

class competitionService {
    async getCompetitions() {
        try {
            const [rows] = await pool.query("SELECT id, idFormat, name, numberJudges, numberCompetitors, numberDays FROM Competitions");
            return rows;
        } catch (error) {
            throw new Error(error.message || "Error fetching competitions");
        }
    }

    async getCompetition (id) {
        try {
            const [rows] = await pool.query("SELECT id, idFormat, name, numberJudges, numberCompetitors, numberDays FROM Competitions WHERE id = ?", [id]);
            return rows[0];
        } catch (error) {
            throw new Error(error.message || "Error fetching competition");
        }
    }

    async getCompetitionMembersAkaScoreAndPtb (id) {
        try {
            const [rows] = await pool.query("SELECT aka, score, ptb, FROM users u JOIN members m ON u.id = m.idUserMember WHERE m.idCompetitionMember = ?;", [id]);
            return rows;
        } catch (error) {
            throw new Error(error.message || "Error fetching competition");
        }
    }

    async getCompetitionCompetitorsAkaScoreAndPtb (id) {
        try {
            const [rows] = await pool.query("SELECT u.aka, m.score, m.ptb, m.id AS idMember FROM users u JOIN members m ON u.id = m.idUserMember JOIN roles r ON m.idRole = r.id WHERE m.idCompetitionMember = ? AND r.name = 'competidor';", [id]);
            return rows;
        } catch (error) {
            throw new Error(error.message || "Error fetching competition");
        }
    }

    

    async getCompetitionMembersAkaRoleNameRoleIdUserIdAndMemberId (idCompetition) {
        try {
            const [rows] = await pool.query("SELECT u.aka, m.idRole, r.name AS roleName, m.idUserMember AS idUser, m.id AS idMember, m.idCompetitionMember AS idCompetition FROM users u JOIN members m ON u.id = m.idUserMember JOIN roles r ON m.idRole = r.id WHERE m.idCompetitionMember = ?;", [idCompetition]);
            return rows;
        } catch (error) {
            throw new Error(error.message || "Error fetching competition");
        }
    }



    async createCompetition(idFormat, name, numberJudges, numberCompetitors, numberDays) {
        try {
            const [result] = await pool.query("INSERT INTO competitions (idFormat, name, numberJudges, numberCompetitors, numberDays) VALUES (?, ?, ?, ?, ?)", [idFormat, name, numberJudges, numberCompetitors, numberDays]);
            return result.insertId;
        } catch (error) {
            throw new Error(error.message || "Error creating competition");
        }
    }

    async updateCompetitionName(id, name) {
        try {
            // Actualizacion del atributo name mediante un update
            const [result] = await pool.query("UPDATE competitions SET name = ? WHERE id = ?", [name, id]);
            return result.affectedRows > 0;

        } catch (error) {
            throw new Error(error.message || "Error updating competition");
        }
    }

    async updateCompetitionAllInformation(id, idFormat, name, numberJudges, numberCompetitors, numberDays ) {
        try {
            // Actualizacion de los atributos mediante un update
            const [result] = await pool.query("UPDATE competitions SET idFormat = ?,name = ?, numberJudges = ?, numberCompetitors = ?, numberDays = ? WHERE id = ?", [idFormat, name, numberJudges, numberCompetitors, numberDays, id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(error.message || "Error updating competition");
        }
    }

    async deleteCompetition(id) {
        try {
            // Eliminacion de la competicion mediante un delete
            const [result] = await pool.query("DELETE FROM competitions WHERE id = ?", [id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(error.message || "Error deleting competition");
        }
    }
}

export default new competitionService;
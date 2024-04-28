import { pool } from "../config/db.js";

class competitionService {
    async getCompetitions() {
        try {
            const [rows] = await pool.query("SELECT id, idFormat, name, numberJudges, numberCompetitors, numberDays FROM Competitions");
            return rows;
        } catch (error) {
            throw new Error("Error fetching competitions");
        }
    }

    async getCompetition (id) {
        try {
            const [rows] = await pool.query("SELECT id, idFormat, name, numberJudges, numberCompetitors, numberDays FROM Competitions WHERE id = ?", [id]);
            return rows[0];
        } catch (error) {
            throw new Error("Error fetching day");
        }
    }

    async createCompetition(idFormat, name, numberJudges, numberCompetitors, numberDays) {
        try {
            const [result] = await pool.query("INSERT INTO competitions (idFormat, name, numberJudges, numberCompetitors, numberDays) VALUES (?, ?, ?, ?, ?)", [idFormat, name, numberJudges, numberCompetitors, numberDays]);
            return result.insertId;
        } catch (error) {
            throw new Error("Error creating day");
        }
    }

    async updateCompetitionName(id, name) {
        try {
            // Actualizacion del atributo name mediante un update
            const [result] = await pool.query("UPDATE competitions SET name = ? WHERE id = ?", [name, id]);
            return result.affectedRows > 0;

        } catch (error) {
            throw new Error("Error updating day");
        }
    }

    async updateCompetitionAllInformation(id, idFormat, name, numberJudges, numberCompetitors, numberDays ) {
        try {
            // Actualizacion de los atributos mediante un update
            const [result] = await pool.query("UPDATE competitions SET idFormat = ?,name = ?, numberJudges = ?, numberCompetitors = ?, numberDays = ? WHERE id = ?", [idFormat, name, numberJudges, numberCompetitors, numberDays, id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error("Error updating day");
        }
    }

    async deleteCompetition(id) {
        try {
            // Eliminacion de la competicion mediante un delete
            const [result] = await pool.query("DELETE FROM competitions WHERE id = ?", [id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error("Error deleting day");
        }
    }
}

export default new competitionService;
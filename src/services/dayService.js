import { pool } from "../config/db.js";

class dayService {
    async getDays() {
        try {
            const [rows] = await pool.query("SELECT id, idCompetition, numberDay, finish, enable FROM days");
            return rows;
        } catch (error) {
            throw new Error("Error fetching days");
        }
    }

    async getDay (id) {
        try {
            const [rows] = await pool.query("SELECT id, idCompetition, numberDay, finish, enable FROM days WHERE id = ?", [id]);
            return rows[0];
        } catch (error) {
            throw new Error("Error fetching day");
        }
    }

    async createDay(idCompetition, numberDay, finish, enable) {
        try {
            const [result] = await pool.query("INSERT INTO days (idCompetition, numberDay, finish, enable) VALUES (?, ?, ?, ?)", [idCompetition, numberDay, finish, enable]);
            return result.insertId;
        } catch (error) {
            throw new Error("Error creating day");
        }
    }

    async updateDayFinish(id, finish) {
        try {
            // Actualizacion del atributo finish mediante un update
            const [result] = await pool.query("UPDATE days SET finish = finish WHERE id = ?", [finish, id]);
            return result.affectedRows > 0;

        } catch (error) {
            throw new Error("Error updating day");
        }
    }

    async updateDayAllInformation(id, idCompetition, numberDay, finish, enable ) {
        try {
            // Actualizacion de los atributos mediante un update
            const [result] = await pool.query("UPDATE days SET idCompetition = ?, numberDay = ?, finish = ?, enable = ? WHERE id = ?", [idCompetition, numberDay, finish, enable, id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error("Error updating day");
        }
    }

    async deleteFormatday(id) {
        try {
            const [result] = await pool.query("DELETE FROM days WHERE id = ?", [id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error("Error deleting day");
        }
    }
}

export default new dayService;
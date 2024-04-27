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
            throw new Error("Error fetching round");
        }
    }

    async createDay(idCompetition, numberDay, finish, enable) {
        try {
            const [result] = await pool.query("INSERT INTO days (idCompetition, numberDay, finish, enable) VALUES (?, ?, ?, ?)", [idCompetition, numberDay, finish, enable]);
            return result.insertId;
        } catch (error) {
            throw new Error("Error creating round");
        }
    }

    async updateDayFinish(id, finish) {
        try {
            // Comprobacion existencia de la fecha (Esto deberia ir en el middleware)
            const [existingDay] = await pool.query("SELECT * FROM days WHERE id = ?", [id]);
            if (existingDay.length === 0) {
                throw new Error("day not found");
            }
            // Actualizacion del atributo finish mediante un update
            const [result] = await pool.query("UPDATE days SET finish = ? WHERE id = ?", [finish, id]);
            return result.affectedRows > 0;
            // Comprobacion-Impresion del resultado de la actualizacion

        } catch (error) {
            throw new Error("Error updating round");
        }
    }

    async updateDayAllInformation(id, idCompetition, numberDay, finish, enable ) {
        try {
            // Actualizacion de los atributos mediante un update
            const [result] = await pool.query("UPDATE days SET idCompetition = ?, numberDay = ?, finish = ?, enable = ? WHERE id = ?", [idCompetition, numberDay, finish, enable, id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error("Error updating round");
        }
    }

    async deleteFormatRound(id) {
        try {
            const [existingDay] = await pool.query("SELECT * FROM days WHERE id = ?", [id]);
            if (existingDay.length === 0) {
                throw new Error("day not found");
            }
            const [result] = await pool.query("DELETE FROM days WHERE id = ?", [id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error("Error deleting round");
        }
    }
}

export default new dayService;
import { pool } from "../config/db.js";

class dayService {
    async getDays() {
        try {
            const [rows] = await pool.query("SELECT id, idCompetition, numberDay, finish, enable, location FROM days");
            return rows;
        } catch (error) {
            throw new Error(error.message || "Error fetching days");
        }
    }

    async getDay (id) {
        try {
            const [rows] = await pool.query("SELECT id, idCompetition, numberDay, finish, enable, location FROM days WHERE id = ?", [id]);
            return rows[0];
        } catch (error) {
            throw new Error(error.message || "Error fetching day");
        }
    }


    async getDayByCompetitionAndNumberDay (idCompetition, numberDay) {
        try {
            const [rows] = await pool.query("SELECT id, idCompetition, numberDay, finish, enable, location FROM days WHERE idCompetition = ? AND numberDay = ?", [idCompetition, numberDay]);
            return rows[0];
        } catch (error) {
            throw new Error(error.message || "Error fetching day");
        }
    }

    async getCountDaysByCompetition (idCompetition) {
        try {
            const [rows] = await pool.query("SELECT COUNT(*) AS daysCount FROM days WHERE finish = 1 AND idCompetition = ?", [idCompetition]);
            return rows[0];
        } catch (error) {
            throw new Error(error.message || "Error fetching day");
        }
    }

    

    async createDay(idCompetition, numberDay, finish, enable, location) {
        try {
            const [result] = await pool.query("INSERT INTO days (idCompetition, numberDay, finish, enable, location) VALUES (?, ?, ?, ?, ?)", [idCompetition, numberDay, finish, enable, location]);
            return result.insertId;
        } catch (error) {
            throw new Error(error.message || "Error creating day");
        }
    }

    async updateDayFinish(id, finish) {
        try {
            // Actualizacion del atributo finish mediante un update
            const [result] = await pool.query("UPDATE days SET finish = ? WHERE id = ?", [finish, id]);
            return result.affectedRows > 0;

        } catch (error) {
            throw new Error(error.message || "Error updating day");
        }
    }


    async updateDayLocation(id, location) {
        try {
            // Actualizacion del atributo location mediante un update
            const [result] = await pool.query("UPDATE days SET location = ? WHERE id = ?", [location, id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(error.message || "Error updating day");
        }
    }

    async updateDayEnable(id, enable) {
        try {
            // Actualizacion del atributo enable mediante un update
            const [result] = await pool.query("UPDATE days SET enable = ? WHERE id = ?", [enable, id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(error.message || "Error updating day");
        }
    }


    async updateDayAllInformation(id, idCompetition, numberDay, finish, enable, location ) {
        try {
            // Actualizacion de los atributos mediante un update
            const [result] = await pool.query("UPDATE days SET idCompetition = ?, numberDay = ?, finish = ?, enable = ?, location = ? WHERE id = ?", [idCompetition, numberDay, finish, enable,location, id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(error.message || "Error updating day");
        }
    }

    async deleteFormatday(id) {
        try {
            const [result] = await pool.query("DELETE FROM days WHERE id = ?", [id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(error.message || "Error deleting day");
        }
    }
}

export default new dayService;
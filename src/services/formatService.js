import { pool } from "../config/db.js";

class formatService {
    async getFormats() {
        try {
            const [rows] = await pool.query("SELECT id, name, description FROM formats;");
            return rows;
        } catch (error) {
            throw new Error(error.message || "Error fetching formats");
        }
    }

    async getFormat (id) {
        try {
            const [rows] = await pool.query("SELECT id, name, description FROM formats WHERE id = ?", [id]);
            return rows[0];
        } catch (error) {
            throw new Error(error.message || "Error fetching format");
        }
    }

    async createFormat(name, description) {
        try {
            const [result] = await pool.query("INSERT INTO formats(name, description) VALUES (?, ?)", [name, description]);
            return result.insertId;
        } catch (error) {
            throw new Error(error.message || "Error creating format");
        }
    }

    async updateFormatDescription(id, description) {
        try {
            const [result] = await pool.query("UPDATE formats SET description = ? WHERE id = ?", [description, id]);
            console.log(result);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(error.message || "Error updating format");
        }
    }

    async updateFormatAllInformation(id, name, description) {
        try {
            const [result] = await pool.query("UPDATE formats SET name = ?, description = ? WHERE id = ?", [name, description, id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(error.message || "Error updating format");
        }
    }

    async deleteFormat(id) {
        try {
            const [result] = await pool.query("DELETE FROM formats WHERE id = ?", [id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(error.message || "Error deleting format");
        }
    }
}

export default new formatService;
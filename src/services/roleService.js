import { pool } from "../config/db.js";

class roleService {
    async getRoles() {
        try {
            const [rows] = await pool.query("SELECT id, name, type FROM roles;");
            return rows;
        } catch (error) {
            throw new Error("Error fetching roles");
        }
    }

    async getRole(id) {
        try {
            const [rows] = await pool.query("SELECT id, name, type FROM roles WHERE id = ?", [id]);
            return rows[0];
        } catch (error) {
            throw new Error("Error fetching round");
        }
    }

    async createRole(name, type) {
        try {
            const [result] = await pool.query("INSERT INTO roles(name, type) VALUES (?, ?)", [name, type]);
            return result.insertId;
        } catch (error) {
            throw new Error("Error creating round");
        }
    }

    async updateRoleType(id, type) {
        try {
            const [result] = await pool.query("UPDATE roles SET type = ? WHERE id = ?", [type, id]);
            console.log(result);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error("Error updating round");
        }
    }

    async updateRoleAllInformation(id, name, type) {
        try {
            const [result] = await pool.query("UPDATE roles SET name = ?, type = ? WHERE id = ?", [name, type, id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error("Error updating round");
        }
    }

    async deleteRole(id) {
        try {
            const [result] = await pool.query("DELETE FROM roles WHERE id = ?", [id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error("Error deleting round");
        }
    }
}

export default new roleService;
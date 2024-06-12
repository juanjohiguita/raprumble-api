import { pool } from "../config/db.js";

class roleService {
    async getRoles() {
        try {
            const [rows] = await pool.query("SELECT id, name FROM roles;");
            return rows;
        } catch (error) {
            throw new Error(error.message || "Error fetching roles");
        }
    }

    async getRole(id) {
        try {
            const [rows] = await pool.query("SELECT id, name  FROM roles WHERE id = ?", [id]);
            return rows[0];
        } catch (error) {
            throw new Error(error.message || "Error fetching role");
        }
    }

    async createRole(name, ) {
        try {
            const [result] = await pool.query("INSERT INTO roles(name) VALUES (?, ?)", [name]);
            return result.insertId;
        } catch (error) {
            throw new Error(error.message || "Error creating role");
        }
    }

    async updateRole(id, name) {
        try {
            const [result] = await pool.query("UPDATE roles SET name = ? WHERE id = ?", [name, id]);
            console.log(result);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(error.message || "Error updating role");
        }
    }

    async updateRoleAllInformation(id, name) {
        try {
            const [result] = await pool.query("UPDATE roles SET name = ? WHERE id = ?", [name, id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(error.message || "Error updating role");
        }
    }

    async deleteRole(id) {
        try {
            const [result] = await pool.query("DELETE FROM roles WHERE id = ?", [id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(error.message || "Error deleting role");
        }
    }
}

export default new roleService;
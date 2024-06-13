import roleService from "../services/roleService.js";

export const getRoles = async (req, res) => {
    try {
        const role = await roleService.getRoles();
        if (role.length <= 0) {
            return res.status(404).json({ message: "role not found" });
        }
        res.json(role);
    } catch (error) {
        res.status(500).json({ message: error.message || "Error in the server" });
    }
};

export const getRole = async (req, res) => {
    const id = req.params.id;
    try {
        const role = await roleService.getRole(id);
        if (!role) {
            return res.status(404).json({ message: "role not found" });
        }
        res.json(role);
    } catch (error) {
        res.status(500).json({ message: error.message || "Error in the server" });
    }
};

export const createRole = async (req, res) => {
    const { name, type } = req.body;
    try {
        const roleId = await roleService.createRole(name, type);
        res.status(201).json({ message: "role created", roleId });
    } catch (error) {
        res.status(500).json({ message: error.message || "Error in the server" });
    }
};

export const updateRoleName = async (req, res) => {
    const id = req.params.id;
    const { name } = req.body;
    try {
        const success = await roleService.updateRoleName(id, name);
        if (!success) {
            return res.status(404).json({ message: "role not found" });
        }
        const updatedRole = await roleService.getRole(id);
        return res.status(200).json({ message: `role modified with ID: ${id}`, updatedRole });
    } catch (error) {
        res.status(500).json({ message: error.message || "Error in the server" });
    }
};

export const updateRoleAllInformation = async (req, res) => {
    const id = req.params.id;
    const { name, type } = req.body;
    try {
        const success = await roleService.updateRoleAllInformation(id, name, type);
        if (!success) {
            return res.status(404).json({ message: "role not found" });
        }
        res.status(200).json({ message: "role updated" });
    } catch (error) {
        res.status(500).json({ message: error.message || "Error in the server" });
    }
};

export const deleteRole = async (req, res) => {
    const id = req.params.id;
    try {
        const success = await roleService.deleteRole(id);
        if (!success) {
            return res.status(404).json({ message: "role not found" });
        }
        res.json({ message: "role deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message || "Error in the server" });
    }
};

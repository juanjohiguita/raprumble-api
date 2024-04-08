
import userServices from "../services/userServices.js";

export const getUsers = async (req, res) => {
    try {
        const users = await userServices.getUsers();
        if (users.length <= 0) return res.status(404).json({ message: "User not found" });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message || "Error in the server" });
    }
};

export const getUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await userServices.getUser(id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message || "Error in the server" });
    }
};

export const createUser = async (req, res) => {
    const { username, password, email, aka, profilePicture } = req.body;
    try {
        const userId = await userServices.createUser({ username, password, email, aka, profilePicture });
        res.status(201).json({ message: "User created", userId });
    } catch (error) {
        res.status(500).json({ message: error.message || "Error in the server" });
    }
};

export const updateUser = async (req, res) => {
    const id = req.params.id;
    const userData = req.body;
    try {
        const success = await userServices.updateUser(id, userData);
        if (!success) return res.status(404).json({ message: "User not found" });
        res.json({ message: "User updated" });
    } catch (error) {
        res.status(500).json({ message: error.message || "Error in the server" });
    }
};

export const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const success = await userServices.deleteUser(id);
        if (!success) return res.status(404).json({ message: "User not found" });
        res.json({ message: "User deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message || "Error in the server" });
    }
};


export const getUserAllInformation = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await userServices.getUserAllInformation(id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message || "Error in the server" });
    }
};

export const updateUserAllInformation = async (req, res) => {
    const id = req.params.id;
    const userData = req.body;
    try {
        const updatedUser = await userServices.updateUserAllInformation(id, userData);
        res.json({ message: "Usuario actualizado", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: error.message || "Error in the server" });
    }
};

export const updateUserAka = async (req, res) => {
    const id = req.params.id;
    const { aka } = req.body;
    try {
        const updatedUser = await userServices.updateUserAka(id, { aka });
        res.json({ message: "User modified with ID: ${id}", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: error.message || "Error in the server" });
    }
};


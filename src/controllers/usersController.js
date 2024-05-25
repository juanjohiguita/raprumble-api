
import userService from "../services/userService.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
    try {
        const users = await userService.getUsers();
        if (users.length <= 0) return res.status(404).json({ message: "User not found" });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message || "Error in the server" });
    }
};

export const getUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await userService.getUser(id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message || "Error in the server" });
    }
};

export const getUserByUsername = async (req, res) => {
    const username = req.params.username;
    try {
        const user = await userService.getUserByUsername(username);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message || "Error in the server" });
    }
};

export const getUserByEmail = async (req, res) => {
    const email = req.params.email;
    try {
        const user = await userService.getUserByEmail(email);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message || "Error in the server" });
    }
};




export const createUser = async (req, res) => {
    const username = req.body.username;
    const password = await bcrypt.hash(req.body.password, 10);
    const email = req.body.email;
    const aka = req.body.aka;
    const profilePicture = req.body.profilePicture;

    try {
        const userId = await userService.createUser(username, password, email, aka, profilePicture );
        res.status(201).json({ message: "User created", userId });
    } catch (error) {
        res.status(500).json({ message: error.message || "Error in the server" });
    }
};

export const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const success = await userService.deleteUser(id);
        if (!success) return res.status(404).json({ message: "User not found" });
        res.json({ message: "User deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message || "Error in the server" });
    }
};


export const updateUserAllInformation = async (req, res) => {
    const id = req.params.id;
    const { username, password, email, aka, profilePicture } = req.body;
    try {
        const success = await userService.updateUserAllInformation(id, username, password, email, aka, profilePicture);
        if (!success) {
            return res.status(404).json({ message: "User not found" });
        }
        const updatedUser = await userService.getUser(id);
        res.json({ message: `User modified with ID: ${id}`, user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: error.message || "Error in the server" });
    }
};




export const updateUserAka = async (req, res) => {
    const id = req.params.id;
    const { aka } = req.body;
    try {
        const success = await userService.updateUserAka(id,  aka );
        if (!success) {
            return res.status(404).json({ message: "User not found" });
        }
        const updatedUser = await userService.getUser(id);
        res.json({ message: `User modified with ID: ${id}`, user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: error.message || "Error in the server" });
    }
};


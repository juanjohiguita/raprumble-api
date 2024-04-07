import { pool } from "../db.js";

export const getMembers = async (req, res) => {
    try{
        const [rows] = await pool.query("SELECT id, idUserMember, idCompetitionMember, idRol, score, ptb FROM members")
        if(rows.length <= 0) return res.status(404).json({message: "Member not found"});
        res.json(rows);
    } catch (error) {
        res.status(500).json({message: "Error in the server"});
    } 
};

export const getMember = async (req, res) => {
    const id  = req.params.id;
    try {
        const [rows] = await pool.query("SELECT id, idUserMember, idCompetitionMember, idRol, score, ptb FROM members WHERE id = ?", [id], (error, rows) => {
        res.send(rows);
        });
        if(rows.length <= 0) return res.status(404).json({message: "Member not found"});
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({message: "Error in the server"});
    }
};


export const createMember = async (req, res) => {
    const { idUserMember, idCompetitionMember, idRol, score, ptb } = req.body;
    try {
        // Validaciones a los datos

        // Consulta a la base de datos
        const [rows] = await pool.query(
            "INSERT INTO members (idUserMember, idCompetitionMember, idRol, score, ptb) VALUES (?, ?, ?, ?, ?)",
            [idUserMember, idCompetitionMember, idRol, score, ptb]
        );

        // Envío de la respuesta con el ID del miembro agregado
        res.status(201).json({
            id: rows.insertId,
            idUserMember,
            idCompetitionMember,
            idRol,
            score,
            ptb
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
};





export const updateMemberPtb = async (req, res) => {
    const id  = req.params.id;
    const {ptb} = req.body;
    try {
        const [result] = await pool. query(
            "UPDATE members SET ptb = IFNULL(?, ptb) WHERE id = ?",
            [ptb,  id],
            (error, results) => {
                if(result.length <= 0) return res.status(404).json({message: "Member not found"});
                if (error) {
                    throw error;
                }
                res.status(204).send(`Member modified with ID: ${id}`);
            }
        );

        const [rows] = await pool.query("SELECT id, idUserMember, idCompetitionMember, idRol, score, ptb  FROM members WHERE id = ?", [id]);
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({message: "Error in the server"});
    }

};

export const deleteMember = async (req, res) => {
    const id  = req.params.id;
    try {
        const [rows] = await pool.query("DELETE FROM members WHERE id = ?", [id]);
        if(rows.affectedRows <= 0) return res.status(404).json({message: "Member not found"});
        res.json({message: "Member deleted"});
    } catch (error) {
        res.status(500).json({message: "Error in the server"});
    }
};

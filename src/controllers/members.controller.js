import { pool } from "../config/db.js";

export const getMembers = async (req, res) => {
    try{
        const [rows] = await pool.query("SELECT id, idUserMember, idCompetitionMember, idRole, score, ptb FROM members")
        if(rows.length <= 0) return res.status(404).json({message: "Member not found"});
        res.json(rows);
    } catch (error) {
        res.status(500).json({message: "Error in the server"});
    } 
};

export const getMember = async (req, res) => {
    const id  = req.params.id;
    try {
        const [rows] = await pool.query("SELECT id, idUserMember, idCompetitionMember, idRole, score, ptb FROM members WHERE id = ?", [id], (error, rows) => {
        res.send(rows);
        });
        if(rows.length <= 0) return res.status(404).json({message: "Member not found"});
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({message: "Error in the server"});
    }
};


export const createMember = async (req, res) => {
    const { idUserMember, idCompetitionMember, idRole, score, ptb } = req.body;
    try {
        // Validaciones a los datos

        // Consulta a la base de datos
        const [rows] = await pool.query(
            "INSERT INTO members (idUserMember, idCompetitionMember, idRole, score, ptb) VALUES (?, ?, ?, ?, ?)",
            [idUserMember, idCompetitionMember, idRole, score, ptb]
        );

        // Envío de la respuesta con el ID del miembro agregado
        res.status(201).json({
            id: rows.insertId,
            idUserMember,
            idCompetitionMember,
            idRole,
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

        const [rows] = await pool.query("SELECT id, idUserMember, idCompetitionMember, idRole, score, ptb  FROM members WHERE id = ?", [id]);
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({message: "Error in the server"});
    }

};

export const updateMemberAllInformation = async (req, res) => {
    const { id } = req.params;
    const { idUserMember, idCompetitionMember, idRole, score, ptb } = req.body;

    // Verificar que al menos uno de los campos esté presente en la solicitud
    if (!idUserMember && !idCompetitionMember && !idRole && !score && !ptb) {
        return res.status(400).json({ message: "Al menos un campo debe ser proporcionado para actualizar" });
    }

    try {
        // Verificar si el miembro existe
        const [existingMember] = await pool.query("SELECT * FROM members WHERE id = ?", [id]);

        if (existingMember.length === 0) {
            return res.status(404).json({ message: "Miembro no encontrado" });
        }

        // Actualizar los campos del miembro con los valores proporcionados en la solicitud
        const updateQuery = "UPDATE members SET idUserMember = ?, idCompetitionMember = ?, idRole = ?, score = ?, ptb = ? WHERE id = ?";
        const [updateResult] = await pool.query(updateQuery, [idUserMember || existingMember[0].idUserMember, idCompetitionMember || existingMember[0].idCompetitionMember, idRole || existingMember[0].idRole, score || existingMember[0].score, ptb || existingMember[0].ptb, id]);

        if (updateResult.affectedRows === 0) {
            return res.status(404).json({ message: "No se pudo actualizar el miembro" });
        }

        // Obtener los datos actualizados del miembro después de la actualización
        const [updatedMember] = await pool.query("SELECT * FROM members WHERE id = ?", [id]);

        // Respuesta exitosa
        res.status(200).json({ message: "Member updated", member: updatedMember[0] });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Error in member update" });
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

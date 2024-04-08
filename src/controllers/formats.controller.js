import { pool } from "../config/db.js";

export const getFormats = async (req, res) => {
    try{
        const [rows] = await pool.query("SELECT id, name, description FROM formats; ")
        if(rows.length <= 0) return res.status(404).json({message: "Format not found"});
        res.json(rows);
    } catch (error) {
        res.status(500).json({message: "Error in the server"});
    } 
};

export const getFormat = async (req, res) => {
    const id  = req.params.id;
    try {
        const [rows] = await pool.query("SELECT id, name, description FROM formats WHERE id = ?", [id], (error, rows) => {
        res.send(rows);
        });
        if(rows.length <= 0) return res.status(404).json({message: "Format not found"});
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({message: "Error in the server"});
    }
};

export const createFormat = async (req, res) => {
    const {name, description} = req.body;
    try {
        // Validaciones a los datos

        // Consulta a la base de datos
        const [rows] = await pool.query(
        "INSERT INTO formats (name, description) VALUES (?, ?)",
        [name, description],
            (error, results) => {
                if (error) {
                    throw error;
                }
                res.status(204).send(`Format added with ID: ${results.insertId}`);
            }
        );
        res.send({
            id: rows.insertId,
            name,
            description
        })
    } catch (error) {
            res.status(500).json({message: "Error in the server"});
    }
    
    
};
export const updateFormatDescription = async (req, res) => {
    const id  = req.params.id;
    const {name, description} = req.body;
    try {
        const [result] = await pool. query(
            "UPDATE formats SET description = IFNULL(?, description) WHERE id = ?",
            [description,  id],
            (error, results) => {
                if(result.length <= 0) return res.status(404).json({message: "Format not found"});
                if (error) {
                    throw error;
                }
                res.status(204).send(`Format modified with ID: ${id}`);
            }
        );

        const [rows] = await pool.query("SELECT id, name, description FROM formats WHERE id = ?", [id]);
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({message: "Error in the server"});
    }

};

export const updateFormatAllInformation = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    // Verificar que al menos un campo esté presente en la solicitud
    if (!name && !description) {
        return res.status(400).json({ message: "Al menos un campo debe ser proporcionado para actualizar" });
    }

    try {
        // Verificar si el rol existe
        const [existingFormat] = await pool.query("SELECT * FROM formats WHERE id = ?", [id]);

        if (existingFormat.length === 0) {
            return res.status(404).json({ message: "Format no encontrado" });
        }

        // Actualizar el nombre del rol
        const updateQuery = "UPDATE formats SET name = ?, description = ? WHERE id = ?";
        await pool.query(updateQuery, [name || existingFormat[0].name, description || existingFormat[0].description, id]);

        // Obtener los datos actualizados del rol después de la actualización
        const [updatedFormat] = await pool.query("SELECT * FROM formats WHERE id = ?", [id]);

        // Respuesta exitosa
        res.status(200).json({ message: "Format actualizado", format: updatedFormat[0] });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Error al actualizar el Format" });
    }
};

export const deleteFormat = async (req, res) => {
    const id  = req.params.id;
    console.log(id);
    try {
        const [rows] = await pool.query("DELETE FROM formats WHERE id = ?", [id]);
        if(rows.affectedRows <= 0) return res.status(404).json({message: "Format not found"});
        res.json({message: "Format deleted"});
    } catch (error) {
        res.status(500).json({message: "Error in the server"});
    }
};
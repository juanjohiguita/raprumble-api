import { pool } from "../db.js";

export const getCompetitions = async (req, res) => {
    try{
        const [rows] = await pool.query("SELECT id, idFormat, name, numberJudges, numberCompetitors, numberDays FROM Competitions")
        if(rows.length <= 0) return res.status(404).json({message: "Competition not found"});
        res.json(rows);
    } catch (error) {
        res.status(500).json({message: "Error in the server"});
    } 
};

export const getCompetition = async (req, res) => {
    const id  = req.params.id;
    try {
        const [rows] = await pool.query("SELECT id, idFormat, name, numberJudges, numberCompetitors, numberDays FROM competitions WHERE id = ?", [id], (error, rows) => {
        res.send(rows);
        });
        if(rows.length <= 0) return res.status(404).json({message: "Competition not found"});
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({message: "Error in the server"});
    }
};

export const createCompetition = async (req, res) => {
    const {idFormat, name, numberJudges, numberCompetitors, numberDays} = req.body;
    try {
        // Validaciones a los datos

        // Consulta a la base de datos
        const [rows] = await pool.query(
        "INSERT INTO competitions (idFormat, name, numberJudges, numberCompetitors, numberDays) VALUES (?, ?, ?, ?, ?)",
        [idFormat, name, numberJudges, numberCompetitors, numberDays],
            (error, results) => {
                if (error) {
                    throw error;
                }
                res.status(204).send(`Competition added with ID: ${results.insertId}`);
            }
        );
        res.send({
            id: rows.insertId,
            idFormat,
            name,
            numberJudges,
            numberCompetitors,
            numberDays
        })
    } catch (error) {
            res.status(500).json({message: "Error in the server"});
    }
    
    
};

export const updateCompetitionName = async (req, res) => {
    const id  = req.params.id;
    const {idFormat, name, numberJudges, numberCompetitors, numberDays} = req.body;
    try {
        const [result] = await pool. query(
            "UPDATE competitions SET name = IFNULL(?, name) WHERE id = ?",
            [name,  id],
            (error, results) => {
                if(result.length <= 0) return res.status(404).json({message: "Competition not found"});
                if (error) {
                    throw error;
                }
                res.status(204).send(`Competition modified with ID: ${id}`);
            }
        );

        const [rows] = await pool.query("SELECT id, name, name, numberJudges, numberCompetitors, numberDays  FROM competitions WHERE id = ?", [id]);
        res.json(rows[0]);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Error in the server" });
    }
};

export const updateCompetitionAllInformation = async (req, res) => {
    const { id } = req.params;
    const {idFormat, name, numberJudges, numberCompetitors, numberDays } = req.body;

    // Verificar que al menos un campo esté presente en la solicitud
    if (!idFormat && !name && !numberJudges && !numberCompetitors && !numberDays) {
        return res.status(400).json({ message: "Al menos un campo debe ser proporcionado para actualizar" });
    }

    try {
        // Verificar si el rol existe
        const [existingCompetition] = await pool.query("SELECT * FROM competitions WHERE id = ?", [id]);

        if (existingCompetition.length === 0) {
            return res.status(404).json({ message: "Competition no encontrado" });
        }
        // Actualizar el nombre del rol
        const updateQuery = "UPDATE competitions SET idFormat = ?, name = ?, numberJudges = ?, numberCompetitors = ?, numberDays = ? WHERE id = ?";
        await pool.query(updateQuery, [idFormat || existingCompetition[0].idFormat, name || existingCompetition[0].name, numberJudges || existingCompetition[0].numberJudges, numberCompetitors || existingCompetition[0].numberCompetitors, numberDays || existingCompetition[0].numberDays, id]);

        // Obtener los datos actualizados del rol después de la actualización
        const [updatedCompetition] = await pool.query("SELECT * FROM competitions WHERE id = ?", [id]);

        // Respuesta exitosa
        res.status(200).json({ message: "Competition actualizado", Competition: updatedCompetition[0] });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Error al actualizar el Competition" });
    }
};


export const deleteCompetition = async (req, res) => {
    const id  = req.params.id;
    try {
        const [rows] = await pool.query("DELETE FROM competitions WHERE id = ?", [id]);
        if(rows.affectedRows <= 0) return res.status(404).json({message: "Competition not found"});
        res.json({message: "Competition deleted"});
    } catch (error) {
        res.status(500).json({message: "Error in the server"});
    }
};

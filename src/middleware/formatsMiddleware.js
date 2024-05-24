import formatService from "../services/formatService.js";

class FormatsMiddleware {
    async formatExists(req, res, next) {
        const id = req.params.id;
        try {
            const format = await formatService.getFormat(id);
            if (!format) {
                return res.status(404).json({ message: "El formato que intentas consultar no existe" });
            }
            req.format = format;
            next();
        } catch (error) {
            next(error);
        }
    }

    validateFormatAllUpdateFields(req, res, next) {
        const { name, description } = req.body;
        if (name == undefined || description == undefined) {
            return res.status(400).json({ message: "Se debe proporcionar todos los campos para actualizar" });
        }
        next();
    }

    validateFormatUpdateFields(req, res, next) {
        const { name, description } = req.body;
        if (!name && !description) {
            return res.status(400).json({ message: "Se debe proporcionar al menos un campo para actualizar" });
        }
        next();
    }
}

export default new FormatsMiddleware();

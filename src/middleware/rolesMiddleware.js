import roleService from "../services/roleService.js";

class RolesMiddleware {
    async roleExists(req, res, next) {
        const id = req.params.id;
        try {
            const role = await roleService.getRole(id);
            if (!role) {
                return res.status(404).json({ message: "El rol que intentas consultar no existe" });
            }
            req.role = role;
            next();
        } catch (error) {
            next(error);
        }
    }

    validateRoleAllUpdateFields(req, res, next) {
        const { name} = req.body;
        if (name == undefined) {
            return res.status(400).json({ message: "Se debe proporcionar todos los campos para actualizar" });
        }
        next();
    }

    validateRoleUpdateFields(req, res, next) {
        const { name} = req.body;
        if (!name) {
            return res.status(400).json({ message: "Se debe proporcionar al menos un campo para actualizar" });
        }
        next();
    }
}

export default new RolesMiddleware();

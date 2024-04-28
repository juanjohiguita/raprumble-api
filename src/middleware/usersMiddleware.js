import userService from "../services/userService.js";

class UsersMiddleware {
    async userExists(req, res, next) {
        const id = req.params.id;
        try {
            const user = await userService.getUser(id);
            if (!user) {
                return res.status(404).json({ message: "El usuario que intentas consultar no existe" });
            }
            req.user = user;
            next();
        } catch (error) {
            next(error);
        }
    }

    validateUserAllUpdateFields(req, res, next) {
        const { username, password, email, aka, profilePicture } = req.body;
        if (!username || !password || !email || !aka || !profilePicture) {
            return res.status(400).json({ message: "Se debe proporcionar todos los campos para actualizar" });
        }
        next();
    }

    validateUserUpdateFields(req, res, next) {
        const { username, password, email, aka, profilePicture } = req.body;
        if (!username && !password && !email && !aka && !profilePicture) {
            return res.status(400).json({ message: "Se debe proporcionar al menos un campo para actualizar" });
        }
        next();
    }
}

export default new UsersMiddleware();

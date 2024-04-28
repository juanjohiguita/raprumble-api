import memberService from "../services/memberService.js";

class MembersMiddleware {
    async memberExists(req, res, next) {
        const id = req.params.id;
        try {
            const member = await memberService.getMember(id);
            if (!member) {
                return res.status(404).json({ message: "El miembro que intentas consultar no existe" });
            }
            req.member = member;
            next();
        } catch (error) {
            next(error);
        }
    }

    validateMemberAllUpdateFields(req, res, next) {
        const { idUserMember, idCompetitionMember, idRole, score, ptb } = req.body;
        // se debe proporcionar todos los campos para actualizar
        if (!idUserMember || !idCompetitionMember || !idRole || !score || !ptb) {
            return res.status(400).json({ message: "Se debe proporcionar todos los campos para actualizar" });
        }
        next();
    }

    validateMemberUpdateFields(req, res, next) {
        const { idUserMember, idCompetitionMember, idRole, score, ptb } = req.body;
        // Se debe proporcionar al menos un campo para actualizar
        if (!idUserMember && !idCompetitionMember && !idRole && !score && !ptb) {
            return res.status(400).json({ message: "Se debe proporcionar al menos un campo para actualizar" });
        }
        next();
    }
}

export default new MembersMiddleware();

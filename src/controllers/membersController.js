import memberService from "../services/memberService.js";

export const getMembers = async (req, res) => {
    try {
        const member = await memberService.getMembers();
        if (member.length <= 0) {
            return res.status(404).json({ message: "member not found" });
        }
        res.json(member);
    } catch (error) {
        res.status(500).json({ message: error.message || "Error in the server" });
    }
};

export const getMember = async (req, res) => {
    const id = req.params.id;
    try {
        const member = await memberService.getMember(id);
        if (!member) {
            return res.status(404).json({ message: "member not found" });
        }
        res.json(member);
    } catch (error) {
        res.status(500).json({ message: error.message || "Error in the server" });
    }
};

export const createMember = async (req, res) => {
    const { idUserMember, idCompetitionMember, idRole, score, ptb } = req.body;
    try {
        const memberId = await memberService.createMember(idUserMember, idCompetitionMember, idRole, score, ptb);
        res.status(201).json({ message: "member created", memberId });
    } catch (error) {
        res.status(500).json({ message: error.message || "Error in the server" });
    }
};

export const updateMemberPtb = async (req, res) => {
    const id = req.params.id;
    const { ptb } = req.body; 
    try {
        const success = await memberService.updateMemberPtb(id, ptb);
        if (!success) {
            return res.status(404).json({ message: "Member not found" });
        }
        const updatedMember = await memberService.getMember(id);
        return res.status(200).json({ message: `Member modified with ID: ${id}`, updatedMember });
    } catch (error) {
        res.status(500).json({ message: error.message || "Error in the server" });
    }
};

export const updateMemberIdRole = async (req, res) => {
    const id = req.params.id;
    const { idRole } = req.body; 
    try {
        const success = await memberService.updateMemberIdRole(id, idRole);
        if (!success) {
            return res.status(404).json({ message: "Member not found" });
        }
        const updatedMember = await memberService.getMember(id);
        return res.status(200).json({ message: `Member modified with ID: ${id}`, updatedMember });
    } catch (error) {
        res.status(500).json({ message: error.message || "Error in the server" });
    }
};



export const updateMemberAllInformation = async (req, res) => {
    const id = req.params.id;
    const { idUserMember, idCompetitionMember, idRole, score, ptb } = req.body;
    try {
        const success = await memberService.updateMemberAllInformation(id, idUserMember, idCompetitionMember, idRole, score, ptb);
        if (!success) {
            return res.status(404).json({ message: "member not found" });
        }
        res.status(200).json({ message: "member updated" });
    } catch (error) {
        res.status(500).json({ message: error.message || "Error in the server" });
    }
};

export const deleteMember = async (req, res) => {
    const id = req.params.id;
    try {
        const success = await memberService.deleteMember(id);
        if (!success) {
            return res.status(404).json({ message: "member not found" });
        }
        res.json({ message: "member deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message || "Error in the server" });
    }
};
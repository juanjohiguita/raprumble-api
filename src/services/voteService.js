import { pool } from "../config/db.js";
import memberService from "./memberService.js";

class voteservice {
    async getVotes() {
        try {
            const [rows] = await pool.query("SELECT id, idCompetition, idMC1, idMC2, idJudge, idDay, scoreMC1, scoreMC2, winner, replik FROM votes");
            return rows;
        } catch (error) {
            throw new Error(error.message || "Error fetching votes");
        }
    }

    async getVote (id) {
        try {
            const [rows] = await pool.query("SELECT id, idCompetition, idMC1, idMC2, idJudge, idDay, scoreMC1, scoreMC2, winner, replik FROM votes WHERE id = ?", [id]);
            return rows[0];
        } catch (error) {
            throw new Error(error.message || "Error fetching vote");
        }
    }
    
    async getAllVotesBattle (idCompetition, idMC1, idMC2) {
        try {
            const [rows] = await pool.query("SELECT id, idCompetition, idMC1, idMC2, idJudge, idDay, scoreMC1, scoreMC2, winner, replik FROM votes WHERE idCompetition = ? AND ((idMC1 = ? AND idMC2 = ?) OR (idMC1 = ? AND idMC2 = ?))", 
            [idCompetition, idMC1, idMC2, idMC2, idMC1]);
            return rows;
        } catch (error) {
            throw new Error(error.message || "Error fetching vote");
        }    
    }

    async getAllVotesDay(idCompetition, idDay) {
        try {
            const [rows] = await pool.query(
                `WITH VotesSummary AS (
                    SELECT LEAST(idMC1, idMC2) AS mc1, 
                           GREATEST(idMC1, idMC2) AS mc2, 
                           SUM(scoreMC1) AS totalScoreMC1, 
                           SUM(scoreMC2) AS totalScoreMC2
                    FROM votes
                    WHERE idCompetition = ? AND idDay = ?
                    GROUP BY mc1, mc2
                ),
                WinnerMode AS (
                    SELECT LEAST(idMC1, idMC2) AS mc1, 
                           GREATEST(idMC1, idMC2) AS mc2,
                           winner, 
                           COUNT(*) AS countWinner,
                           ROW_NUMBER() OVER (PARTITION BY LEAST(idMC1, idMC2), GREATEST(idMC1, idMC2) ORDER BY COUNT(*) DESC) AS rn
                    FROM votes
                    WHERE idCompetition = ? AND idDay = ?
                    GROUP BY mc1, mc2, winner
                ),
                ReplikMode AS (
                    SELECT LEAST(idMC1, idMC2) AS mc1, 
                           GREATEST(idMC1, idMC2) AS mc2,
                           replik, 
                           COUNT(*) AS countReplik,
                           ROW_NUMBER() OVER (PARTITION BY LEAST(idMC1, idMC2), GREATEST(idMC1, idMC2) ORDER BY COUNT(*) DESC) AS rn
                    FROM votes
                    WHERE idCompetition = ? AND idDay = ?
                    GROUP BY mc1, mc2, replik
                )
                SELECT v.mc1, 
                       v.mc2, 
                       v.totalScoreMC1, 
                       v.totalScoreMC2, 
                       wm.winner, 
                       rm.replik
                FROM VotesSummary v
                JOIN (SELECT mc1, mc2, winner 
                      FROM WinnerMode 
                      WHERE rn = 1) wm ON v.mc1 = wm.mc1 AND v.mc2 = wm.mc2
                JOIN (SELECT mc1, mc2, replik 
                      FROM ReplikMode 
                      WHERE rn = 1) rm ON v.mc1 = rm.mc1 AND v.mc2 = rm.mc2`,
                [idCompetition, idDay, idCompetition, idDay, idCompetition, idDay]
            );
            return rows;
        } catch (error) {
            throw new Error(error.message || "Error fetching vote");
        }
    }
    
    

    
    async getVotesByIdCompetitionAndIdDay (idCompetition, idDay) {
        try {
            const [rows] = await pool.query("SELECT id, idCompetition, idMC1, idMC2, idJudge, idDay, scoreMC1, scoreMC2, winner, replik FROM votes WHERE idCompetition = ? AND idDay = ?", [idCompetition, idDay]);
            return rows;
        } catch (error) {
            throw new Error(error.message || "Error fetching vote");
        }
    }

    async getVoteIdCompetitionIdjudgeIdMC1IdMC2 (idCompetition, idJudge, idMC1, idMC2) {
        try {
            const [rows] = await pool.query(`SELECT id, idCompetition, idMC1, idMC2, idJudge, idDay, scoreMC1, scoreMC2, winner, replik FROM votes WHERE idCompetition = ? AND idJudge = ? AND ((idMC1 = ? AND idMC2 = ?) OR (idMC1 = ? AND idMC2 = ?))`,
                 [idCompetition, idJudge, idMC1, idMC2, idMC2, idMC1]);   
            return rows;
        } catch (error) {
            throw new Error(error.message || "Error fetching vote");
        }
    }


    

    async createVote(idCompetition, idMC1, idMC2, idJudge, idDay, scoreMC1, scoreMC2, winner, replik) {
        try {

            // Verificacion si ya existe un voto de ese mismo juez, en la misma jornada, en la misma competicion entre los mismos MCs
            const [existingVote] = await pool.query(
                `SELECT * FROM votes 
                 WHERE idCompetition = ? 
                   AND idDay = ? 
                   AND idJudge = ?
                   AND ((idMC1 = ? AND idMC2 = ?) OR (idMC1 = ? AND idMC2 = ?))`,
                [idCompetition, idDay, idJudge, idMC1, idMC2, idMC2, idMC1]
            );
            
            if (existingVote.length > 0) {
                throw new Error("Vote already exists for this competition, day, and judge between these MCs.");
            }

            // 
            const [result] = await pool.query("INSERT INTO votes (idCompetition, idMC1, idMC2, idJudge, idDay, scoreMC1, scoreMC2, winner, replik) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [idCompetition, idMC1, idMC2, idJudge, idDay, scoreMC1, scoreMC2, winner, replik]);
            // Verificar si ya hay mas de 3 votaciones para esa batalla especifica para esa competicion en ese day entre los dos mcs
            // y si es asi, coger en una "lista" esas votaciones donde se enfrentan el mc1 y el mc2 sin importar cual sea el orden
            // y sumar los score y ptb RESPECTIVOS de cada uno para esas votaciones y luego llamar al patch en members de ptb y score pasandole el id del 
            // mimebro o sea el idMC, lo cual actualizaria los campos

            //Verificacion si hay mas de 3 votaciones para la misma batalla
            const [votes] = await pool.query(
                `SELECT * FROM votes 
                WHERE idCompetition = ? 
                AND idDay = ? 
                AND ((idMC1 = ? AND idMC2 = ?) OR (idMC1 = ? AND idMC2 = ?))`, 
                [idCompetition, idDay, idMC1, idMC2, idMC2, idMC1]
            );
            if (votes.length >= 3) {
                // Inicializar variables para los score y las victorias y replicas para luego calcular el ptb
                let totalScoreMC1 = 0;
                let totalScoreMC2 = 0;

                let mc1DirectWins = 0;
                let mc2DirectWins = 0;
                let mc1ReplikWins = 0;
                let mc2ReplikWins = 0;
    
                // Calcular los puntajes y las victorias sean directas o por replik
                votes.forEach(vote => {
                    if (vote.idMC1 === idMC1) {
                        totalScoreMC1 += vote.scoreMC1;
                    } else {
                        totalScoreMC1 += vote.scoreMC2;
                    }
    
                    if (vote.idMC2 === idMC2) {
                        totalScoreMC2 += vote.scoreMC2;
                    } else {
                        totalScoreMC2 += vote.scoreMC1;
                    }
    
                    if (vote.winner === idMC1) {
                        if (vote.replik === 0) {
                            mc1DirectWins++;
                        } else {
                            mc1ReplikWins++;
                        }
                    } else if (vote.winner === idMC2) {
                        if (vote.replik === 0) {
                            mc2DirectWins++;
                        } else {
                            mc2ReplikWins++;
                        }
                    }
                });

                // Calcular el ptb para cada MC basado en la mayoría
                let ptbMC1 = 0;
                let ptbMC2 = 0;

                if (mc1DirectWins > mc1ReplikWins && mc1DirectWins > mc2DirectWins && mc1DirectWins > mc2ReplikWins) {
                    ptbMC1 = 3;
                } else if (mc1ReplikWins > mc1DirectWins && mc1ReplikWins > mc2DirectWins && mc1ReplikWins > mc2ReplikWins) {
                    ptbMC1 = 2;
                    ptbMC2 = 1;
                } else if (mc2DirectWins > mc1DirectWins && mc2DirectWins > mc1ReplikWins && mc2DirectWins > mc2ReplikWins) {
                    ptbMC2 = 3;
                } else if (mc2ReplikWins > mc1DirectWins && mc2ReplikWins > mc1ReplikWins && mc2ReplikWins > mc2DirectWins) {
                    ptbMC2 = 2;
                    ptbMC1 = 1;
                }
    
                // Actualizar los puntajes y ptb de los miembros
                await memberService.updateMemberPtbAndScore(idMC1, ptbMC1, totalScoreMC1);
                await memberService.updateMemberPtbAndScore(idMC2, ptbMC2, totalScoreMC2);
            }
            return result.insertId;
        } catch (error) {
            throw new Error(error.message || "Error creating vote");
        }
    }

    async updateVoteScoreMC1(id, scoreMC1) {
        try {
            // Actualizacion del atributo scoreMC1 mediante un update
            const [result] = await pool.query("UPDATE votes SET scoreMC1 = ? WHERE id = ?", [scoreMC1, id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error("Error updating vote");
        }
    }

    async updateVoteAllInformation(id, idCompetition, idMC1, idMC2, idJudge, idDay, scoreMC1, scoreMC2, winner ) {
        try {
            // Actualizacion de los atributos mediante un update
            const [result] = await pool.query("UPDATE votes SET idCompetition = ?, idMC1 = ?, idMC2 = ?, idJudge = ?, idDay = ?, scoreMC1 = ?, scoreMC2 = ?, winner = ? WHERE id = ?", [idCompetition, idMC1, idMC2, idJudge, idDay, scoreMC1, scoreMC2, id, winner]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error("Error updating vote");
        }
    }

    async deleteVote(id) {
        try {
            // Eliminacion de la votacion mediante un delete
            const [result] = await pool.query("DELETE FROM votes WHERE id = ?", [id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error("Error deleting vote");
        }
    }
}

export default new voteservice;
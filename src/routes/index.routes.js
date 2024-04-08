import { Router } from "express"
import { ping } from "../controllers/indexController.js"

const router = Router()

router.get("/ping", ping)


export default router
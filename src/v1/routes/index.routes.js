import { Router } from "express"
import { ping } from "../../controllers/indexController.js"
import { loginUser } from "../../controllers/usersController.js"

const router = Router()

router.get("/ping", ping);

router.post(`/login`,
loginUser); 

export default router
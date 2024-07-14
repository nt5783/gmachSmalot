import express from "express"
import {GownController} from "../controllers/gownController.js"
import {authVerifyToken} from "../middleware/authVerifyToken.js"

const gownRouter = express.Router()
const gownController = new GownController()

gownRouter.get("/:id", gownController.getGownById)
gownRouter.get("/", gownController.getGowns)
gownRouter.post("/", authVerifyToken, gownController.addGown)
gownRouter.patch("/:id", authVerifyToken, gownController.updateGown)
gownRouter.delete("/:id", authVerifyToken, gownController.deleteGown)

export {
    gownRouter
}
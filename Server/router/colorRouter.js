import express from "express"
import {ColorController} from "../controllers/colorController.js"
import {authVerifyToken} from "../middleware/authVerifyToken.js"

const colorRouter = express.Router()
const colorController = new ColorController()

colorRouter.get("/:id", colorController.getColorById)
colorRouter.get("/", colorController.getColors)
colorRouter.post("/", authVerifyToken, colorController.addColor)

export {
    colorRouter
}
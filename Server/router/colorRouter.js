import express from "express"
import {ColorController} from "../controllers/colorController.js"
import {verifyToken} from "../middleware/verifyToken.js"
import {authVerifyToken} from "../middleware/authVerifyToken.js"

const colorRouter = express.Router()
const colorController = new ColorController()

colorRouter.get("/:id", verifyToken, colorController.getColorById)
colorRouter.get("/", verifyToken, colorController.getColors)
colorRouter.post("/", authVerifyToken, colorController.addColor)

export {
    colorRouter
}
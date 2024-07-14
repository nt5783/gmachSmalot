import express from "express"
import {LengthController} from "../controllers/lengthController.js"
import {authVerifyToken} from "../middleware/authVerifyToken.js"

const lengthRouter = express.Router()
const lengthController = new LengthController()

lengthRouter.get("/:id", lengthController.getLengthById)
lengthRouter.get("/", lengthController.getLengths)
lengthRouter.post("/", authVerifyToken, lengthController.addLength)

export {
    lengthRouter
}
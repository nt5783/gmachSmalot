import express from "express"
import {LengthController} from "../controllers/lengthController.js"
import {verifyToken} from "../middleware/verifyToken.js"
import {authVerifyToken} from "../middleware/authVerifyToken.js"

const lengthRouter = express.Router()
const lengthController = new LengthController()

lengthRouter.get("/:id", verifyToken, lengthController.getLengthById)
lengthRouter.get("/", verifyToken, lengthController.getLengths)
lengthRouter.post("/", authVerifyToken, lengthController.addLength)

export {
    lengthRouter
}
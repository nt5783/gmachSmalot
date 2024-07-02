import express from "express";
import { SizeController } from "../controllers/sizeController.js"
import { verifyToken } from "../middleware/verifyToken.js"
import { authVerifyToken } from '../middleware/authVerifyToken.js'

const sizeRouter = express.Router();

const sizeController = new SizeController();

sizeRouter.get("/:id", verifyToken, sizeController.getSizeById)
sizeRouter.get("/", verifyToken, sizeController.getSizes)
sizeRouter.post("/", authVerifyToken, sizeController.addSize)

export {
    sizeRouter
}
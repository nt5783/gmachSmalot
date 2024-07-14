import express from "express";
import { SizeController } from "../controllers/sizeController.js"
import { authVerifyToken } from '../middleware/authVerifyToken.js'

const sizeRouter = express.Router();

const sizeController = new SizeController();

sizeRouter.get("/:id", sizeController.getSizeById)
sizeRouter.get("/", sizeController.getSizes)
sizeRouter.post("/", authVerifyToken, sizeController.addSize)

export {
    sizeRouter
}
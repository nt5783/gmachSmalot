
import express from "express";
import { ModelController } from '../controllers/modelController.js'
import { authVerifyToken } from '../middleware/authVerifyToken.js'

const modelRouter = express.Router();
const modelcontroller = new ModelController()

modelRouter.get("/:id", modelcontroller.getModelById)
modelRouter.get("/", modelcontroller.getModels)
modelRouter.post("/", authVerifyToken, modelcontroller.addModel)
modelRouter.delete("/:id", authVerifyToken, modelcontroller.deleteModel)
modelRouter.patch("/:id", authVerifyToken, modelcontroller.updateModel)

export {
    modelRouter
}
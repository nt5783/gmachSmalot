
import express from "express";
import { ModelController } from '../controllers/modelController.js'
import {checkTokenManager} from '../middleware/authMiddleware.js'

const modelRouter = express.Router();
const modelcontroller = new ModelController()

modelRouter.get("/:id", modelcontroller.getModelById)
modelRouter.get("/", modelcontroller.getModel)
modelRouter.post("/", checkTokenManager, modelcontroller.addModel)
modelRouter.delete("/:id", modelcontroller.deleteModel)
modelRouter.patch("/:id", modelcontroller.updateModel)

export {
    modelRouter
}
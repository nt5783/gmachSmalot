
import express from "express";
import { ModelController } from '../controllers/modelController.js'
const modelRouter = express.Router();

const modelcontroller = new ModelController()

modelRouter.get("/:id", modelcontroller.getModelById)
modelRouter.get("/", modelcontroller.getModel)
modelRouter.post("/", modelcontroller.addModel)
modelRouter.delete("/:id", modelcontroller.deleteModel)
modelRouter.put("/:id", modelcontroller.updateModel)

export {
    modelRouter
}
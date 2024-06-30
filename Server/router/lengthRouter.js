import express from "express";
import {LengthController} from "../controllers/lengthController.js";

const lengthRouter = express.Router();

const lengthController = new LengthController();

lengthRouter.get("/:id", lengthController.getLengthById)
lengthRouter.get("/", lengthController.getLengths)
lengthRouter.post("/", lengthController.addLength)
lengthRouter.patch("/:id", lengthController.updateLength)
lengthRouter.delete("/:id", lengthController.deleteLength)

export {
    lengthRouter
}
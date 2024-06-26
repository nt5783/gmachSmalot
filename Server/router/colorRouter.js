import express from "express";
import {ColorController} from "../controllers/colorController.js";

const colorRouter = express.Router();

const colorController = new ColorController();

colorRouter.get("/:id", colorController.getColorById)
colorRouter.get("/", colorController.getColors)
colorRouter.post("/", colorController.addColor)
colorRouter.patch("/:id", colorController.updateColor)
colorRouter.delete("/:id", colorController.deleteColor)

export {
    colorRouter
}
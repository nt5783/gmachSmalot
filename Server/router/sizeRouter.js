import express from "express";
import {SizeController} from "../controllers/sizeController.js";

const sizeRouter = express.Router();

const sizeController = new SizeController();

sizeRouter.get("/:id", sizeController.getSizeById)
sizeRouter.get("/", sizeController.getSizes)
sizeRouter.post("/", sizeController.addSize)
sizeRouter.patch("/:id", sizeController.updateSize)
sizeRouter.delete("/:id", sizeController.deleteSize)

export {
    sizeRouter
}
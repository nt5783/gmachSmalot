import express from "express";
import {GownController} from "../controllers/gownController.js";

const gownRouter = express.Router();

const gownController = new GownController();

gownRouter.get("/:id", gownController.getGownById)
gownRouter.get("/", gownController.getGowns)
gownRouter.post("/", gownController.addGown)
gownRouter.put("/:id", gownController.updateGown)
gownRouter.delete("/:id", gownController.deleteGown)

export {
    gownRouter
}
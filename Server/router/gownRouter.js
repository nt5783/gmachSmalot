import express from "express";
import {GownController} from "../controllers/gownController.js";
import {checkTokenManager} from '../middleware/authMiddleware.js'

const gownRouter = express.Router();

const gownController = new GownController();

gownRouter.get("/:id", gownController.getGownById)
gownRouter.get("/", gownController.getGowns)
gownRouter.post("/", checkTokenManager, gownController.addGown)
gownRouter.patch("/:id", gownController.updateGown)
gownRouter.delete("/:id", gownController.deleteGown)

export {
    gownRouter
}
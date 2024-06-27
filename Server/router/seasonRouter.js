import express from "express";
import {SeasonController} from "../controllers/seasonController.js";

const seasonRouter = express.Router();

const seasonController = new SeasonController();

seasonRouter.get("/:id", seasonController.getSeasonById)
seasonRouter.get("/", seasonController.getSeasons)
seasonRouter.post("/", seasonController.addSeason)
seasonRouter.patch("/:id", seasonController.updateSeason)
seasonRouter.delete("/:id", seasonController.deleteSeason)

export {
    seasonRouter
}
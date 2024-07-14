import express from "express";
import {SeasonController} from "../controllers/seasonController.js"
import { authVerifyToken } from '../middleware/authVerifyToken.js'

const seasonRouter = express.Router();
const seasonController = new SeasonController();

seasonRouter.get("/:id", seasonController.getSeasonById)
seasonRouter.get("/", seasonController.getSeasons)
seasonRouter.post("/", authVerifyToken, seasonController.addSeason)

export {
    seasonRouter
}
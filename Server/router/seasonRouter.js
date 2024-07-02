import express from "express";
import {SeasonController} from "../controllers/seasonController.js"
import { verifyToken } from "../middleware/verifyToken.js"
import { authVerifyToken } from '../middleware/authVerifyToken.js'

const seasonRouter = express.Router();
const seasonController = new SeasonController();

seasonRouter.get("/:id", verifyToken, seasonController.getSeasonById)
seasonRouter.get("/", verifyToken, seasonController.getSeasons)
seasonRouter.post("/", authVerifyToken, seasonController.addSeason)

export {
    seasonRouter
}
import express from "express";
import { LoginController } from "../controllers/loginController.js";
const loginRouter = express.Router();
const loginController = new LoginController()

// loginRouter.get("/:id", modelcontroller.getModelById)
loginRouter.post("/", loginController.login)

export {
    loginRouter
}
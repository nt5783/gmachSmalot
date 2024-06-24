import express from "express";
import { UserController } from "../controllers/loginController.js";
const loginRouter = express.Router();
const loginController = new UserController()

// loginRouter.get("/:id", modelcontroller.getModelById)
loginRouter.post("/", loginController.signUp)

export {
    loginRouter
}
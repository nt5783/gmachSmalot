import express from "express";
import { LoginController } from "../controllers/loginController.js"

const loginRouter = express.Router();
const loginController = new LoginController()

loginRouter.post("/", loginController.login)

export {
    loginRouter
}
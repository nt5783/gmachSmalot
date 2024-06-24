import express from "express";
import { SignupController } from "../controllers/signupController.js";
const signupRouter = express.Router();
const signupController = new SignupController()

// signupRouter.get("/:id", modelcontroller.getModelById)
signupRouter.post("/", signupController.signUp)

export {
    signupRouter
}
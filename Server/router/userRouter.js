import express from "express";
import { UserController } from "../controllers/userController.js";
const userRouter = express.Router();
const userController = new UserController()

// userRouter.get("/:id", modelcontroller.getModelById)
userRouter.post("/", userController.signUp)

export {
    userRouter
}
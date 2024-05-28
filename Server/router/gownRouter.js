import express from "express";
import {TodoController} from "../controllers/gownController.js";

const todoRouter = express.Router();

const todoController = new TodoController();

todoRouter.get("/:id", todoController.getTodoById)
todoRouter.get("/", todoController.getTodos)
todoRouter.post("/", todoController.addTodo)
todoRouter.put("/:id", todoController.updateTodo)
todoRouter.delete("/:id", todoController.deleteTodo)

export {
    todoRouter
}
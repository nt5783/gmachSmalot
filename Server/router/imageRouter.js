import express from "express";
// import { ImageController } from "../controllers/imageController.js";

const imageRouter = express.Router();

// const express = require("express");
const app = express();

// const imageController = new ImageController();
app.use('/images', express.static('dress2' + './img'));

// imageRouter.get("/:id", imageController.getImageById)
// // imageRouter.get("/", imageController.getImages)
// imageRouter.post("/", imageController.addImage)
// imageRouter.patch("/:id", imageController.updateImage)
// // imageRouter.delete("/:id", imageController.deleteImage)

export {
    imageRouter
}
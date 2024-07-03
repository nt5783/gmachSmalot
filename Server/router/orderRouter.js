import express from "express"
import {OrderController} from "../controllers/orderController.js"
import {verifyToken} from "../middleware/verifyToken.js"
import {authVerifyToken} from "../middleware/authVerifyToken.js"

const orderRouter = express.Router()
const orderController = new OrderController()

orderRouter.get("/:id", authVerifyToken, orderController.getOrderById)
orderRouter.get("/", verifyToken, orderController.getOrders)
orderRouter.post("/", verifyToken, orderController.addOrder)
orderRouter.delete("/", verifyToken, orderController.deleteOrder)
export {
    orderRouter
}
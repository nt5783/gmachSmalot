import express from "express"
import {OrderController} from "../controllers/orderController.js"
import {verifyToken} from "../middleware/verifyToken.js"
import {authVerifyToken} from "../middleware/authVerifyToken.js"

const orderRouter = express.Router()
const orderController = new OrderController()

orderRouter.get("/:id", authVerifyToken, orderController.getOrderById)
orderRouter.get("/", authVerifyToken, orderController.getOrders)
orderRouter.post("/", verifyToken, orderController.addOrder)
orderRouter.delete("/", authVerifyToken, orderController.deleteOrder)
export {
    orderRouter
}
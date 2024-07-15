import { OrderService } from '../service/orderService.js'
const orderService = new OrderService();

export class OrderController {
    async getOrders(req, res, next) {
        try {
            const resultItems = await orderService.getOrders(req.query);
            if (resultItems.length == 0)
                throw { statusCode: 404, message: "Orders not found" }
            return res.json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = ex.statusCode ?? 500;
            err.message = ex;
            next(err)
        }
    }

    async getOrderById(req, res, next) {
        try {
            const resultItem = await orderService.getOrderById(req.params.id);
            if (resultItem.length == 0)
                throw { statusCode: 404, message: "Order not found" }
            res.json(resultItem);
        }
        catch (ex) {
            const err = {}
            err.statusCode = ex.statusCode ?? 500;
            err.message = ex;
            next(err)
        }
    }

    async addOrder(req, res, next) {
        try {
            if (!req.body[0].eventDate || !req.body[0].userId || !req.body[0].gownId)
                throw { statusCode: 400, message: "Invalid parameters" }
            const resultItem = await orderService.addOrder(req.body);
            // res.json(resultItem.insertId);
        }
        catch (ex) {
            const err = {}
            err.statusCode = ex.statusCode ?? 500;
            err.message = ex;
            next(err)
        }
    }

    async deleteOrder(req, res, next) {
        try {
            const result = await orderService.deleteOrder(req.params.id)
            if (result.affectedRows === 0)
                throw { statusCode: 404, message: "Not valid action" }
            res.json(req.params.id);
        }
        catch (ex) {
            const err = {}
            err.statusCode = ex.statusCode ?? 500;
            err.message = ex;
            next(err)
        }
    }

    async updateOrder(req, res, next) {
        try {
            const result = await orderService.updateOrder(req.body, req.params.id);
            // if (result == null)
            //     throw ("this data cannot be updated")
            if (result.affectedRows === 0)
                throw { statusCode: 404, message: "Not valid action" }
            res.json(req.params.id);
        }
        catch (ex) {
            const err = {}
            // err.statusCode = ex == "this data cannot be updated" ? 409 : 500;
            err.statusCode = ex.statusCode ?? 500;
            err.message = ex;
            next(err)
        }
    }
}
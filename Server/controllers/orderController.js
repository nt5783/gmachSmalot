import { OrderService } from '../service/orderService.js'
            const orderService = new OrderService();

export class OrderController {
    async getOrders(req, res, next) {
        try {
            const resultItems = await orderService.getOrders(req.query);
            return res.json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async getOrderById(req, res, next) {
        try {
            const resultItem = await orderService.getOrderById(req.params.id);
            res.json(resultItem);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async addOrder(req, res, next) {
        try {
            console.log(req.body)
            const resultItem = await orderService.addOrder(req.body);
            res.json(resultItem.insertId);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async deleteOrder(req, res, next) {
        try {
            await orderService.deleteOrder(req.params.id)
            res.json(req.params.id);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async updateOrder(req, res, next) {
        try {
            const result = await orderService.updateOrder(req.body, req.params.id);
            // if (result == null)
            //     throw ("this data cannot be updated")
            res.json(req.params.id);
        }
        catch (ex) {
            const err = {}
            err.statusCode = ex == "this data cannot be updated" ? 409 : 500;
            err.message = ex;
            next(err)
        }
    }
}
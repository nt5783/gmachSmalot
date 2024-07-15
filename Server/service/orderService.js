
import { executeQuery } from './db.js';
import { getOrdersQuery, getOrderByIdQuery, addOrderQuery, deleteOrderQuery, updateOrderQuery } from '../queries/orderQuery.js'

export class OrderService {

    async getOrders(queryparams) {
        const queryOrder = getOrdersQuery(queryparams);
        const result = await executeQuery(queryOrder);
        return result;
    }

    async getOrderById(id) {
        const queryOrder = getOrderByIdQuery();
        const result = await executeQuery(queryOrder, [id]);
        return result;
    }

    async addOrder(newOrder) {
        const formatDate = (orderDate) => {
            const date = new Date(orderDate)
            return date.toISOString().slice(0, 10);
        };
        let params = []
        let eventDate = null
        for (let i = 0; i < newOrder.length; i++){
            eventDate = formatDate(newOrder[i].eventDate)
            params.push(eventDate)
            params.push(newOrder[i].userId)
            params.push(newOrder[i].gownId)
        }
        const queryOrder = addOrderQuery(newOrder.length);
        const result = await executeQuery(queryOrder, params);
        return result;
    }

    async deleteOrder(id) {
        const queryOrder = deleteOrderQuery();
        const result = await executeQuery(queryOrder, [id]);
        return result;
    }

    async updateOrder(updatedOrder, id) {
        let data = Object.values(updatedOrder);
        data.push(id)
        const queryOrder = updateOrderQuery(Object.keys(updatedOrder));
        const result = await executeQuery(queryOrder, data);
        return result;
    }
}
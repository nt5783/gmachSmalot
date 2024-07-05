
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
        // console.log(result)
        return result;
    }

    async addOrder(newOrder) {
        const formatDate = (date) => {
            return date.toISOString().slice(0, 10);
        };
        const date=new Date(newOrder.eventDate)
        newOrder.eventDate = formatDate(date)
        console.log(newOrder)
        const queryOrder = addOrderQuery();
        const result = await executeQuery(queryOrder, Object.values(newOrder));
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
import React from 'react';
import { useState } from 'react';
import 'react-dropzone-uploader/dist/styles.css'
import { fetchNoParamsfunc } from '../fetch';
import { Button } from 'primereact/button';

function Manager() {
    const [orders, setOrders] = useState([])

    async function showOrders(when) {
        try {
            const res = await fetchNoParamsfunc(`orders?${when}`, 'GET')
            const data = await res;
            if (data && data.length > 0)
                setOrders(data)
        } catch (err) {
            if (err.status == 404) {
                setOrders([])
                return;
            }
            alert(`Error getting orders: ${err.message}`)
        }
    }

    return (<>
        <div>
            <Button onClick={() => showOrders('today')}>view today's orders</Button>
            <Button onClick={() => showOrders('past')}>view all past orders</Button>
            <Button onClick={() => showOrders('future')}>view all future orders</Button>
            {orders.length == 0 && <h2>No orders</h2>}
            {orders.length > 0 &&
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Phone 1</th>
                            <th>Phone 2</th>
                            <th>Gown model</th>
                            <th>Gown Size</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, i) => (
                            <tr className='view-order'>
                                <td>{new Date(order.eventDate).toISOString().substring(0, 10)}</td>
                                <td>{order.fullName}</td>
                                <td>{order.email}</td>
                                <td>{order.phone}</td>
                                <td>{order.phone2}</td>
                                <td>{order.model}</td>
                                <td>{order.size}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>}
        </div>
    </>)
}
export default Manager;
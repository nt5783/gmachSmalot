import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { UserContext, DateContext } from '../App';
import { fetchfunc } from '../fetch';
import { useEffect } from 'react';
import { Button } from 'primereact/button';

const Order = () => {
    const { user } = useContext(UserContext)
    const { date, setDate } = useContext(DateContext)
    const eventDate = new Date(date);
    const { state } = useLocation();
    console.log("state")
    console.log(state)
    console.log(date)
    const { gowns } = state
    const [price, setPrice] = useState(0)
    const GOWN_PRICE = 100

    const [isAgreementChecked, setIsAgreementChecked] = useState(false);

    useEffect(() => {
        let p = 0
        gowns.map((gown) => p += gown.qty * GOWN_PRICE)
        console.log('p', p)
        setPrice(p)
    }, [])
    // amount: amountToOrder, gownId: gowns[selectedGown].gownId, eventDate: eventDate
    // const cost=100 * state.amount
    // console.log(cost)

    const handleAgreementChange = (e) => {
        setIsAgreementChecked(e.target.checked);
    };

    function orderGowns() {
        const orderObjs = gowns.flatMap((gown) => {
            const orders = [];
            for (let i = 0; i < gown.qty; i++) {
                orders.push({ eventDate: date, userId: user.userId, gownId: gown.gownId });
            }
            return orders;
        })
        createGownOrder(orderObjs)
    }


    async function createGownOrder(orderObjs) {
        try {
            await fetchfunc('orders', 'POST', orderObjs)
        } catch (err) {
            alert(`Error sending order: ${err.message}`)
        }
    }
    {/* {console.log("eventDate")} */ }
    {/* {console.log(eventDate)} */ }

    {/* {!eventDate && לנווט ללוח שנה} */ }

    {/* {!eventDate && <div><label htmlFor="eventDate">Chose your Event Date:</label>
            <input type="date" name="eventDate" onChange={setEventDate}></input></div>} */}
    {/* {eventDate &&  */{

    }
    }
    return (
        <PayPalScriptProvider options={{ "client-id": "ATjqmx7s7BZKVhYLfEngKieXUDvP8D7zQzw8Wz7OrDRWi8lgaKLNh3LRRyIgDu8mYH4KtROFhK5YxWMv" }}>
            <div className="order-container">
                <h2>Gown Order</h2>
                <h2>{eventDate.getDate()}/{eventDate.getMonth() + 1}/{eventDate.getFullYear()}</h2>
                {gowns.map((gown) => (<div><h3>Model: {gown.model} <br /> Size: {gown.size} <br /> Amount: {gown.qty}</h3>
                </div>
                ))}
                <p>Price: {price} ILS</p>
                <div className="agreement-checkbox">
                    <input type="checkbox" id="agreement" checked={isAgreementChecked} onChange={handleAgreementChange} />
                    {/* לטפל בקישור */}
                    <label htmlFor="agreement">I agree to the <a href="/about">terms and conditions</a></label>
                </div>

                {isAgreementChecked ? (
                    <div className='pay-pal-buttons-div'>
                        <PayPalButtons
                            onClick={orderGowns} className='pay-pal-buttons'
                        // createOrder={(data, actions) => {
                        //     return actions.order.create({
                        //         purchase_units: [{ amount: { currency_code: 'ILS', value: '100.00' } }]
                        //     });
                        // }}
                        // onApprove={(data, actions) => {
                        //     return actions.order.capture().then((details) => {
                        //         alert('Transaction completed by ' + details.payer.name.given_name);
                        //         // Handle the successful transaction here
                        //     });
                        // }}
                        // onError={(err) => {
                        //     console.error('PayPal Checkout onError:', err);
                        //     alert('An error occurred with your payment. Please try again.');
                        // }}
                        />
                    </div>
                ) : (
                    <p>Please agree to the terms and conditions to proceed with the payment.</p>
                )}
            </div>
            <Button onClick={orderGowns}>order</Button>
        </PayPalScriptProvider>
    );
};

export default Order;
// secret: EBmxh8uI1KFwfFNMZEatL0bMSlcTeo0uB0mjqG7Mqf42EeM007iTfH0nVGCTF5KOJ9kU-GYiYK5JqgGi

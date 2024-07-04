import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { UserContext, DateContext } from '../App';
import { fetchfunc } from '../fetch';

const Order = () => {
    const { user } = useContext(UserContext)
    const { date, setDate } = useContext(DateContext)
    const { state } = useLocation();
    console.log("state")
    console.log(state)
    console.log(date)

    const [isAgreementChecked, setIsAgreementChecked] = useState(false);
    // amount: amountToOrder, gownId: gowns[selectedGown].gownId, eventDate: eventDate
    // const cost=100 * state.amount
    // console.log(cost)

    const handleAgreementChange = (e) => {
        setIsAgreementChecked(e.target.checked);
    };

    async function createGownOrder() {
        console.log("state")
        console.log(state)
        // try {
        //     fetchfunc('orders','POST',{eventDate:eventDate,userId:user.userId,gownId:gown.gownId})
        // }catch{}
    }
                {/* {console.log("eventDate")} */}
        {/* {console.log(eventDate)} */}

        {/* {!eventDate && לנווט ללוח שנה} */}

        {/* {!eventDate && <div><label htmlFor="eventDate">Chose your Event Date:</label>
            <input type="date" name="eventDate" onChange={setEventDate}></input></div>} */}
        {/* {eventDate &&  */}
    return (
        <PayPalScriptProvider options={{ "client-id": "ATjqmx7s7BZKVhYLfEngKieXUDvP8D7zQzw8Wz7OrDRWi8lgaKLNh3LRRyIgDu8mYH4KtROFhK5YxWMv" }}>
            <div className="order-container">
                <h2>Gown Order</h2>
                <p>Price: {100 * state.amount} ILS</p>

                <div className="agreement-checkbox">
                    <input type="checkbox" id="agreement" checked={isAgreementChecked} onChange={handleAgreementChange} />
                    {/* לטפל בקישור */}
                    <label htmlFor="agreement">I agree to the <a href="/about">terms and conditions</a></label>
                </div>

                {isAgreementChecked ? (
                    <PayPalButtons
                        onClick={createGownOrder}
                        createOrder={(data, actions) => {
                            return actions.order.create({
                                purchase_units: [{ amount: { currency_code: 'ILS', value: '100.00' } }]
                            });
                        }}
                        onApprove={(data, actions) => {
                            return actions.order.capture().then((details) => {
                                alert('Transaction completed by ' + details.payer.name.given_name);
                                // Handle the successful transaction here
                            });
                        }}
                        onError={(err) => {
                            console.error('PayPal Checkout onError:', err);
                            alert('An error occurred with your payment. Please try again.');
                        }}
                    />
                ) : (
                    <p>Please agree to the terms and conditions to proceed with the payment.</p>
                )}
            </div>
        </PayPalScriptProvider>
    );
};

export default Order;
// secret: EBmxh8uI1KFwfFNMZEatL0bMSlcTeo0uB0mjqG7Mqf42EeM007iTfH0nVGCTF5KOJ9kU-GYiYK5JqgGi

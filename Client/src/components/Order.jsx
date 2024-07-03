import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { UserContext } from '../App'
import { fetchfunc } from '../fetch';

const Order = () => {
    const { user } = useContext(UserContext)
    const { state } = useLocation();
    console.log("state")
    console.log(state)
    const [isAgreementChecked, setIsAgreementChecked] = useState(false);
    const [eventDate, setEventDate] = useState(state.eventDate)
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

    return (<>
        {/* {console.log("eventDate")} */}
        {/* {console.log(eventDate)} */}

        {/* {!eventDate && לנווט ללוח שנה} */}

        {/* {!eventDate && <div><label htmlFor="eventDate">Chose your Event Date:</label>
            <input type="date" name="eventDate" onChange={setEventDate}></input></div>} */}
        {/* {eventDate &&  */}
        <PayPalScriptProvider options={{ "client-id": "ATjqmx7s7BZKVhYLfEngKieXUDvP8D7zQzw8Wz7OrDRWi8lgaKLNh3LRRyIgDu8mYH4KtROFhK5YxWMv" }}>
            <div>
                <h2>Gown Order</h2>
                <p>Price: {100 * state.amount} ILS</p>

                <div>
                    <input type="checkbox" id="agreement" checked={isAgreementChecked} onChange={handleAgreementChange} />
                    <label htmlFor="agreement">I agree to the terms and conditions</label>
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
        {/* } */}
    </>);
};

export default Order;




// import React from 'react';
// import { PayPalButton } from 'react-paypal-button-v2';

// function Order({ totalAmount, onPaymentSuccess }) {
//   const paypalOptions = {
//     clientId: 'YOUR_PAYPAL_CLIENT_ID',
//     currency: 'USD', // Change currency as needed
//   };

//   return (
//     <div>
//       <p>Total amount: {totalAmount} USD</p>
//       <PayPalButton
//         amount={totalAmount}
//         onSuccess={(details, data) => {
//           onPaymentSuccess(details, data);
//         }}
//         options={paypalOptions}
//       />
//       <div>
//         <label>
//           <input type="checkbox" required />
//           I agree to the terms and conditions
//         </label>
//       </div>
//     </div>
//   );
// }

// export default Order;


// secret: EBmxh8uI1KFwfFNMZEatL0bMSlcTeo0uB0mjqG7Mqf42EeM007iTfH0nVGCTF5KOJ9kU-GYiYK5JqgGi

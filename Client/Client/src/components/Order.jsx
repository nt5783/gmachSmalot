import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const PayPalCheckout = () => {
    const [isAgreementChecked, setIsAgreementChecked] = useState(false);

    const handleAgreementChange = (e) => {
        setIsAgreementChecked(e.target.checked);
    };

    return (
        <PayPalScriptProvider options={{ "client-id": "YOUR_CLIENT_ID" }}>
            <div>
                <h2>Evening Dress Purchase</h2>
                <p>Price: 100 ILS</p>

                <div>
                    <input
                        type="checkbox"
                        id="agreement"
                        checked={isAgreementChecked}
                        onChange={handleAgreementChange}
                    />
                    <label htmlFor="agreement">I agree to the terms and conditions</label>
                </div>

                {isAgreementChecked ? (
                    <PayPalButtons
                        createOrder={(data, actions) => {
                            return actions.order.create({
                                purchase_units: [{
                                    amount: {
                                        currency_code: 'ILS',
                                        value: '100.00'
                                    }
                                }]
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

export default PayPalCheckout;




// import React from 'react';
// import { PayPalButton } from 'react-paypal-button-v2';

// function PayPalPayment({ totalAmount, onPaymentSuccess }) {
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

// export default PayPalPayment;





// ב-PayPal, ה-Client ID הוא מזהה ייחודי שניתן לכם כאשר אתם יוצרים אפליקציה בחשבון המפתחים של PayPal. זהו מזהה שנדרש כדי להשתמש ב-SDK של PayPal ולבצע אינטגרציה עם המערכות של PayPal.

// כדי לקבל את ה-Client ID האמיתי שלכם מ-PayPal, תצטרכו לבצע את השלבים הבאים:

// היכנסו לאתר המפתחים של PayPal: PayPal Developer.
// היכנסו עם חשבון ה-PayPal שלכם. אם אין לכם חשבון, תצטרכו ליצור אחד.
// בלוח הבקרה של המפתחים, לחצו על "My Apps & Credentials" (האפליקציות והאישורים שלי).
// תחת "REST API apps", לחצו על "Create App" (צור אפליקציה).
// תנו שם לאפליקציה שלכם ובחרו את החשבון (אם יש לכם מספר חשבונות PayPal).
// לחצו על "Create App" (צור אפליקציה).
// אחרי יצירת האפליקציה, תראו את ה-Client ID שלכם ואת ה-Secret. אתם צריכים להשתמש ב-Client ID בקוד שלכם.
// לאחר שקיבלתם את ה-Client ID, החליפו את YOUR_CLIENT_ID בקוד ב-Client ID שלכם. לדוגמה:
// import React, { useState, useEffect, useContext } from 'react'
// import { useNavigate, useLocation } from 'react-router-dom'
// import { CartContext } from '../App'
// import { UserContext } from '../App';


// function Cart() {
//     const navigate = useNavigate();
//     const { state } = useLocation();
//     const eventDate = state ? state.value : null;
//     const { user } = useContext(UserContext)
//     const { cart, setCart } = useContext(CartContext)


//     return (<>
//         {user && cart.length > 0 && cart.items.map((gown, i) => {
//             return <div key={i}>
//                 <img height={100} src={gown.img} alt="gown image" onClick={() =>
//                     navigate(`../models/${gown.model}`, {
//                         state: { model: { model: gown.model, image: gown.img }, eventDate: eventDate }
//                     })} />
//                 {gown.model} size: {gown.size} amount: {gown.qty}
//             </div>
//         })}
//         {user && cart.length == 0 && <h3>your cart is empty</h3>}
//         {!user && <h3><a className='no_background' href='./login'>log in here</a> to see your cart items</h3>}
//     </>)
// }

// export default Cart






import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CartContext } from '../App';
import { UserContext } from '../App';

const Cart = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const eventDate = state ? state.value : null;
    const { user } = useContext(UserContext);
    const { cart } = useContext(CartContext);

    return (
        <div className="cart-container">
            {user && cart.length > 0 && (
                <>
                    <h2>Your Cart</h2>
                    <div className="cart-items">
                        {cart.items.map((gown, index) => (
                            <div key={index} className="cart-item">
                                <img src={gown.img} alt="gown" className="gown-image" onClick={() =>
                                    navigate(`../models/${gown.model}`, {
                                        state: { model: { model: gown.model, image: gown.img }, eventDate: eventDate }
                                    })} />
                                <div className="gown-details">
                                    <span className="gown-model">{gown.model}</span>
                                    <span className="gown-size">Size: {gown.size}</span>
                                    <span className="gown-qty">Quantity: {gown.qty}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
            {user && cart.length === 0 && (
                <h3>Your cart is empty</h3>
            )}
            {!user && (
                <h3><a className='login-link' href='./login'>Log in</a> to see your cart items</h3>
            )}
        </div>
    );
};

export default Cart;

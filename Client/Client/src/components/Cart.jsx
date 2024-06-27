import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { CartContext } from '../App'


function Cart() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const eventDate = state ? state.value : null;
    const { cart, setCart } = useContext(CartContext)


    return(<>
        {cart.length > 0 && cart.items.map((gown, i) => {
            return <div>
                <img height={100} src={gown.img} alt="gown image" onClick={() => navigate(`../models/${gown.model}`
                ,{ state: { model: {model: gown.model, womenImage: gown.img}, eventDate: eventDate } }
                )}/>
                {gown.model} {gown.size} {gown.color} {gown.length}
            </div>})}
        {cart.length == 0 && <h3>your cart is empty</h3>}
    </>)
}

export default Cart
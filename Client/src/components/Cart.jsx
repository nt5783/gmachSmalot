import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext, CartContext, DateContext } from '../App';
import { Button } from 'primereact/button';

const Cart = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const eventDate = state ? state.value : null;
    const { user } = useContext(UserContext);
    const { cart } = useContext(CartContext);
    const { date } = useContext(DateContext);

    console.log(cart.items)

    return (
        <div className="cart-container">
            {user && cart.qty > 0 && (
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
            {user && cart.qty === 0 && (
                <h3>Your cart is empty</h3>
            )}
            {!user && (
                <h3><a className='login-link' href='./login'>Log in</a> so you can manage your cart</h3>
            )}
            {cart.qty > 0 && <Button
                label="Purchase now"
                icon="pi pi-credit-card"
                disabled={date == null}
                onClick={() => navigate('/order', { state: { gowns: cart.items} })}
            />}
        </div>
    );
};

export default Cart;

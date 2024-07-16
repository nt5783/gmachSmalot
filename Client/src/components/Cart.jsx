import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext, CartContext, DateContext } from '../App';
import { Button } from 'primereact/button';

const Cart = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const { cart } = useContext(CartContext);
    const { date } = useContext(DateContext);

    return (<div className="cart-container">
        {user && (cart.qty > 0 ?
            <>
                <h2>Your Cart</h2>
                <div className="cart-items">
                    {cart.items.map((gown, index) => (
                        <div key={index} className="cart-item">
                            <img src={gown.img} alt="gown" className="gown-image" onClick={() =>
                                navigate(`../models/${gown.model}`)} />
                            <div className="gown-details">
                                <span className="gown-model">{gown.model}</span>
                                <span className="gown-info">Size: {gown.size}</span>
                                <span className="gown-info">Quantity: {gown.qty}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </> : <h3>Your cart is empty</h3>
        )}
        {!user && (
            <h3><a className='login-link' href='./login'>Log in</a> so you can manage your cart</h3>
        )}
        {cart.qty > 0 &&
            <Button
                label="Purchase now"
                icon="pi pi-credit-card"
                disabled={date == null}
                onClick={() => navigate('/order', { state: { gowns: cart.items } })}
            />}
    </div>
    );
};

export default Cart;

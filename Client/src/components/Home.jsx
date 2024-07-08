import React, { useContext, useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { UserContext, CartContext } from "../App";
import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';
import cartIcon from '../icons/cart.png';
import logo from '../icons/gown logo.png';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function Home() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const { cart } = useContext(CartContext);
    const [cartAmount, setCartAmount] = useState(cart.length);

    console.log('cart')
    console.log(cart)

    let amount = 0

    useEffect(() => {
        if (!user) return;
        localStorage.setItem(`cart${user.username}`, JSON.stringify(cart));
        cart.items.map((gown) => amount += gown.qty)
        console.log(amount)
        setCartAmount(amount)
    }, [cart]);

    function logout() {
        if (!user) return;
        localStorage.removeItem('user');
        setCartAmount(0);
        setUser(null);
        navigate('./');
    }

    return (
        <>
            <div className="header">
                <img height={80} src={logo} alt="logo" className="logo" />
                <div className="home_navigate">
                    {/* <NavLink className="cart_link" to="./cart">{cart.length}<img height={'50px'} src={cartIcon} alt="cart icon" /></NavLink> */}
                    {user && <span className="user-name">{user.username} {user.isManager ? 'manager' : ''}</span>}
                    {user ? (<Button label="Logout" className="logout-button" onClick={logout} />)
                        : (<NavLink to="./login" className="nav-button">Login</NavLink>)}
                    <NavLink className="cart_link" to="./cart">
                        {/* <Badge value={cart.length} className="cart-badge"></Badge> */}
                        <Button><img height="50px" src={cartIcon} alt="cart icon" />
                        <span className="cart-amount">{cartAmount}</span></Button>
                        {/* <span className="cart-amount">{cart.length}</span> */}
                    </NavLink>

                    {/* ?למחוק */}
                    <NavLink to="./manager" className="nav-button">Manager</NavLink>
                </div>
            </div>
            <div className="home_navigate">
                <NavLink to="./about" className="nav-button">About</NavLink>
                <NavLink to="./models" className="nav-button">Models</NavLink>
                <NavLink to="./eventCalendar" className="nav-button">Event Calendar</NavLink>
            </div>
            <Outlet />
        </>
    );
}

export default Home;

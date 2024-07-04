import React, { useContext, useEffect } from "react";
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

    useEffect(() => {
        if (!user) return;
        localStorage.setItem(`cart${user.username}`, JSON.stringify(cart));
    }, [cart]);

    function logout() {
        if (!user) return;
        localStorage.removeItem('user');
        setUser(null);
        navigate('./');
    }

    return (
        <>
            <div className="header">
                <img height={80} src={logo} alt="logo" className="logo" />
                <div className="home_navigate">
                {/* <NavLink className="cart_link" to="./cart">{cart.length}<img height={'50px'} src={cartIcon} alt="cart icon" /></NavLink> */}
                    <NavLink className="cart_link" to="./cart">
                        <Badge value={cart.length} className="cart-badge">
                            <img height="50px" src={cartIcon} alt="cart icon" />
                        </Badge>
                    </NavLink>
                    {user && <span className="user-name">{user.username}</span>}
                    {user ? (
                        <Button label="Logout" className="logout-button" onClick={logout} />
                    ) : (
                        <NavLink to="./login" className="nav-button">Login</NavLink>
                    )}
                    {/* למחוק */}
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

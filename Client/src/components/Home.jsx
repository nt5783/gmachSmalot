import React, { useContext, useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { UserContext, CartContext, FavoritesContext } from "../App";
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
    const { favorites } = useContext(FavoritesContext);
    const [cartAmount, setCartAmount] = useState(cart.qty);


    console.log('cart')
    console.log(cart)
    console.log('cartAmount')
    console.log(cartAmount)
    // let amount = 0

    useEffect(() => {
        if (!user) return;
        setCartAmount((prev) => cart.qty)
        localStorage.setItem(`cart${user.username}`, JSON.stringify(cart));
        // cart.items.map((gown) => amount += gown.qty)
        // console.log(amount)
        // setCartAmount(amount)
    }, [cart]);

    useEffect(() => {
        if (!user) return;
        localStorage.setItem(`favorites${user.username}`, JSON.stringify(favorites));
        console.log("favorites", favorites)
    }, [favorites]);

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
                    {user ? (<Button icon="pi pi-sign-out" label="Logout" className="logout-button" onClick={logout} />)
                        : (<NavLink to="./login" className="nav-button">Login <i className="pi pi-sign-in"></i></NavLink>)}
                    <NavLink className="cart_link" to="./cart">
                        {/* <Badge value={cart.length} className="cart-badge"></Badge> */}
                        <img height="50px" src={cartIcon} alt="cart icon" />
                        <span className="cart-amount">{cartAmount}</span>
                        {/* <span className="cart-amount">{cart.length}</span> */}
                    </NavLink>
                    {favorites.length > 0 ? <NavLink to="./favorites" className="nav-button, cart_link">
                        <i className="pi pi-star-fill"></i>{favorites.length}</NavLink> :
                        <NavLink to="./favorites" className="nav-button, cart_link"><i className="pi pi-star"></i></NavLink>}
                    {/* ?למחוק */}
                    <NavLink to="./manager" className="nav-button">Manager</NavLink>
                </div>
            </div>
            <div className="home_navigate">
                <NavLink to="./about" className="nav-button">About</NavLink>
                <NavLink to="./models" className="nav-button">Models</NavLink>
                <NavLink to="./eventCalendar" className="nav-button">Event Calendar <i className="pi pi-calendar"></i></NavLink>
            </div>
            <Outlet />
        </>
    );
}

export default Home;

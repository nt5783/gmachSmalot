// import React, { useContext, useEffect, useState } from "react";
// import { NavLink, Outlet, useNavigate } from "react-router-dom";
// import { UserContext, CartContext, FavoritesContext } from "../App";
// import { Button } from 'primereact/button';
// import { Badge } from 'primereact/badge';
// import cartIcon from '../icons/cart.png';
// import logo from '../icons/logo.png';

// import 'primereact/resources/themes/saga-blue/theme.css';
// import 'primereact/resources/primereact.min.css';
// import 'primeicons/primeicons.css';

// function Home() {
//     const navigate = useNavigate();
//     const { user, setUser } = useContext(UserContext);
//     const { cart } = useContext(CartContext);
//     const { favorites } = useContext(FavoritesContext);
//     // const [cartAmount, setCartAmount] = useState(cart.qty);


//     console.log('cart')
//     console.log(cart)
//     console.log('cartAmount')
//     console.log(cart.qty)
//     console.log('favorites')
//     console.log(favorites)
//     // let amount = 0

//     useEffect(() => {
//         if (!user) return;
//         localStorage.setItem(`cart_${user.username}`, JSON.stringify(cart));
//     }, [cart]);

//     useEffect(() => {
//         if (!user) return;
//         localStorage.setItem(`favorites_${user.username}`, JSON.stringify(favorites));
//         console.log("favorites", favorites)
//     }, [favorites]);

//     function logout() {
//         if (!user) return;
//         localStorage.removeItem('user');
//         navigate('./');
//         location.reload();
//     }

//     return (<>
//         <div className="header">
//             <div className="home_navigate">
//                 <img src={logo} alt="logo" className="logo" />
//                 <NavLink to="./about" className="nav-button">About</NavLink>
//                 <NavLink to="./models" className="nav-button">2024 Collection</NavLink>
//                 <NavLink to="./eventCalendar" className="nav-button">Event Calendar <i className="pi pi-calendar"></i></NavLink>
//             </div>
//             <div className="home_navigate">
//                 {user && <span className="user-name">{user.username} {user.isManager ? 'manager' : ''}</span>}
//                 {user && ( favorites.length > 0 ? <NavLink to="./favorites" className="nav-button, cart_link">
//                     <i className="pi pi-star-fill"></i>{favorites.length}</NavLink> :
//                     <NavLink to="./favorites" className="nav-button, cart_link"><i className="pi pi-star-fill">0</i></NavLink> )}
//                 <NavLink className="cart_link" to="./cart">
//                     <img height="50px" src={cartIcon} alt="cart icon" />
//                     {user && <span className="cart-amount">{cart.qty}</span>}
//                 </NavLink>
//                 {user ? (<Button icon="pi pi-sign-out" label="Logout" className="logout-button" onClick={logout} />)
//                     : (<NavLink to="./login" className="nav-button">Login <i className="pi pi-sign-in"></i></NavLink>)}
//                 {user && user.isManager ? <NavLink to="./manager" className="manager-button nav-button">Manager</NavLink> : <></>}
//             </div>
//         </div>
//         <Outlet />
//     </>);
// }

// export default Home;





import React, { useContext, useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { UserContext, CartContext, FavoritesContext } from "../App";
import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';
import cartIcon from '../icons/cart.png';
import logo from '../icons/logo.png';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function Home() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const { cart } = useContext(CartContext);
    const { favorites } = useContext(FavoritesContext);

    useEffect(() => {
        if (!user) return;
        localStorage.setItem(`cart_${user.username}`, JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        if (!user) return;
        localStorage.setItem(`favorites_${user.username}`, JSON.stringify(favorites));
        console.log("favorites", favorites);
    }, [favorites]);

    function logout() {
        if (!user) return;
        localStorage.removeItem('user');
        navigate('./');
        location.reload();
    }

    return (<>
        <div className="header">
            <div className="home_navigate">
                <img src={logo} alt="לוגו" className="logo" />
                <NavLink to="./about" className="nav-button">אודות</NavLink>
                <NavLink to="./models" className="nav-button">אוסף 2024</NavLink>
                <NavLink to="./eventCalendar" className="nav-button">לוח אירועים <i className="pi pi-calendar"></i></NavLink>
            </div>
            <div className="home_navigate">
                {user && <span className="user-name">{user.username} {user.isManager ? 'מנהל' : ''}</span>}
                {user && (favorites.length > 0 ? <NavLink to="./favorites" className="nav-button cart_link">
                    <i className="pi pi-star-fill"></i>{favorites.length}</NavLink> :
                    <NavLink to="./favorites" className="nav-button cart_link"><i className="pi pi-star-fill">0</i></NavLink>)}
                <NavLink className="cart_link" to="./cart">
                    <img height="50px" src={cartIcon} alt="סמל עגלה" />
                    {user && <span className="cart-amount">{cart.qty}</span>}
                </NavLink>
                {user ? (<Button icon="pi pi-sign-out" label="התנתקות" className="logout-button" onClick={logout} />)
                    : (<NavLink to="./login" className="nav-button">התחברות <i className="pi pi-sign-in"></i></NavLink>)}
                {user && user.isManager ? <NavLink to="./manager" className="manager-button nav-button">מנהל</NavLink> : <></>}
            </div>
        </div>
        <Outlet />
    </>);
}

export default Home;

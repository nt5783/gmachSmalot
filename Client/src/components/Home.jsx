import React, { useContext, useEffect } from "react"
import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { UserContext } from "../App"
import { CartContext } from "../App"
import cartIcon from '../icons/cart.png'
import logo from '../icons/gown logo png.png'


function Home() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext)
    const { cart } = useContext(CartContext)

    useEffect(() => {
        if (!user) return
        localStorage.setItem(`cart${user.username}`, JSON.stringify(cart))
    }, [cart])

    function logout() {
        if (!user) return
        localStorage.removeItem('user')
        setUser(null)
        navigate('./')
    }

    return (<>
        <img height={80} src={logo} alt="" />
        <div className="home_navigate">
            {/* <a href="" title="smart cart icons"/> */}
            <NavLink className="cart_link" to="./cart">
                {cart.length}<img height={'50px'} src={cartIcon} alt="cart icon" /></NavLink>
            {user && <span>{user.username}</span>}
            {user ? <button onClick={logout}>logout</button> :
                <NavLink to="./login">
                    Login</NavLink>}
            <NavLink to="./manager">
                Manager</NavLink>
        </div>
        <div className="home_navigate">
            <NavLink to="./about">
                About</NavLink>
            <NavLink to="./models">
                Models</NavLink>

            <NavLink to="./eventCalendar">
                Event Calendar</NavLink>
        </div>
        {/* <h2>{user.user.username}</h2> */}
        <Outlet />
    </>)
}

export default Home
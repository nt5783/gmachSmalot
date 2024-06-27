import React, { useContext, useEffect } from "react"
import { NavLink, Outlet } from "react-router-dom"
import { UserContext } from "../App"
import { CartContext } from "../App"
import cartIcon from '../icons/cart.png'


function Home() {
    const { user } = useContext(UserContext)
    const { cart } = useContext(CartContext)

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    return (<>
        { user && <span>{user.username}</span>}
        {/* <a href="" title="smart cart icons"/> */}
        <NavLink to="./cart">
            {cart.length}<img height={'50px'} src={cartIcon} alt="cart icon" /></NavLink>
        <NavLink to="./about">
            About</NavLink>
        <NavLink to="./models">
            Models</NavLink>
        <NavLink to="./login">
            Login</NavLink>
        <NavLink to="./manager">
            Manager</NavLink>
        <NavLink to="./invitationCalendar">
            InvitationCalendar</NavLink>
        {/* <h2>{user.user.username}</h2> */}
        <Outlet />
    </>)
}

export default Home
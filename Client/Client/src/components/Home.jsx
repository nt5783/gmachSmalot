import React from "react";
import { NavLink, Outlet } from "react-router-dom";


function Home() {
    

    return (<>
        <NavLink to="./about">
            About</NavLink>
        <NavLink to="./gowns">
            Gowns</NavLink>
        <NavLink to="./login">
            Login</NavLink>
        <NavLink to="./manager">
            Manager</NavLink>
            <NavLink to="./invitationCalendar">InvitationCalendar</NavLink>
        <Outlet />
    </>)
}

export default Home;
import React, { useEffect, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { loginfetchfunc } from '../fetch'
import { UserContext } from '../App'
// import {Cookie} from 'react-cookie'


function Login() {
    const { user, setUser } = useContext(UserContext)
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const { state } = useLocation();
    const model = state? state.model.model : null;
    const message = state? state.message : null;


    console.log('state')
    if (state) console.log(state)
    console.log('model')
    if (model) console.log(model)


    useEffect(() => {
        console.log('user context!!')
        console.log(user)
        // const currentUser = JSON.parse(localStorage.getItem('currentUser'))
        // if (currentUser != null) {
        //     navigate(`/home/users/${currentUser.id}`)
        //     setUserDetails(currentUser)
        // }
    }, [user])

    async function loginUser(data) {

        let res = loginfetchfunc('login', 'POST', data)
        const user = await res;
        if (user.status != 200) return
        localStorage.setItem("user", JSON.stringify(user.data.data))
        setUser(user.data.data)
        if (model) navigate(`../models/${model}`, {state: {model: state.model, eventDate: state.eventDate ? state.eventDate : null}})
        else navigate('../models')
        
        
        // fetch(`http://localhost:8080/login`, {
        //     method: 'POST',
        //     body: JSON.stringify({ username: name, password: password }),
        //     headers: { 'Content-type': 'application/json; charset=UTF-8' },
        // }).then(response => {
        //     if (!response.ok)
        //         throw 'Error' + response.status + ': ' + response.statusText;
        //     return response.json();
        // }).then(user => {
        //     user = user[0];
        //     if (!user)
        //         throw 'incorrect data, you have to signup'
        //     else {
        //         setUserDetails(user);
        //         localStorage.setItem('currentUser', JSON.stringify(user));
        //         navigate(`/home/users/${user.id}`);
        //     }
        // }).catch(ex => alert(ex))
    }

    return (<>
            {message && <><div>{message}</div><div> you will be redirected to the gown</div></>}
            <form onSubmit={handleSubmit((data => loginUser(data)))}>
            <label htmlFor='username' >username</label>
            <input name='username' type='text' required {...register('username')}></input>
            <label htmlFor='password' >password</label>
            <input name='password' type='password' required {...register('password')}></input>
            <button type='submit'>Submit</button>
        </form>
        <button className='navigate_link' onClick={() => navigate('../signup', {state: state})}>new user? sign up</button>
    </>)
}

export default Login
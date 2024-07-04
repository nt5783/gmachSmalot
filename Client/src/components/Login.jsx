// import React, { useEffect, useContext } from 'react'
// import { useNavigate, useLocation } from 'react-router-dom'
// import { useForm } from "react-hook-form"
// import { loginfetchfunc } from '../fetch'
// import { UserContext } from '../App'
// // import {Cookie} from 'react-cookie'


// function Login() {
//     const { user, setUser } = useContext(UserContext)
//     const navigate = useNavigate();
//     const { register, handleSubmit } = useForm();
//     const { state } = useLocation();
//     const model = state? state.model.model : null;
//     const message = state? state.message : null;


//     console.log('state')
//     if (state) console.log(state)
//     console.log('model')
//     if (model) console.log(model)


//     useEffect(() => {
//         console.log('user context!!')
//         console.log(user)
//         // const currentUser = JSON.parse(localStorage.getItem('currentUser'))
//         // if (currentUser != null) {
//         //     navigate(`/home/users/${currentUser.id}`)
//         //     setUserDetails(currentUser)
//         // }
//     }, [user])

//     async function loginUser(data) {

//         let res = loginfetchfunc('login', 'POST', data)
//         const user = await res;
//         if (user.status != 200) return
//         localStorage.setItem("user", JSON.stringify(user.data.data))
//         setUser(user.data.data)
//         if (model) navigate(`../models/${model}`, {state: {model: state.model, eventDate: state.eventDate ? state.eventDate : null}})
//         else navigate('../models')
        
        
//         // fetch(`http://localhost:8080/login`, {
//         //     method: 'POST',
//         //     body: JSON.stringify({ username: name, password: password }),
//         //     headers: { 'Content-type': 'application/json; charset=UTF-8' },
//         // }).then(response => {
//         //     if (!response.ok)
//         //         throw 'Error' + response.status + ': ' + response.statusText;
//         //     return response.json();
//         // }).then(user => {
//         //     user = user[0];
//         //     if (!user)
//         //         throw 'incorrect data, you have to signup'
//         //     else {
//         //         setUserDetails(user);
//         //         localStorage.setItem('currentUser', JSON.stringify(user));
//         //         navigate(`/home/users/${user.id}`);
//         //     }
//         // }).catch(ex => alert(ex))
//     }

//     return (<>
//             {message && <><div>{message}</div><div> you will be redirected to the gown</div></>}
//             <form onSubmit={handleSubmit((data => loginUser(data)))}>
//             <label htmlFor='username' >username</label>
//             <input name='username' type='text' required {...register('username')}></input>
//             <label htmlFor='password' >password</label>
//             <input name='password' type='password' required {...register('password')}></input>
//             <button type='submit'>Submit</button>
//         </form>
//         <button className='navigate_link' onClick={() => navigate('../signup', {state: state})}>new user? sign up</button>
//     </>)
// }

// export default Login













import React, { useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { loginfetchfunc } from '../fetch';
import { UserContext } from '../App';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Message } from 'primereact/message';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function Login() {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const { state } = useLocation();
    const model = state ? state.model.model : null;
    const message = state ? state.message : null;

    useEffect(() => {
        console.log('user context!!');
        console.log(user);
    }, [user]);

    async function loginUser(data) {
        let res = loginfetchfunc('login', 'POST', data);
        const user = await res;
        if (user.status !== 200) return;
        localStorage.setItem("user", JSON.stringify(user.data.data));
        setUser(user.data.data);
        if (model) navigate(`../models/${model}`, { state: { model: state.model, eventDate: state.eventDate ? state.eventDate : null } });
        else navigate('../models');
    }

    return (
        <>
            {message && (
                <div className="login-message">
                    <Message severity="warn" text={message} />
                    <div>you will be redirected to the gown</div>
                </div>
            )}
            <form onSubmit={handleSubmit((data) => loginUser(data))} className="login-form">
                <div className="field">
                    <span className="p-float-label">
                        <InputText id="username" {...register('username', { required: true })} />
                        <label htmlFor="username">Username</label>
                    </span>
                </div>
                <div className="field">
                    <span className="p-float-label">
                        <Password id="password" {...register('password', { required: true })} toggleMask />
                        <label htmlFor="password">Password</label>
                    </span>
                </div>
                <Button type="submit" label="Submit" className="p-button-success" />
            </form>
            <Button label="New user? Sign up" className="navigate-link" onClick={() => navigate('../signup', { state: state })} />
        </>
    );
}

export default Login;

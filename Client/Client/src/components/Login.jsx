// import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { fetchfunc } from '../fetch';

// import { AppContext } from "../App";

function Login() {
    // const { setUserDetails } = useContext(AppContext)
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();

    // useEffect(() => {
    //     const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    //     if (currentUser != null) {
    //         navigate(`/home/users/${currentUser.id}`);
    //         setUserDetails(currentUser)
    //     }
    // }, [])

    async function loginUser(data) {

        let res = fetchfunc('login', 'POST', data)
        const user = await res;
        console.log('user')
        console.log(user)

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
        <form onSubmit={handleSubmit((data => loginUser(data)))}>
            <label htmlFor='username' >username</label>
            <input name='username' type='text' required {...register('username')}></input>
            <label htmlFor='password' >password</label>
            <input name='password' type='password' required {...register('password')}></input>
            <button type='submit'>Submit</button>
        </form>
        <button className='navigate_link' onClick={() => navigate('../signup')}>new user? sign up</button>

    </>)
}

export default Login;
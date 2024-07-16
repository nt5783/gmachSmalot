import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { loginfetchfunc } from '../fetch';
import { UserContext } from '../App';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';
import { Dialog } from 'primereact/dialog';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function Login() {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const { state } = useLocation();
    const model = state ? state.model : null;
    const message = state ? state.message : null;

    async function loginUser(data) {
        try {
            let res = loginfetchfunc('login', 'POST', data);
            const user = await res;
            localStorage.setItem("user", JSON.stringify(user.data.data));
            if (model) navigate(`../models/${model}`);
            else navigate('../models');
            location.reload();
            setUser(user.data.data);
        } catch (err) {
            alert(`Error in login: ${err.message}`)
        }
    }

    return (
        <>
            <Dialog visible={true} onHide={() => navigate('../')} header="Log in">
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
                            <InputText id="password" type='password' {...register('password', { required: true })} />
                            <label htmlFor='password' >password</label>
                        </span>
                    </div>
                    <Button type="submit" label="Submit" className="p-button-success" />
                </form>
                <Button label="New user? Sign up" className="navigate-link" onClick={() => navigate('../signup', { state })} />
            </Dialog>
        </>
    );
}

export default Login;

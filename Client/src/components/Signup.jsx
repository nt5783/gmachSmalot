import React, {useEffect, useContext} from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchfunc } from '../fetch';
import { UserContext } from '../App';


const Signup = () => {
    const { user, setUser } = useContext(UserContext)
    const { register, handleSubmit, formState: { errors }  } = useForm();
    const navigate = useNavigate();
    const { state } = useLocation();
    const model = state? state.model.model : null;
    const message = state? 'you must sign up' : null;

    console.log('state')
    if (state) console.log(state)

    console.log('model')
    if (model) console.log(model)


    async function onSubmit(data) {
        let res = fetchfunc('signup', 'POST', data)
        const user = await res
        if (user.status != 200) return
        localStorage.setItem("user", JSON.stringify(user.data))
        setUser(user.data)
        if (model) navigate(`../models/${model}`, {state: {model: state.model, eventDate: state.eventDate ? state.eventDate : null}})
        navigate('../models')
        
    }

    return (<>
        <form onSubmit={handleSubmit(onSubmit)}>
        {message && <><div>{message}</div><div> and then you will be redirected to the gown</div></>}
            <input type="text" required {...register("username")} placeholder="Username" /><br/>
            <input type="password" {...register("password")} placeholder="Password" /><br/><br/>
            <input type="text" {...register("fullName")} placeholder="Full Name" /><br/>
            <input type="text" required {...register("phone",  {pattern:/^[0-9\-\+\s]{7,14}$/})} placeholder="Phone" /><br/>
            {errors.phone && <><p className="error">Phone number must be between 7 and 14 digits and contain only numbers.</p><br/></>}
            <input type="text" {...register("phone2",  {pattern:/^[0-9\-\+\s]{7,14}$/})} placeholder="Phone 2" /><br/>
            {errors.phone2 && <><p className="error">Phone number must be between 7 and 14 digits and contain only numbers.</p><br/></>}
            <input type="text" {...register("city")} placeholder="City" /><br/>
            <input type="email" {...register("email")} placeholder="Email" /><br/>
            <button type="submit">Submit</button>
        </form>
        <button className='navigate_link' onClick={() => navigate('../login', {state: state})}>have an account? log in</button>

    </>);
};

export default Signup;
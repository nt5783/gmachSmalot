import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { fetchfunc } from '../fetch';


const Signup = () => {
    const { register, handleSubmit, formState: { errors }  } = useForm();
    const navigate = useNavigate();

    async function onSubmit(data) {
        let res = fetchfunc('signup', 'POST', data)
        const user = await res
        console.log('user')
        console.log(user)
        if (user.status == 200) {
            localStorage.setItem("user", JSON.stringify(user.data))
            navigate('../models')
        }
    }

    return (<>
        <form onSubmit={handleSubmit(onSubmit)}>
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
        <button className='navigate_link' onClick={() => navigate('../login')}>have an account? log in</button>

    </>);
};

export default Signup;
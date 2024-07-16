// import React, { useEffect, useContext } from 'react';
// import { useForm } from 'react-hook-form';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { fetchfunc, loginfetchfunc } from '../fetch';
// import { UserContext } from '../App';
// import { Button } from 'primereact/button';
// import { InputText } from 'primereact/inputtext';
// import { Password } from 'primereact/password';
// import { Message } from 'primereact/message';
// import { Dialog } from 'primereact/dialog';

// import 'primereact/resources/themes/saga-blue/theme.css';
// import 'primereact/resources/primereact.min.css';
// import 'primeicons/primeicons.css';


// const Signup = () => {
//     const { user, setUser } = useContext(UserContext);
//     const { register, handleSubmit, formState: { errors } } = useForm();
//     const navigate = useNavigate();
//     const { state } = useLocation();
//     const model = state ? state.model.model : null;
//     const message = state ? 'you must sign up' : null;

//     async function onSubmit(data) {
//         try {
//             let res = loginfetchfunc('signup', 'POST', data);
//             const user = await res;
//             // if (user.status !== 200) return;
//             localStorage.setItem("user", JSON.stringify(user.data.data));
//             setUser(user.data);
//             if (model) navigate(`../models/${model}`);
//             navigate('../models');
//             location.reload();
//         } catch (err) {
//             alert(`Error signing up: ${err.message}`)
//         }
//     }

//     return (
//         <>
//             <Dialog visible={true} onHide={() => navigate('../')} header="Sign up">
//                 <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
//                     {message && (
//                         <div className="signup-message">
//                             <Message severity="warn" text={message} />
//                             <div>and then you will be redirected to the gown</div>
//                         </div>
//                     )}
//                     <div className="field">
//                         <span className="p-float-label">
//                             <InputText id="username" {...register("username", { required: true })} />
//                             <label htmlFor="username">Username</label>
//                         </span>
//                     </div>
//                     <div className="field">
//                         <span className="p-float-label">
//                             {/* <Password id="password" {...register("password", { required: true })} toggleMask />
//                         <label htmlFor="password">Password</label> */}
//                             {/* <input type="password" {...register("password")} placeholder="Password" /><br /><br /> */}
//                             <InputText id="password" type='password' {...register('password', { required: true })} />
//                             <label htmlFor='password' >password</label>
//                         </span>
//                     </div>
//                     <div className="field">
//                         <span className="p-float-label">
//                             <InputText id="fullName" {...register("fullName")} />
//                             <label htmlFor="fullName">Full Name</label>
//                         </span>
//                     </div>
//                     <div className="field">
//                         <span className="p-float-label">
//                             <InputText id="phone" {...register("phone", { pattern: /^[0-9\-\+\s]{7,14}$/ })} />
//                             <label htmlFor="phone">Phone</label>
//                         </span>
//                         {errors.phone && <Message severity="error" text="Phone number must be between 7 and 14 digits and contain only numbers." />}
//                     </div>
//                     <div className="field">
//                         <span className="p-float-label">
//                             <InputText id="phone2" {...register("phone2", { pattern: /^[0-9\-\+\s]{7,14}$/ })} />
//                             <label htmlFor="phone2">Phone 2</label>
//                         </span>
//                         {errors.phone2 && <Message severity="error" text="Phone number must be between 7 and 14 digits and contain only numbers." />}
//                     </div>
//                     <div className="field">
//                         <span className="p-float-label">
//                             <InputText id="city" {...register("city")} />
//                             <label htmlFor="city">City</label>
//                         </span>
//                     </div>
//                     <div className="field">
//                         <span className="p-float-label">
//                             <InputText id="email" {...register("email")} />
//                             <label htmlFor="email">Email</label>
//                         </span>
//                     </div>
//                     <Button type="submit" label="Submit" className="p-button-success" />
//                 </form>
//                 <Button label="Have an account? Log in" className="navigate-link" onClick={() => navigate('../login', { state: state })} />
//             </Dialog>
//         </>
//     );
// };

// export default Signup;

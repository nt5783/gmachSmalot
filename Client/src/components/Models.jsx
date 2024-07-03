import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import 'react-calendar/dist/Calendar.css'
import { fetchNoParamsfunc } from '../fetch'
import { UserContext, DateContext } from '../App'
import AddModel from './AddModel'

function Models() {
    const navigate = useNavigate()
    const { user } = useContext(UserContext)
    const { date, setDate } = useContext(DateContext)
    const [models, setModels] = useState([])
    const [addModelForm, setAddModelForm] = useState(false)
    const { state } = useLocation();
    let eventDate = new Date(date)
    //? date.value : null;

    useEffect(() => {
        console.log('date')
        console.log(date)
        console.log('eventDate')
        console.log(eventDate)
        async function getData() {
            eventDate ? console.log(true) : console.log(false)
            const res = eventDate ? fetchNoParamsfunc(`models?date=${eventDate}`, 'GET') : fetchNoParamsfunc(`models`, 'GET')
            const data = await res;
            if (data.length > 0)
                setModels(data)
        }
        getData()
    }, [state])

    console.log('user')
    console.log(user)

    console.log('models')
    console.log(models)


    return (<>
        {user && user.isManager == 1 && <button onClick={() => setAddModelForm(prev => !prev)}>add new model</button>}
        {addModelForm && <AddModel formOn={setAddModelForm} />}
        {eventDate != null ? <div>the models with gowns available for your event:
            {eventDate.getDate()}/{eventDate.getMonth()}/{eventDate.getFullYear()}
            <a className='no_background' href='./eventCalendar'> change date</a> or
            <a href="#" onClick={(event) => {event.preventDefault;setDate(null);eventDate = null}}>clear date</a>
            </div>
            : <><div className='warning'>pay attention that the gown may not be available for the date of your event.</div>
                <div className='warning'>to view only models with gowns available for the date of your event <a className='no_background' href='./eventCalendar'>pick a date here</a></div></>}
        
        {models.length > 0 && <div className='filter_by'>

        </div>}

        <div className='models_container'>
            {models.length > 0 && models.map((model, i) => {
                return <div className='model_item' key={i} onClick={() => navigate(`./${model.model}`, { state: { model: model, eventDate: eventDate } })}>
                    {model.model}<br />
                    <img height={400} src={model.image} />
                </div>
            })}
        </div>
    </>)
}
export default Models


// import React, { useState, useEffect, useContext } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { Button, Typography, Container, Grid, Card, CardContent, CardActions } from '@mui/material';
// import 'react-calendar/dist/Calendar.css';
// import { fetchNoParamsfunc } from '../fetch';
// import { UserContext } from '../App';
// import AddModel from './AddModel';

// function Models() {
//     const navigate = useNavigate();
//     const { user } = useContext(UserContext);
//     const [models, setModels] = useState([]);
//     const [addModelForm, setAddModelForm] = useState(false);
//     const { state } = useLocation();
//     const eventDate = state ? state.value : null;

//     useEffect(() => {
//         async function getData() {
//             eventDate ? console.log(true) : console.log(false);
//             const res = eventDate ? fetchNoParamsfunc(`models?date=${eventDate}`, 'GET') : fetchNoParamsfunc(`models`, 'GET');
//             const data = await res;
//             if (data.length > 0)
//                 setModels(data);
//         }
//         getData();
//     }, [state]);

//     console.log('user');
//     console.log(user);

//     console.log('models');
//     console.log(models);

//     const handleAddModelClick = () => {
//         setAddModelForm(prev => !prev);
//     };

//     return (
//         <>
//             {user && user.isManager === 1 && (
//                 <Button variant="contained" onClick={handleAddModelClick}>Add New Model</Button>
//             )}
//             {addModelForm && <AddModel formOn={setAddModelForm} />}
//             {eventDate != null ? (
//                 <Typography variant="body1">
//                     Models with gowns available for your event: {eventDate.getDate()}/{eventDate.getMonth()}/{eventDate.getFullYear()}
//                     <a className='no_background' href='./eventCalendar'> Change Date</a>
//                 </Typography>
//             ) : (
//                 <>
//                     <Typography variant="body1">Pay attention that the gown may not be available for the date of your event.</Typography>
//                     <Typography variant="body1">
//                         To view only models with gowns available for the date of your event{' '}
//                         <a className='no_background' href='./eventCalendar'>pick a date here</a>
//                     </Typography>
//                 </>
//             )}
//             {models.length > 0 && (
//                 <Container maxWidth="lg" className='filter_by'>
//                     <Typography variant="h5">Filter By:</Typography>
//                     {/* Add your filter options here */}
//                 </Container>
//             )}
//             <Container maxWidth="lg" className='models_container'>
//                 <Grid container spacing={3}>
//                     {models.map((model, i) => (
//                         <Grid item xs={12} sm={6} md={4} key={i}>
//                             <Card onClick={() => navigate(`./${model.model}`, { state: { model: model, eventDate: eventDate } })}>
//                                 <CardContent>
//                                     <Typography variant="h6">{model.model}</Typography>
//                                     <img height={400} src={model.image} alt={model.model} />
//                                 </CardContent>
//                                 <CardActions>
//                                     <Button variant="contained" color="primary">View Details</Button>
//                                 </CardActions>
//                             </Card>
//                         </Grid>
//                     ))}
//                 </Grid>
//             </Container>
//         </>
//     );
// }

// export default Models;

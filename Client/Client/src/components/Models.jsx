import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import 'react-calendar/dist/Calendar.css'
import { fetchNoParamsfunc } from '../fetch'
import { UserContext } from '../App'
import AddModel from './AddModel'

function Models() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext)
    const [models, setModels] = useState([])
    const [addModelForm, setAddModelForm] = useState(false)
    const { state } = useLocation();
    const eventDate = state ? state.value : null;

    useEffect(() => {
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
        {eventDate != null ? <div>the models with gowns available for your event: {eventDate.getDate()}/{eventDate.getMonth()}/{eventDate.getFullYear()}
            <a className='no_background' href='./eventCalendar'> change date</a></div>
            : <><div>pay attention that the gown may not be available for the date of your event.</div>
                <div>to view only models with gowns available for the date of your event <a className='no_background' href='./eventCalendar'>pick a date here</a></div></>}
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
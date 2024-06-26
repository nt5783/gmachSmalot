import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useForm } from "react-hook-form"
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { fetchNoParamsfunc, fetchImg } from '../fetch'

function Models() {
    const navigate = useNavigate();
    const [models, setModels] = useState([])
    const { state } = useLocation();
    const eventDate = state ? state.value : null;
    useEffect(() => {
        async function getData() {
            //ואם המודל בלי תאריך?
            const res = eventDate ? fetchNoParamsfunc(`models?date=${eventDate}`, 'GET') : fetchNoParamsfunc(`models`, 'GET')
            const data = await res;
            if (data.length > 0) {
                setModels(data)
            }
        }
        getData()
    }, [])

    return (<>
        {models.length > 0 && <div className='filter_by'>

        </div>}
        <div className='models_container'>
            {models.length > 0 && models.map((model, i) => {
                return <div className='model_item' key={i} onClick={() => navigate(`./${model.model}`, { state: { model: model, eventDate: eventDate } })}>
                    {model.model}<br />
                    <img height={400} src={model.womenImage} />
                </div>
            })}
        </div>
        {/* {img.length > 0 && <h2>img!!</h2>} */}

    </>)
}
export default Models
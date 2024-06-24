import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from "react-hook-form";
// import { AppContext } from "../App";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { fetchNoParamsfunc, fetchImg } from '../fetch'

function Models() {
    const navigate = useNavigate();
    const [models, setModels] = useState([])
    const { state } = useLocation();
    const eventDate = state.value;
    console.log(eventDate)
    useEffect(() => {
        async function getData() {
            console.log('useEffect')
            //ואם המודל בלי תאריך?
            const res = fetchNoParamsfunc(`models?date=${eventDate}`, 'GET')
            const data = await res;
            if (data.length > 0) {
                setModels(data)
            }
        }
        getData()
        console.log('models')
        console.log(models)
        console.log('state')
        console.log(state)
        // console.log("models")
        // console.log(models)
    }, [])

    // useEffect(() => {
    //   async function getMoreData() {
    //     console.log('useEffect2')
    //     let m, image;
    //     for (let i = 0; i < models.length; i++) {
    //       m = models[i].model
    //       console.log('m')
    //       console.log(m)
    //       const imageBlob = await fetchImg(m)
    //       console.log('image')
    //       console.log(image)
    //       // const imageBlob = await res.blob();
    //       const imageObjectURL = URL.createObjectURL(imageBlob);
    //       setImg(imageObjectURL);
    //     }
    //     // models.map((model) => fetchImg(model.model), setImg([...img]))

    //     // const res = fetchNoParamsfunc('models', 'GET', setModels)
    //     // const data = await res;
    //     // console.log("res")
    //     // console.log(res)
    //   }

    //   if (models.length != 0) {
    //     getMoreData()
    //   }

    // }, [models])


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
export default Models;
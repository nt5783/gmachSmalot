import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import { fetchNoParamsfunc } from '../fetch';
import { UserContext, DateContext } from '../App';
import AddModel from './AddModel';
import trash from '../icons/trash.png'

import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Card } from 'primereact/card';
import { Panel } from 'primereact/panel';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


function Models() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const { date, setDate } = useContext(DateContext);
    const [models, setModels] = useState([]);
    const [addModelForm, setAddModelForm] = useState(false);
    const newDate = date? new Date(date): null;
    const [ eventDate, setEventDate] = useState(newDate);

    async function getData() {
        const res = date ? fetchNoParamsfunc(`models?date=${eventDate}`, 'GET') : fetchNoParamsfunc(`models`, 'GET');
        const data = await res;
        if (data.length > 0) setModels(data);
    }

    useEffect(() => {
        getData();
    }, [date]);

    function handleClearDate() {
        setDate(null);
        setEventDate(null)
        localStorage.removeItem('date')
        if (user) localStorage.removeItem(`date${user.username}`)
    }

    async function deleteModel(model) {
        if (confirm('Are you sure you want to delete this model from the database?')) {
            try {
                //לבדוק שמשפיע בצורה נכונה
                fetchNoParamsfunc(`models/${model}`, 'DELETE')
            } catch (e) { alert(e) }
        }
    }

    const itemTemplate = (model) => {
        return (
            // onMouseOver={}
            <Card className='model_item' onClick={() => navigate(`./${model.model}`, { state: { model: model, eventDate: eventDate } })}>
                {user && user.isManager === 1 && <img onClick={() => deleteModel(model.model)} src={trash} />}
                <h3>{model.model}</h3>
                <img height={400} src={model.image} alt={model.model} />
            </Card>
        );
    };


    return (
        <div className="models-page">
            {user && user.isManager === 1 && (
                <Button label="Add New Model" icon="pi pi-plus" onClick={() => setAddModelForm(prev => !prev)} />
            )}
            {addModelForm && <AddModel formOn={setAddModelForm} />}
            <Panel header="Models" className="models-panel">
                {date != null ? (
                    <div className="event-info">
                        <p>The models with gowns available for your event: <b>{eventDate.getDate()}/{eventDate.getMonth() + 1}/{eventDate.getFullYear()}. </b>
                        <a className="no-background" href="./eventCalendar">Change date</a> or <a href="#" onClick={() => handleClearDate()}> clear date</a></p>
                    </div>
                ) : (
                    <>
                        <div className="warning">Pay attention that the gown may not be available for the date of your event.
                        <br />To view only models with gowns available for the date of your event <a className="no-background" href="./eventCalendar">pick a date here</a></div>
                    </>
                )}
                {models.length > 0 && <div className="filter-by"></div>}
                <DataView value={models} itemTemplate={itemTemplate} layout="grid" />
            </Panel>
        </div>
    );
}

export default Models;


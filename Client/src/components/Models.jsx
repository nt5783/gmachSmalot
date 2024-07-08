import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import { fetchNoParamsfunc } from '../fetch';
import { UserContext, DateContext } from '../App';
import AddUpdateModel from './AddUpdateModel';
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
    //לאחד את השניים הבאים
    const [addUpdateModelForm, setAddUpdateModelForm] = useState(null);
    const newDate = date ? new Date(date) : null;
    const [eventDate, setEventDate] = useState(newDate);

    async function getModels() {
        const res = date ? fetchNoParamsfunc(`models?date=${eventDate}`, 'GET') : fetchNoParamsfunc(`models`, 'GET');
        const data = await res;
        if (data.length > 0) setModels(data);
    }

    useEffect(() => {
        getModels();
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
                const index = models.findIndex(m => m.model === model);
                setModels((prev) => [...prev.slice(0, index), ...prev.slice(index + 1, prev.length)])
                alert(`model ${model} deleted successfully`)
            } catch (e) { alert(e) }
        }
    }

    const itemTemplate = (model) => {
        const [showModelDetails, setShowModelDetails] = useState(null);

        return (
            <Card className='model_item' onMouseOut={() => setShowModelDetails(null)} onMouseOver={() => setShowModelDetails(model.model)} onClick={() => navigate(`./${model.model}`, { state: { model: model } })}>
                {user && user.isManager === 1 && <img onClick={(event) => { event.stopPropagation(); deleteModel(model.model) }} src={trash} />}
                <h3>{model.model}</h3>
                <img height={400} src={model.image} alt={model.model} />
                <div>
                    {showModelDetails == model.model && <span>color: {model.color}, season: {model.season}</span>}
                </div>
            </Card>
        );
    };

    function modelsHeader() {
        return (
            <div className='models-header'>
                <span>Models </span>
                {user && user.isManager === 1 && (
                    <div>
                        <Button label="Add New Model" icon="pi pi-plus" onClick={() => setAddUpdateModelForm(prev => prev === 'add' ? '' : 'add')} />
                        <Button label="Update Model" icon="pi pi-pen-to-square" onClick={() => setAddUpdateModelForm(prev => prev === 'update' ? '' : 'update')} />
                    </div>)}
            </div>
        )
    }

    return (
        <div className="models-page">
            {console.log("models")}
            {console.log(models)}
            {addUpdateModelForm && <AddUpdateModel formOn={setAddUpdateModelForm} getModels={getModels} models={models} action={addUpdateModelForm} />}
            <Panel header={modelsHeader}
                className="models-panel">
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
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import { fetchNoParamsfunc } from '../fetch';
import { UserContext, DateContext, FavoritesContext } from '../App';
import AddModel from './AddModel';
import UpdateModel from './UpdateModel';

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
    const { favorites, setFavorites } = useContext(FavoritesContext);
    const { date, setDate } = useContext(DateContext);
    const [models, setModels] = useState([]);
    const [addUpdateModelForm, setAddUpdateModelForm] = useState(null);
    const newDate = date ? new Date(date) : null;
    const [eventDate, setEventDate] = useState(newDate);

    console.log("favorites", favorites)

    async function getModels() {
        try {
            const res = date ? fetchNoParamsfunc(`models?date=${eventDate}`, 'GET') : fetchNoParamsfunc(`models`, 'GET');
            const data = await res;
            if (data && data.length > 0) setModels(data);
        } catch (err) {
            if (err.status != 404)
                alert(`Error getting models: ${err.message}`)
        }
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
                fetchNoParamsfunc(`models/${model}`, 'DELETE')
                const index = models.findIndex(m => m.model === model);
                setModels((prev) => [...prev.slice(0, index), ...prev.slice(index + 1, prev.length)])
                alert(`model ${model} deleted successfully\n from now on, this model will not be viewed`)
            } catch (err) {
                alert(`Error deleting model: ${err.message}`)
            }
        }
    }

    function addToFavorites(model) {
        setFavorites((prev) => [...prev, model])
    }

    function removeFromFavorites(model) {
        setFavorites((prev) => prev.filter(m => m != model))
    }

    const itemTemplate = (model) => {
        const [showModelDetails, setShowModelDetails] = useState(null);

        return (
            <Card className='model_item' onMouseOut={() => setShowModelDetails(null)} onMouseOver={() => setShowModelDetails(model.model)} onClick={() => navigate(`./${model.model}`)}>
                <div className='model-icons'>
                    {/* {user && user.isManager === 1 && <span onClick={(event) => { event.stopPropagation(); deleteModel(model.model) }} className="pi pi-trash manager-button" />} */}
                    {user && user.isManager === 1 && <Button className='manager-button' icon="pi pi-trash" onClick={(event) => { event.stopPropagation(); deleteModel(model.model) }} />}
                    {user && user.isManager === 1 && <Button className='manager-button' icon="pi pi-pen-to-square" onClick={(event) => { event.stopPropagation(); setAddUpdateModelForm(model) }} />}
                    {user && !favorites.includes(model.model) && <span className='pi pi-star' onClick={(event) => { event.stopPropagation(); addToFavorites(model.model) }} />}
                    {user && favorites.includes(model.model) && <span className='pi pi-star-fill' onClick={(event) => { event.stopPropagation(); removeFromFavorites(model.model) }} />}
                </div>
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
                <div>Models</div>
                {user && user.isManager === 1 && (
                    <div className='manager-model-options'>
                        <Button className='manager-button' label="Add New Model" icon="pi pi-plus" onClick={() => setAddUpdateModelForm(0)} />
                    </div>)}
            </div>
        )
    }

    return (
        <div className="models-page">
            {console.log("models")}
            {console.log(models)}
            {(addUpdateModelForm && addUpdateModelForm != 0) && <UpdateModel formOn={setAddUpdateModelForm} getModels={getModels} selectedModel={addUpdateModelForm} />}
            {addUpdateModelForm === 0 && <AddModel formOn={setAddUpdateModelForm} getModels={getModels} />}
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
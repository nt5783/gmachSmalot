import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { fetchfunc, fetchNoParamsfunc } from "../fetch";
import Dropzone from 'react-dropzone-uploader';
import { Dialog } from "primereact/dialog";
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Message } from 'primereact/message';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default function AddModel({ formOn, getModels, models, action }) {
    const [additional, setAdditional] = useState('');
    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm();
    const [colors, setColors] = useState([]);
    const [seasons, setSeasons] = useState([]);
    const [lengths, setLengths] = useState([]);
    const [imageData, setImageData] = useState(null);

    const itemsMap = {
        colors: { items: colors, setItems: setColors },
        seasons: { items: seasons, setItems: setSeasons },
        lengths: { items: lengths, setItems: setLengths },
    };

    async function getData(table, setfunc) {
        const res = fetchNoParamsfunc(table, 'GET');
        const data = await res;
        if (data.length > 0) setfunc(data);
    }

    useEffect(() => {
        getData('colors', setColors);
        getData('seasons', setSeasons);
        getData('lengths', setLengths);
    }, []);

    async function addModel(data) {
        let formData;
        if (!imageData) formData = { ...data, image: null };
        else formData = { ...data, image: imageData.name };
        console.log(formData);
        formOn(null);
        try {
            await fetchfunc('models', 'POST', formData);
            await getModels();
        } catch (error) { alert('Error adding model: ', error); }
    }
    //לא עובד בגלל שכתוב צבע בלי אי די, להפוך שכן יהיה כתוב
    async function updateModel(data) {
        let formData;
        if (!imageData) formData = { ...data, image: null };
        else formData = { ...data, image: imageData.name };
        let notNullFormData = Object.fromEntries(Object.entries(formData).filter(([_, v]) => v != null && v != undefined));
        console.log(notNullFormData);
        const model = notNullFormData.model;
        delete notNullFormData.model
        formOn(null);
        try {
            await fetchfunc(`models/${model}`, 'PATCH', notNullFormData);
            await getModels();
        } catch (error) { alert('Error adding model: ', error); }
    }

    async function addItem(event, itemType) {
        event.preventDefault();
        const newItem = event.target[0].value.trim();
        const itemTypeKey = itemType.slice(0, -1);
        const { items, setItems } = itemsMap[itemType] || {};

        if (!items) {
            console.error(`Invalid itemType: ${itemType}`);
            return;
        }

        if (newItem && !items.find((item) => item[itemTypeKey] === newItem)) {
            try {
                await fetchfunc(itemType, 'POST', { [itemTypeKey]: newItem });
                await getData(itemType, setItems);
            } catch (error) { alert(`Error adding ${itemType}: `, error); }
        }
        setAdditional('');
    }

    const getUploadParams = ({ meta }) => {
        return { url: 'http://localhost:8080/upload' };
    };

    const handleChangeStatus = ({ meta, file }, status) => {
        if (status === 'done') {
            setImageData({ name: meta.name, type: meta.type });
            setValue('image', meta.name);
        } else if (status === 'removed') {
            setImageData(null);
            setValue('image', '');
        }
    };

    const renderAdditionalDialog = (type) => {
        return (
            <Dialog visible={true} onHide={() => setAdditional('')}>
                <form onSubmit={(e) => addItem(e, type)}>
                    <label htmlFor={type}>{type.charAt(0).toUpperCase() + type.slice(1, -1)} Name:</label>
                    <InputText name={type} type="text" required />
                    <Button type="submit" label="Add" />
                </form>
            </Dialog>
        );
    };

    return (
        <>
            <Dialog visible={true} onHide={() => formOn(false)} header={action == 'add' ? 'Add New Model' : 'Update Model'}>
                <form onSubmit={handleSubmit((data) => action == 'add' ? addModel(data) : updateModel(data))} className="add-model-form">
                    <label>Model:
                        {action == 'add' && <Controller
                            name="model"
                            control={control}
                            render={({ field }) => (
                                <InputNumber value={field.value} onChange={(e) => field.onChange(e.value)} required />
                            )}
                        />}
                        {action == 'update' && <Controller
                            name="model"
                            control={control}
                            render={({ field }) => (
                                <Dropdown
                                    value={field.value}
                                    options={models.map((model) => ({ label: model.model, value: model.model }))}
                                    placeholder="Select a Model"
                                    onChange={(e) => field.onChange(e.value)}
                                    required
                                />
                                // {<input type="hidden" value={field.value || ''} required />}
                            )}
                        />}
                    </label>
                    <br />
                    {/* <div className="p-field"> */}
                    <label>Color:
                        <Controller
                            name="colorId"
                            control={control}
                            // rules={{ required: action === 'add' ? 'This field is required' : false }}
                            render={({ field }) => (
                                <>
                                    <Dropdown
                                        value={field.value}
                                        options={colors.map((color) => ({ label: color.color, value: color.colorId }))}
                                        placeholder="Select a Color"
                                        // placeholder={colors[1].color}
                                        onChange={(e) => field.onChange(e.value)}
                                    // defaultValue='pink'
                                    // aria-required={action === 'add'}
                                    />
                                    {/* {action === 'add' && <input type="hidden" value={field.value || ''} required />} */}
                                </>)}
                        />
                    </label>
                    {/* {errors.color && <Message severity="error" text={errors.color.message} />} */}
                    {/* </div> */}
                    <Button type="button" label="Add Color" onClick={() => setAdditional(prev => prev === 'colors' ? '' : 'colors')} />
                    <br />

                    <label>Season:
                        <Controller
                            name="seasonId"
                            control={control}
                            // rules={{ required: action === 'add' ? 'This field is required' : false }}
                            render={({ field }) => (
                                <>
                                    <Dropdown
                                        value={field.value}
                                        options={seasons.map((season) => ({ label: season.season, value: season.seasonId }))}
                                        placeholder="Select a Season"
                                        onChange={(e) => field.onChange(e.value)}
                                    // aria-required={action === 'add'}
                                    />
                                    {/* {action === 'add' && <input type="hidden" value={field.value || ''} required />} */}
                                </>
                            )}
                        />
                    </label>
                    <Button type="button" label="Add Season" onClick={() => setAdditional(prev => prev === 'seasons' ? '' : 'seasons')} />
                    <br />

                    <label>Length:
                        <Controller
                            name="lengthId"
                            control={control}
                            // rules={{ required: action === 'add' ? 'This field is required' : false }}
                            render={({ field }) => (
                                <>
                                    <Dropdown
                                        value={field.value}
                                        options={lengths.map((length) => ({ label: length.length, value: length.lengthId }))}
                                        placeholder="Select a Length"
                                        onChange={(e) => field.onChange(e.value)}
                                    // aria-required={action === 'add'}
                                    />
                                    {/* {action === 'add' && <input type="hidden" value={field.value || ''} required />} */}
                                </>
                            )}
                        />
                    </label>
                    <Button type="button" label="Add Length" onClick={() => setAdditional(prev => prev === 'lengths' ? '' : 'lengths')} />
                    <br />

                    <label>Image:
                        <Dropzone
                            getUploadParams={getUploadParams}
                            onChangeStatus={handleChangeStatus}
                            accept="image/*"
                            maxFiles={1}
                            styles={{
                                dropzone: { width: 400, height: 200, border: '2px dashed #007bff', borderRadius: '5px' },
                                dropzoneActive: { borderColor: 'green' },
                            }} />
                    </label>
                    <br />

                    {action === 'add' && <Button type="submit" label="Add Model" />}
                    {action === 'update' && <Button type="submit" label="update Model" />}
                </form>
            </Dialog>

            {additional === 'colors' && renderAdditionalDialog('colors')}
            {additional === 'seasons' && renderAdditionalDialog('seasons')}
            {additional === 'lengths' && renderAdditionalDialog('lengths')}
        </>
    );
}

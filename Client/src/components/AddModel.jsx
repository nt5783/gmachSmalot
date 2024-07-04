import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { fetchfunc, fetchNoParamsfunc } from "../fetch";
import Dropzone from 'react-dropzone-uploader';
import { Dialog } from "primereact/dialog";
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


export default function AddModel({ formOn, setMessage }) {
    const [additional, setAdditional] = useState('');
    const { register, handleSubmit, setValue } = useForm();
    const [colors, setColors] = useState([]);
    const [seasons, setSeasons] = useState([]);
    const [lengths, setLengths] = useState([]);
    const [imageData, setImageData] = useState(null);

    async function getData(table, setfunc) {
        const res = fetchNoParamsfunc(table, 'GET');
        const data = await res;
        if (data.length > 0)
            setfunc(data);
    }

    useEffect(() => {
        getData('colors', setColors);
        getData('seasons', setSeasons);
        getData('lengths', setLengths);
    }, []);

    function addModel(data) {
        let formData;
        if (!imageData)
            formData = { ...data, image: null };
        else
            formData = { ...data, image: imageData.name };
        console.log(formData);
        // setMessage("adding model code " + data.model + " color: " + data.color + " for " + data.season)
        formOn(false);
        try {
            fetchfunc('models', 'POST', formData);
        } catch (e) { alert(e) }
    }

    async function addLength(event) {
        event.preventDefault();
        const newLength = event.target[0].value.trim();
        if (newLength && !lengths.find((length) => length.length === newLength)) {
            try {
                await fetchfunc('lengths', 'POST', { length: newLength });
                await getData('lengths', setLengths);
            } catch (error) { alert('Error adding length:', error) }
        }
        setAdditional('');
    }

    async function addColor(event) {
        event.preventDefault();
        const newColor = event.target[0].value.trim();
        if (newColor && !colors.find((color) => color.color === newColor)) {
            try {
                await fetchfunc('colors', 'POST', { color: newColor });
                await getData('colors', setColors);
            } catch (error) { alert('Error adding color:', error) }
        }
        setAdditional('');
    }

    async function addSeason(event) {
        event.preventDefault();
        const newSeason = event.target[0].value.trim();
        if (newSeason && !seasons.find((season) => season.season === newSeason)) {
            try {
                await fetchfunc('seasons', 'POST', { season: newSeason });
                await getData('seasons', setSeasons);
            } catch (error) { alert('Error adding season:', error) }
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

    return (
        <>
            <Dialog visible={true} onHide={() => formOn(false)}>
                <form onSubmit={handleSubmit((data) => addModel(data))} className="add-model-form">
                    {/* אפשר לעשות כיתוב במודל? */}
                    <label>Model:
                        <InputText type="number" name="model" required {...register("model")} />
                    </label>
                    <br />

                    <label>Color:
                        <Dropdown name="color" options={colors.map((color) => ({ label: color.color, value: color.colorId }))}
                            placeholder="Select a Color" {...register("color")} />
                    </label>
                    <Button label="Add Color" onClick={() => setAdditional(prev => prev === 'colors' ? '' : 'colors')} />
                    <br />

                    <label>Season:
                        <Dropdown name="season" options={seasons.map((season) => ({ label: season.season, value: season.seasonId }))}
                            placeholder="Select a Season" {...register("season")} />
                    </label>
                    <Button label="Add Season" onClick={() => setAdditional(prev => prev === 'seasons' ? '' : 'seasons')} />
                    <br />

                    <label>Length:
                        <Dropdown name="length" options={lengths.map((length) => ({ label: length.length, value: length.lengthId }))}
                            placeholder="Select a Length" {...register("length")} />
                    </label>
                    <Button label="Add Length" onClick={() => setAdditional(prev => prev === 'lengths' ? '' : 'lengths')} />
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

                    <Button type="submit" label="Add Model" />
                </form>
            </Dialog >
                        {/* שכל הטפסים יהיו אחד */}

            {additional === 'colors' && (
                <Dialog visible={true} onHide={() => setAdditional('')}>
                    <form onSubmit={addColor}>
                        <label htmlFor='color'>Color Name:</label>
                        <InputText name='color' type='text' required />
                        <Button type="submit" label="Add" />
                    </form>
                </Dialog>
            )}

            {additional === 'seasons' && (
                <Dialog visible={true} onHide={() => setAdditional('')}>
                    <form onSubmit={addSeason}>
                        <label htmlFor='season'>Season Name:</label>
                        <InputText name='season' type='text' required />
                        <Button type="submit" label="Add" />
                    </form>
                </Dialog>
            )}

            {additional === 'lengths' && (
                <Dialog visible={true} onHide={() => setAdditional('')}>
                    <form onSubmit={addLength}>
                        <label htmlFor='length'>Length:</label>
                        <InputText name='length' type='text' required />
                        <Button type="submit" label="Add" />
                    </form>
                </Dialog>
            )}
        </>
    );
}


















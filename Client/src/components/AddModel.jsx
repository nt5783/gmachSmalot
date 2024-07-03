import React from "react"
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { fetchfunc, fetchNoParamsfunc } from "../fetch"
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'

export default function AddModel({ formOn, setMessage }) {
    const [additional, setAdditional] = useState('')
    const { register, handleSubmit, setValue } = useForm()
    const [colors, setColors] = useState([])
    const [seasons, setSeasons] = useState([])
    const [lengths, setLengths] = useState([])
    const [imageData, setImageData] = useState(null);

    async function getData(table, setfunc) {
        const res = fetchNoParamsfunc(table, 'GET');
        const data = await res;
        if (data.length > 0)
            setfunc(data)
    }

    useEffect(() => {
        getData('colors', setColors)
        getData('seasons', setSeasons)
        getData('lengths', setLengths)
    }, [])

    function addModel(data) {
        let formData;
        if (!imageData)
            formData = { ...data, image: null, };
        else
            formData = { ...data, image: imageData.name, };
        console.log(formData)
        // setMessage("adding model code " + data.model + " color: " + data.color + " for " + data.season)
        formOn(false)
        let res = fetchfunc('models', 'POST', formData)
    }

    async function addLength(event) {
        event.preventDefault();
        const newLength = event.target[0].value.trim();
        if (newLength && !lengths.find((length) => length.length === newLength)) {
            // //להוסיף בדיקה שעבד
            try {
                await fetchfunc('lengths', 'POST', { length: newLength });
                await getData('lengths', setLengths);
            } catch (error) { alert('Error adding length:', error) }
        }
        setAdditional('')
    }

    async function addColor(event) {
        event.preventDefault();
        const newColor = event.target[0].value.trim();
        if (newColor && !colors.find((color) => color.color === newColor)) {
            try {
                await fetchfunc('colors', 'POST', { color: newColor })
                await getData('colors', setColors)
            } catch (error) { alert('Error adding color:', error) }
        }
        //להוסיף בדיקה שעבד
        setAdditional('')
    }

    async function addSeason(event) {
        event.preventDefault();
        const newSeason = event.target[0].value.trim();
        if (newSeason && !seasons.find((season) => season.season === newSeason)) {
            try {
                await fetchfunc('seasons', 'POST', { season: newSeason })
                await getData('seasons', setSeasons)
            } catch (error) { alert('Error adding season:', error) }
        }
        setAdditional('')
    }

    const getUploadParams = ({ meta }) => {
        return { url: 'http://localhost:8080/upload' };
    };

    const handleChangeStatus = ({ meta, file }, status) => {
        console.log("status")
        console.log(status)
        if (status === 'done') {
            setImageData({ name: meta.name, type: meta.type });
            setValue('image', meta.name);
        } else if (status === 'removed') {
            setImageData(null);
            setValue('image', '');
        }
    };

    // const imgHandleSubmit = (files, allFiles) => {
    //     console.log(files.map(f => f.meta));
    //     allFiles.forEach(f => f.remove());
    // };

    return (<>
        <form onSubmit={handleSubmit((data => addModel(data)))}>
            <label>Model:<input className='number_without' type="number" name="model" required {...register("model")} /></label><br />

            <label>Color:
                <select name="color" required {...register("color")}>
                    <option disabled selected></option>
                    {colors.map((color, i) => <option key={i} value={color.colorId}>{color.color}</option>)}
                </select></label>
            <br />

            <label>Season:<select name="season" required {...register("season")}>
                <option disabled selected></option>
                {seasons.map((season, i) => <option key={i} value={season.seasonId}>{season.season}</option>)}
            </select></label><br />
            <label>

                <label>Length:<select name="length" required {...register("length")}>
                    <option disabled selected></option>
                    {lengths.map((length, i) => <option key={i} value={length.lengthId}>{length.length}</option>)}
                </select></label><br />

                Image:
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

            <input type="button" value="Cancel" onClick={() => formOn(false)} />
            <input type="submit" value="Add Model" /><br />
        </form>

        {/* שכל הטפסים יהיו אחד */}
        <button onClick={() => setAdditional(prev => prev == 'colors' ? '' : 'colors')}>add color</button>
        {additional == 'colors' && <form onSubmit={addColor}>
            <label htmlFor='color' >color name:</label>
            <input name='color' type='text' required></input>
            <button type="submit">Add</button>
        </form>}

        <button onClick={() => setAdditional(prev => prev == 'seasons' ? '' : 'seasons')}>add season</button>
        {additional == 'seasons' && <form onSubmit={addSeason}>
            <label htmlFor='season' >season name:</label>
            <input name='season' type='text' required></input>
            <button type="submit">Add</button>
        </form>}

        <button onClick={() => setAdditional(prev => prev == 'lengths' ? '' : 'lengths')}>add length</button>
        {additional == 'lengths' && <form onSubmit={addLength}>
            <label htmlFor='length' >length:</label>
            <input name='length' type='text' required></input>
            <button type="submit">Add</button>
        </form>}
    </>)
}
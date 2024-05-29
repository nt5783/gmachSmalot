import React, { useEffect, useContext } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
// import { AppContext } from "../App";

const colors = ['white', 'beige', 'black', 'colorful', 'brown', 'pink', 'blue', 'lightBlue', 'green', 'purple', 'silver']
const lengths = ['maxi', 'midi', 'short']
const seasons = ['summer', 'winter', 'yearRound']
const sizeBaby = ['3m', '6m', '9m', '12m', '18m', '24m']
const sizeGirl = ['2']
const sizeWoman = ['32', '34']

function Manager() {
    const [additional, setAdditional] = useState('')
    const { register, handleSubmit } = useForm();

    <select name="cars" id="cars">
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
    </select>

    function addGownFunc(data) {
        setAdditional('')
        console.log(data)

    }

    const handleChange = (event) => {
        event.preventDefault()
        switch (event.target.value) {
            case "other": {
                setAdditional("addColor")
                break;
            }
            default:
                return
        }
    }
        // specify upload params and url for your files
        const getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } }

        // called every time a file's `status` changes
        const handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }

        // receives array of files that are done uploading when submit button is clicked
        const handleSubmito = (files) => { console.log(files.map(f => f.meta)) }


        return (<>
            <button onClick={() => setAdditional("add")}>add gown</button>
            <button>search gown</button>

            {(additional == "add" || additional == "addColor") && <form onSubmit={handleSubmit((data => addGownFunc(data)))}>
                <label>Model:<input className='number_without' type="number" name="model" required {...register("model")} /></label><br />
                <label>Color:
                    <select name="color" required {...register("color", { onChange: (e) => handleChange(e) })}>
                        {colors.map((color, i) => <option key={i} value={color}>{color}</option>)}
                        <option value="other">other</option>
                    </select></label>
                {additional == "addColor" && <label>new color:<input id='newColor' type="text" defaultValue="yyy" required {...register("color")} /></label>}
                <br /><label>Size:<select name="length" required {...register("length")}>
                    {lengths.map((length, i) => <option key={i} value={length}>{length}</option>)}</select></label><br />
                <label>Length:<select name="length" required {...register("length")}>
                    {lengths.map((length, i) => <option key={i} value={length}>{length}</option>)}</select></label><br />
                <label>Season:<select name="season" required {...register("season")}>
                    {seasons.map((season, i) => <option key={i} value={season}>{season}</option>)}</select></label><br />
                <label>Amount:<input id='amount' type="number" min="1" name="amount" required {...register("amount")} /></label><br />
                <Dropzone
                    getUploadParams={getUploadParams}
                    onChangeStatus={handleChangeStatus}
                    onSubmit={handleSubmito}
                    accept="image/*"
                />
                <input type="submit" value="Submit" /><br />
            </form>}

        </>)
    }
    export default Manager;
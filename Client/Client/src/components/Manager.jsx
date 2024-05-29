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
const sizeGirl = ['2', '3', '4', '5', '6', '7', '8', '10', '12', '14', '16', '18', '20']
const sizeWoman = ['30', '32', '34', '36', '38', '40', '42', '44', '46', '48', '50', '52']

function Manager() {
    const [additional, setAdditional] = useState('')
    const { register, handleSubmit } = useForm();
    // let img = new img[10]

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
    const handleSubmitDropbox = (files) => {
        console.log(files.map(f => f.meta))
        // files.map((f, i) => {
        //     img[i] = f
        // })
    }


    return (<>
        <button onClick={() => setAdditional("add")}>add gown</button>
        <button>search gown</button>
        {(additional == "add" || additional == "addColor") && <form onSubmit={handleSubmit((data => addGownFunc(data)))}>
            <label>Model:<input className='number_without' type="number" name="model" required {...register("model")} /></label><br />

            <label>Color:
                <select name="color" required {...register("color", { onChange: (e) => handleChange(e) })}>
                    <option disabled selected> -- select an option -- </option>
                    {colors.map((color, i) => <option key={i} value={color}>{color}</option>)}
                    <option value="other">other</option>
                </select></label>
            {additional == "addColor" && <label>new color:<input id='newColor' type="text" required {...register("color")} /></label>}

            <br />
            <label>Size:<select name="size" required {...register("size")}>
                <option disabled selected> -- select an option -- </option>
                {sizeBaby.map((size, i) => <option key={i} value={size}>{size}</option>)}
                {sizeGirl.map((size, i) => <option key={i} value={size}>{size}</option>)}
                {sizeWoman.map((size, i) => <option key={i} value={size}>{size}</option>)}
            </select></label><br />

            <label>Length:<select name="length" defaultValue={'maxi'} required {...register("length")}>
                {lengths.map((length, i) => <option key={i} value={length}>{length}</option>)}</select></label><br />

            <label>Season:<select name="season" defaultValue={'yearRound'} required {...register("season")}>
                {seasons.map((season, i) => <option key={i} value={season}>{season}</option>)}</select></label><br />

            <label>Amount:<input id='amount' type="number" min="1" name="amount" required {...register("amount")} /></label><br />

            <Dropzone getUploadParams={getUploadParams}
                onChangeStatus={handleChangeStatus}
                onSubmit={handleSubmitDropbox}
                accept="image/*,video/*" />

            <input type="submit" value="Submit" /><br />

        </form>}
    </>)
}
export default Manager;
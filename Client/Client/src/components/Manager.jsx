import React, { useEffect, useContext } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import AddModel from './AddModel'
import { fetchfunc } from '../fetch';
// import { AppContext } from "../App";

const lengths = ['maxi', 'midi', 'short']

const sizeBaby = ['6m', '9m', '12m', '18m', '24m']
const sizeGirl = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '10', '12', '14', '16', '18', '20']
const sizeWoman = ['30', '32', '34', '36', '38', '40', '42', '44', '46', '48', '50', '52']

function Manager() {
    const [visible, setVisible] = useState(false)
    const [additional, setAdditional] = useState('')
    const [message, setMessage] = useState('')
    // const [, setAdditional] = useState('')
    // let img = new img[10]

    

    useEffect(() => {
        // CASE 1 :message is empty (meaning no errors). Adjust as needed
        if (!message) {
            setVisible(false)
            return
        }

        //CASE 2: error exists. Display the message and hide after 5 secs

        setVisible(true)
        const timer = setTimeout(() => {
            setVisible(false)
        }, 5000);
        return () => clearTimeout(timer);
    }, [message])

    function addGownFunc(data) {
        setAdditional('')
        console.log(data)
        fetchfunc()
        

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
        {visible && <div style={{background : "green"}}>{message}</div>}
        {additional == "" && <button onClick={() => setAdditional("model")}>Add New Model</button>}
        {additional == "model" && <AddModel formOn={setAdditional} setMessage ={setMessage}/>}
        {additional == "" && <button onClick={() => setAdditional("add")}>add gown</button>}
        {additional == "" && <button>search gown</button>}
        {(additional == "addGown" || additional == "addColor") && <form onSubmit={handleSubmit((data => addGownFunc(data)))}>
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

            {/* <label>The model exists for:
                <br />
                <label><input type="checkbox" value={"women"} {...register("forWoman")} />Women</label><br />
                <label><input type="checkbox" value={"girls"} {...register("forGirl")} />Girls</label><br />
            </label> */}

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
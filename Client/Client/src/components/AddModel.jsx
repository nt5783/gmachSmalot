import React from "react"
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { fetchfunc } from "../fetch"

const colors = ['white', 'beige', 'black', 'colorful', 'brown', 'pink', 'blue', 'lightBlue', 'green', 'purple', 'silver']
const seasons = ['summer', 'winter', 'yearRound']

export default function AddModel({ formOn, message }) {

    const [additional, setAdditional] = useState('')
    const { register, handleSubmit } = useForm()

    function addModelFunc(data) {
        console.log(data)
        formOn('')
        let res = fetchfunc('model', 'POST', data)
        message = res


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

    // // specify upload params and url for your files
    // const getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } }

    // // called every time a file's `status` changes
    // const handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }

    // // receives array of files that are done uploading when submit button is clicked
    // const handleSubmitDropbox = (files) => {
    //     console.log(files.map(f => f.meta))
    //     // files.map((f, i) => {
    //     //     img[i] = f
    //     // })
    // }

    return (<>
        <form onSubmit={handleSubmit((data => addModelFunc(data)))}>
            <label>Model:<input className='number_without' type="number" name="model" required {...register("model")} /></label><br />

            <label>Color:
                <select name="color" required {...register("color", { onChange: (e) => handleChange(e) })}>
                    <option disabled selected></option>
                    {colors.map((color, i) => <option key={i} value={color}>{color}</option>)}
                    <option value="other">other</option>
                </select></label>
            {additional == "addColor" && <label>new color:<input id='newColor' type="text" required {...register("color")} /></label>}
            <br />
            <label>Season:<select name="season" defaultValue={'yearRound'} required {...register("season")}>
                {seasons.map((season, i) => <option key={i} value={season}>{season}</option>)}</select></label><br />

            {/* <Dropzone getUploadParams={getUploadParams}
                onChangeStatus={handleChangeStatus}
                onSubmit={handleSubmitDropbox}
                accept="image/*,video/*" /> */}

            <input type="button" value="Cancel" onClick={() => formOn('')} />
            <input type="submit" value="Add Model" /><br />

        </form>
    </>)
}
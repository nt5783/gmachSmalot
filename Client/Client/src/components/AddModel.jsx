import React from "react"
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { fetchfunc, fetchNoParamsfunc } from "../fetch"

// const colors = ['white', 'beige', 'black', 'colorful', 'brown', 'pink', 'blue', 'lightBlue', 'green', 'purple', 'silver']
const seasons = ['summer', 'winter', 'yearRound']

export default function AddModel({ formOn, setMessage }) {

    const [additional, setAdditional] = useState('')
    const { register, handleSubmit } = useForm()
    const [colors, setColors] = useState([])
    const [seasons, setSeasons] = useState(['s', 'w', 'y'])


    // const onSubmit = (data) => {
    //   console.log(data);
    // };
    async function getData(table, setfunc) {
        const res = fetchNoParamsfunc(table, 'GET');
        const data = await res;
        if (data.length > 0)
            setfunc(data)
    }

    useEffect(() => {
        getData('colors', setColors)
        // getData('seasons', setSeasons)
    }, [])

    function addModelFunc(data) {
        // console.log(data)
        setMessage("adding model code " + data.model + " color: " + data.color + " for " + data.season)
        formOn('')
        let res = fetchfunc('models', 'POST', data)
        // console.log('res')
        // console.log(res)
        // setMessage(res)
    }

    function addColor(event) {
         event.preventDefault();
        fetchfunc('colors','POST', event.target.value)
        setAdditional('')
    }

    // const handleChange = (event) => {
    //     event.preventDefault()
    //     switch (event.target.value) {
    //         case "other": {
    //             setAdditional("addColor")
    //             break;
    //         }
    //         default:
    //             // setAdditional("")
    //             return
    //     }
    // }

    // const handleAddColor = (e) => {
    //     const newColor = e.target.value.trim();
    //     if (newColor && !colors.includes(newColor)) {
    //         setValue('color', newColor);
    //     }
    // };

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
                    {/* <option value="other">other</option> */}
                </select></label>
            {/* {additional == "addColor" && <label>new color:<input id='newColor' type="text" required {...register("color")}/></label>} */}
            <br />
            <label>Season:<select name="season" defaultValue={'yearRound'} required {...register("season")}>
                {seasons.map((season, i) => <option key={i} value={season}>{season}</option>)}</select></label><br />

            {/* <Dropzone getUploadParams={getUploadParams}
                onChangeStatus={handleChangeStatus}
                onSubmit={handleSubmitDropbox}
                accept="image/*,video/*" />*/}

            <input type="button" value="Cancel" onClick={() => formOn('')} />
            <input type="submit" value="Add Model" /><br />
        </form>
        <button onClick={() => setAdditional(prev => prev == 'colors' ? '' : 'colors')}>add color</button>
        {additional == 'colors' && <form onSubmit={addColor}>
            <label htmlFor='color' >color name:</label>
            <input name='color' type='text' required></input>
            <button type="submit">Add</button>
        </form>}


    </>)
}


//  <form onSubmit={handleSubmit(onSubmit)}>
// <label>
//     Model:
//     <input type="number" required {...register('model')} />
// </label>

// <label>
//     Colors:
//     <select
//         {...register('color', { required: true })}
//         onChange={handleAddColor}
//         value={watch('color')}
//     >
//         {colors.map(color => (
//             <option key={color} value={color}>{color}</option>
//         ))}
//         <option value="">Add New Color</option>
//     </select>
// </label>

// <label>
//     Seasons:
//     <select
//         {...register('season', { required: true })}
//         onChange={handleAddSeason}
//         value={watch('season')}
//     >
//         {seasons.map(season => (
//             <option key={season} value={season}>{season}</option>
//         ))}
//         <option value="">Add New Season</option>
//     </select>
// </label>

// <label>
//     Image:
//     {/* Implement Dropzone functionality for image upload using a library like react-dropzone */}
//     {/* Example: <Dropzone {...register('image')} /> */}
//     {/* Remember to handle file upload logic */}
// </label>

// <button type="submit">Submit</button>
// </form>
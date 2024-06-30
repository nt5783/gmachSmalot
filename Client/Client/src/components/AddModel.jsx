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
    }, [])

    function addModelFunc(data) {
        let formData;
        if (!imageData)
            formData = { ...data, image: null, };
        else
            formData = { ...data, image: imageData.name, };
        console.log(formData)
        
        // setMessage("adding model code " + data.model + " color: " + data.color + " for " + data.season)
        // formOn('')
        let res = fetchfunc('models', 'POST', formData)
        // // console.log('res')
        // // console.log(res)
        // // setMessage(res)
    }

    function addColor(event) {
        event.preventDefault();
        const newColor = event.target[0].value;
        if (newColor && !colors.includes(newColor))
            fetchfunc('colors', 'POST', { color: newColor })
        //להוסיף בדיקה שעבד
        setColors(prev => [...prev, newColor])
        setAdditional('')
    }
    //לעשות גם גנרי או לפחות כמו הקודם.trim()
    function addSeason(event) {
        event.preventDefault();
        const newSeason = event.target[0].value;
        if (newSeason && !seasons.includes(newSeason))
            fetchfunc('seasons', 'POST', { season: newSeason })
        //להוסיף בדיקה שעבד
        setSeasons(prev => [...prev, newSeason])
        setAdditional('')
    }

    const getUploadParams = ({ meta }) => {
        return { url: 'http://localhost:8080/upload' };
        // return { url: 'https://httpbin.org/post' };
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
        <form onSubmit={handleSubmit((data => addModelFunc(data)))}>
            <label>Model:<input className='number_without' type="number" name="model" required {...register("model")} /></label><br />
            {/* , { onChange: (e) => handleChange(e) } */}
            <label>Color:
                <select name="color" required {...register("color")}>
                    <option disabled selected></option>
                    {colors.map((color, i) => <option key={i} value={color.colorId}>{color.color}</option>)}
                    {/* <option value="other">other</option> */}
                </select></label>
            {/* {additional == "addColor" && <label>new color:<input id='newColor' type="text" required {...register("color")}/></label>} */}
            <br />
            <label>Season:<select name="season" required {...register("season")}>
                <option disabled selected></option>
                {seasons.map((season, i) => <option key={i} value={season.seasonId}>{season.season}</option>)}
            </select></label><br />
            <label>
                Image:
                <Dropzone
                    getUploadParams={getUploadParams}
                    onChangeStatus={handleChangeStatus}
                    // onSubmit={imgHandleSubmit}
                    accept="image/*"
                    maxFiles={1}
                    // canCancel='false'
                    // canRemove='false'
                    // inputWithFilesContent='Add Files'
                    // PreviewComponent={Preview}
                    styles={{
                        dropzone: { width: 400, height: 200, border: '2px dashed #007bff', borderRadius: '5px' },
                        dropzoneActive: { borderColor: 'green' },
                    }} />
            </label>

            <input type="button" value="Cancel" onClick={() => formOn('')} />
            <input type="submit" value="Add Model" /><br />
        </form>
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
    </>)
}



    // const Preview = ({ meta }) => {
    //     const { name, percent, status, previewUrl } = meta;
    //     console.log("percent")
    //     console.log(percent)
    //     return (
    //         <div className="preview">
    //             <img src={previewUrl} alt={name} style={{ width: '50px' }} />
    //             {/* {status !== 'done' && ()} */}
    //                 <div className="progress-bar">
    //                     <div className="progress" style={{ width: `${percent}%` }}></div>
    //                 </div>

    //             {status === 'done' && <span>✔️</span>}
    //         </div>
    //     );
    // };

    // const Preview = ({ meta }) => {
    //     const { name, percent, status, previewUrl } = meta;
    //     console.log("sta")
    //     console.log(status)
    //     // return (
    //     //     <div className="preview">
    //     //         <img src={previewUrl} alt={name} style={{ width: '50px' }} />
    //     //         {status === 'uploading' && console.log(percent)}
    //     //         {/* {status === 'uploading' && (

    //     //             <div className="progress-bar">
    //     //                 <div className="progress" style={{ width: `${percent}%` }}></div>
    //     //             </div>
    //     //         )} */}
    //     //         {status === 'done' && <span>✔️</span>}
    //     //     </div>
    //     // );
    // };
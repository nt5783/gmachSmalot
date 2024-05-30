import React, { useEffect, useContext } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import AddModel from './AddModel'
import { fetchfunc } from '../fetch';
import AddGown from './AddGown';
// import { AppContext } from "../App";



function Manager() {
    const [additional, setAdditional] = useState('')
    const [message, setMessage] = useState('')
    const [visible, setVisible] = useState(false)
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
        <div>
            {visible && <div style={{ background: "green" }}>{message}</div>}
            {additional == "" && <button onClick={() => setAdditional("model")}>Add New Model</button>}
            {additional == "model" && <AddModel formOn={setAdditional} setMessage={setMessage} />}
            {additional == "" && <button onClick={() => setAdditional("gown")}>Add New Gown</button>}
            {additional == "gown" && <AddGown formOn={setAdditional} setMessage={setMessage} />}
            {additional == "" && <button>search gown</button>}
        </div>
    </>)
}
export default Manager;
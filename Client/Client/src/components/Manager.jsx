import React, { useEffect, useContext } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import 'react-dropzone-uploader/dist/styles.css'
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
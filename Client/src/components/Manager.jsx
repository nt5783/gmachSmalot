import React, { useEffect, useContext } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import 'react-dropzone-uploader/dist/styles.css'
import AddModel from './AddUpdateModel'
import { fetchfunc, fetchNoParamsfunc } from '../fetch';
import AddGown from './AddGown';
import { Button } from 'primereact/button';
// import { AppContext } from "../App";



function Manager() {
    const [additional, setAdditional] = useState('')
    const [message, setMessage] = useState('')
    const [visible, setVisible] = useState(false)
    const [orders, setOrders] = useState([])
    // const [, setAdditional] = useState('')
    // let img = new img[10]


    // useEffect(() => {
    //     showOrders('today');
    // }, [])



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
    //הגבלת גישה
    //לשקול להוסיף להזמנות כמות
    async function showOrders(when) {
        try {
            const res = fetchNoParamsfunc(`orders?${when}`, 'GET')
            const data = await res
            console.log('data')
            if (data.length > 0)
                setOrders(data)
            console.log(data)
        }
        catch (err){
            console.log(err)
        }
    }


    return (<>
        <div>
            {visible && <div style={{ background: "green" }}>{message}</div>}
            {/* {additional == "" && <button onClick={() => setAdditional("model")}>Add New Model</button>} */}
            {/* {additional == "model" && <AddModel formOn={setAdditional} setMessage={setMessage} />} */}
            {/* {additional == "" && <button onClick={() => setAdditional("gown")}>Add New Gown</button>} */}
            {/* {additional == "gown" && <AddGown formOn={setAdditional} setMessage={setMessage} />} */}
            {/* {additional == "" && <button>search gown</button>} */}
            <Button onClick={() => showOrders('today')}>view today's orders</Button>
            <Button onClick={() => showOrders('past')}>view all past orders</Button>
            <Button onClick={() => showOrders('future')}>view all future orders</Button>
            {/* שיראה גם הזמנות ישנות */}
            {/* להוסיף אופציה של מחיקת\עדכון הזמנה- כפתור כזה בעמודה בטבלה */}
            {orders.length > 0 &&
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Date</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Phone 1</th>
                            <th>Phone 2</th>
                            <th>Gown model</th>
                            <th>Gown Size</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, i) => (
                            <tr className='view-order'>
                                <td><button><i className='pi pi-edit'></i>edit</button></td>
                                <td>{new Date(order.eventDate).toISOString().substring(0, 10)}</td>
                                <td>{order.fullName}</td>
                                <td>{order.email}</td>
                                <td>{order.phone}</td>
                                <td>{order.phone2}</td>
                                <td>{order.model}</td>
                                <td>{order.size}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>}
            {/* <p>{orders}</p> */}
        </div>
    </>)
}
export default Manager;
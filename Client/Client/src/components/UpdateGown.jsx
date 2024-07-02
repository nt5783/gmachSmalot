import React from "react"
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { fetchfunc, fetchNoParamsfunc } from "../fetch"

export default function UpdateGown({ gown, formOn }) {
    const { register, handleSubmit } = useForm()
    const [additional, setAdditional] = useState('')
    const [sizes, setSizes] = useState([])

    async function getData(table, setfunc) {
        const res = fetchNoParamsfunc(table, 'GET');
        const data = await res;
        if (data.length > 0)
            setfunc(data)
    }

    useEffect(() => {
        getData('sizes', setSizes)
    }, [])

    async function addSize(event) {
        event.preventDefault();
        const newSize = event.target[0].value.trim();
        if (newSize && !sizes.find((size) => size.size === newSize)) {
            try {
                await fetchfunc('sizes', 'POST', { size: newSize });
                await getData('sizes', setSizes);
            } catch (error) { alert('Error adding size:', error) }
        }
        //להוסיף בדיקה שעבד)
        setAdditional('')
    }


    function updateGown(data) {
        const newGown = { ...data, model: gown.model }
        console.log(newGown)
        // setMessage("adding gown model" + data.model + " ,length: " + data.length + " ,in size " + data.size)
        formOn('')
        let res = fetchfunc('gowns', 'POST', newGown)
    }


    return (<>
    {console.log("gown")}
    {console.log(gown)}
        <form onSubmit={handleSubmit((data => updateGown(data)))}>
            {/* temporary */}
            {/* <label>Model:<input className='number_without' type="number" name="model" required {...register("model")} /></label><br /> */}

            {/* <label>Size:<input type="number" name="size" required {...register("size")} defaultValue={gown.size}/></label><br />*/}

            <label>Size:<select name="size" required {...register("size")}>
                {sizes.map((size, i) => (<option key={i} selected={size.size === gown.size}  value={size.size}>{size.size}</option>))}
            </select></label><br />
{/* לא עובד משום מה */}
            <label>Amount:<input id='amount' type="number" min="1" name="amount" defaultValue={gown.amount} required {...register("amount")} /></label><br />

            <input type="button" value="Cancel" onClick={() => formOn('')} />
            <input type="submit" value="Submit" /><br />

        </form>

        <button onClick={() => setAdditional(prev => prev == 'sizes' ? '' : 'sizes')}>add size</button>
        {additional == 'sizes' && <form onSubmit={addSize}>
            <label htmlFor='size' >size:</label>
            <input name='size' type='text' required></input>
            <button type="submit">Add</button>
        </form>}
    </>)
}
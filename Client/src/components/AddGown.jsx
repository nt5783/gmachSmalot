import React from "react"
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { fetchfunc, fetchNoParamsfunc } from "../fetch"

export default function AddGown({ model, formOn }) {
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

    // function addProperty(event, property) {
    //     event.preventDefault();
    //     const newProperty = event.target[0].value.trim();
    //     console.log(newProperty)
    //     console.log(newProperty)
    //     if (newProperty && !colors.includes(newProperty))
    //         fetchfunc('colors', 'POST', { color: newProperty })
    //     //להוסיף בדיקה שעבד
    //     setColors(prev => [...prev, newColor])
    //     setAdditional('')
    // }

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


    function addGown(data) {
        const newGown = {model: model, size: data.size, amount: data.amount}
        console.log('newGown')
        console.log(newGown)
        // setMessage("adding gown model" + data.model + " ,length: " + data.length + " ,in size " + data.size)
        formOn('')
        let res = fetchfunc('gowns', 'POST', newGown)
    }


    return (<>
        <form onSubmit={handleSubmit((data => addGown(data)))}>
            {/* temporary */}
            {/* <label>Model:<input className='number_without' type="number" name="model" required {...register("model")} /></label><br /> */}

            <label>Size:<select name="size" required {...register("size")}>
                <option disabled selected></option>
                {sizes.map((size, i) => <option key={i} value={size.sizeId}>{size.size}</option>)}
            </select></label><br />

            <label>Amount:<input id='amount' type="number" min="1" name="amount" required {...register("amount")} /></label><br />

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
import React from "react"
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { fetchfunc } from "../fetch"


const lengths = ['maxi', 'midi', 'short']

const sizeBaby = ['6m', '9m', '12m', '18m', '24m']
const sizeGirl = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '10', '12', '14', '16', '18', '20']
const sizeWoman = ['30', '32', '34', '36', '38', '40', '42', '44', '46', '48', '50', '52']

export default function AddGown({ formOn, setMessage }) {
    const { register, handleSubmit } = useForm()

    function addGownFunc(data) {
        console.log(data)
        setMessage("adding gown model" + data.model + " ,length: " + data.length + " ,in size " + data.size)
        formOn('')
        let res = fetchfunc('gowns', 'POST', data)
        // setMessage(res)
    }


    return (<>
        <form onSubmit={handleSubmit((data => addGownFunc(data)))}>

            <label>Model:<input className='number_without' type="number" name="model" required {...register("model")} /></label><br />

            <label>Size:<select name="size" required {...register("size")}>
                <option disabled selected></option>
                {sizeBaby.map((size, i) => <option key={i} value={size}>{size}</option>)}
                {sizeGirl.map((size, i) => <option key={i} value={size}>{size}</option>)}
                {sizeWoman.map((size, i) => <option key={i} value={size}>{size}</option>)}
            </select></label><br />

            <label>Length:<select name="length" required {...register("length")}>
                <option disabled selected></option>
                {lengths.map((length, i) => <option key={i} value={length}>{length}</option>)}</select></label><br />

            <label>Amount:<input id='amount' type="number" min="1" name="amount" required {...register("amount")} /></label><br />

            <input type="button" value="Cancel" onClick={() => formOn('')} />
            <input type="submit" value="Submit" /><br />

        </form>
    </>)
}
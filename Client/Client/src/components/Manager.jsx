import React, { useEffect, useContext } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
// import { AppContext } from "../App";

const colors = ['white', 'beige', 'black', 'colorful', 'brown', 'pink', 'blue', 'lightBlue', 'green', 'purple', 'silver']
const lengths = ['maxi', 'midi', 'short']
const sizeBaby = ['3m', '6m', '9m', '12m', '18m', '24m']
const sizeGirl = ['2']
const sizeWoman = ['32', '34']

function Manager() {
    const [additional, setAdditional] = useState('')
    // const [otherColor, setOtherColor] = useState(false)
    const { register, handleSubmit } = useForm();


    <select name="cars" id="cars">
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
    </select>

    function addGownFunc(data) {
        setAdditional('')
        console.log(data)

    }

    const handleChange = (event) => {

    }


    return (<>
        <button onClick={() => setAdditional("add")}>add gown</button>
        <button>search gown</button>

        {(additional == "add" || additional == "addColor" )&& <form onSubmit={handleSubmit((data => addGownFunc(data)))}>
            <label>Model:<input className='number_without' type="number" name="model" required {...register("model")} /></label><br />
            <label>Color:
                <select name="color" onChange={handleChange} required {...register("color")}>
                    {colors.map((color, i) => <option value={color}>{color}</option>)}
                    <option value="else">else</option>
                </select></label><br />
                {additional == "addColor" && <div><label>new color:<input id='newColor' type="text" name="newColor" required {...register("newColor")} /></label><br /></div>}
            <label>Size:<input className='number_without' type="number" name="size" required {...register("size")} /></label><br />
            <label>Length:<input type="text" name="length" required {...register("length")} /></label><br />
            <label>Season:<input type="text" name="season" required {...register("season")} /></label><br />
            <label>Amount:<input id='amount' type="number" min="1" name="amount" required {...register("amount")} /></label><br />
            <input type="submit" value="Submit" /><br />
        </form>}

    </>)
}
export default Manager;
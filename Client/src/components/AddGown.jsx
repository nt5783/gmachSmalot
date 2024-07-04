import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { fetchfunc, fetchNoParamsfunc } from "../fetch";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default function AddGown({ gowns, model, formOn }) {
    const { register, handleSubmit } = useForm();
    const [additional, setAdditional] = useState('');
    const [sizes, setSizes] = useState([]);

    async function getData(table, setfunc) {
        const res = fetchNoParamsfunc(table, 'GET');
        const data = await res;
        if (data.length > 0)
            setfunc(data);
    }

    useEffect(() => {
        getData('sizes', setSizes);
    }, []);

    async function addSize(event) {
        event.preventDefault();
        const newSize = event.target[0].value.trim();
        if (newSize && !sizes.find((size) => size.size === newSize)) {
            try {
                await fetchfunc('sizes', 'POST', { size: newSize });
                await getData('sizes', setSizes);
            } catch (error) { alert('Error adding size:', error); }
        }        //להוסיף בדיקה שעבד)
        setAdditional('');
    }

    function addGown(data) {
        console.log('data')
        console.log(data)
        // if(gowns.find((gown)=>gown.sizeId==data.size))
        //to finish

        const newGown = { model: model, size: data.size, amount: data.amount }
        console.log('newGown')
        console.log(newGown)
        // setMessage("adding gown model" + data.model + " ,length: " + data.length + " ,in size " + data.size)
        formOn('')
        let res = fetchfunc('gowns', 'POST', newGown)
    }

    return (
        <>
            <Dialog visible={true} onHide={() => formOn('')} className="add-gown-dialog">
                <form onSubmit={handleSubmit((data) => addGown(data))} className="add-gown-form">
                    <div className="field">
                        <label>Model: {model}</label>
                    </div>
                    <div className="field">
                        <span className="p-float-label">
                            <Dropdown
                                id="size"
                                {...register("size", { required: true })}
                                options={sizes.map(size => ({ label: size.size, value: size.sizeId }))}
                                placeholder="Select a size"
                            />
                            <label htmlFor="size">Size</label>
                        </span>
                        <Button label="Add size" className="p-button-secondary" onClick={() => setAdditional(prev => prev === 'sizes' ? '' : 'sizes')} />
                    </div>
                    <div className="field">
                        <span className="p-float-label">
                            {/* מחקתי: min={1}  */}
                            <InputNumber id="amount" {...register("amount", { required: true, min: 1 })}/>
                            <label htmlFor="amount">Amount</label>
                        </span>
                    </div>
                    <Button type="submit" label="Submit" className="p-button-success" />
                </form>
            </Dialog>
            {additional === 'sizes' && (
                <Dialog visible={true} onHide={() => setAdditional('')}>
                    <form onSubmit={addSize} className="add-size-form">
                        <div className="field">
                            <span className="p-float-label">
                                <input name="size" type="text" required />
                                <label htmlFor="size">Size</label>
                            </span>
                        </div>
                        <Button type="submit" label="Add" className="p-button-success" />
                    </form>
                </Dialog>
            )}
        </>
    );
}

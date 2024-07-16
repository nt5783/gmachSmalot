import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { fetchfunc, fetchNoParamsfunc } from "../fetch";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default function AddGown({ gowns, model, formOn, getGowns }) {
    const { register, watch, handleSubmit, setValue } = useForm();
    const [additional, setAdditional] = useState('');
    const [sizes, setSizes] = useState([]);

    useEffect(() => {
        getData('sizes', setSizes);
    }, []);

    async function getData(table, setfunc) {
        try {
            const res = fetchNoParamsfunc(table, 'GET');
            const data = await res;
            if (data && data.length > 0)
                setfunc(data);
        } catch (err) {
            alert(`Error getting data: ${err.message}`)
        }
    }

    async function addSize(event) {
        event.preventDefault();
        const newSize = event.target[0].value.trim();
        if (newSize && !sizes.find((size) => size.size === newSize)) {
            try {
                await fetchfunc('sizes', 'POST', { size: newSize });
                await getData('sizes', setSizes);
            } catch (err) {
                alert(`Error adding size: ${err.message}`)
            }
        }
        setAdditional('');
    }

    async function addGown(data) {
        let existingSize = null
        gowns.map((gown) => {
            if (gown.sizeId == data.size) {
                existingSize = gown.size;
                return;
            }
        })
        if (existingSize != null)
            if (!confirm(`Gowns from model ${model} in size ${existingSize} already exist. Do you want to add ${data.amount} more?`)) {
                formOn('')
                return;
            }
        const newGown = { model: model, sizeId: data.size, amount: data.amount }
        formOn('')
        try {
            await fetchfunc('gowns', 'POST', newGown)
            await getGowns();
        } catch (err) {
            alert(`Error adding gown: ${err.message}`)
        }
    }

    return (<>
        <Dialog visible={true} onHide={() => formOn('')} className="add-gown-dialog" header='Add New Size To This Model'>
            <form onSubmit={handleSubmit((data) => addGown(data))} className="add-gown-form">
                <br />
                <div className="field">
                    <label>Model: {model}</label>
                </div>
                <div className="field">
                    <span className="p-float-label">
                        <Dropdown required
                            id="size"
                            options={sizes.map(size => ({ label: size.size, value: size.sizeId }))}
                            value={watch('size')}
                            onChange={(e) => setValue('size', e.value)}
                            placeholder="Select a size"
                        />
                        <label htmlFor="size">Size</label>
                    </span>
                    <Button label="Add size" className="p-button-secondary" onClick={() => setAdditional(prev => prev === 'sizes' ? '' : 'sizes')} />
                </div>
                <div className="field">
                    <span className="p-float-label">
                        <InputText type="number" id="amount" {...register("amount", { required: true, min: 1 })} min={1} />
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
                        <label htmlFor="size">Size</label>
                        <InputNumber useGrouping={false} name="size" required />
                    </div>
                    <Button type="submit" label="Add" className="p-button-success" />
                </form>
            </Dialog>
        )}
    </>
    );
}

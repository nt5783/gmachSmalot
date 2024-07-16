
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { fetchfunc, fetchNoParamsfunc } from "../fetch";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";

export default function UpdateGownsAmount({ gown, getGowns, index, formOn }) {
    const { register, handleSubmit } = useForm();

    async function updateGown(data) {
        try {
            await fetchfunc(`gowns/${gown.gownId}`, 'PATCH', { amount: data.amount });
            await getGowns();
            // await setGowns((prev) => [...prev.slice(0, index), prev[index].amount = data.amount, ...prev.slice(index + 1, prev.length)])
            // alert(`model ${model} deleted successfully`)
            formOn('');
        } catch (err) {
            alert(`Error updating gown: ${err.message}`)
        }
    }

    return (
        <Dialog header='Update Quantity' visible={true} onHide={() => formOn('')} className="update-gown-dialog">
            <form onSubmit={handleSubmit((data) => updateGown(data))} className="update-form">
                <br />
                <div className="field">
                    <label><b>Size: {gown.size}</b></label>
                </div>
                <br />
                <div className="field">
                    <span className="p-float-label">
                        <InputText type="number" id="amount" defaultValue={gown.amount} {...register("amount", { required: true, min: 1 })} min={1} />
                        <label htmlFor="amount">Amount</label>
                    </span>
                </div>
                <p>Note: It is possible that there are future orders for gowns of this size, reducing the amount will not affect these orders.</p>
                <Button type="submit" label="Apply changes" className="p-button-success" />
            </form>
        </Dialog>
    );
}


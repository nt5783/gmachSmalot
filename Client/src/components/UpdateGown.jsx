// import React from "react"
// import { useState, useEffect } from 'react'
// import { useForm } from 'react-hook-form'
// import { fetchfunc, fetchNoParamsfunc } from "../fetch"
// import { Dialog } from 'primereact/dialog';

// export default function UpdateGown({ gown, formOn }) {
//     const { register, handleSubmit } = useForm()
//     const [additional, setAdditional] = useState('')
//     const [sizes, setSizes] = useState([])

//     async function getData(table, setfunc) {
//         const res = fetchNoParamsfunc(table, 'GET');
//         const data = await res;
//         if (data.length > 0)
//             setfunc(data)
//     }

//     useEffect(() => {
//         getData('sizes', setSizes)
//     }, [])

//     async function addSize(event) {
//         event.preventDefault();
//         const newSize = event.target[0].value.trim();
//         if (newSize && !sizes.find((size) => size.size === newSize)) {
//             try {
//                 await fetchfunc('sizes', 'POST', { size: newSize });
//                 await getData('sizes', setSizes);
//             } catch (error) { alert('Error adding size:', error) }
//         }
//         //להוסיף בדיקה שעבד)
//         setAdditional('')
//     }


//     function updateGown(data) {
//         const newGown = { ...data, model: gown.model }
//         console.log(newGown)
//         // setMessage("adding gown model" + data.model + " ,length: " + data.length + " ,in size " + data.size)
//         formOn('')
//         let res = fetchfunc('gowns', 'POST', newGown)
//     }


//     return (
//         <Dialog visible={true} onHide={() => formOn('')}>
//             {console.log(gown)}
//             <form onSubmit={handleSubmit((data => updateGown(data)))}>
//                 {/* temporary */}
//                 {/* <label>Model:<input className='number_without' type="number" name="model" required {...register("model")} /></label><br /> */}

//                 {/* <label>Size:<input type="number" name="size" required {...register("size")} defaultValue={gown.size}/></label><br />*/}

//                 <label>Size:<select name="size" defaultValue={gown.size} required {...register("size")}>
//                     {sizes.map((size, i) => (<option key={i} value={size.size}>{size.size}</option>))}
//                 </select></label>
//                 <button onClick={() => setAdditional(prev => prev == 'sizes' ? '' : 'sizes')}>add size</button><br />
//                 {/* לא עובד משום מה selected={size.size === gown.size} */}
//                 <label>Amount:<input id='amount' type="number" min="1" name="amount" defaultValue={gown.amount} required {...register("amount")} /></label><br />

//                 <input type="button" value="Cancel" onClick={() => formOn('')} />
//                 <input type="submit" value="Submit" /><br />

//             </form>

//             {additional == 'sizes' && <Dialog visible={true} onHide={setAdditional('')}><form onSubmit={addSize}>
//                 <label htmlFor='size' >size:</label>
//                 <input name='size' type='text' required></input>
//                 <button type="submit">Add</button>
//             </form></Dialog>}
//         </Dialog>)
// }


















import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { fetchfunc, fetchNoParamsfunc } from "../fetch";
import { Dialog } from 'primereact/dialog';

export default function UpdateGown({ gown, formOn }) {
    const { register, handleSubmit } = useForm();
    const [additional, setAdditional] = useState('');
    const [sizes, setSizes] = useState([]);

    async function getData(table, setfunc) {
        const res = fetchNoParamsfunc(table, 'GET');
        const data = await res;
        if (data.length > 0) {
            setfunc(data);
        }
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
            } catch (error) {
                alert('Error adding size:', error);
            }
        }
        setAdditional('');
    }

    function updateGown(data) {
        const newGown = { ...data, model: gown.model };
        formOn('');
        let res = fetchfunc('gowns', 'POST', newGown);
    }

    return (
        <Dialog visible={true} onHide={() => formOn('')} className="update-gown-dialog">
            <form onSubmit={handleSubmit((data) => updateGown(data))} className="update-form">
                <label className="form-label">Size:
                    <select name="size" defaultValue={gown.size} required {...register("size")} className="size-select">
                        {sizes.map((size, i) => (
                            <option key={i} value={size.size}>{size.size}</option>
                        ))}
                    </select>
                </label>
                <button onClick={() => setAdditional((prev) => prev === 'sizes' ? '' : 'sizes')} className="add-size-btn">
                    Add Size
                </button>
                <br />
                <label className="form-label">Amount:
                    <input id="amount" type="number" min="1" name="amount" defaultValue={gown.amount} required {...register("amount")} className="amount-input" />
                </label>
                <br />

                <input type="submit" value="Submit" className="submit-btn" />
            </form>

            {additional === 'sizes' && (
                <Dialog visible={true} onHide={() => setAdditional('')} className="add-size-dialog">
                    <form onSubmit={addSize}>
                        <label htmlFor="size" className="form-label">Size:</label>
                        <input name="size" type="text" required className="add-size-input" />
                        <button type="submit" className="add-size-submit-btn">Add</button>
                    </form>
                </Dialog>
            )}
        </Dialog>
    );
}


// import React, { useState, useEffect } from 'react';
// import { useForm, Controller } from 'react-hook-form';
// import { fetchfunc, fetchNoParamsfunc } from "../fetch";
// import Dropzone from 'react-dropzone-uploader';
// import { Dialog } from "primereact/dialog";
// import { Button } from 'primereact/button';
// import { InputText } from 'primereact/inputtext';
// import { InputNumber } from 'primereact/inputnumber';
// import { Dropdown } from 'primereact/dropdown';
// import { Message } from 'primereact/message';

// import 'primereact/resources/themes/saga-blue/theme.css';
// import 'primereact/resources/primereact.min.css';
// import 'primeicons/primeicons.css';

// export default function UpdateModel({ formOn, getModels, selectedModel }) {
//     const [additional, setAdditional] = useState('');
//     const { register, handleSubmit, setValue, control, formState: { errors } } = useForm();
//     const [colors, setColors] = useState([]);
//     const [seasons, setSeasons] = useState([]);
//     const [lengths, setLengths] = useState([]);
//     const [imageData, setImageData] = useState(null);

//     const itemsMap = {
//         colors: { items: colors, setItems: setColors },
//         seasons: { items: seasons, setItems: setSeasons },
//         lengths: { items: lengths, setItems: setLengths },
//     };

//     async function getData(table, setfunc) {
//         try {
//             const res = fetchNoParamsfunc(table, 'GET');
//             // if (res.status == 401) throw "Permission denied";
//             const data = await res;
//             if (data&&data.length > 0) setfunc(data);
//         }catch (err) {
//             alert(`Error getting data: ${err.message}`)
//         }        
//     }

//     useEffect(() => {
//         try {
//             getData('colors', setColors);
//             getData('seasons', setSeasons);
//             getData('lengths', setLengths);
//         }
//         catch (e) {
//             return
//         }
//     }, []);

//     async function updateModel(data) {
//         if (!imageData && !data.colorId && !data.lengthId && !data.seasonId) {
//             formOn(null);
//             return;
//         }
//         let formData;
//         if (!imageData) formData = { model: selectedModel.model, ...data, image: null };
//         else formData = { model: selectedModel.model, ...data, image: imageData.name };
//         let notNullFormData = Object.fromEntries(Object.entries(formData).filter(([_, v]) => v != null && v != undefined));
//         console.log(notNullFormData);
//         const model = notNullFormData.model;
//         delete notNullFormData.model
//         formOn(null);
//         try {
//             await fetchfunc(`models/${model}`, 'PATCH', notNullFormData);
//             await getModels();
//         } catch (err) { alert(`Error updating model: ${err.message}`); }
//     }

//     async function addItem(event, itemType) {
//         event.preventDefault();
//         const newItem = event.target[0].value.trim();
//         const itemTypeKey = itemType.slice(0, -1);
//         const { items, setItems } = itemsMap[itemType] || {};

//         if (!items) {
//             console.error(`Invalid itemType: ${itemType}`);
//             return;
//         }

//         if (newItem && !items.find((item) => item[itemTypeKey] === newItem)) {
//             try {
//                 await fetchfunc(itemType, 'POST', { [itemTypeKey]: newItem });
//                 await getData(itemType, setItems);
//             } catch (err) { alert(`Error adding ${itemType}: `, err.message); }
//         }
//         setAdditional('');
//     }

//     const getUploadParams = ({ meta }) => {
//         return { url: 'http://localhost:8080/upload' };
//     };

//     const handleChangeStatus = ({ meta, file }, status) => {
//         if (status === 'done') {
//             setImageData({ name: meta.name, type: meta.type });
//             setValue('image', meta.name);
//         } else if (status === 'removed') {
//             setImageData(null);
//             setValue('image', '');
//         }
//     };

//     const renderAdditionalDialog = (type) => {
//         return (
//             <Dialog visible={true} onHide={() => setAdditional('')}>
//                 <form onSubmit={(e) => addItem(e, type)}>
//                     <label htmlFor={type}>{type.charAt(0).toUpperCase() + type.slice(1, -1)} Name:</label>
//                     <InputText name={type} type="text" required />
//                     <Button type="submit" label="Add" />
//                 </form>
//             </Dialog>
//         );
//     };

//     return (
//         <>
//             <Dialog visible={true} onHide={() => formOn(false)} header={`Update Model ${selectedModel.model}`}>
//                 <form onSubmit={handleSubmit((data) => updateModel(data))} className="add-model-form">
//                     <br />
//                     <label>Model: {selectedModel.model}</label>
//                     <br />
//                     <label>Color:
//                         <Controller
//                             name="colorId"
//                             control={control}
//                             render={({ field }) => (
//                                 <>
//                                     <Dropdown
//                                         value={field.value}
//                                         options={colors.map((color) => ({ label: color.color, value: color.colorId }))}
//                                         placeholder={selectedModel.color}
//                                         onChange={(e) => field.onChange(e.value)}
//                                     />
//                                 </>)}
//                         />
//                     </label>
//                     <Button type="button" label="Add Color" onClick={() => setAdditional(prev => prev === 'colors' ? '' : 'colors')} />
//                     <br />

//                     <label>Season:
//                         <Controller
//                             name="seasonId"
//                             control={control}
//                             render={({ field }) => (
//                                 <>
//                                     <Dropdown
//                                         value={field.value}
//                                         options={seasons.map((season) => ({ label: season.season, value: season.seasonId }))}
//                                         placeholder={selectedModel.season}
//                                         onChange={(e) => field.onChange(e.value)}
//                                     />
//                                 </>
//                             )}
//                         />
//                     </label>
//                     <Button type="button" label="Add Season" onClick={() => setAdditional(prev => prev === 'seasons' ? '' : 'seasons')} />
//                     <br />

//                     <label>Length:
//                         <Controller
//                             name="lengthId"
//                             control={control}
//                             render={({ field }) => (
//                                 <>
//                                     <Dropdown
//                                         value={field.value}
//                                         options={lengths.map((length) => ({ label: length.length, value: length.lengthId }))}
//                                         placeholder={selectedModel.length}
//                                         onChange={(e) => field.onChange(e.value)}
//                                     />
//                                 </>
//                             )}
//                         />
//                     </label>
//                     <Button type="button" label="Add Length" onClick={() => setAdditional(prev => prev === 'lengths' ? '' : 'lengths')} />
//                     <br />

//                     <label>Image:
//                         <Dropzone
//                             getUploadParams={getUploadParams}
//                             onChangeStatus={handleChangeStatus}
//                             accept="image/*"
//                             maxFiles={1}
//                             styles={{
//                                 dropzone: { width: 400, height: 200, border: '2px dashed #007bff', borderRadius: '5px', background: `url(${selectedModel.image}) center center / cover no-repeat`, },
//                                 dropzoneActive: { borderColor: 'green' },
//                             }} />
//                     </label>
//                     <br />
//                     <Button type="submit" label="update Model" />
//                 </form>
//             </Dialog>

//             {additional === 'colors' && renderAdditionalDialog('colors')}
//             {additional === 'seasons' && renderAdditionalDialog('seasons')}
//             {additional === 'lengths' && renderAdditionalDialog('lengths')}
//         </>
//     );
// }



import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { fetchfunc, fetchNoParamsfunc } from "../fetch";
import Dropzone from 'react-dropzone-uploader';
import { Dialog } from "primereact/dialog";
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Message } from 'primereact/message';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default function UpdateModel({ formOn, getModels, selectedModel }) {
    const [additional, setAdditional] = useState('');
    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm();
    const [colors, setColors] = useState([]);
    const [seasons, setSeasons] = useState([]);
    const [lengths, setLengths] = useState([]);
    const [imageData, setImageData] = useState(null);

    const itemsMap = {
        colors: { items: colors, setItems: setColors },
        seasons: { items: seasons, setItems: setSeasons },
        lengths: { items: lengths, setItems: setLengths },
    };

    async function getData(table, setfunc) {
        try {
            const res = fetchNoParamsfunc(table, 'GET');
            const data = await res;
            if (data&&data.length > 0) setfunc(data);
        } catch (err) {
            alert(`שגיאה בקבלת נתונים: ${err.message}`);
        }        
    }

    useEffect(() => {
        try {
            getData('colors', setColors);
            getData('seasons', setSeasons);
            getData('lengths', setLengths);
        } catch (e) {
            return;
        }
    }, []);

    async function updateModel(data) {
        if (!imageData && !data.colorId && !data.lengthId && !data.seasonId) {
            formOn(null);
            return;
        }
        let formData;
        if (!imageData) formData = { model: selectedModel.model, ...data, image: null };
        else formData = { model: selectedModel.model, ...data, image: imageData.name };
        let notNullFormData = Object.fromEntries(Object.entries(formData).filter(([_, v]) => v != null && v != undefined));
        console.log(notNullFormData);
        const model = notNullFormData.model;
        delete notNullFormData.model
        formOn(null);
        try {
            await fetchfunc(`models/${model}`, 'PATCH', notNullFormData);
            await getModels();
        } catch (err) {
            alert(`שגיאה בעדכון דגם: ${err.message}`);
        }
    }

    async function addItem(event, itemType) {
        event.preventDefault();
        const newItem = event.target[0].value.trim();
        const itemTypeKey = itemType.slice(0, -1);
        const { items, setItems } = itemsMap[itemType] || {};

        if (!items) {
            console.error(`סוג פריט לא חוקי: ${itemType}`);
            return;
        }

        if (newItem && !items.find((item) => item[itemTypeKey] === newItem)) {
            try {
                await fetchfunc(itemType, 'POST', { [itemTypeKey]: newItem });
                await getData(itemType, setItems);
            } catch (err) {
                alert(`שגיאה בהוספת ${itemType}: ${err.message}`);
            }
        }
        setAdditional('');
    }

    const getUploadParams = ({ meta }) => {
        return { url: 'http://localhost:8080/upload' };
    };

    const handleChangeStatus = ({ meta, file }, status) => {
        if (status === 'done') {
            setImageData({ name: meta.name, type: meta.type });
            setValue('image', meta.name);
        } else if (status === 'removed') {
            setImageData(null);
            setValue('image', '');
        }
    };

    const renderAdditionalDialog = (type) => {
        return (
            <Dialog visible={true} onHide={() => setAdditional('')}>
                <form onSubmit={(e) => addItem(e, type)}>
                    <label htmlFor={type}>{`שם ${type.charAt(0).toUpperCase() + type.slice(1, -1)}:`}</label>
                    <InputText name={type} type="text" required />
                    <Button type="submit" label="הוסף" />
                </form>
            </Dialog>
        );
    };

    return (
        <>
            <Dialog visible={true} onHide={() => formOn(false)} header={`עדכן דגם ${selectedModel.model}`}>
                <form onSubmit={handleSubmit((data) => updateModel(data))} className="add-model-form">
                    <br />
                    <label>דגם: {selectedModel.model}</label>
                    <br />
                    <label>צבע:
                        <Controller
                            name="colorId"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <Dropdown
                                        value={field.value}
                                        options={colors.map((color) => ({ label: color.color, value: color.colorId }))}
                                        placeholder={selectedModel.color}
                                        onChange={(e) => field.onChange(e.value)}
                                    />
                                </>)}
                        />
                    </label>
                    <Button type="button" label="הוסף צבע" onClick={() => setAdditional(prev => prev === 'colors' ? '' : 'colors')} />
                    <br />

                    <label>עונה:
                        <Controller
                            name="seasonId"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <Dropdown
                                        value={field.value}
                                        options={seasons.map((season) => ({ label: season.season, value: season.seasonId }))}
                                        placeholder={selectedModel.season}
                                        onChange={(e) => field.onChange(e.value)}
                                    />
                                </>
                            )}
                        />
                    </label>
                    <Button type="button" label="הוסף עונה" onClick={() => setAdditional(prev => prev === 'seasons' ? '' : 'seasons')} />
                    <br />

                    <label>אורך:
                        <Controller
                            name="lengthId"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <Dropdown
                                        value={field.value}
                                        options={lengths.map((length) => ({ label: length.length, value: length.lengthId }))}
                                        placeholder={selectedModel.length}
                                        onChange={(e) => field.onChange(e.value)}
                                    />
                                </>
                            )}
                        />
                    </label>
                    <Button type="button" label="הוסף אורך" onClick={() => setAdditional(prev => prev === 'lengths' ? '' : 'lengths')} />
                    <br />

                    <label>תמונה:
                        <Dropzone
                            getUploadParams={getUploadParams}
                            onChangeStatus={handleChangeStatus}
                            accept="image/*"
                            maxFiles={1}
                            styles={{
                                dropzone: { width: 400, height: 200, border: '2px dashed #007bff', borderRadius: '5px', background: `url(${selectedModel.image}) center center / cover no-repeat`, },
                                dropzoneActive: { borderColor: 'green' },
                            }} />
                    </label>
                    <br />
                    <Button type="submit" label="עדכן דגם" />
                </form>
            </Dialog>

            {additional === 'colors' && renderAdditionalDialog('colors')}
            {additional === 'seasons' && renderAdditionalDialog('seasons')}
            {additional === 'lengths' && renderAdditionalDialog('lengths')}
        </>
    );
}

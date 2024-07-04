// import React, { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { fetchfunc, fetchNoParamsfunc } from "../fetch";
// import Dropzone from 'react-dropzone-uploader';
// import { Dialog } from "primereact/dialog";
// import { Button } from 'primereact/button';
// import { InputText } from 'primereact/inputtext';
// import { InputNumber } from 'primereact/inputnumber';
// import { Dropdown } from 'primereact/dropdown';

// import 'primereact/resources/themes/saga-blue/theme.css';
// import 'primereact/resources/primereact.min.css';
// import 'primeicons/primeicons.css';

// export default function AddModel({ formOn, setMessage }) {
//     const [additional, setAdditional] = useState('');
//     const { register, handleSubmit, setValue } = useForm();
//     const [colors, setColors] = useState([]);
//     const [seasons, setSeasons] = useState([]);
//     const [lengths, setLengths] = useState([]);
//     const [imageData, setImageData] = useState(null);
//     const [selectedColor, setSelectedColor] = useState(null);
//     const [selectedSeason, setSelectedSeason] = useState(null);
//     const [selectedLength, setSelectedLength] = useState(null);

//     async function getData(table, setfunc) {
//         const res = fetchNoParamsfunc(table, 'GET');
//         const data = await res;
//         if (data.length > 0)
//             setfunc(data);
//     }

//     useEffect(() => {
//         getData('colors', setColors);
//         getData('seasons', setSeasons);
//         getData('lengths', setLengths);
//     }, []);

//     function addModel(data) {
//         console.log("data");
//         console.log(data);
//         let formData;
//         if (!imageData)
//             formData = { ...data, image: null };
//         else
//             formData = { ...data, image: imageData.name };
//         console.log("formData");
//         console.log(formData);
//         // setMessage("adding model code " + data.model + " color: " + data.color + " for " + data.season)
//         formOn(false);
//         try {
//             fetchfunc('models', 'POST', formData);
//         } catch (error) { alert('Error adding model: ', error) }
//         // } catch (e) { alert(e) }
//     }

//     async function addItem(event, itemType, setItems) {
//         event.preventDefault();
//         const newItem = event.target[0].value.trim();
//         if (newItem && !itemType.find((item) => item[itemType] === newItem)) {
//             try {
//                 await fetchfunc(itemType, 'POST', { [itemType]: newItem });
//                 await getData(itemType, setItems);
//             } catch (error) { alert(`Error adding ${itemType}: `, error); }
//         }
//         setAdditional('');
//     }

//     async function addLength(event) {
//         event.preventDefault();
//         const newLength = event.target[0].value.trim();
//         if (newLength && !lengths.find((length) => length.length === newLength)) {
//             try {
//                 await fetchfunc('lengths', 'POST', { length: newLength });
//                 await getData('lengths', setLengths);
//             } catch (error) { alert('Error adding length: ', error) }
//         }
//         setAdditional('');
//     }

//     async function addColor(event) {
//         event.preventDefault();
//         const newColor = event.target[0].value.trim();
//         if (newColor && !colors.find((color) => color.color === newColor)) {
//             try {
//                 await fetchfunc('colors', 'POST', { color: newColor });
//                 await getData('colors', setColors);
//             } catch (error) { alert('Error adding color: ', error) }
//         }
//         setAdditional('');
//     }

//     async function addSeason(event) {
//         event.preventDefault();
//         const newSeason = event.target[0].value.trim();
//         if (newSeason && !seasons.find((season) => season.season === newSeason)) {
//             try {
//                 await fetchfunc('seasons', 'POST', { season: newSeason });
//                 await getData('seasons', setSeasons);
//             } catch (error) { alert('Error adding season: ', error) }
//         }
//         setAdditional('');
//     }

//     const getUploadParams = ({ meta }) => { return{url: 'http://localhost:8080/upload'} };

//     const handleChangeStatus = ({ meta, file }, status) => {
//         if (status === 'done') {
//             setImageData({ name: meta.name, type: meta.type });
//             setValue('image', meta.name);
//         } else if (status === 'removed') {
//             setImageData(null);
//             setValue('image', '');
//         }
//     };

//     const renderAdditionalDialog = (type, setFunc) => {
//         return (
//             <Dialog visible={true} onHide={() => setAdditional('')}>
//                 <form onSubmit={(e) => addItem(e, type, setFunc)}>
//                     <label htmlFor={type}>{type.charAt(0).toUpperCase() + type.slice(1)} Name:</label>
//                     <InputText name={type} type="text" required />
//                     <Button type="submit" label="Add" />
//                 </form>
//             </Dialog>
//         );
//     };

//     return (
//         <>
//             <Dialog visible={true} onHide={() => formOn(false)}>
//                 <form onSubmit={handleSubmit((data) => addModel(data))} className="add-model-form">
//                     {/* אפשר לעשות כיתוב במודל? */}
//                     <label>Model:
//                         <InputNumber name="model" required {...register("model")} />
//                     </label>
//                     <br />

//                     <label>Color:
//                         <Dropdown name="color" value={selectedColor} options={colors.map((color) => ({ label: color.color, value: color.colorId }))}
//                             placeholder="Select a Color" onChange={(e) => { setSelectedColor(e.value); setValue('color', e.value); }} />
//                     </label>
//                     <Button label="Add Color" onClick={() => setAdditional(prev => prev === 'colors' ? '' : 'colors')} />
//                     <br />

//                     <label>Season:
//                         <Dropdown name="season" value={selectedSeason} options={seasons.map((season) => ({ label: season.season, value: season.seasonId }))}
//                             placeholder="Select a Season" onChange={(e) => { setSelectedSeason(e.value); setValue('season', e.value); }} />
//                     </label>
//                     <Button label="Add Season" onClick={() => setAdditional(prev => prev === 'seasons' ? '' : 'seasons')} />
//                     <br />

//                     <label>Length:
//                         <Dropdown name="length" value={selectedLength} options={lengths.map((length) => ({ label: length.length, value: length.lengthId }))}
//                             placeholder="Select a Length" onChange={(e) => { setSelectedLength(e.value); setValue('length', e.value); }} />
//                     </label>
//                     <Button label="Add Length" onClick={() => setAdditional(prev => prev === 'lengths' ? '' : 'lengths')} />
//                     <br />

//                     <label>Image:
//                         <Dropzone
//                             getUploadParams={getUploadParams}
//                             onChangeStatus={handleChangeStatus}
//                             accept="image/*"
//                             maxFiles={1}
//                             styles={{
//                                 dropzone: { width: 400, height: 200, border: '2px dashed #007bff', borderRadius: '5px' },
//                                 dropzoneActive: { borderColor: 'green' },
//                             }} />
//                     </label>
//                     <br />

//                     <Button type="submit" label="Add Model" />
//                 </form>
//             </Dialog>

//             {additional === 'colors' && renderAdditionalDialog('color', setColors)}
//             {additional === 'seasons' && renderAdditionalDialog('season', setSeasons)}
//             {additional === 'lengths' && renderAdditionalDialog('length', setLengths)}
//         </>
//     );
// }










//שהצבע שבחר יהיה בסלקט


import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { fetchfunc, fetchNoParamsfunc } from "../fetch";
import Dropzone from 'react-dropzone-uploader';
import { Dialog } from "primereact/dialog";
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default function AddModel({ formOn, getModels }) {
    const [additional, setAdditional] = useState('');
    const { register, handleSubmit, setValue, control } = useForm();
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
        const res = fetchNoParamsfunc(table, 'GET');
        const data = await res;
        if (data.length > 0) setfunc(data);
    }

    useEffect(() => {
        getData('colors', setColors);
        getData('seasons', setSeasons);
        getData('lengths', setLengths);
    }, []);

    async function addModel(data) {
        let formData;
        if (!imageData) formData = { ...data, image: null };
        else formData = { ...data, image: imageData.name };
        console.log(formData);
        formOn(false);
        try {
            await fetchfunc('models', 'POST', formData);
            await getModels();
        } catch (error) { alert('Error adding model: ', error); }
    }

    async function addItem(event, itemType) {
        event.preventDefault();
        const newItem = event.target[0].value.trim();
        const itemTypeKey = itemType.slice(0, -1);
        const { items, setItems } = itemsMap[itemType] || {};
        
        if (!items) {
            console.error(`Invalid itemType: ${itemType}`);
            return;
        }

        if (newItem && !items.find((item) => item[itemTypeKey] === newItem)) {
            try {
                await fetchfunc(itemType, 'POST', { [itemTypeKey]: newItem });
                await getData(itemType, setItems);
            } catch (error) { alert(`Error adding ${itemType}: `, error); }
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
 <label htmlFor={type}>{type.charAt(0).toUpperCase() + type.slice(1, -1)} Name:</label>
                    <InputText name={type} type="text" required />
                    <Button type="submit" label="Add" />
                </form>
            </Dialog>
        );
    };

    return (
        <>
            <Dialog visible={true} onHide={() => formOn(false)}>
                <form onSubmit={handleSubmit((data) => addModel(data))} className="add-model-form">
                    <label>Model:
                        <Controller
                            name="model"
                            control={control}
                            render={({ field }) => (
                                <InputNumber value={field.value} onChange={(e) => field.onChange(e.value)} required />
                            )}
                        />
                    </label>
                    <br />

                    <label>Color:
                        <Controller
                            name="color"
                            control={control}
                            render={({ field }) => (
                                <Dropdown 
                                    value={field.value}
                                    options={colors.map((color) => ({ label: color.color, value: color.colorId }))}
                                    placeholder="Select a Color"
                                    onChange={(e) => field.onChange(e.value)}
                                />
                            )}
                        />
                    </label>
                    <Button type="button" label="Add Color" onClick={() => setAdditional(prev => prev === 'colors' ? '' : 'colors')} />
                    <br />

                    <label>Season:
                        <Controller
                            name="season"
                            control={control}
                            render={({ field }) => (
                                <Dropdown 
                                    value={field.value}
                                    options={seasons.map((season) => ({ label: season.season, value: season.seasonId }))}
                                    placeholder="Select a Season"
                                    onChange={(e) => field.onChange(e.value)}
                                />
                            )}
                        />
                    </label>
                    <Button type="button" label="Add Season" onClick={() => setAdditional(prev => prev === 'seasons' ? '' : 'seasons')} />
                    <br />

                    <label>Length:
                        <Controller
                            name="length"
                            control={control}
                            render={({ field }) => (
                                <Dropdown 
                                    value={field.value}
                                    options={lengths.map((length) => ({ label: length.length, value: length.lengthId }))}
                                    placeholder="Select a Length"
                                    onChange={(e) => field.onChange(e.value)}
                                />
                            )}
                        />
                    </label>
                    <Button type="button" label="Add Length" onClick={() => setAdditional(prev => prev === 'lengths' ? '' : 'lengths')} />
                    <br />

                    <label>Image:
                        <Dropzone
                            getUploadParams={getUploadParams}
                            onChangeStatus={handleChangeStatus}
                            accept="image/*"
                            maxFiles={1}
                            styles={{
                                dropzone: { width: 400, height: 200, border: '2px dashed #007bff', borderRadius: '5px' },
                                dropzoneActive: { borderColor: 'green' },
                            }} />
                    </label>
                    <br />

                    <Button type="submit" label="Add Model" />
                </form>
            </Dialog>

            {additional === 'colors' && renderAdditionalDialog('colors')}
            {additional === 'seasons' && renderAdditionalDialog('seasons')}
            {additional === 'lengths' && renderAdditionalDialog('lengths')}
        </>
    );
}


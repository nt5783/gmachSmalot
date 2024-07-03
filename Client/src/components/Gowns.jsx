// import React, { useState, useEffect, useContext } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { useForm } from "react-hook-form";
// import { CartContext } from '../App';
// import { UserContext } from '../App';
// import 'react-calendar/dist/Calendar.css';
// import { fetchNoParamsfunc } from '../fetch';
// import AddGown from './AddGown';
// import UpdateGown from './UpdateGown';

// function Gowns() {
//   const navigate = useNavigate();
//   const { user } = useContext(UserContext);
//   const { cart, setCart } = useContext(CartContext);
//   const [gowns, setGowns] = useState([]);
//   const [selectedGown, setSelectedGown] = useState(null);
//   const { state } = useLocation();
//   const model = state.model;
//   const eventDate = state.eventDate;
//   const [message, setMessage] = useState('');
//   const [visible, setVisible] = useState(false);
//   const [showForm, setShowForm] = useState('');
//   const [amountToOrder, setAmountToOrder] = useState(1);

//   console.log('state gowns');
//   if (state) console.log(state);

//   useEffect(() => {
//     if (!message) {
//       setVisible(false);
//       return;
//     }
//     setVisible(true);
//     const timer = setTimeout(() => {
//       setVisible(false);
//       setMessage('');
//     }, 5000);
//     return () => clearTimeout(timer);
//   }, [message])

//   useEffect(() => {
//     async function getData() {
//       const res = eventDate ? fetchNoParamsfunc(`gowns?model=${model.model}&date=${eventDate}`, 'GET') : fetchNoParamsfunc(`gowns?model=${model.model}`, 'GET');
//       const data = await res;
//       if (data.length > 0)
//         setGowns(data);
//     }
//     getData();
//   }, [])

//   function gownSelected(i) {
//     setSelectedGown((prev) => (prev === i ? i : i)); 
//   }

//   function AddGownToCart(gown) {
//     const gownId = gown.gownId;
//     if (!user) navigate('/login', { state: { model: model, message: 'you must log in to your account', eventDate: eventDate } });
//     else setCart(prevCart => {
//       const gownIndex = prevCart.items.findIndex(item => item.id === gownId);
//       if (gownIndex == -1)
//         return {
//            length: prevCart.length + 1, items: [
//             ...prevCart.items, { id: gownId, model: gown.model, size: gown.size, img: model.image, qty: 1 }]
//         };
//       const updatedItems = prevCart.items.map((item, index) => {
//         if (index === gownIndex) return { ...item, qty: item.qty + 1 };
//         return item;
//       });
//       return {  length: prevCart.length + 1, items: updatedItems };
//     })
//     setMessage(`gown model: ${gown.model}, size: ${gown.size} was added to cart successfully`);
//     const updatedGowns = gowns.map((gownItem, i) => {
//       if (gownItem === gown) return { ...gownItem, available: gownItem.available - 1 }
//       return gownItem;
//     })
//     setGowns(updatedGowns);
//     setSelectedGown(null);
//   }

//   return (
//     <>
//       <div style={{ display: "flex", flexDirection: "column" }}>
//         {isManager && <button style={{ background: "#fdcc9d" }} onClick={() => setShowForm(prev => prev == 'add' ? '' : 'add')}>Add new Gown</button>}
//         {showForm == 'add' && <AddGown model={model.model} formOn={setShowForm} />}
//         {visible && <div className='successMessage' style={{ background: "#fdcc9d" }}>{message}</div>}
//         <div style={{ display: "flex", flexDirection: "row" }}>
//           <img src={model.image} height={300} style={{ marginRight: 20 }} />
//           <div style={{ display: "flex", flexDirection: "column" }}>
//             <span>{model.model}</span>
//             <span>Size:</span>
//             {gowns.length > 0 && gowns.map((gown, i) => (
//               <button key={i} style={{ background: "#d4bfcc", margin: 5 }} disabled={gown.available < 1} onClick={() => gownSelected(i)}>{gown.size}</button>
//             ))}
//           </div>
//         </div>
//         {selectedGown !== null && (
//           <div style={{ background: "#e1ddd5", padding: 10, marginTop: 20 }}>
//             <span>Available amount: {gowns[selectedGown].available}</span>
//             <label htmlFor='amount'>Amount:</label>
//             <input type="number" name='amount' min="1" defaultValue={1} onChange={(e) => setAmountToOrder(e.target.value)} />
//             <button style={{ background: "#fdcc9d", margin: 5 }} onClick={() => AddGownToCart(gowns[selectedGown])}>Add to cart</button>
//             <button style={{ background: "#fdcc9d", margin: 5 }} onClick={() => navigate('/order', { state: { amount: amountToOrder, gownId: gowns[selectedGown].gownId, eventDate: eventDate } })}>Order now</button>
//             {isManager == 1 && <button style={{ background: "#fdcc9d", margin: 5 }} onClick={() => setShowForm(prev => prev == 'update' ? '' : 'update')}>Update Gown</button>}
//             {showForm == 'update' && <UpdateGown gown={gowns[selectedGown]} formOn={setShowForm} />}
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export default Gowns;





import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { CartContext, ManagerContext, UserContext } from '../App'
// import { AppContext } from "../App";
import 'react-calendar/dist/Calendar.css'
import { fetchNoParamsfunc } from '../fetch'
import AddGown from './AddGown'
import UpdateGown from './UpdateGown'

function Gowns() {
  const navigate = useNavigate()
  const { isManager } = useContext(ManagerContext)
  const { user } = useContext(UserContext)
  const { cart, setCart } = useContext(CartContext)
  const [gowns, setGowns] = useState([])
  const [selectedGown, setSelectedGown] = useState(null)
  const { state } = useLocation();
  const model = state.model;
  const eventDate = state.eventDate;
  console.log("eventDate")
  console.log(eventDate)
  const [message, setMessage] = useState('')
  const [visible, setVisible] = useState(false)
  const [showForm, setShowForm] = useState('')
  const [amountToOrder, setAmountToOrder] = useState(1)



  console.log('state gowns')
  if (state) console.log(state)

  useEffect(() => {
    if (!message) {
      setVisible(false)
      return
    }
    setVisible(true)
    const timer = setTimeout(() => {
      setVisible(false)
      setMessage('')
    }, 5000);
    return () => clearTimeout(timer);
  }, [message])

  useEffect(() => {
    async function getData() {
      const res = eventDate ? fetchNoParamsfunc(`gowns?model=${model.model}&date=${eventDate}`, 'GET') : fetchNoParamsfunc(`gowns?model=${model.model}`, 'GET');
      const data = await res;
      if (data.length > 0)
        setGowns(data)
    }
    getData()
  }, [])

  function gownSelected(i) {
    setSelectedGown((prev) => (prev === i ? i : i)); // Toggle selected gown
  }

  function AddGownToCart(gown) {
    const gownId = gown.gownId;
    if (!user) navigate('/login', { state: { model: model, message: 'you must log in to your account', eventDate: eventDate } })
    else setCart(prevCart => {
      const gownIndex = prevCart.items.findIndex(item => item.id === gownId);
      if (gownIndex == -1)
        return {
          length: prevCart.length + 1, items: [
            ...prevCart.items, { id: gownId, model: gown.model, size: gown.size, img: model.image, qty: 1 }]
        };
      const updatedItems = prevCart.items.map((item, index) => {
        if (index === gownIndex) return { ...item, qty: item.qty + 1 };
        return item;
      });
      return { length: prevCart.length + 1, items: updatedItems };
    })
    setMessage(`gown model: ${gown.model}, size: ${gown.size} was added to cart successfully`)
    const updatedGowns = gowns.map((gownItem, i) => {
      if (gownItem === gown) return { ...gownItem, available: gownItem.available - 1 }
      return gownItem
    })
    setGowns(updatedGowns)
    setSelectedGown(null)
    // setGowns(prev => [...prev, { ...gowns[selectedGown], available: gowns[selectedGown].available - 1 }])
  }

  return (
    <>
      {console.log("gowns")}
      {console.log(gowns)}
      {isManager && <button onClick={() => setShowForm(prev => prev == 'add' ? '' : 'add')}>add new Gown</button>}
      {showForm == 'add' && <AddGown gowns={gowns} model={model.model} formOn={setShowForm} />}
      <br />
      <br />
      {visible && <div className='successMessage' style={{ background: "green" }}>{message}</div>}
      <img height={200} src={model.image} />
      {model.model}
      <br />
      <span>Size: </span>
      {gowns.length > 0 && <div className='size_buttons'>{gowns.map((gown, i) => (
        // <div key={i}>
        <button key={i} disabled={gown.available < 1} onClick={() => gownSelected(i)}>{gown.size}</button>
        // </div>
      ))}</div>}
      {selectedGown !== null && (
        <div>
          <span>Available amount: {gowns[selectedGown].available}</span>
          <br />


          {/* <form onSubmit={}>
            <label htmlFor='amount' >amount:</label>
            <input name='amount' type='number' min="1" defaultValue={1}></input>
            <button type="submit">Add to cart</button>
            <button type="submit">Order now</button>
        </form> */}

          {eventDate == null && <span className='warning'>you are in display mode. you have to pick a date</span>}
          <br />
          <label htmlFor='amount' >amount:</label>
          <input disabled={eventDate == null} type="number" name='amount' min="1" max={gowns[selectedGown].available} defaultValue={1} onChange={setAmountToOrder} />
          <button disabled={eventDate == null} onClick={() => AddGownToCart(gowns[selectedGown])}>Add to cart</button>
          <button disabled={eventDate == null} onClick={() => navigate('/order', { state: { amount: amountToOrder, gownId: gowns[selectedGown].gownId, eventDate: eventDate } })}>Order now</button>
          {isManager && <button onClick={() => setShowForm(prev => prev == 'update' ? '' : 'update')}>update Gown</button>}
          {showForm == 'update' && <UpdateGown gown={gowns[selectedGown]} formOn={setShowForm} />}
        </div>
      )}
    </>
  );
}
export default Gowns;
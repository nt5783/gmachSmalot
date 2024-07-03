import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { CartContext } from '../App'
import { UserContext } from '../App'
// import { AppContext } from "../App";
import 'react-calendar/dist/Calendar.css'
import { fetchNoParamsfunc } from '../fetch'
import AddGown from './AddGown'
import UpdateGown from './UpdateGown'

function Gowns() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext)
  const { cart, setCart } = useContext(CartContext)
  const [gowns, setGowns] = useState([])
  const [selectedGown, setSelectedGown] = useState(null)
  const { state } = useLocation();
  const model = state.model;
  const eventDate = state.eventDate;
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
      const username = user.username
      if (gownIndex == -1)
        return {
          user: username, length: prevCart.length + 1, items: [
            ...prevCart.items, { id: gownId, model: gown.model, size: gown.size, img: model.image, qty: 1 }]
        };
      const updatedItems = prevCart.items.map((item, index) => {
        if (index === gownIndex) return { ...item, qty: item.qty + 1 };
        return item;
      });
      return { user: username, length: prevCart.length + 1, items: updatedItems };
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
      {user.isManager == 1 && <button onClick={() => setShowForm(prev => prev == 'add' ? '' : 'add')}>add new Gown</button>}
      {showForm == 'add' && <AddGown model={model.model} formOn={setShowForm} />}
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



          {/* <form onSubmit={}>
            <label htmlFor='amount' >amount:</label>
            <input name='amount' type='number' min="1" defaultValue={1}></input>
            <button type="submit">Add to cart</button>
            <button type="submit">Order now</button>
        </form> */}


          <label htmlFor='amount' >amount:</label>
          <input type="number" name='amount' min="1" defaultValue={1} onChange={setAmountToOrder} />
          <button onClick={() => AddGownToCart(gowns[selectedGown])}>Add to cart</button>
          <button onClick={() => navigate('/order', { state: { amount: amountToOrder, gownId: gowns[selectedGown].gownId, eventDate: eventDate } })}>Order now</button>
          {user.isManager == 1 && <button onClick={() => setShowForm(prev => prev == 'update' ? '' : 'update')}>update Gown</button>}
          {showForm == 'update' && <UpdateGown gown={gowns[selectedGown]} formOn={setShowForm} />}
        </div>
      )}
    </>
  );
}
export default Gowns;
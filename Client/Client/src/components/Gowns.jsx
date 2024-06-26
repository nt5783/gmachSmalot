import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { CartContext } from '../App'
// import { AppContext } from "../App";
import 'react-calendar/dist/Calendar.css'
import { fetchNoParamsfunc, fetchImg } from '../fetch'

function Gowns() {
  const { cart, setCart } = useContext(CartContext)
  const [gowns, setGowns] = useState([])
  const [selectedGown, setSelectedGown] = useState(null)
  const { state } = useLocation();
  const model = state.model;
  const eventDate = state.eventDate;

  useEffect(() => {
    async function getData() {
      const res = eventDate ? fetchNoParamsfunc(`gowns?model=${model.model}&date=${eventDate}`, 'GET') : fetchNoParamsfunc(`gowns?model=${model.model}`, 'GET');
      const data = await res;
      if (data.length > 0) {
        setGowns(data)
      }
    }
    getData()
  }, [])

  function gownSelected(i) {
    setSelectedGown((prev) => (prev === i ? null : i)); // Toggle selected gown
  }

  function AddGownToCart(gown){
    setCart(prevItems => [...prevItems, {id: gown.gownId, model: gown.model, size: gown.size, length: gown.length, img: model.womenImage, qty: 1}])
    console.log('cart added')
    console.log(cart)
    // localStorage.setItem('cart', JSON.stringify(cart))
  }

  return (
    <>
      <img height={200} src={model.womenImage} />
      {model.model}
      <span>Size: </span>
      {gowns.length > 0 && gowns.map((gown, i) => (
        <div key={i}>
          <button disabled={gown.available < 1} onClick={() => gownSelected(i)}>{gown.size}</button>
        </div>
      ))}
      {selectedGown !== null && (
        <div>
          <span>Available amount: {gowns[selectedGown].available}</span>
          <button onClick={() => AddGownToCart(gowns[selectedGown])}>Add to cart</button>
          <button>Order now</button>
        </div>
      )}
    </>
  );


}
export default Gowns;
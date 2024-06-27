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
    setSelectedGown((prev) => (prev === i ? i : i)); // Toggle selected gown
  }

  // function AddGownToCart(gown){
  //   // if (cart)
  //   if (cart.some(item => item.id === gown.id)) {
  //   }
  //   setCart(prevItems => [...prevItems, {id: gown.gownId, model: gown.model, size: gown.size, length: gown.length, img: model.womenImage, qty: 1}])
  //   console.log('cart added')
  //   console.log(cart)
  //   // localStorage.setItem('cart', JSON.stringify(cart))
  // }

  function AddGownToCart(gown) {
    const gownId = gown.gownId;

    setCart(prevCart => {
        const gownIndex = prevCart.items.findIndex(item => item.id === gownId);

        if (gownIndex !== -1) {
            // Gown with the same ID already exists, update the quantity
            const updatedItems = prevCart.items.map((item, index) => {
                if (index === gownIndex) {
                    return {
                        ...item,
                        qty: item.qty + 1
                    };
                }
                return item;
            });
            return { length: prevCart.length + 1, items: updatedItems };
        } else {
            // Gown with the ID doesn't exist, add a new item
            return {
                length: prevCart.length + 1,
                items: [
                    ...prevCart.items,
                    { id: gownId, model: gown.model, size: gown.size, length: gown.length, img: model.womenImage, qty: 1 }
                ]
            };
        }
    })
    // setGowns(prev => )
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
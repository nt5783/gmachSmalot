import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from "react-hook-form";
// import { AppContext } from "../App";
import 'react-calendar/dist/Calendar.css';
import { fetchNoParamsfunc, fetchImg } from '../fetch'

function Gowns() {
  const [gowns, setGowns] = useState([])
  const [selectedGown, setSelectedGown] = useState(null)
  const { state } = useLocation();
  console.log(state)
  const model = state.model;
  const eventDate = state.eventDate;
  console.log("model")
  console.log(model)
  console.log("eventDate")
  console.log(eventDate)
  
  useEffect(() => {
    async function getData() {
      console.log('useEffect')
      const res = eventDate ? fetchNoParamsfunc(`gowns?model=${model.model}&date=${eventDate}`, 'GET') : fetchNoParamsfunc(`gowns?model=${model.model}`, 'GET');
      const data = await res;
      if (data.length > 0) {
        setGowns(data)
      }
    }
    getData()
    console.log('gowns')
    console.log(gowns)
    console.log('state')
    console.log(state)
  }, [])

function gownSelected(i) {
  setSelectedGown((prev) => (prev === i ? null : i)); // Toggle selected gown
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
          <button>Add to cart</button> 
          <button>Order now</button>
        </div>
      )}
    </>
  );


}
export default Gowns;
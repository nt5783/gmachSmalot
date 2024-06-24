import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from "react-hook-form";
// import { AppContext } from "../App";
import 'react-calendar/dist/Calendar.css';
import { fetchNoParamsfunc, fetchImg } from '../fetch'

function Gowns() {
  const [gowns, setGowns] = useState([])
  const [sizeSelected, setSizeSelected] = useState('false')
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
    setSizeSelected(prev => !prev)
    setSelectedGown((prev) => { prev == i ? null : i })
    console.log(sizeSelected)
    console.log(selectedGown)
  }

  return (<>
    <img height={200} src={model.womenImage} />
    {model.model}
    <span>size: </span>
    {gowns.length > 0 && gowns.map((gown, i) => {
      return <div><button key={i} disabled={gown.available < 1} onClick={() => gownSelected(i)}>{gown.size}</button>
      </div>
    })}
    {sizeSelected == 'true' && <div><span>available amount: {gowns[selectedGown].available}</span>
      <button>add to cart</button> <button>order now</button></div>}
  </>)
}
export default Gowns;
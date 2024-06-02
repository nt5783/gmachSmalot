import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
// import { AppContext } from "../App";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { fetchNoParamsfunc } from '../fetch'

function Gowns() {
  const [gowns, setGowns] = useState([])
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    async function getData(){
      console.log('useEffect')
      const res = fetchNoParamsfunc('gowns', 'GET', setGowns)
      const data = await res;
      console.log("res")
      console.log(res)
    }
    getData()
    console.log(gowns)
    // console.log("gowns")
    // console.log(gowns)
  }, [])

  function onChange(nextValue) {
    setValue(nextValue);
  }



  return (<>
    {/* <Calendar
      onChange={onChange}
      value={value}
    /> */}

    {gowns.length > 0 && gowns.map((gown, i)=>{
      return <h1>{gown.model}  size:   {gown.size}</h1>
    })}

  </>)
}
export default Gowns;
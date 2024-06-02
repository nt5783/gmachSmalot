import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
// import { AppContext } from "../App";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { fetchNoParamsfunc, fetchImg } from '../fetch'

function Gowns() {
  const [gowns, setGowns] = useState([])
  const [value, setValue] = useState(new Date());
  const [img, setImg] = useState([]);

  useEffect(() => {
    async function getData() {
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

  useEffect(() => {
    async function getMoreData() {
      console.log('useEffect2')
      let m, image;
      for (let i = 0; i < gowns.length; i++){
        m = gowns[i].model
        image = fetchImg(m)
        console.log(image)
      }
      // gowns.map((gown) => fetchImg(gown.model), setImg([...img]))

      // const res = fetchNoParamsfunc('gowns', 'GET', setGowns)
      // const data = await res;
      // console.log("res")
      // console.log(res)
    }

    if (gowns.length != 0) {
      getMoreData()
    }

  }, [gowns])

  function onChange(nextValue) {
    setValue(nextValue);
  }



  return (<>
    {/* <Calendar
      onChange={onChange}
      value={value}
    /> */}

    {gowns.length > 0 && gowns.map((gown, i) => {
      return <h1 key={i}>{gown.model}  size:   {gown.size}  picture: {gown.womenImage}</h1>
    })}

    {img.length > 0 && <h2>img!!</h2>}

  </>)
}
export default Gowns;
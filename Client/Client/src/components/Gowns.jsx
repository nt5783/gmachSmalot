import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
// import { AppContext } from "../App";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { fetchNoParamsfunc, fetchImg } from '../fetch'

function Gowns({ state }) {
  const [gowns, setGowns] = useState([])
  const [value, setValue] = useState(new Date());
  const [img, setImg] = useState([]);

  useEffect(() => {
    async function getData() {
      console.log('useEffect')
      const res = fetchNoParamsfunc('gowns', 'GET')
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
    // console.log("gowns")
    // console.log(gowns)
  }, [])

  // useEffect(() => {
  //   async function getMoreData() {
  //     console.log('useEffect2')
  //     let m, image;
  //     for (let i = 0; i < gowns.length; i++) {
  //       m = gowns[i].model
  //       console.log('m')
  //       console.log(m)
  //       const imageBlob = await fetchImg(m)
  //       console.log('image')
  //       console.log(image)
  //       // const imageBlob = await res.blob();
  //       const imageObjectURL = URL.createObjectURL(imageBlob);
  //       setImg(imageObjectURL);
  //     }
  //     // gowns.map((gown) => fetchImg(gown.model), setImg([...img]))

  //     // const res = fetchNoParamsfunc('gowns', 'GET', setGowns)
  //     // const data = await res;
  //     // console.log("res")
  //     // console.log(res)
  //   }

  //   if (gowns.length != 0) {
  //     getMoreData()
  //   }

  // }, [gowns])

  function onChange(nextValue) {
    setValue(nextValue);
  }


  return (<>
    {/* <Calendar
      onChange={onChange}
      value={value}
    /> */}

    {gowns.length > 0 && gowns.map((gown, i) => {
      return <div key={i}>
        {gown.model}  size:   {gown.size}
        <img src="../img/women/615.png" />
        </div>
    })}

    {/* {img.length > 0 && <h2>img!!</h2>} */}

  </>)
}
export default Gowns;
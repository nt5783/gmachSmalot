import React, {useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
// import { AppContext } from "../App";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function Gowns() {

    const [value, setValue] = useState(new Date());

    function onChange(nextValue) {
      setValue(nextValue);
    }
  
    return (
      <Calendar
        onChange={onChange}
        value={value}
      />
    );
}
export default Gowns;
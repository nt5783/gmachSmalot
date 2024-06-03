import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
// import { AppContext } from "../App";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function InvitationCalendar() {
  const navigate = useNavigate();
  const [value, setValue] = useState(new Date());

  function onChange(nextValue) {
    setValue(nextValue);
  }

  var oneYearFromNow = new Date();
  oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
  //שיוכלו לבחור מהיום או ממחרתיים?
  return (
    <div style={{ margin: "300px" }}>
      <Calendar maxDate={oneYearFromNow} minDate={new Date()} minDetail='year' calendarType='hebrew' next2Label={null} prev2Label={null}
        onClickDay={(value) => navigate('/gowns', { state: { value } })}
        onChange={onChange} tileDisabled={({ activeStartDate, date, view }) => date.getDay() === 6 || date.getDay() === 5}
        value={value}
      />
    </div>

  );
}
export default InvitationCalendar;




// import React, {useState, useEffect, useContext } from 'react';
// import { useNavigate,useLocation } from 'react-router-dom';
// import { useForm } from "react-hook-form";
// // import { AppContext } from "../App";
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';

// function Gowns() {
//   const { state } = useLocation();
//     // const [value, setValue] = useState(new Date());
//     const { value } = state;
//     // function onChange(nextValue) {
//     //   setValue(nextValue);
//     // }
//   console.log(value)
//     return (
//       // <Calendar
//       //   onChange={onChange}
//       //   value={value}
//       // />
//       <p>
//         gowns!!!!!!!!
//       </p>
//     );
// }
// export default Gowns;